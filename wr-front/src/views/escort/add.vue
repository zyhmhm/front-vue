<template>
  <div>
      <div style="margin-top: 20px; border: #000000;">
        <span>请选择质押申请然后点击快速生成:</span>
      </div>
      <div style="margin: 50px auto; border-bottom:1px solid #000000; border-top:1px solid #000000; text-align: center;">
        <el-form ref="dataForm" :inline="true" :rules="rules1" :model="escort" label-position="left" label-width="100px" style="width: 70%; margin: 20px auto;">
          <el-form-item label="仓储企业" prop="company">
            <el-input v-model="escort.company" :disabled="true"/>
          </el-form-item>
          <el-form-item label="仓库名称" prop="repoName">
            <el-input v-model="escort.repoName"  :disabled="true"/>
          </el-form-item>
          <el-form-item label="货物名称" prop="goodsName">
            <el-input v-model="escort.goodsName"  :disabled="true"/>
          </el-form-item>
          <el-form-item label="受让人Id" prop="toUserId">
            <el-input v-model="escort.toUserId" :disabled="true" />
          </el-form-item>
          <el-form-item label="解压原因" prop="reason">
            <el-input type="textarea" v-model="escort.reason"/>
          </el-form-item>
        </el-form>
        <el-button @click="submitEscort" type="primary">
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
              <span>{{ row.company }}</span>
            </template>
          </el-table-column>
          <el-table-column label="仓库名称" align="center">
            <template slot-scope="{row}">
              <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
              <span>{{ row.repoName }}</span>
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
import { doSaveEscort } from '@/api/escort'
import { getPledgePage } from '@/api/pledge'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: { Pagination },
    data() {
      return {
        isCheck: false,
        escort: {
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
          state: '5'
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
      submitEscort() {
        doSaveEscort(this.$qs.stringify(this.escort)).then(res => {
          if (res.code === 200) {
            alert('添加成功！')
            this.$router.push('/businessApplication/shipper-escort')
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
        this.escort.electronicWarehouseId = row.electronicWarehouseId
        this.escort.company = row.company
        this.escort.goodsName = row.goodsName
        this.escort.repoName = row.caddr
        this.escort.pledgeId = row.id
        this.escort.toUserId = row.toUserId
      },
      // 仓单详情
      showEleWareDetaile(row) {
        var param = {
          type: 'id',
          id: row.electronicWarehouseId
        }
        this.$router.push({ path: '/businessApplication/electronicwarehouse', query: { param: param }})
      },
      // 获取表格数据
      getList() {
        this.listLoading = true
        getPledgePage(this.listQuery).then(response => {
          console.log(response)
          if (response.code === 200) {
            this.listLoading = false
            this.list = response.data.data
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
