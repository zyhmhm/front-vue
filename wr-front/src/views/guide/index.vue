

<template>
  <div class="app-container">
    <aside>
      只有已经完成入库的预约单才能申请创建电子仓单
    </aside>
    <div class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.shipper" placeholder="货主姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
        <el-table-column label="货物名称" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.goodsName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期" min-width="150px">
          <template slot-scope="{row}">
            <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
            <el-tag>{{ row.validityPeriod }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="货主(存货单位)" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.shipper }}</span>
          </template>
        </el-table-column>
        <el-table-column label="存货放电话" width="110px" align="center">
          <template slot-scope="{row}">
            <!-- <span style="color:red;">{{ row.reviewer }}</span> -->
            <span>{{ row.shipperTell }}</span>
          </template>
        </el-table-column>
        <el-table-column label="存储方企业名称" width="80px">
          <template slot-scope="{row}">
            <!-- <svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon" /> -->
            <span>{{ row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓库名称" align="center" width="95">
          <template slot-scope="{row}">
            <!-- <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span> -->
            <!-- <span v-else>0</span> -->
            <span>{{ row.depositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓库联系人" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.depositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓库联系人电话" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.shipper }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('appointment.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button v-show="row.state === 1" type="primary" size="small" @click="showOrderMakingDetaile(row)">
              申请详情
            </el-button>
            <el-button v-show="row.state === 3" type="info" size="mini" @click="doMaking(row)">
              去制单
            </el-button>
            <el-button v-show="row.state === 4" type="success" size="mini" @click="doDetaile(row)">
              查看仓单
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    </div>
  </div>
</template>


<script>
import { doGetOrderMakingToRepo } from '@/api/order-making'
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
        shipper: '',
        currentPage: 1,
        pageSize: 20
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
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
    // 序号增加
    indexMethod(index) {
      return index + 1
    },
    // 制单页面
    showOrderMakingDetaile(row) {
      var param = {
        id: row.id
      }
      this.$router.push({ path: '/businessApplication/orderMaking-detaile', query: { param: param }})
    },
    doMaking(row) {
      var param = {
        id: row.appointmentId,
        ordermakingId: row.id,
        depositoryId: row.depositoryId
      }
      this.$router.push({ path: '/businessApplication/orderMaking', query: { param: param }})
    },
    doDetaile(row) {
		var param = {
		  type: 'ordermaking_id',
		  id: row.id
		}
		this.$router.push({ path: '/businessApplication/electronicwarehouse', query: { param: param }})
    },

    // 获取表格数据
    getList() {
      this.listLoading = true
      doGetOrderMakingToRepo(this.listQuery).then(response => {
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
