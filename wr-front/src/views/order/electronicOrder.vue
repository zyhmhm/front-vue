<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.inventor" :placeholder="$t('appointment.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.type" :placeholder="$t('appointment.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
<!--      <el-select v-model="listQuery.state" clearable style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" placeholder="请选择" />
      </el-select> -->
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
        >
          <el-table-column type="index" label="序号" :index="indexMethod" width="50px"></el-table-column>
          <el-table-column label="仓单号Id" align="center">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="货主(单位)">
             <template slot-scope="{row}">
               <span>{{ row.inventor }}</span>
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
              <el-button type="primary" size="small" @click="showEleWareDetaile(row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>
<style>
  element.style {
      min-height: 80.px;
  }
</style>

<script>
import { getEleWarePage } from '@/api/eleWare'
import { doSaveTransfer } from '@/api/transfer'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: { Pagination },
    data() {
      return {
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
      }
    },
    methods: {
      // 序号增加
      indexMethod(index) {
        return index + 1
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
      },
      handleFilter() {
        this.listQuery.currentPage = 1
        this.getList()
      },
    },
    created() {
      this.getList()
    }
  }
</script>

<style>
</style>
