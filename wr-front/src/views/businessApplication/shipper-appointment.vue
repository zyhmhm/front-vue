<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.contactsName" :placeholder="$t('appointment.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.type" :placeholder="$t('appointment.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
      <el-select v-model="listQuery.state" clearable style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" placeholder="请选择" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('appointment.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('appointment.add') }}
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
      @sort-change="sortChange"
    >
      <el-table-column type="index" label="序号" :index="indexMethod" width="50px"></el-table-column>
      <!-- <el-table-column :label="$t('appointment.id')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('appointment.appointmentNumber')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.appointmentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.storageTime')" min-width="150px">
        <template slot-scope="{row}">
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
          <el-tag>{{ row.storageTime }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.createTime')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.contacts')" width="110px" align="center">
        <template slot-scope="{row}">
          <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
          <span>{{ row.contacts }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.tell')" width="80px">
        <template slot-scope="{row}">
          <!-- <svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon" /> -->
          <span>{{ row.tell }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.goodsName')" align="center" width="95">
        <template slot-scope="{row}">
          <!-- <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span> -->
          <!-- <span v-else>0</span> -->
          <span>{{ row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.depositoryName')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.depositoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.shipper')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.shipper }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.state')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ formatStatus(row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appointment.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-show="row.state==1" type="success" size="mini" @click="handleUpload(row)">
            提交
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            详情
          </el-button>
          <el-button v-show="row.state === 1" type="danger" size="mini" @click="handleDelete(row,'draft')">
            删除
          </el-button>
          <el-button v-show="row.state === 4" type="danger" size="mini" @click="handleAssign(row)">
            已指派入库
          </el-button>
          <el-button v-show="row.state === 6" type="danger" size="mini" @click="handleInRepo(row)">
            已入库
          </el-button>
          <el-button v-show="row.state === 3 || row.satte===4" type="info" size="mini" @click="handleShowNotes(row)">
            审核备注
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
</template>

<script>
import { doSubmitApp, fetchList2, fetchPv, createArticle, updateArticle, doSureInRepo, deleteAppoById } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      states: [{
        1: '已保存未提交',
        2: '已提交待审核'
      }],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        importance: undefined,
        contactsName: undefined,
        state: ''
      },
      calendarTypeOptions,
      dialogFormVisible: false,
      notes: {notes: ''},
      sortOptions: [
        { label: '未提交', key: 1 },
        { label: '待审核', key: 2 },
        { label: '未通过', key: 3 },
        { label: '待入库', key: 4 },
        { label: '正在入库', key: 5 },
        { label: '待确认入库', key: 6 },
        { label: '完成入库', key: 7 }],
      showReviewer: false,
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
      this.notes.notes = row.auditNotes;
    },
    // 提交预约单
    handleUpload(row) {
      var param = {
        id: row.id,
        flag: false
      }
      doSubmitApp(param).then(res => {
        if (res.code === 200) {
          alert(res.msg)
          row.state = 2
        }
        else {
          alert(res.msg)
        }
      })
    },
    // 序号增加
    indexMethod(index) {
      return index + 1;
    },
    // 判断状态
    formatStatus(val) {
      return val === 1 ? '已保存未提交' : val === 2 ? '已提交待审核' : val === 3 ?
        '已审核未通过' : val === 4 ? '已审核通过待指派入库' : val==5 ?
          '正在入库' : val === 6 ? '仓库方已确认入库' : val=== 7 ? '货主已确认入库' : val === 8 ?
            '待制单' : val===9 ? '已发起制单申请' : val===10 ? '制单申请未通过' : val===11 ? '已通过正在制单' : val===12 ? '制单完成待兑付' : ''
    },
    // 编辑预约单(提交的预约单不能修改，只能修改保存的额预约单)
    handleEdit() {

    },
    // 创建新的预约单
    handleCreate() {
      this.$router.push('/appointment/add')
    },
    // 详情页面
    handleUpdate(row) {
      var param = {
        id: row.id
      }
      this.$router.push({ path: '/appointment/edit', query: { param: param }})
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 指派入库
    handleAssign(row) {
      var data = {id: row.id,state: 5}
      doSureInRepo(data).then(res => {
        if(res.code === 200){
          row.state = 5
          alert("已确认")
        }else {
          alert(res.msg)
        }
      })
    },
    // 货主确认入库
    handleInRepo(row) {
      var data = {id: row.id,state: 8}
      doSureInRepo(data).then(res => {
        if(res.code === 200){
          row.state = 8
          alert("已确认入库")
        }else {
          alert(res.msg)
        }
      })
    },
    // 删除数据（只有状态是保存的预约单才可以删除其他的页面就不显示可删除）
    handleDelete(row, index) {
      var query = {appointmentId: row.id}
      deleteAppoById(query).then(res => {
        if(res.code === 200){
         this.$notify({
           title: '成功',
           message: '删除成功',
           type: 'success',
           duration: 2000
         })
          // alert("已确认入库")
          this.getList()
        }else {
          alert(res.msg)
        }
      })
    },
    getList() {
      this.listLoading = true
      fetchList2(this.listQuery).then(response => {
        if (response.code === 200) {
          this.listLoading = false
          this.list = response.data.appointment
          console.log(this.list)
          this.total = response.data.total
        } else {
          this.listLoading = false
          alert(response.msg)
          this.listQuery.state = ''
        }
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [ '预约单单号', '入库时间', '联系人', '联系电话','商品名称','仓库名称','货主名称','状态']
        const filterVal = ['appointmentNumber', 'storageTime', 'contacts', 'tell','goodsName','depositoryName','shipper','state']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
