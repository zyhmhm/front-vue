<template>
  <div class="app-container">
    <div class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.consigneeName" placeholder="联系人姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('appointment.search') }}
        </el-button>
      </div>

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
        <el-table-column label="货物名称" width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.goodsName }}</span>
          </template>
        </el-table-column>
       <el-table-column label="提货人姓名" width="100px">
          <template slot-scope="{row}">
            <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
            <span>{{ row.consigneeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提货人电话" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.consigneeTell }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提货人身份证号" width="150px" align="center">
          <template slot-scope="{row}">
            <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
            <span>{{ row.consigneeIdNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="兑付日期" min-width="110px" align="center">
          <template slot-scope="{row}">
            <!-- <svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon" /> -->
            <el-tag>{{ row.cashDate }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" width="100" align="center">
          <template slot-scope="{row}">
            <span>{{formatStatus(row.state)}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('appointment.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="small" @click="showOrderMakingDetaile(row)">
              查看仓单
            </el-button>
            <el-button v-show="row.state === 2 || row.state === 3" type="success" size="small" @click="doMaking(row)">
              审核备注
            </el-button>
            <el-button v-show="row.state === 4" type="danger" size="small" @click="doOutRepo(row)">
              确认出库
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

	 <el-dialog title="审核备注" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" >
        <el-form ref="dataForm" :rules="rules" :model="notes" label-position="left" label-width="100px" style="margin-left:50px;">
          <el-form-item label="审核备注" prop="notes">
            <el-input v-model="notes.notes" type="textarea"  :disabled="true"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import { doGetCashPageToShipper, doAcceptOrRefuse } from '@/api/cash'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        consigneeName: '',
        currentPage: 1,
        pageSize: 20
      },
      notes: {notes:''},
      dialogFormVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查看审核备注
    handleShowNotes(row) {
      this.dialogFormVisible = true
      this.notes.notes = row.notes;
    },
    formatStatus(val) {
      // 1.已提交待审核//2.审核未通过//3.审核已通过//4.仓库方已确认出库//5.货主已确认出库
      return val === 1 ? '已提交待审核' : val === 2 ? '审核未通过' : val === 3 ?
        '审核已通过' : val === 4 ? '仓库方已确认出库' : val===5 ? '货主已确认出库' : ''
    },
    // 序号增加
    indexMethod(index) {
      return index + 1
    },
    // 确认出库
    doOutRepo(row){
      this.postData = {
        state: 5,
        id: row.id,
      }
      doAcceptOrRefuse(this.$qs.stringify(this.postData)).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          alert(res.msg)
        }
      })
    },
    // 仓单详情页面
    showOrderMakingDetaile(row) {
      // var param = {
      //   id: row.id
      // }
      // this.$router.push({ path: '/businessApplication/orderMaking-detaile', query: { param: param }})
      var param = {
        type: 'cash_id',
        id: row.id
      }
      this.$router.push({ path: '/businessApplication/electronicwarehouse', query: { param: param }})
    },
    doMaking(row) {
      var param = {
        id: row.appointmentId,
        orderMakingId: row.id
      }
      this.$router.push({ path: '/businessApplication/orderMaking', query: { param: param }})
    },
    doDetaile(row) {

    },

    // 获取表格数据
    getList() {
      this.listLoading = true
      doGetCashPageToShipper(this.listQuery).then(response => {
        console.log(response)
        if (response.code === 200) {
          this.listLoading = false
          this.list = response.data.cashList
          console.log(this.list)
          this.total = response.data.total
        } else {
          this.listLoading = false
          alert(response.msg)
        }
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
