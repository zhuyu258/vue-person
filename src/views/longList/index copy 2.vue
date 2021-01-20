<template>
  <div class="home" ref="scrollWrap">
        <div class="list-scroll-inner">
            <div class="emptyH" :style="{height:emptyHeight+'px'}"></div>
            <div class="item" v-for="(item,index) in list" :key="index">
                <img :src="item.img" alt="">
                <div>
                    <h3>{{ item.title }}</h3>
                </div>
            </div>
        </div>
        <!-- 顶部刷新文字 -->
        <div class="top-refresh refresh-more">
            {{pulldownMsg}}
        </div>
        <!-- 底部加载更多文字 -->
        <div class="bottom-more refresh-more">
            {{pullupMsg}}
        </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    data() {
      return {
        emptyHeight: 0, // 删除元素之后要撑开的高度
        currentPage: 0, // 当前页数
        scrollCurrentPage: 0, // 当前页数用于计算上下滚动是否显示上上页和下下页的数据
        pageSize: 10, // 没页显示的条数
        list: [], // 当前要渲染的列表数据
        more: [
            {
                id: 1,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 2,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 3,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 4,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 5,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 6,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 7,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 8,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 9,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
            {
                id: 10,
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                title: Math.random()*10000,
            },
        ],
        originList: [], // 完整的数据列表 是一个二维数组，每一项代表一页
        originListH: [], // 完整的数据列表中每一页数据的高度
        orderScrollWrap: '',
        pullupMsg: '上拉加载更多', //上拉加载更多的文字
        pulldownMsg: '释放刷新',  //下拉刷新文字
        downloadFlag: true, //已取消加载动画
        removeList: [], // 下拉滚动删除的下一页的数据
      }
    },
    created() {
    },
    async mounted() {
        // 进入页面首次加载显示的数据
        const list = await this.getData(this.more)
        this.list = list // 渲染的数据
        this.originList = [[...list]]  // 保存一份
        setTimeout(()=>{
            this._initScroll() // 设置滚动
            this.computedPageHeight(0) // 获取当前页面的高度
            this.currentPage++ // 页码加1
            this.scrollCurrentPage++
        },200)
    },
    methods: {
        // 获取当前页的高度
        computedPageHeight(){
            // 获取当前显示的所有的item
            let allItem = document.getElementsByClassName('item')
            if(!allItem){
                return
            }
            let count = 0
            // 计算获取当前页面的高度
            for(let i = allItem.length-this.pageSize; i < allItem.length;i++){
                let val = document.defaultView.getComputedStyle(allItem[i],'')
                // 高度加上margin offsetHeight包括height+padding+border
                count += parseFloat(allItem[i].offsetHeight) + parseFloat(val.marginBottom)
            }
            // 存储到数组中
            this.originListH[this.currentPage] = count
            console.log('allItem',count, this.originListH)
        },
        //初始化滚动
        _initScroll() {
            let that = this
            let flag = true
            let timerUp = ''
            if(!this.orderScrollWrap) {
                this.orderScrollWrap = new Bscroll(this.$refs.scrollWrap, {
                    scrollY: true,
                    click: true,
                    mouseWheel: true,
                    pullUpLoad:{
                        threshold: -20 // 当上拉距离超过50px时触发 pullingUp 事件
                    },
                    probeType: 1, // 实时滚动
                })
                // 监听实时滚动
                let lastScrollVal = 0
                this.orderScrollWrap.on('scroll',(pos)=>{
                    // console.log('pos1',pos)
                    const { x, y} = pos
                    // console.log(Math.abs(lastScrollVal) > Math.abs(y),y < -300,this.originListH.length >= 3)
                    // 上拉滚动
                    if (Math.abs(y) > Math.abs(lastScrollVal) && this.removeList.length) {
                        console.log('向上')
                        // if (this.scrollCurrentPage && Math.abs(y) > this.emptyHeight + this.originListH[this.scrollCurrentPage-3]) {
                        //     //  当前显示页的下下页的数据列表
                        //     const lastList = this.originList[this.originList.length-3]
                        //     // 当前显示页的下页的数据列表
                        //     const nextList = this.list[this.list.length-1]
                        //      console.log('lastList',lastList,this.list)
                        //     // 要渲染显示上上页和上一页和当前页
                        //     this.list = [...lastList, ...[...this.list].splice(0,this.list.length-1)]
                        //     this.emptyHeight = this.emptyHeight - this.originListH[this.originListH.length-3]
                        //     // this.originListH.splice(this.originListH.length-3,1)
                        //     this.scrollCurrentPage++
                        //     console.log('this.list 222', this.list )
                        //     this.removeList = nextList // 被删除的下一页的数据
                        // }

                    } else if (Math.abs(lastScrollVal) > Math.abs(y) && y < -300 && that.originListH.length >= 3){ // 下拉滚动
                        debugger
                        // console.log('向下',this.originListH,this.scrollCurrentPage,Math.abs(y) < this.emptyHeight + this.originListH[this.scrollCurrentPage-1])
                        // 如果滚动的高度 小于 空元素撑开的高度加上上一页的高度 那么就使得渲染列表加上上上页的列表数据
                        // (目前显示的是上一页，当前页和下一页，如果滚动的高度小于上一页的高度加上空元素撑开的高度就显示上上页的数据)
                        if (that.scrollCurrentPage > 2 && Math.abs(y) < that.emptyHeight + that.originListH[that.scrollCurrentPage-1]) {
                            // 当前页还在显示中
                            if (Math.abs(y) > that.emptyHeight) {
                                //  当前显示页的上上页的数据列表
                                const lastList = that.originList[that.originList.length-3]
                                // console.log('lastList',lastList,this.list)
                                // 要渲染显示上上页和上一页和当前页
                                that.list = [...lastList, ...that.list]
                                that.emptyHeight = that.emptyHeight - that.originListH[that.scrollCurrentPage-3]
                                // this.originListH.splice(this.originListH.length-3,1)
                                that.scrollCurrentPage--
                                console.log('this.list 222', that.list )
                            } else if (that.list.length >= 3){
                                // 当前显示页的下页的数据列表
                                const nextList = that.list[that.list.length-1]
                                that.list = [...lastList, ...[...that.list].splice(0,that.list.length-1)]
                                that.removeList = nextList // 被删除的下一页的数据
                            }
                        }
                    }
                    lastScrollVal = y
                })
                //滑动结束松开事件
                this.orderScrollWrap.on('touchEnd',(pos) =>{  //下拉刷新
                    if(pos.y > 30){
                        let timer = ''
                        //获取初始订单数据
                        timer && clearTimeout(timer)
                        if(!flag){return}
                        flag = false
                        //初始化数据
                        that.currentPage = 1
                        this.scrollCurrentPage = 1
                        this.pulldownMsg = ''
                        this.uploadFlag = this.downloadFlag =  this.comloadFlag = this.allloadFlag = true
                        timer = setTimeout(()=>{
                            that.getData()
                            flag = true
                        },500)
                        
                    }else if(pos.y<(this.orderScrollWrap.maxScrollY - 30)){   //上拉加载
                        this.pullupMsg != '没有更多数据了' ? this.pullupMsg = '加载中...' : ''
                        //获取数据列表信息
                        timerUp && clearTimeout(timerUp)
                        if(!flag){return}
                        flag = false
                        // 防止平凡的上拉
                        timerUp = setTimeout(async ()=>{
                            // 上拉加载获取数据
                            const list = await that.getData(this.more)
                            // 保存完整的数据
                            let currentList = this.originList = [...this.originList,[...list]]
                            // 超过三页就把上上页的数据删除，并且给空的元素设置它相应的高度
                            if(that.currentPage >= 2){ 
                               // 从完整的数据列表中获取到后两页的数据
                               currentList = [...this.originList].splice(this.originList.length-2).flat()
                               let h = 0
                               // 计算上上页之前的所有页面的高度
                               this.originListH.forEach((item,index)=>{
                                   if(index < this.originListH.length-1){ // 之所以减1，是因为当前获取的页码的数据还没有渲染所以不用减2.是减1
                                       h += +item
                                   }
                               })
                               // 赋值为空元素的高度
                               this.emptyHeight = h
                            } else { // 没有超过三页就全部渲染
                                currentList = currentList.flat()
                            }
                            // 赋值给要渲染的属性
                            this.list = [...currentList]
                            console.log('this.list',this.list,this.originList,this.emptyHeight,that.currentPage)
                            setTimeout(()=>{
                                // this.orderScrollWrap.scrollBy(0, -10, 0, 'easing')
                                // 刷新滚动条
                                this.orderScrollWrap.refresh();
                                // 计算当前页面的高度
                                this.computedPageHeight()
                                // 页码加1
                                that.currentPage ++
                                this.scrollCurrentPage++
                                flag = true
                            },50)
                        },500)
                    }
                    this.orderScrollWrap.scrollBy(0, 0, 0, 'easing')
                })   
            } else {
                this.orderScrollWrap.scrollBy(0, 0, 0, 'easing')
                this.orderScrollWrap.refresh();
            }
        },
        getData(list){
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    res(list)
                },4000)
            })
        },
    }
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
    position: fixed;
    top: 0.92rem;
    left: 50%;
    bottom: 0.1rem;
    transform: translate(-50%,0);
    overflow: hidden;
    background: #fff;
    .list-scroll-inner{
        width: 100%;
        min-height: 105%;
        padding: 0 0 0.1rem;
        position: relative;
        z-index: 10;
        background: #fff;
        .loading{
            text-align: center;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 1;
        }
        .item{
            display: flex;
            justify-content: flex-start;
            width: 100%;
            background: #fff;
            box-shadow: 1px 1px 3px #ccc;
            margin: 0 0 10px;
            // padding-bottom: 10px;
            z-index: 2;
            position: relative;
            img{
                width: 140px;
            }
        }
    }
    
    .refresh-more{
        position: absolute;
        height: 40px;
        text-align: center;
        font-size: 0.12rem;
        color: #000;
        z-index: 1;
        width: 100%;
    }
    .top-refresh{
        top: 10px;
    }
    .bottom-more{
        bottom: 10px;
    }
}
</style>