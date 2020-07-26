<template>
  <div style="width: 70%; text-align: center; margin: auto;">
    <div style="text-align: left;">
      <h1>制单</h1>
    </div>
    <div  v-for="(electronicWarehouse,index) in this.electronicWarehouses" :key="index" style="margin-top: 20px;">
      <span>仓单{{ index+1 }}</span>
    <el-row>
      <el-row>
        <el-col :span="10" class="dataHead" style="display: inline;">
          存货人(单位全称):<el-input v-model="electronicWarehouse.inventor" :disabled="true"></el-input>
        </el-col>
        <el-col :span="14" class="dataHead" style="display: inline;">
          存货人联系方式:<el-input v-model="electronicWarehouse.iaddr" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="dataHead" style="display: inline;">
          保管人(单位全称):<el-input v-model="electronicWarehouse.custodian" :disabled="true"></el-input>
        </el-col>
        <el-col :span="14" class="dataHead" style="display: inline;">
          保管仓地址:<el-input v-model="electronicWarehouse.caddr" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-row>
            <el-col :span="7" class="dataHead" style="display: inline;">
              货物种类<el-input v-model="electronicWarehouse.goodsCategory" :disabled="true"></el-input>
            </el-col>
           <!-- <el-col :span="7" class="dataHead" style="display: inline;">
              仓储合同号:<el-input v-model="electronicWarehouse.contractNumber"></el-input>
            </el-col> -->
            <el-col :span="8" class="dataHead" style="display: inline;">
              仓储费费率:<el-input v-model="electronicWarehouse.rate" :disabled="true"></el-input>
            </el-col>
            <el-col :span="9" class="dataHead" style="display: inline;">
              清洁仓单:
              <template>
                <el-select v-model="electronicWarehouse.isClean" placeholder="请选择" :disabled="true">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" class="dataHead" style="display: inline;">
              仓储物名称<el-input v-model="electronicWarehouse.goodsName" :disabled="true"></el-input>
            </el-col>
            <el-col :span="9" class="dataHead" style="display: inline;">
              生产厂商:<el-input v-model="electronicWarehouse.manufacturer" :disabled="true"></el-input>
            </el-col>
            <el-col :span="8" class="dataHead" style="display: inline;">
              货物损耗标准:<el-input v-model="electronicWarehouse.lossStandard" :disabled="true"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="dataHead">
              商品编码<el-input v-model="electronicWarehouse.goodsEncoding" size="mini" :disabled="true"></el-input>
            </el-col>
            <el-col :span="2" class="dataHead">
              包装:<el-input v-model="electronicWarehouse.packing" size="mini" :disabled="true"></el-input>
            </el-col>
            <el-col :span="2" class="dataHead">
              数量:<el-input v-model="electronicWarehouse.number" type="number" size="mini" :disabled="true"></el-input>
            </el-col>
            <el-col :span="2" class="dataHead">
              单位<el-input v-model="electronicWarehouse.unit" size="mini" :disabled="true"></el-input>
            </el-col>
            <el-col :span="2" class="dataHead">
              重量:<el-input v-model="electronicWarehouse.weight" type="number" size="mini" :disabled="true"></el-input>
            </el-col>
            <el-col :span="13" class="dataHead" style="display: inline;">
              <el-row>
                <el-col>
                  仓储标记物
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3" class="dataHead" style="display: inline;">
                  品牌<el-input v-model="electronicWarehouse.brand" size="small" :disabled="true"></el-input>
                </el-col>
                <el-col :span="5" class="dataHead" style="display: inline;">
                  规格<el-input v-model="electronicWarehouse.specifications" size="small" :disabled="true"></el-input>
                </el-col>
                <el-col :span="3" class="dataHead" style="display: inline;">
                  型号<el-input v-model="electronicWarehouse.model" size="small" :disabled="true"></el-input>
                </el-col>
                <el-col :span="6" class="dataHead" style="display: inline;">
                  生产批号<el-input v-model="electronicWarehouse.batchNumber" size="small" :disabled="true"></el-input>
                </el-col>
                <el-col :span="7" class="dataHead" style="display: inline;">
                  产地<el-input v-model="electronicWarehouse.productionAdd" size="small" :disabled="true"></el-input>
                </el-col>
<!--                <el-col :span="4" class="dataHead" style="display: inline;">
                  识别号<el-input v-model="electronicWarehouse.identifier" size="small" :disabled="true"></el-input>
                </el-col> -->
              </el-row>
            </el-col>
<!--            <el-col :span="2" class="dataHead">
              库位<el-input v-model="electronicWarehouse.storehouse" size="mini"></el-input>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col class="dataHead">
              <div>库位<el-input v-model="electronicWarehouse.storehouse" :disabled="true"></el-input></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" class="dataHead">
              <div><p>仓单货值(大写)</p><el-input v-model="electronicWarehouse.receiptValue" :disabled="true"></el-input></div>
            </el-col>
            <el-col :span="13" class="dataHead">
              <div><p>仓单货值(小写)</p>
                <el-input type="number" v-model="electronicWarehouse.receiptValues" :disabled="true"></el-input>
              </div>
            </el-col>
          </el-row>
<!--          <el-row>
            <el-col :span="11" class="dataHead">
              <div><p>质检机构</p><el-input v-model="electronicWarehouse.qualityOrganization"></el-input></div>
            </el-col>
            <el-col :span="13" class="dataHead">
              <div><p>质检报告编号</p><el-input v-model="electronicWarehouse.qualityNumber"></el-input></div>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="14" class="dataHead">
              <div><p>仓单有效期</p>
                <!-- <el-input v-model="electronicWarehouse.effectiveDates"></el-input> -->
                <el-date-picker v-model="electronicWarehouse.effectiveDates" type="datetime" placeholder="请选择入库时间" :picker-options="expireTimeOption" value-format="yyyy-MM-dd hh:mm:ss" :disabled="true"/>
                </div>
            </el-col>
            <el-col :span="10" class="dataHead">
              <div><p>保险险种</p><el-input v-model="electronicWarehouse.insurance" :disabled="true"></el-input></div>
            </el-col>
<!--            <el-col :span="7" class="dataHead">
              <div><p>保险单号</p><el-input v-model="electronicWarehouse.insuranceNumber"></el-input></div>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="11" class="dataHead">
              <div><p>备注</p><el-input v-model="electronicWarehouse.notes" type="text" size="medium"></el-input></div>
            </el-col>
            <el-col :span="6" class="dataHead">
              <el-row>
                <el-col>
                  <div><p>仓单制单人</p><el-input v-model="electronicWarehouse.documentMaker" type="text" ></el-input></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div><p>复核记账人</p><el-input v-model="electronicWarehouse.checkPerson" type="text"></el-input></div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7" class="dataHead">
              <div><p>保管人(单位)盖章</p><el-input v-model="electronicWarehouse.isSeal" size="medium"></el-input></div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1" class="dataHead" style="display: inline; height: 687px;">
          <div style="text-align: center;width: 20xp; line-height: 100px;">
            <br>正<br>本<br>提<br>货<br>联
          </div>
        </el-col>
      </el-row>
    </el-row>
    </div>
    <div style="margin-top: 20px; text-align: center;">
      <el-button style="margin:10px auto;" @click="comBack">返回</el-button>
      <el-button type="success" style="margin:10px auto;" @click="doMake">制作</el-button>
     <!-- <el-button type="danger" style="margin:10px auto;" @click="doRefuse">驳回</el-button> -->
    </div>
  </div>

</template>

<style>
  .el-input--small .el-input__inner {
      height: 58px;
      line-height: 32px;
  }
  .el-input--mini .el-input__inner {
      height: 80px;
      line-height: 28px;
  }
  .el-input--medium .el-input__inner {
      height: 135px;
      line-height: 36px;
  }
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
import { doGetelectronicWarehouseById, doSaveEleWare, doGetEleWareInfoToMake } from '@/api/order-making'
import { doFindAppById } from '@/api/article'
export default {
  data() {
    return {
      param: [],
      electronicWarehouses: [],
      options: [{
                value: 1,
                label: '是'
              }, {
                value: 2,
                label: '否'
              }],
      electronicWarehouse: {
        inventor: '', // 存货人（单位全称）',
        iaddr: '', // 存货人地址',
        custodian: '', // '保管人（单位全称）',
        caddr: '', // '保管仓地址',
        goodsCategory: '', // '货物品类',
        contractNumber: '', // '仓储合同号',
        rate: '', // '费率',
        isClean: '', // '清洁仓单（1是/0否）',
        goodsName: '', // '货物名称',
        manufacturer: '', // '生产厂商',
        lossStandard: '', // '货物损耗标准',
        goodsEncoding: '', // '商品编码',
        packing: '', // '包装',
        number: '', // '数量',
        unit: '', // '单位',
        weight: '', // '重量',
        storehouse: '', // '库位',
        receiptValue: '', // '仓单货值（大写）',
        receiptValues: '', // '仓单货值（小写）',
        qualityOrganization: '', // '质检单位',
        qualityNumber: '', // '质检报告单号',
        effectiveDates: '', // '仓单有效期',
        insurance: '', // '保险险种',
        insuranceNumber: '', // '保险单号',
        notes: '', // '备注',
        documentMaker: '', // '仓单制单人',
        checkPerson: '', // '复核记账人',
        isSeal: '', // '保管人（单位）盖章(1盖章/0没有盖章)',
        brand: '', // 品牌',
        specifications: '', // '规格',
        model: '', // '型号',
        batchNumber: '', // '生产批号',
        productionAdd: '', // '产地',
      },
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
      }
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
      // var param = { id: this.param.id }
      var param = { appointmentId: this.param.id,repoId :this.param.depositoryId,orderMakingId: this.param.ordermakingId }
      doGetEleWareInfoToMake(param).then(res => {
        if (res.code === 200) {
          this.electronicWarehouses = res.data
        }
      })
    },
    doMake() {
      console.log(this.electronicWarehouses)
      // this.electronicWarehouse.appointmentId = this.param.id
      // this.electronicWarehouse.ordermakingId = this.param.ordermakingId
      doSaveEleWare(this.electronicWarehouses).then(res => {
          if (res.code === 200) {
            alert('仓单已保存')
            this.$router.push('/guide/index')
          } else {
            alert(res.msg)
          }
      })

      // doAcceptOrRefuse(this.$qs.stringify(param)).then(res => {
      //   if (res.code === 200) {
      //     alert('审核已经通过')
      //     this.$router.push('/businessApplication/shipper-electronicWarehouse')
      //   } else {
      //     alert(res.msg)
      //   }
      // })
    }

  },
  created() {
    this.param = this.$route.query.param
    this.dogetObjectById()
  }
}
</script>
