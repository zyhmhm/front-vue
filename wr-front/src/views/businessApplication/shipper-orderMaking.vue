<template>
  <div class="app-container">
    <aside>
      只有已经完成入库的预约单才能申请创建电子仓单
    </aside>
    <div class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.contactsName" placeholder="联系人姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.state" clearable style="width: 140px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" placeholder="请选择" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('appointment.search') }}
        </el-button>
<!--        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('appointment.add') }}
        </el-button> -->
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
            <el-button v-show="row.state === 8" type="primary" size="mini" @click="appoMakingOrder(row)">
              申请制单
            </el-button>
            <el-button v-show="row.state === 12" type="primary" size="mini" @click="showEleWareDetaile(row)">
              查看仓单
            </el-button>
            <el-button v-show="row.state === 2 || row.satte===3" type="info" size="mini" @click="handleShowNotes(row)">
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
  </div>
</template>


<script>
import { getNeedMadeAppo } from '@/api/order-making'
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
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        contactsName: '',
        currentPage: 1,
        pageSize: 20,
        state: ''
      },
      dialogFormVisible: false,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      sortOptions: [
        { label: '待制单', key: 8 },
        { label: '已申请', key: 9 },
        { label: '未通过', key: 10 },
        { label: '正在制单', key: 11 },
        { label: '制单完成', key: 12 },
        ],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      notes: {notes:''},
      dialogPvVisible: false,
      pvData: [],
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
      return val === 1 ? '已保存未提交' : val === 2 ? '已提交待审核' : val === 3 ?
        '已审核未通过' : val === 4 ? '已审核通过待指派入库' : val==5 ?
          '正在入库' : val === 6 ? '仓库方已确认入库' : val=== 7 ? '货主已确认入库' : val === 8 ?
            '待制单' : val===9 ? '已发起制单申请' : val===10 ? '制单申请未通过' : val===11 ? '已通过正在制单' : val===12 ? '制单完成' : ''
    },
    // 仓单详情
    showEleWareDetaile(row) {
      var param = {
        type: 'appointment_id',
        id: row.id
      }
      this.$router.push({ path: '/businessApplication/electronicwarehouse', query: { param: param }})
    },
    // 序号增加
    indexMethod(index) {
      return index + 1
    },
    // 制单页面
    appoMakingOrder(row) {
      var param = {
        id: row.id
      }
      this.$router.push({ path: '/guide/app-making', query: { param: param }})
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
    // 获取表格数据
    getList() {
      this.listLoading = true
      getNeedMadeAppo(this.listQuery).then(response => {
        console.log(response)
        if (response.code === 200) {
          this.listLoading = false
          this.list = response.data.appointment
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
