<template>
  <div>
    <div>
      <el-steps style="margin-top: 15px;" :active="step" align-center finish-status="success">
        <el-step title="步骤1" description="填写制单信息" />
        <el-step title="步骤2" description="提交制单申请" />
        <el-step title="步骤3" description="仓库方审核" />
        <el-step title="步骤4" description="仓库方制作中" />
        <el-step title="步骤5" description="已发放" />
      </el-steps>
    </div>
    <div style="margin-top: 20px; border: #000000;">
      <i>基本信息填写:</i>
    </div>
    <div style="margin: 50px auto; border-bottom:1px solid #000000; border-top:1px solid #000000; text-align: center;">
      <el-form ref="dataForm" :inline="true" :rules="rules1" :model="orderMaking" label-position="left" label-width="100px" style="width: 70%; margin: 20px auto;">
        <el-form-item label="预约单号" prop="appointmentNumber">
          <el-input v-model="orderMaking.appointmentNumber" :disabled="true"/>
        </el-form-item>
<!--        <el-form-item :label="申请状态" prop="title">
          <el-input v-model="orderMaking.goodsName"  disabled="true"/>
        </el-form-item> -->
        <el-form-item label="货物名称" prop="goodsName">
          <el-input v-model="orderMaking.goodsName"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="存货方" prop="shipper">
          <el-input v-model="orderMaking.shipper"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="存货方电话" prop="shipperTell">
          <el-input v-model="orderMaking.shipperTell"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="仓储企业" prop="company">
          <el-input v-model="orderMaking.company"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="仓库名称" prop="depositoryName">
          <el-input v-model="orderMaking.depositoryName"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="仓库联系人" prop="depositoryContacts">
          <el-input v-model="orderMaking.depositoryContacts"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="仓库方电话" prop="depositoryTell">
          <el-input v-model="orderMaking.depositoryTell"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="仓单有效期" prop="validityPeriod">
          <el-date-picker v-model="orderMaking.validityPeriod" type="datetime" placeholder="请选择仓单有效期"  value-format="yyyy-MM-dd hh:mm:ss"/>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span><b>货权凭证:</b></span>
      <div style="margin: 50px auto; border-bottom:1px solid #000000; border-top:1px solid #000000; text-align: center;">
        <el-form label-position="left" label-width="70px" style="width: 400px; margin: 10px auto;">
          <el-form-item label="发票" prop="invoice">
            <el-upload
              class="upload-demo"
              action="http://zuul.huisen.top/file-service/pic/upload/1"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="invoiceUrl"
              :with-credentials='true'
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="合同" prop="contract">
            <el-upload
              class="upload-demo"
              action="http://zuul.huisen.top/file-service/pic/upload/2"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :with-credentials='true'
              :file-list="contractUrl"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="支付凭证" prop="paymentVoucher">
            <el-upload
              class="upload-demo"
              action="http://zuul.huisen.top/file-service/pic/upload/3"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :with-credentials='true'
              :file-list="paymentVoucher"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="margin: auto; text-align: center;">
      <el-button @click="submitMaking" type="primary">
        提交
      </el-button>
    </div>
  </div>

</template>

<script>
import { getInfoById, doSave } from '@/api/order-making'
import UpdateImage from '@/components/Upload/SingleImage'
export default {
  components: { UpdateImage },
  data() {
    return {
      param: [],
      step: 0,
      orderMaking: [],
      invoiceUrl: [],
      contractUrl: [],
      paymentVoucher: [],
      rules1: {
        validityPeriod: [{ required: true, message: '仓单有效期是必填的', trigger: 'change' }],
        paymentVoucher: [{ required: true }],
        invoice: [{ required: true }],
        contract: [{ required: true }]
      }
    }
  },
  methods: {
    // 获取制单需要的基本信息
    getInfoById() {
      var param = { appointmentId: this.param.id }
      getInfoById(param).then(res => {
        this.orderMaking = res.data
      })
    },
    // 校验规则
    checkRules() {
      if (this.invoiceUrl.length === 0) {
        alert('请上传发票!')
        return 0
      } else if (this.contractUrl.length === 0) {
        alert('请上传合同')
        return 0
      } else if (this.paymentVoucher.length === 0) {
        alert('请上传支付凭证')
        return 0
      } else {
        return 1
      }
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(fileList)
      debugger
      if (response.code !== 200) {
        alert('上传失败！' + response.msg)
      } else {
        alert('上传成功！')
        file.name = response.data.url
        file.url = response.data.url
        if (response.data.type === '1') {
          this.invoiceUrl.push(file.url)
        } else if (response.data.type === '2') {
          this.contractUrl.push(file.url)
        } else if (response.data.type === '3') {
          this.paymentVoucher.push(file.url)
        }
      }
    },
    handleRemove(file, fileList) {

      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitMaking() {
      if (this.checkRules() === 0) {
        return
      }
      // var invoiceUrl = this.invoiceUrl.toString()
      // this.orderMaking.invoiceUrl = invoiceUrl.substring(1, invoiceUrl.length - 1)
      // var contractUrl = this.contractUrl.toString()
      // this.orderMaking.contractUrl = contractUrl.substring(1, contractUrl.length - 1)
      // var paymentVoucher = this.paymentVoucher.toString()
      // this.orderMaking.paymentVoucher = paymentVoucher.substring(1, paymentVoucher.length - 1)
      this.orderMaking.invoiceUrl = this.invoiceUrl.toString()
      this.orderMaking.contractUrl = this.contractUrl.toString()
      this.orderMaking.paymentVoucher = this.paymentVoucher.toString()
      console.log(this.orderMaking)
      this.orderMaking.appointmentId = this.param.id
      doSave(this.$qs.stringify(this.orderMaking)).then(res => {
        if(res.code !== 200) {
          alert(res.msg)
        }else {
          alert("制单申请提交成功")
          this.$router.push('/businessApplication/shipper-orderMaking')
        }
      })
    }
  },
  created() {
    this.param = this.$route.query.param
    this.getInfoById()
  }
}
</script>

<style>
</style>
