<template>
  <div>
    <el-button type="success" @click="back" style="width: 100%">返回</el-button>
    <div :style="{ height: height + 'px' }">
        <el-amap vid="amap" :center="center" :zoom="zoom">
            <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
            <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index">
            </el-amap-marker>
        </el-amap>
    </div>
  </div>
</template>
<script>
import VueAMap from 'vue-amap';
import { getRepoInfo,doGetPositionPage, doSaveRepo, doSavePosition } from '@/api/repo'
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'f0fe84fb51c187532530b88e74d910f0',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
// 这是提示框内容
const exampleComponents = {
    props: ['text'],
    template: `<el-card class="box-card text-content"><div slot="header" class="clearfix">
        <span>仓库信息</span></div><div><p>仓库名称: {{text.depositoryName}}</p><p>仓库地址: {{text.depositoryAdd}}</p><p>仓库所属企业: {{text.company}}</p></div></el-card>`
}
export default {
    data () {
        return {
            height: 0,
            count: 1,
            center: [121.5273285, 31.21315058],
            slotStyle: {
                padding: '2px 8px',
                background: '#eee',
                color: '#333',
                border: '1px solid #aaa'
            },
            zoom: 14,
            markers: [
                {
                position: [121.5273285, 31.21315058],
                events: {
                    click: () => {
                    alert('click marker');
                    },
                    dragend: (e) => {
                    this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                    }
                },
                visible: true,
                draggable: false,
                template: '<span>1</span>',
                }
            ],
            renderMarker: {

            },
            componentMarker: {
                position: [121.5273285, 31.21315058],
                contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: this.warehouseInfo}}, ['xxxxxxx'])
            },
            slotMarker: {
                position: [121.5073285, 31.21715058]
            },
            warehouseInfo: {
                depositoryName: '仓库名称',
                depositoryAdd: '仓库地址',
                company: '仓库所属企业'
            }
        }
    },
    created(){
      this.getRepoInfo()
    },
    methods: {
      // getRepoInfo(){
      //   getRepoInfo().then(res => {
      //     this.warehouseInfo = res.data
      //     console.log(this.warehouseInfo)
      //     // this.center = this.warehouseInfo.coordinate
      //     // this.markers.position = this.warehouseInfo.coordinate
      //     // this.componentMarker.position = this.warehouseInfo.coordinate
      //   })
      // },
      back(){
        this.$router.back(-1)
      }

    },
    mounted() {
        this.height = document.documentElement.clientHeight
    }
}
</script>
<style type="text/css">
.text-content{ width: 350px; }
.text-content .el-card__header, .text-content .el-card__body{ padding: 10px 20px; }
.text-content .el-card__body p{ margin: 10px 0px; }
</style>
