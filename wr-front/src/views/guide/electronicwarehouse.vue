<template>
  <div style="width: 70%; text-align: center; margin: auto;">
    <div style="text-align: left;">
      <h1>仓单详情</h1>
    </div>
    <div  v-for="(electronicWarehouse,index) in this.electronicWarehouses" :key="index" style="margin-top: 20px;">
      <span>仓单{{ index+1 }}</span>
      <el-row>
        <el-row>
          <el-col :span="10" class="dataHead">
            <div><p>存货人(单位全称):<span class="info">{{electronicWarehouse.electronicWarehouse.inventor}}</span></p></div>
          </el-col>
          <el-col :span="14" class="dataHead" style="display: inline;">
            <div><p>存货人地址:<span class="info">{{electronicWarehouse.electronicWarehouse.iaddr}}</span></p></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" class="dataHead" style="display: inline;">
            <div><p>保管人(单位全称):<span class="info">{{electronicWarehouse.electronicWarehouse.custodian}}</span></p></div>
          </el-col>
          <el-col :span="14" class="dataHead" style="display: inline;">
            <div><p>保管仓地址:<span class="info">{{electronicWarehouse.electronicWarehouse.caddr}}</span></p></div>
          </el-col>
        </el-row>
          <el-col :span="23">
            <el-row>
              <el-col :span="7" class="dataHead" style="display: inline;">
                <div><p>货物种类:<span class="info">{{electronicWarehouse.electronicWarehouse.goodsCategory}}</span></p></div>
              </el-col>
  <!--            <el-col :span="7" class="dataHead" style="display: inline;">
                <div><p>仓储合同号:<span class="info">{{electronicWarehouse.contractNumber}}</span></p></div>
              </el-col> -->
              <el-col :span="8" class="dataHead" style="display: inline;">
                <div><p>仓储费费率:<span class="info">{{electronicWarehouse.electronicWarehouse.rate}}</span></p></div>
              </el-col>
              <el-col :span="9" class="dataHead" style="display: inline;">
                <div><p>清洁仓单:<span class="info">{{electronicWarehouse.electronicWarehouse.isClean}}</span></p></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" class="dataHead" style="display: inline;">
                <div><p>仓储物名称:<span class="info">{{electronicWarehouse.electronicWarehouse.goodsName}}</span></p></div>
              </el-col>
              <el-col :span="9" class="dataHead" style="display: inline;">
                <div><p>生产厂商:<span class="info">{{electronicWarehouse.electronicWarehouse.manufacturer}}</span></p></div>
              </el-col>
              <el-col :span="8" class="dataHead" style="display: inline;">
                <div><p>货物损耗标准:<span class="info">{{electronicWarehouse.electronicWarehouse.lossStandard}}</span></p></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="dataHead">
                商品编码<el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.goodsEncoding" size="mini"></el-input>
              </el-col>
              <el-col :span="5" class="dataHead">
                包装:<el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.packing" size="mini"></el-input>
              </el-col>
              <el-col :span="5" class="dataHead">
                数量:<el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.number" type="number" size="mini"></el-input>
              </el-col>
              <el-col :span="4" class="dataHead">
                单位<el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.unit" size="mini"></el-input>
              </el-col>
              <el-col :span="4" class="dataHead">
                重量:<el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.weight" type="number" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="dataHead" style="display: inline;">
                  <el-row>
                    <el-col>
                      仓储标记物
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="3" class="dataHead" style="display: inline;">
                      品牌<el-input :disabled="true" v-model="electronicWarehouse.storageMark.brand" size="small"></el-input>
                    </el-col>
                    <el-col :span="5" class="dataHead" style="display: inline;">
                      规格<el-input :disabled="true" v-model="electronicWarehouse.storageMark.specifications" size="small"></el-input>
                    </el-col>
                    <el-col :span="3" class="dataHead" style="display: inline;">
                      型号<el-input :disabled="true" v-model="electronicWarehouse.storageMark.model" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="dataHead" style="display: inline;">
                      生产批号<el-input :disabled="true" v-model="electronicWarehouse.storageMark.batchNumber" size="small"></el-input>
                    </el-col>
                    <el-col :span="7" class="dataHead" style="display: inline;">
                      产地<el-input :disabled="true" v-model="electronicWarehouse.storageMark.productionAdd" size="small"></el-input>
                    </el-col>
    <!--                <el-col :span="4" class="dataHead" style="display: inline; font-size: x-small;">
                      识别号<el-input :disabled="true" v-model="storageMark.identifier" size="small"></el-input>
                    </el-col> -->
                  </el-row>
                </el-col>
                <!-- <el-col :span="2" class="dataHead">
                  库位<el-input :disabled="true" v-model="electronicWarehouse.storehouse" size="mini"></el-input>
                </el-col> -->
            </el-row>
            <el-row>
              <el-col class="dataHead">
                <div>库位<el-input v-model="electronicWarehouse.electronicWarehouse.storehouse" :disabled="true"></el-input></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" class="dataHead">
                <div><p>仓单货值(大写):
                <span class="info">{{electronicWarehouse.electronicWarehouse.receiptValue}}</span></p>
                </div>
              </el-col>
              <el-col :span="13" class="dataHead">
                <div><p>仓单货值(小写):
                 <span class="info">{{electronicWarehouse.electronicWarehouse.receiptValues}}</span></p>
                </div>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="11" class="dataHead">
                <div><p>质检机构:<span class="info">{{electronicWarehouse.qualityOrganization}}</span></p></div>
              </el-col>
              <el-col :span="13" class="dataHead">
                <div><p>质检报告编号:<span class="info">{{electronicWarehouse.qualityNumber}}</span></p></div>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="14" class="dataHead">
                <div><p>仓单有效期:
                <span class="info">{{electronicWarehouse.electronicWarehouse.effectiveDates}}</span></p>
                  <!-- <el-input v-model="electronicWarehouse.effectiveDates"></el-input> -->
                  </div>
              </el-col>
              <el-col :span="10" class="dataHead">
                <div><p>保险险种:<span class="info">{{electronicWarehouse.electronicWarehouse.insurance}}</span></p></div>
              </el-col>
  <!--            <el-col :span="7" class="dataHead">
                <div><p>保险单号:<span class="info">{{electronicWarehouse.insuranceNumber}}</span></p></div>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="11" class="dataHead">
                <div><p>备注:</p><el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.notes" type="textarea" size="medium"></el-input></div>
              </el-col>
              <el-col :span="6" class="dataHead">
                <el-row>
                  <el-col>
                    <div><p>仓单制单人:</p><el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.documentMaker" type="text"></el-input></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div><p>复核记账人:</p><el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.checkPerson" type="text"></el-input></div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="7" class="dataHead">
                <div><p>保管人(单位)盖章:</p>
                <!-- <el-input :disabled="true" v-model="electronicWarehouse.electronicWarehouse.isSeal" size="medium"></el-input> -->
                <img :src="sealJpg" width="100%">
                <!-- <img src="../../assets/seal_images/seal.jpg" width="100%"> -->
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-row>
          <el-col :span="1" class="dataHead" style="display: inline; height: 554px;">
            <div style="text-align: center;width: 20xp; line-height: 70px;">
              <br>正<br>本<br>提<br>货<br>联
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-button v-show="electronicWarehouse.electronicWarehouse.state === 1 && role === 'editor'" type="success" style="margin:10px auto;" @click="doAppCash(electronicWarehouse.electronicWarehouse.id,electronicWarehouse.electronicWarehouse.effectiveDates)">申请兑付</el-button>
      <!-- <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload(electronicWarehouse)">Export</el-button> -->
    </div>
    <div style="margin-top: 20px; text-align: center;">
      <el-button style="margin:10px auto;" @click="comBack">返回</el-button>
     <!-- <el-button type="danger" style="margin:10px auto;" @click="doRefuse">驳回</el-button> -->
    </div>

    <el-dialog title="填写兑付申请" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="cashData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="商品名称" prop="type">
          <el-input v-model="cashData.goodsName" />
        </el-form-item>
        <el-form-item label="兑付日期" prop="timestamp">
          <el-date-picker v-model="cashData.cashDate" type="datetime" placeholder="请选择兑付时间" :picker-options="expireTimeOption" value-format="yyyy-MM-dd hh:mm:ss"/>
        </el-form-item>
        <el-form-item label="提货人姓名" prop="title">
          <el-input v-model="cashData.consigneeName" />
        </el-form-item>
        <el-form-item label="提货人电话">
          <el-input v-model="cashData.consigneeTell" />
        </el-form-item>
        <el-form-item label="提货人身份证号">
          <el-input v-model="cashData.consigneeIdNumber" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="doSaveCash">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<style>
  .el-dialog__footer {
      padding: 20px;
      padding-top: 10px;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
  }
  .info {
    color: red;
  }
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
    text-align: left;
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
import { mapGetters } from 'vuex'
import { doSaveCash } from '@/api/cash'
import sealJpg from '@/assets/seal_images/seal.jpg'
import { getEleWareInfoByTypeId } from '@/api/eleWare'
export default {
  data() {
    return {
      sealJpg: sealJpg,
      role: '',
      list: null,
      cashData: [{
        goodsName: '',
        consigneeName: '',
        consigneeTell: '',
        consigneeIdNumber: '',
        cashDate: ''
      }],
      dialogFormVisible: false,
      param: {},
      options: [{
        value: 1,
        label: '是'
      }, {
        value: 2,
        label: '否'
      }],
      storageMark: {
        brand: '',
        specifications: '',
        model: '',
        batchNumber: '',
        productionAdd: '',
        identifier: ''
      },
      checkTime: '',
      electronicWarehouses: [{
        inventor: '', // 存货人（单位全称）',
        iAddr: '', // 存货人地址',
        custodian: '', // '保管人（单位全称）',
        cAddr: '', // '保管仓地址',
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
        // brand: '', // 品牌',
        // specifications: '', // '规格',
        // model: '', // '型号',
        // batchNumber: '', // '生产批号',
        // productionAdd: '', // '产地',
        // identifier: '' // '识别号',
      }],
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
      }
    }
  },
  methods: {
    //导出chengexcel表格
    handleDownload(electronicWarehouse) {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const multiHeader = [['存货人(单位)：' + electronicWarehouse.inventor]]
          const header = ['', 'Title', 'Author', 'Readings', '']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          // const list = electronicWarehouse
          const list = Array.from(this.electronicWarehouses)
          const data = this.formatJson(filterVal, list)
          // const merges = ['A1:A2', 'B1:D1', 'E1:E2']
          excel.export_json_to_excel({
            multiHeader,
            header,
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    doSaveCash() {
      if(Date.parse(this.checkTime) < Date.parse(this.cashData.cashDate)){
        alert('对付日期在有限期之外请重新选择')
        return
      }
      console.log(this.cashData)
      doSaveCash(this.$qs.stringify(this.cashData)).then(res => {
        if (res.code === 200) {
          alert("申请已提交，请耐心等待审核！")
        }else {
          alert(res.msg)
        }
      })
    },
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
      // var param = { id: 1 }
      getEleWareInfoByTypeId(this.param).then(res => {
        if (res.code === 200) {
          this.electronicWarehouses = res.data
          // this.storageMark = res.data.storageMark
        }
      })
    },
    doAppCash(id,time) {
      debugger
      this.checkTime = time
      if(Date.parse(time) < new Date()){
        alert("当前仓单已经过期，不能发起兑付申请，可以先前去质换")
        return
      }
      this.cashData.electronicWarehouseId = id
      this.dialogFormVisible = true
    }

  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.role = this.roles.join(' | ')
    this.param = this.$route.query.param
    console.log(this.param)
    this.dogetObjectById()
  }
}
</script>
