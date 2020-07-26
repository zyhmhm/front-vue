<template>
  <div style="width: 70%; text-align: center; margin: auto;">
    <div style="text-align: left;">
      <h1>制单申请详细数据</h1>
    </div>
    <el-row>
      <el-row>
        <el-col :span="24" class="dataHead">
          <div><p>所属预约单单号:&nbsp;&nbsp;{{ordermaking.appointmentNumber}}</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="dataHead">
          <div><p>货物名称</p></div>
        </el-col>
        <el-col :span="8" class="dataHead">
          <div><p>存货方（单位）</p></div>
        </el-col>
        <el-col :span="8" class="dataHead">
          <div><p>仓库名称</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.goodsName}}</p></div>
        </el-col>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.shipper}}</p></div>
        </el-col>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.depositoryName}}</p></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="dataHead">
          <div><p>存货放电话</p></div>
        </el-col>
        <el-col :span="8" class="dataHead">
          <div><p>仓储企业名称</p></div>
        </el-col>
        <el-col :span="8" class="dataHead">
          <div><p>仓库联系人</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.shipperTell}}</p></div>
        </el-col>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.company}}</p></div>
        </el-col>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.depositoryContacts}}</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="dataHead">
          <div><p>仓库联系电话</p></div>
        </el-col>
        <el-col :span="8" class="dataHead">
          <div><p>仓单有效期</p></div>
        </el-col>
        <el-col :span="8" class="dataHead">
          <div><p>状态</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.depositoryTell}}</p></div>
        </el-col>
        <el-col :span="8" class="dataCol">
          <div><p>{{ordermaking.validityPeriod}}</p></div>
        </el-col>
        <el-col :span="8" class="dataCol">
          <div><p>{{formatStatus(ordermaking.state)}}</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="dataHead">
          <div><p>发票</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div v-for="invoice in ordermaking.invoiceUrl.split(',')" :key="invoice" style="display: inline;">
            <img :src="invoice" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="dataHead">
          <div><p>合同</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div v-for="contract in ordermaking.contractUrl.split(',')" :key="invoice" style="display: inline;">
            <img :src="contract" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="dataHead">
          <div><p>付款凭证</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div v-for="payment in ordermaking.paymentVoucher.split(',')" :key="invoice" style="display: inline;">
            <img :src="payment" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="dataHead">
          <div><p>审核备注</p></div>
        </el-col>
      </el-row>
      <el-row>
       <el-col :span="24" class="dataCol">
          <el-input v-model="ordermaking.auditNotes" type="textarea" class="edit-input" style="height: 80px!important;" />
       </el-col>
      </el-row>
    </el-row>
    <div style="margin-top: 20px; text-align: center;">
      <el-button style="margin:10px auto;" @click="comBack">返回</el-button>
      <el-button type="success" style="margin:10px auto;" @click="doAccept">通过</el-button>
      <el-button type="danger" style="margin:10px auto;" @click="doRefuse">驳回</el-button>
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
import { doGetOrderMakingById, doAcceptOrRefuse } from '@/api/order-making'
export default {
  data() {
    return {
      param: [],
      ordermaking: [{
        appointmentNumber: '',
        shipper: '',
        goodsName: '',
        depositoryName: '',
        shipperTell: '',
        company: '',
        depositoryContacts: '',
        depositoryTell: '',
        validityPeriod: '',
        state: '',
        invoiceUrl: '',
        contractUrl: '',
        paymentVoucher: '',
        auditNotes: ''
      }]
    }
  },
  methods: {
    // 判断状态
    formatStatus(val) {
      return val === 1 ? '提交制单申请待审核' : val === 2 ? '已审核未通过' : val === 3 ?
        '已审核通过正在制单' : val === 4 ? '制单完成已发放' : ''
    },
    // 返回上一个路由
    comBack() {
      this.$router.back(-1)
    },
    // 获得当前制单申请详情
    dogetObjectById() {
      var param = { id: this.param.id }
      doGetOrderMakingById(param).then(res => {
        if (res.code === 200) {
          this.ordermaking = res.data
        }
      })
    },
    doAccept() {
      if (!this.ordermaking.auditNotes || this.ordermaking.auditNotes === null || this.ordermaking.auditNotes === '') {
        alert('请输入审核备注，若没有可以填无' )
        return
      }
      var param = {
        notes: this.ordermaking.auditNotes,
        id: this.ordermaking.id,
        state: 3
      }

      doAcceptOrRefuse(this.$qs.stringify(param)).then(res => {
        if (res.code === 200) {
          alert('审核已经通过')
          this.$router.push('/guide/index')
        } else {
          alert(res.msg)
        }
      })
    },
    doRefuse() {
      if(this.ordermaking.auditNotes) {
        console.log(this.ordermaking.auditNotes)
      }
      if (!this.ordermaking.auditNotes || this.ordermaking.auditNotes === null || this.ordermaking.auditNotes.replace(/\s/g, '') === '') {
        alert('请输入审核备注，注明不通过原因')
        return
      }
      var param = {
        notes: this.ordermaking.auditNotes,
        id: this.ordermaking.id,
        state: 2
      }
      doAcceptOrRefuse(this.$qs.stringify(param)).then(res => {
        if (res.code === 200) {
          alert('已驳回')
          this.$router.push('/guide/index')
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
