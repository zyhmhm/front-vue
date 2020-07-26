<template>
  <div style="width: 70%; text-align: center; margin: auto;">
    <div style="text-align: left;">
      <h1>预约单详细数据</h1>
    </div>
    <el-row>
      <el-row>
        <el-col :span="24" class="dataHead">
          <div><p>预约单单号:&nbsp;&nbsp;{{appointment.appointmentNumber}}</p></div>
        </el-col>      </el-row>
      <el-row>
        <el-col :span="6" class="dataHead">
          <div><p>货主姓名</p></div>
        </el-col>
        <el-col :span="6" class="dataHead">
          <div><p>物品名称</p></div>
        </el-col>
        <el-col :span="6" class="dataHead">
          <div><p>仓库名称</p></div>
        </el-col>
        <el-col :span="6" class="dataHead">
          <div><p>入库时间</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.shipper}}</p></div>
        </el-col>
        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.goodsName}}</p></div>
        </el-col>
        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.depositoryName}}</p></div>
        </el-col>
        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.storageTime}}</p></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" class="dataHead">
          <div><p>联系人</p></div>
        </el-col>
        <el-col :span="6" class="dataHead">
          <div><p>联系人电话</p></div>
        </el-col>
        <el-col :span="6" class="dataHead">
          <div><p>状态</p></div>
        </el-col>
        <el-col :span="6" class="dataHead">
          <div><p>审核备注</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.contacts}}</p></div>
        </el-col>
        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.tell}}</p></div>
        </el-col>
        <el-col :span="6" class="dataCol">
          <div><p>{{formatStatus(appointment.state)}}</p></div>
        </el-col>
<!--        <el-col :span="6" class="dataCol">
          <div><p>{{appointment.auditNotes}}</p></div>
        </el-col> -->
       <el-col :span="6" class="dataCol">
         <template>
           <template v-if="this.param.flag">
             <el-input v-model="appointment.auditNotes" type="textarea" class="edit-input" style="height: 80px!important;" />
           </template>
           <span v-else>{{ appointment.auditNotes }}</span>
         </template>
       </el-col>
      </el-row>
<!--      <el-row>
        <el-col :span="24" style="text-align: left;!important">
          <div><p>审核人员姓名：{{appointment.auditName}}</p></div>
        </el-col>
      </el-row> -->
      <el-row v-for="(detaile,index) in detailes" :key="index">
        <el-row>
          <el-col :span="24"  class="dataHead">
            <div>预约单物品详细单{{ index }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="dataHead">
            <div>
              <p>商品名称</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>生产厂商</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>商品编码</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>包装</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.goodsName }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.manufacturer }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.encoding }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.packinng }}</p></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="dataHead">
            <div>
              <p>商品数量</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>单位</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>商品重量</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>体积</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.number }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.unit }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.weight }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.volume }}</p></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="dataHead">
            <div>
              <p>单价</p>
            </div>
          </el-col>
          <el-col :span="6" class="dataHead">
            <div>
              <p>属性</p>
            </div>
          </el-col>
          <el-col :span="12" class="dataHead">
            <div>
              <p>备注</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.unitPrice }}</p></div>
          </el-col>
          <el-col :span="6" class="dataCol">
            <div><p>{{ detaile.deta }}</p></div>
          </el-col>
          <el-col :span="12" class="dataCol">
            <div><p>{{ detaile.notes }}</p></div>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
    <div style="margin-top: 20px; text-align: center;">
      <el-button style="margin:10px auto;" @click="comBack">返回</el-button>
      <el-button v-show="this.param.flag && appointment.state === 2" type="success" style="margin:10px auto;" @click="doAccept">通过</el-button>
      <el-button v-show="this.param.flag && appointment.state === 2" type="danger" style="margin:10px auto;" @click="doRefuse">驳回</el-button>
    </div>
  </div>

</template>

<style>
  .el-row {
    margin-bottom: 0px; /*去除el-row之间的间距*/
    border: 1px solid #e6e6e6;
    margin: -1px -1px -1px -1px; /*解决相邻边框重叠问题就靠这行代码*/
    &:last-child {
      margin-bottom: 0px;
    }
  }
  .el-col {
    margin-bottom: 0px;
    border: 1px solid #e6e6e6;
    /* margin: -1px -1px -1px -1px; */
    text-align: center;
  }
  .dataCol {
    height: 80px!important;
  }
  .dataHead {
    background: #E8F8F5;
    //padding: 20px;
  }
  .bg-purple {
  }
  .bg-purple-light {
    background: #121927;
  }
  .grid-content {
    border: 0px solid rgb(0, 0, 0);
    min-height: 50px;
  }
  .grid-content-sub {
    border: 0px solid rgb(0, 0, 0);
    padding: 20px;
  }
  .grid-content-large {
    border: 0px solid rgb(0, 0, 0);
    padding: 70px;
    height: 60px;
  }
  .grid-content-large-sub {
    border: 0px solid rgb(0, 0, 0);
    padding: 20px;
    height: 57.5px;
  }
</style>

<script>
import { doAcceptOrRefuse, doFindAppById } from '@/api/article'
export default {
  data() {
    return {
      param: [],
      appointment: [{
        appointmentNumber: '',
        shipper: '',
        goodsName: '',
        depositoryName: '',
        storageTime: '',
        contacts: '',
        tell: '',
        state: '',
        auditNotes: '',
        auditName: ''
      }],
      detailes: [{
        goodsName: '',
        manufacturer: '',
        encoding: '',
        packing: '',
        number: '',
        unit: '',
        weight: '',
        volume: '',
        unitPrice: '',
        notes: '',
        deta: ''
      }]
    }
  },
  methods: {
    // 判断状态
    formatStatus(val) {
      return val === 1 ? '已保存未提交' : val === 2 ? '已提交待审核' : val === 3 ?
        '已审核未通过' : val === 4 ? '已审核通过待指派入库' : val===5 ?
          '正在入库' : val === 6 ? '仓库方已确认入库' : val=== 7 ? '货主已确认入库' : val === 8 ?
            '待制单' : val===9 ? '已发起制单申请' : val===10 ? '正在制单' : val===11 ? '制单完成' : ''
    },
    // 返回上一个路由
    comBack() {
      this.$router.back(-1)
    },
    // 获得当前预约单详情
    dogetObjectById() {
      var param = { id: this.param.id }
      doFindAppById(param).then( res => {
        if(res.code === 200){
          this.appointment = res.data.appointment
          this.detailes = res.data.detailedList
        }
      })
    },
    doAccept() {
      if (this.appointment.auditNotes === null || this.appointment.auditNotes === '') {
        alert('请输入审核备注，若没有可以填无' )
        return
      }
      var param = {
        auditNotes: this.appointment.auditNotes,
        id: this.appointment.id,
        state: 4
      }

      doAcceptOrRefuse(this.$qs.stringify(param)).then(res => {
        if (res.code === 200) {
          alert('审核已经通过')
          this.$router.push('/appointment/index')
        } else {
          alert(res.msg)
        }
      })
    },
    doRefuse() {
      if (this.appointment.auditNotes === '' || this.appointment.auditNotes === null) {
        alert('请输入审核备注，注明不通过原因')
        return
      }
      var param = {
        auditNotes: this.appointment.auditNotes,
        id: this.appointment.id,
        state: 3
      }
      doAcceptOrRefuse(this.$qs.stringify(param)).then(res => {
        if (res.code === 200) {
          alert('已驳回')
          this.$router.push('/appointment/index')
        } else {
          alert(res.msg)
        }
      })
    }

  },
  created() {
    this.param = this.$route.query.param
    this.dogetObjectById()
  }
}
</script>
