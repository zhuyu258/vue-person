<template>
  <div class="side">
     <el-tree
      :data="routes"
      node-key="id"
      :default-expand-all="false"
      :expand-on-click-node="true"
      @node-click = "route_push"
      :render-content="renderContent">
    </el-tree>
  </div>
</template>

<script>
import { routesList } from '@router/index.js';
export default {
    created(){
      this.routes = routesList;
      // this.id = this.$route.path.subString(1)
      console.log('this.routes',this.$route)
    },
    computed:{
      id(){
        return this.$route.path.substring(1);
      }
    },
    data(){
      return {
        routes:[],
      }
    },
    methods:{
      renderContent(h, { node, data, store }) {
        return (
            <span class={data.id == this.id ? 'active' : ''}>{node.label}</span>
          );
      },
      route_push(data){
        if(data.path){
          this.$router.push({path:data.path})
        }
        console.log('111',data)
      }
    }
};
</script>

<style scoped>
.side{
  min-width: 360px;
  overflow: auto;
}
</style>