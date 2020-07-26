<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.contactsName" :placeholder="$t('appointment.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.type" :placeholder="$t('appointment.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('appointment.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('appointment.add') }}
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
      <el-table-column :label="$t('appointment.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            详情
          </el-button>
          <el-button v-show="row.state === 5" type="danger" size="mini" @click="handleSelectRepo(row)">
            已入库
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="仓位选择" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" >
      <div v-for="(detaile,index) in this.detaileGoods" :key="index">
        请选择详细单{{ index }}选择仓位（具体货物为:{{ detaile.goodsName }})
        <el-select v-model="detaile.position" placeholder="请选择仓位">
          <el-option v-for="item in repos" :key="item.id" :label="item.position" :value="item.id" />
        </el-select>
      </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button @click="doHandleInRepo" type="primary">
            确认
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { doSubmitApp, getAppointmentPageToRepo,doFindAppById, doInRepoForRepo, fetchPv, createArticle, updateArticle, doSureInRepo } from '@/api/article'
import { getNoUsedPosition } from '@/api/repo'
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
        type: undefined,
        sort: '+id'
      },
      repo: {repo: ''},
      repos:[],
      dialogFormVisible: false,
      detaileGoods: [],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      inRepoParam: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 序号增加
    indexMethod(index) {
      return index + 1;
    },
    // 判断状态
    formatStatus(val) {
      return val === 1 ? '已保存未提交' : val === 2 ? '已提交待审核' : val === 3 ?
        '已审核未通过' : val === 4 ? '已审核通过待指派入库' : val==5 ?
          '正在入库' : val === 6 ? '仓库方已确认入库' : val=== 7 ? '货主已确认入库' : val === 8 ?
            '待制单' : val===9 ? '已发起制单申请' : val===10 ? '正在制单' : val===11 ? '制单完成' : ''
    },
    // 编辑预约单(提交的预约单不能修改，只能修改保存的额预约单)
    handleEdit() {

    },
    // 选择仓库然后入库
    doHandleInRepo() {
      var detailes = JSON.stringify(this.detaileGoods)
      this.inRepoParam.detailes = detailes
      var param2 = this.$qs.stringify(this.inRepoParam)
      console.log(this.detaileGoods)
      doInRepoForRepo(param2).then(res => {
        if(res.code === 200){
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          getList()
        }else{
          alert(res.msg)
        }
      })
    },
    // 创建新的预约单
    handleCreate() {
      this.$router.push('/appointment/add')
    },
    //确认入库
    handleSelectRepo(row) {
      this.inRepoParam.id = row.id
      this.inRepoParam.state = 6
      // 获取详细单数据
      var param = {id: row.id}
      doFindAppById(param).then(res => {
        if(res.code === 200){
          this.detaileGoods = res.data.detailedList
          // 弹框选择仓库位置
          getNoUsedPosition().then(res =>{
            if(res.code === 200){
              this.repos = res.data
              this.dialogFormVisible = true
            }else{
              alert(res.msg)
            }
          })
        }else{
          alert(res.msg)
        }
      })
      // var data = {id: row.id,state: 6}
      // doSureInRepo(data).then(res => {
      //   if(res.code === 200){
      //     row.state = 6
      //     alert("已确认入库")
      //   }else {
      //     alert(res.msg)
      //   }
      // })
    },
    // 详情页面
    handleUpdate(row) {
      var param = {
        id: row.id,
        flag: true
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
    getList() {
      this.listLoading = true
      getAppointmentPageToRepo(this.listQuery).then(response => {
        if (response.code === 200) {
          this.listLoading = false
          this.list = response.data.appointment
          console.log(this.list)
          this.total = response.data.total
        } else {
          this.listLoading = false
          alert(response.msg)
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
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
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
