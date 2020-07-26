<template>
  <div>
    <div>
      <el-steps style="margin-top: 15px;" :active="step" align-center finish-status="success">
        <el-step title="步骤1" description="填写基本信息" />
        <el-step title="步骤2" description="填写商品明细" />
        <el-step title="步骤3" description="保存预约单" />
        <el-step title="步骤4" description="提交预约申请" />
        <!-- <el-step title="步骤5" description="仓库审核" />
        <el-step title="步骤6" description="指派入库" />
        <el-step title="步骤7" description="正在入库" />
        <el-step title="步骤8" description="仓库方确认入库" />
        <el-step title="步骤9" description="货主确认入库" /> -->
      </el-steps>
    </div>
    <div style="margin-top: 20px; border: #000000;">
      <i>基本信息填写:</i>
    </div>

    <div style="margin: 50px auto; border:1px solid #000000; text-align: center;">
      <el-form ref="dataForm" :rules="rules1" :model="appointment" label-position="left" label-width="80px" style="width: 400px; margin: 10px auto;">
        <el-form-item label="选择仓库" prop="depositoryId">
          <el-select v-model="appointment.depositoryId" class="filter-item" placeholder="请选择仓库">
            <el-option v-for="item in depositorys" :key="item.id" :label="item.depositoryName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('appointment.goodsName')" prop="goodsName">
          <el-input v-model="appointment.goodsName" />
        </el-form-item>
        <el-form-item :label="$t('appointment.contacts')" prop="contacts">
          <el-input v-model="appointment.contacts" />
        </el-form-item>
        <el-form-item :label="$t('appointment.tell')" prop="tell">
          <el-input v-model="appointment.tell" />
        </el-form-item>
        <el-form-item :label="$t('appointment.storageTime')" prop="storageTime">
          <el-date-picker v-model="appointment.storageTime" type="datetime" placeholder="请选择入库时间" :picker-options="expireTimeOption" value-format="yyyy-MM-dd hh:mm:ss"/>
        </el-form-item>
        <el-form-item :label="$t('appointment.shipper')" prop="shipper">
          <el-input v-model="appointment.shipper" />
        </el-form-item>
        <el-form-item label="货主电话" prop="shipperTell">
          <el-input v-model="appointment.shipperTell" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!showGroup" @click="nextStep" type="primary">
          下一步
        </el-button>
        <!-- <el-button v-show="showGroup" @click="lastStep" type="primary">
          修改
        </el-button> -->
      </div>
    </div>

    <div v-show="showGroup">
      <div style="margin-top: 20px; border: #000000;">
        <span>填写预约单商品详细单</span>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddDetaile">
          添加物品详细单
        </el-button>
      </div>
      <div v-for="(detaile,index) in detailes" :key="index">

        <div style="margin: 50px auto; border:1px solid #000000; text-align: center;">
          <div>物品详细单{{ index+1 }}:</div>
          <el-form ref="detaile" :rules="rules" :model="detaile" label-position="left" label-width="85px" style="width: 400px; margin: 10px auto;">
            <el-form-item :label="$t('detaile.goodsName')" prop="goodsName">
              <el-input v-model="detaile.goodsName"  placeholder="请输入物品名称" />
            </el-form-item>
            <el-form-item :label="$t('detaile.manufacturer')" prop="manufacturer">
              <el-input v-model="detaile.manufacturer" placeholder="请输入物品生产厂商" />
            </el-form-item>
            <el-form-item :label="$t('detaile.encoding')" prop="encoding">
              <el-input v-model="detaile.encoding" placeholder="请输入物品编码" />
            </el-form-item>
            <el-form-item :label="$t('detaile.packing')" prop="packing">
              <el-input v-model="detaile.packing" placeholder="请输入物品包装" />
            </el-form-item>
            <el-form-item label="计量单位" prop="unit">
              <el-select v-model="detaile.unit" placeholder="请选择计量单位">
                <el-option v-for="item in metering" :key="item.id" :label="item.meteringName" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('detaile.weight')" prop="weight">
              <el-input v-model="detaile.weight" type="number" placeholder="请输入物品重量(单位:KG)" />
            </el-form-item>
            <el-form-item :label="$t('detaile.volume')" prop="volume">
              <el-input v-model="detaile.volume" type="number" placeholder="请输入物品体积(单位:m³)" />
            </el-form-item>
            <el-form-item label="长度" prop="length">
              <el-input v-model="detaile.length" type="number" placeholder="请输入物品长度(单位:米)" />
            </el-form-item>
            <el-form-item label="面积" prop="area">
              <el-input v-model="detaile.area" type="number" placeholder="请输入物品面积(单位:㎡)" />
            </el-form-item>
            <el-form-item :label="$t('detaile.number')" prop="number">
              <el-input v-model="detaile.number" type="number" placeholder="请输入物品数量(正整数)" />
            </el-form-item>
            <el-form-item :label="$t('detaile.unitPrice')" prop="unitPrice">
              <el-input v-model="detaile.unitPrice" type="number" placeholder="请输入物品单价(元/上面所输的单位)" />
            </el-form-item>
            <el-form-item label="是否清洁" prop="isClear">
              <el-select v-model="detaile.isClear" placeholder="请选择仓单性质">
                <el-option v-for="item in nature" :key="item.id" :label="item.natureName" :value="item.id" />
              </el-select>
            </el-form-item>
            <!-- 仓储无标记需要填写 -->
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="detaile.brand" placeholder="请输入物品长度(单位:米)" />
            </el-form-item>
            <el-form-item label="规格" prop="specifications">
              <el-input v-model="detaile.specifications" placeholder="请输入物品面积(单位:㎡)" />
            </el-form-item>
            <el-form-item label="型号" prop="model">
              <el-input v-model="detaile.model" placeholder="请输入物品数量(正整数)" />
            </el-form-item>
            <el-form-item label="生产批号" prop="batchNumber">
              <el-input v-model="detaile.batchNumber" placeholder="请输入物品单价(元/上面所输的单位)" />
            </el-form-item>
            <el-form-item label="产地" prop="productionAdd">
              <el-input v-model="detaile.productionAdd" placeholder="请输入物品单价(元/上面所输的单位)" />
            </el-form-item>
            <el-form-item :label="$t('detaile.notes')" prop="notes">
              <el-input v-model="detaile.notes" placeholder="请输入详细单的备注" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" >
            <el-button @click.prevent="deleteDetaile(detaile)" type="danger">
              {{ $t('detaile.delete') }}
            </el-button>
            <!-- <el-button type="primary" @click.prevent="handSaveDetaile(detaile)">
              {{ $t('detaile.detaileSave') }}
            </el-button> -->
          </div>
        </div>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button style="margin:10px auto;" type="success" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postAppointment } from '@/api/article'
import { getAllRepo } from '@/api/repo'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    // 重量、体积、数量三选一校验
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      showGroup: false,
      tabs: [],
      detailes: [],
      step: 0,
      depositorys: [
        { id: '1', depositoryName: '信方储存人民仓库' },
        { id: '2', depositoryName: '腾龙一号' }
      ],
      nature: [
        {id: '0', natureName: '否'},
        {id: '1', natureName: '是'}
      ],
      metering: [
        {id: '0', meteringName: '重量'},
        {id: '1', meteringName: '数量'},
        {id: '2', meteringName: '体积'},
        {id: '3', meteringName: '长度'},
        {id: '4', meteringName: '面积'}
      ],
      appointment: {
        depositoryId: '',
        goodsName: '',
        contacts: '',
        tell: '',
        storageTime: '',
        shipper: '',
        shipperTell: ''
      },
      rules1: {
        depositoryId: [{ required: true, message: '仓库不能为空', trigger: 'change' }],
        goodsName: [{ required: true, message: '商品名不能为空', trigger: 'blur' }],
        tell: [{ required: true, message: '，联系人电话不能为空', trigger: 'blur' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        storageTime: [{ required: true, message: '请选择入库时间', trigger: 'change' }],
        shipper: [{ required: true, message: '请填写货物的所有方', trigger: 'blur' }],
        shipperTell: [{ required: true, message: '请填写所有方联系方式', trigger: 'blur' }]
      },
      rules: {
          manufacturer: [{ required: true, message: '厂商不能为空', trigger: 'blur' }],
          goodsName: [{ required: true, message: '商品名不能为空', trigger: 'blur' }],
          encoding: [{ required: true, message: '，商品编码不能为空', trigger: 'blur' }],
          packing: [{ required: true, message: '包装不能为空', trigger: 'blur' }],
          number: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          unit: [{ required: true, message: '单位不能为空', trigger: 'change' }],
          weight: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          volume: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          unitPrice: [{ required: true, message: '请填写单价', trigger: 'blur' }],
          isClear: [{ required: true, message: '请填写单价', trigger: 'change' }],
          length: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          brand: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          specifications: [{ required: true, message: '单位不能为空', trigger: 'change' }],
          model: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          batchNumber: [{ required: true, message: '重量不能为空', trigger: 'blur' }],
          productionAdd: [{ required: true, message: '请填写单价', trigger: 'blur' }],
          area: [{ required: true, message: '重量不能为空', trigger: 'blur' }]
      },
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
      }
    }
  },
  created(){
    this.getAllRepo();
  },
  methods: {
    getAllRepo() {
      getAllRepo().then(res =>{
        this.depositorys = res.data
      })
    },
    nextStep() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.appointment)
          this.step++
          this.showGroup = !this.showGroup
        }
      })
    },
    lastStep() {
      this.step--
      this.showGroup = !this.showGroup
    },
    handleAddDetaile() {
      this.detailes.push({
        goodsName: '',
        manufacturer: '',
        encoding: '',
        packing: '',
        number: '',
        unit: '',
        weight: '',
        volume: '',
        unitPrice: '',
        notes: ''
      })
    },
    deleteDetaile(item) {
      var index = this.detailes.indexOf(item)
      if (index !== -1) {
        this.detailes.splice(index, 1)
      }
    },
    //
    handSaveDetaile(item) {
      console.log(item)
    },
    // 保存预约单
    submit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.detailes.length)
          if(this.detailes.length <= 0){
            alert("请至少填写一个货物详细单")
          }
          var detailes = JSON.stringify(this.detailes)
          this.appointment.detailes = detailes
          var param2 = this.$qs.stringify(this.appointment)
          console.log(param2)
          postAppointment(param2).then(res => {
            console.log(res)
            if (res.code === 200) {
              alert(res.msg)
              this.$router.push('/businessApplication/shipper-appointment')
            }
            else {
              alert(res.msg)
            }
          })
        }
      })
    }
  }

}
</script>

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
  }
  .el-select {
      display: inline-block;
      position: relative;
      width: 100%;
  }
</style>
