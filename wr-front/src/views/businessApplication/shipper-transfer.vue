<template>
  <div class="app-container">
    <div class="app-container">
     <div class="filter-container">
           <el-select v-model="listQuery.state" clearable style="width: 140px" class="filter-item" @change="handleFilter">
             <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" placeholder="请选择" />
           </el-select>
           <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
             添加
           </el-button>
           <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
             {{ $t('appointment.export') }}
           </el-button>
     <!--      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
             {{ $t('appointment.reviewer') }}
           </el-checkbox> -->
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
        <el-table-column label="转让人Id" width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.fromUserId }}</span>
          </template>
        </el-table-column>
       <el-table-column label="受让人Id" width="100px">
          <template slot-scope="{row}">
            <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
            <span>{{ row.toUserId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓单Id" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.electronicWarehouseId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓储企业" width="150px" align="center">
          <template slot-scope="{row}">
            <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
            <span>{{ row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓库地址" width="150px" align="center">
          <template slot-scope="{row}">
            <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
            <span>{{ row.repoName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转让原因" width="150px" align="center">
          <template slot-scope="{row}">
            <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
            <span>{{ row.reason }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" class-name="status-col" width="100" align="center">
          <template slot-scope="{row}">
            <span>{{formatStatus(row.state)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" class-name="status-col" width="100" align="center">
          <template slot-scope="{row}">
            <span>{{row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="small" @click="showEleWareDetaile(row)">
              仓单详情
            </el-button>
           <el-button v-show="row.state === 1" type="success" size="mini" @click="doAccept(row)">
              通过
            </el-button>
            <el-button v-show="row.state === 1" type="danger" size="mini" @click="doRefulse(row)">
              驳回
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

      <el-dialog title="填写备注" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" >
        <el-form ref="dataForm" :rules="rules" :model="notes" label-position="left" label-width="100px" style="margin-left:50px;">
          <el-form-item label="审核备注" prop="notes">
            <el-input v-model="notes.notes" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="doSubmit">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style>
  element.style {
      min-height: 80.px;
  }
</style>

<script>
import { mapGetters } from 'vuex'
import { getTransferPage,doChangeState } from '@/api/transfer'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      postData: {},
      accept: true,
      notes: { notes: '' },
      dialogFormVisible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        // consigneeName: '',
        currentPage: 1,
        pageSize: 20,
        state: ''
      },
      sortOptions: [
        { label: '已提交', key: 1 },
        { label: '受让方驳回', key: 2 },
        { label: '受让方通过', key: 3 },
        { label: '仓库驳回', key: 4 },
        { label: '仓库通过', key: 5 }],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        notes: [{ required: true, message: '备注不能为空', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'roles',
      'userId',
    ])
  },
  created() {
    this.currentUserId = this.userId
    console.log(this.userId)
    this.getList()
  },
  methods: {
    formatStatus(val) {
      // 1.已提交待审核//2.审核未通过//3.审核已通过//4.仓库方已确认出库//5.货主已确认出库
      return val === 1 ? '原货主发起' : val === 2 ? '受让方驳回' : val === 3 ?
        '受让方确认' : val === 4 ? '仓库方驳回' : val === 5 ? '仓库方确认' : ''
    },
    // 序号增加
    indexMethod(index) {
      return index + 1
    },
    handleCreate() {
      this.$router.push('/transferService/add')
    },
    // 制单页面
    showEleWareDetaile(row) {
      var param = {
        type: 'id',
        id: row.electronicWarehouseId
      }
      this.$router.push({ path: '/businessApplication/electronicwarehouse', query: { param: param }})
    },
    doSubmit() {
      this.dialogFormVisible = false
      this.postData.assigneeNotes = this.notes.notes
      console.log(this.postData)
      doChangeState(this.$qs.stringify(this.postData)).then(res => {
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
    doAccept(row) {
      this.dialogFormVisible = true
      this.postData = {
        state: 3,
        id: row.id,
        assigneeNotes: '',
        electronicWarehouseId: row.electronicWarehouseId
      }
    },
    doRefulse(row) {
      this.dialogFormVisible = true
      this.postData = {
        state: 2,
        id: row.id,
        assigneeNotes: '',
        electronicWarehouseId: row.electronicWarehouseId
      }
    },

    // 获取表格数据
    getList() {
      this.listLoading = true
      getTransferPage(this.listQuery).then(response => {
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
