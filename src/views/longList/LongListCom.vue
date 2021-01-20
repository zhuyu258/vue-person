<template>
  <div ref="longList" class="long-list">
    <div ref="fragment" class="fragment" :style="{ transform: `translate3d(0, ${translateY}px, 0)` }">
      <template v-for="item in currentViewList">
        <div :key="item.key % item.key || null">
          <slot :item="item.item"></slot>
        </div>
      </template>
    </div>
    <!-- footer 的paddingTop = item的height * item.length 从而可以出现滚动条 -->
    <div class="footer" :style="{ paddingTop: `${loadingTop}px` }">
      <div v-if="!finished" ref="loadGuard">
        <slot name="loading">
          <div class="footer-loading">Loading......</div>
        </slot>
      </div>
      <div v-else>
        <slot name="finished">
          <div class="footer-done">没有了......</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getScroller, getScrollTop } from '@/utils'
const LOAD_EVENT = 'load'
export default {
  name: 'vue-long-list',
  props: {
    size: { // 每页的条数
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      scroller: null, // 
      innerHeight: window.innerHeight, // 窗口的可视区域高度
      finished: false,
      loading: false,
      itemHeight: 0, // 列表每一项的高度
      sourceList: [], // 原始数据
      currentViewList: [] // 当前要渲染的列表每次都是渲染20条数据
    }
  },
  computed: {
    loadingTop () { // 设置当前容器的高度
      return this.sourceList.length * this.itemHeight
    },
    pageHeight () { // 每一页的高度
      return this.itemHeight * this.size
    },
    translateY () {
      const [firstItem] = this.currentViewList
      if (!firstItem) {
        return 0
      }
      return this.itemHeight * firstItem.key
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 获取具有滚动条的元素
      const scroller = this.scroller = getScroller(this.$refs.longList)

      const { innerHeight, done, pushItems } = this
      // 异步加载
      // 获取加载更多的dom
      const loadGuard = this.$refs.loadGuard
      const loadCallback = () => {
        // 全部渲染完成就返回
        if (this.finished) {
          return
        }
        const { y } = loadGuard.getBoundingClientRect()
        // 判断底部的加载是否显示在可视区域中(loadGuard的顶部到可视区域的顶部的距离是否小于可视区域的高度)，在区域内就加载更多的数据
        if (y <= innerHeight) {
          if (this.loading) {
            return
          }
          this.loading = true
          // 调用父级的加载更多数据的方法
          this.$emit(LOAD_EVENT, { done, pushItems })
        }
      }
      // 获取显示列表框的dom
      const fragment = this.$refs.fragment
      const fragmentCallBack = (scrollTop, isDown) => {
        // 获取显示列表框的dom的 顶部到可视区域顶部的距离 底部到可视区域顶部的距离
        const { top, bottom } = fragment.getBoundingClientRect()
        // 向下滚动
        if (isDown) {
          // 底部到可视区域顶部的距离小于等于可视区域的高度，那么就加载更多的数据
          if (bottom <= innerHeight) {
            this.down(scrollTop, bottom)
          }
        } else {// 向上滚动
          if (top >= 0) {
            // 上部加载已经删除的数据
            this.up(scrollTop, top)
          }
        }
      }
      let oldTop = 0
      // 滚动的回调
      const scrollCallback = () => {
        // 获取滚动的距离
        const scrollTop = getScrollTop(scroller)
        // 判断是否需要加载更多
        loadCallback()
        fragmentCallBack(scrollTop, scrollTop > oldTop)
        oldTop = scrollTop
      }
      loadCallback()
      // 监听滚动
      scroller.addEventListener('scroll', scrollCallback)
      this.$once('hook:beforeDestroy', () => {
        scroller.removeEventListener('scroll', scrollCallback)
      })
    })
  },
  methods: {
    done (finished) {
      // 防止频繁触发
      if (this.finished) {
        return
      }
      // 最后一页
      if (finished === true) {
        this.finished = finished
      }
      const { size, sourceList, currentViewList } = this
      const length = currentViewList.length
      // 首次渲染 第一页数据
      if (length === 0) {
        this.currentViewList = [...sourceList.slice(0, size)]
        this.$nextTick().then(() => {
          this.itemHeight = this.$refs.fragment.children[0].offsetHeight
          this.loading = false
        })
      } else if (length === size) { // 第二次渲染  第二页数据
        this.currentViewList.push(...sourceList.slice(size, size * 2))
        this.loading = false
      } else {
        // 上拉加载更多数据
        if (this.isLoadingView()) {
          const lastKey = currentViewList[length - 1].key
          this.currentViewList = [...currentViewList.slice(size, size * 2), ...sourceList.slice(lastKey + 1, lastKey + 1 + size)]
        }
        this.loading = false
      }
    },
    // 向下滚动
    down (scrollTop, y) {
      const { size, currentViewList } = this
      console.log('size',size)
      const currentLength = currentViewList.length
      // 没有更多数据了(渲染列表的长度小于每页的条数就不需要加载更多)
      if (currentLength < size) {
        return
      }
      const { sourceList } = this
      // 单独处理第二页（currentLength === size表示是第二页）
      if (currentLength === size) {
        this.currentViewList.push(...sourceList.slice(size, size * 2))
        return
      }
      const length = sourceList.length
      const lastKey = currentViewList[currentLength - 1].key
      // 是否是最后一条数据
      if (lastKey >= length - 1) {
        return
      }
      let startPoint
      const { pageHeight } = this
      if (y < 0) {
        // 直接拖动滚动条，导致容器底部边缘直接出现在可视区上方，这种情况通过列表高度算出当前位置
        const page = (scrollTop - scrollTop % pageHeight) / pageHeight + (scrollTop % pageHeight === 0 ? 0 : 1) - 1
        startPoint = Math.min(page * size, length - size * 2)
      } else {
        startPoint = currentViewList[size].key
      }
      this.currentViewList = sourceList.slice(startPoint, startPoint + size * 2)
    },
    // 向上滚动
    up (scrollTop, y) {
      const { size, currentViewList } = this
      const currentLength = currentViewList.length
      // 没有更多数据了(渲染列表的长度小于每页的条数就不需要加载更多)
      if (currentLength < size) {
        return
      }
      const firstKey = currentViewList[0].key
      // 已经是第一条数据了就直接返回
      if (firstKey === 0) {
        return
      }
      let startPoint
      const { sourceList, innerHeight, pageHeight } = this
      if (y > innerHeight) {
        // 处理快速滚动
        const page = (scrollTop - scrollTop % pageHeight) / pageHeight + (scrollTop % pageHeight === 0 ? 0 : 1) - 1
        startPoint = Math.max(page * size, 0)
      } else {
        startPoint = currentViewList[0].key - size
      }
      this.currentViewList = sourceList.slice(startPoint, startPoint + size * 2)
    },
    // 修改数据的格式并且保存原始数据
    pushItems (items) {
      const length = this.sourceList.length
      const normalizedItems = items.map((item, index) => {
        return {
          key: length + index, // 用于获取每项是当前列表的第几项，便于计算添加数据
          item
        }
      })
      this.sourceList = this.sourceList.concat(normalizedItems)
    },
    // 是否需要加载更多数据
    isLoadingView () {
      return this.$refs.loadGuard.getBoundingClientRect().y <= this.innerHeight
    }
  }
}
</script>

<style lang="less" scoped>
.long-list {
  position: relative;
  overflow: hidden;
  .fragment {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
  }
  .footer {
    position: relative;
    &-loading, &-done {
      padding: 15px;
      text-align: center;
    }
  }
}
</style>