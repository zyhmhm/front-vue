<template>
  <div>
      <div style="margin-top: 20px; border: #000000;">
        <span>请选择仓单然后点击快速生成:</span>
      </div>
      <div style="margin: 50px auto; border-bottom:1px solid #000000; border-top:1px solid #000000; text-align: center;">
        <el-form ref="dataForm" :inline="true" :rules="rules1" :model="transfer" label-position="left" label-width="100px" style="width: 70%; margin: 20px auto;">
          <el-form-item label="仓储企业" prop="company">
            <el-input v-model="transfer.company" :disabled="true"/>
          </el-form-item>
          <el-form-item label="仓库地址" prop="caddr">
            <el-input v-model="transfer.repoName"  :disabled="true"/>
          </el-form-item>
          <el-form-item label="货物名称" prop="goodsName">
            <el-input v-model="transfer.goodsName"  :disabled="true"/>
          </el-form-item>
          <el-form-item label="受让人Id" prop="toUserId">
            <el-input v-model="transfer.toUserId" />
          </el-form-item>
          <el-form-item label="转让原因" prop="reason">
            <el-input type="textarea" v-model="transfer.reason"/>
          </el-form-item>
        </el-form>
        <el-button @click="submitTransfer" type="primary">
          提交
        </el-button>
      </div>
      <div>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column type="index" label="序号" :index="indexMethod" width="50px"></el-table-column>
          <el-table-column label="仓单号Id" align="center">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
         <el-table-column label="货物名称">
            <template slot-scope="{row}">
              <span>{{ row.goodsName }}</span>
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column label="仓储企业" align="center">
            <template slot-scope="{row}">
              <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
              <span>{{ row.custodian }}</span>
            </template>
          </el-table-column>
          <el-table-column label="仓库地址" align="center">
            <template slot-scope="{row}">
              <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
              <span>{{ row.caddr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="small" @click="quiteCheck(row)">
                快速选择
              </el-button>
              <el-button type="primary" size="small" @click="showEleWareDetaile(row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
      </div>
  </div>
</template>

<script>
import { getEleWarePage } from '@/api/eleWare'
import { doSaveTransfer } from '@/api/transfer'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: { Pagination },
    data() {
      return {
        isCheck: false,
        transfer: {
          electronicWarehouseId: '',
          company: '',
          goodsName: '',
          repoName: ''
        },
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          state: ''
        },
        rules1: {
          validityPeriod: [{ required: true, message: '仓单有效期是必填的', trigger: 'change' }],
          paymentVoucher: [{ required: true }],
          invoice: [{ required: true }],
          contract: [{ required: true }]
        }
      }
    },
    methods: {
      //保存转让申请
      submitTransfer() {
        doSaveTransfer(this.$qs.stringify(this.transfer)).then(res => {
          if (res.code === 200) {
            alert('添加成功！')
            this.$router.push('/businessApplication/shipper-transfer')
          } else {
            alert(res.msg)
          }
        })
      },
      // 序号增加
      indexMethod(index) {
        return index + 1
      },
      // 选择仓单
      quiteCheck(row) {
        this.transfer.electronicWarehouseId = row.id
        this.transfer.company = row.custodian
        this.transfer.goodsName = row.goodsName
        this.transfer.repoName = row.caddr
        this.isCheck = true
      },
      // 仓单详情
      showEleWareDetaile(row) {
        var param = {
            type: 'id',
            id: row.id
          }
          this.$router.push({ path: '/businessApplication/electronicwarehouse', query: { param: param }})
      },
      // 获取表格数据
      getList() {
        this.listLoading = true
        getEleWarePage(this.listQuery).then(response => {
          console.log(response)
          if (response.code === 200) {
            this.listLoading = false
            this.list = response.data.orderMakings
            console.log(this.list)
            this.total = response.data.total
          } else {
            this.listLoading = false
            alert(response.msg)
          }
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style>
</style>
