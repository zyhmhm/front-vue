<template>
  <div class="app-container">
    <div>
    <el-button :loading="loading" type="primary" style="margin-left: 0px; margin-bottom:30px;" @click.native.prevent="showMap"> 查看地图 </el-button>
    <el-button v-show="!repoShow" type="primary" @click="dialogFormVisible = true">添加仓库</el-button>
    <el-button v-show="repoShow" type="primary" @click="dialogFormVisible2 = true">添加仓位</el-button>
    </div>
    <div>
    仓库详细信息
     <!-- <template>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 3" :key="item">
          <h3 class="medium" v-show="item === 1">当前仓库联系人:{{ repo.depositoryContacts }}；联系电话：{{ repo.depositoryTell }}</h3>
           <h3 class="medium" v-show="item === 2">仓库名称:{{ repo.depositoryName }}；仓库地址:{{ repo.depositoryAdd }}</h3>
           <h3 class="medium" v-show="item === 3">仓库备注:{{ repo.notes }}</h3>
          </el-carousel-item>
        </el-carousel>
      </template> -->
<!--       <div class="text item">
          <span>当前仓库联系人:{{ repo.depositoryContacts }}；联系电话：{{ repo.depositoryTell }}</span>
          <span>仓库名称:{{ repo.depositoryName }}；仓库地址:{{ repo.depositoryAdd }}</span>
          <span>仓库备注:{{ repo.notes }}</span>
        </div> -->
    </div>
  <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" label="序号" :index="indexMethod" width="50px"></el-table-column>
      <el-table-column label="仓位编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.createTime }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="具体位置" align="center">
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否被使用" align="center">
        <template slot-scope="{row}">
          <span v-if="row.isUsed === 0">未被使用</span>
          <span v-else-if="row.isUsed === 1" style="color: red;">已被使用</span>
        </template>
      </el-table-column>
    </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

	 <el-dialog title="审核备注" :visible.sync="dialogFormVisible" @close="dialogFormVisible=false" @open="dialogFormVisible=true" :append-to-body="true">
        <el-form ref="dataForm" :rules="rules" :model="repoForm" label-position="left" label-width="100px" style="margin-left:50px;">
          <el-form-item label="仓库名称" prop="depositoryName">
            <el-input v-model="repoForm.depositoryName"/>
          </el-form-item><el-form-item label="仓库地址" prop="depositoryAdd">
            <el-input v-model="repoForm.depositoryAdd"/>
          </el-form-item><el-form-item label="仓储企业" prop="company">
            <el-input v-model="repoForm.company"/>
          </el-form-item><el-form-item label="仓库联系人" prop="depositoryContacts">
            <el-input v-model="repoForm.depositoryContacts"/>
          </el-form-item><el-form-item label="仓库联系电话" prop="depositoryTell">
            <el-input v-model="repoForm.depositoryTell"/>
          </el-form-item>
          <el-form-item label="仓库描述" prop="notes">
            <el-input v-model="repoForm.notes"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button @click="doAddRepo">
            确认
          </el-button>
        </div>
      </el-dialog>

      <el-dialog title="审核备注" :visible="dialogFormVisible2" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true">
           <el-form ref="dataForm" :rules="rules" :model="positionForm" label-position="left" label-width="100px" style="margin-left:50px;">
             <el-form-item label="仓库编码" prop="number">
               <el-input v-model="positionForm.number"/>
             </el-form-item><el-form-item label="仓库地址" prop="position">
               <el-input v-model="positionForm.position"/>
             </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="dialogFormVisible2 = false">
               取消
             </el-button>
             <el-button @click="doSavePosition">
               确认
             </el-button>
           </div>
         </el-dialog>
    <!-- </div> -->

  </div>

</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<script>
import store from '@/store'
import { getRepoInfo,doGetPositionPage, doSaveRepo, doSavePosition } from '@/api/repo'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      positionForm:{
        number: '',
        position: ''
      },
      repoShow: false,
      repoForm: {
        depositoryName: '',
        depositoryAdd: '',
        company: '',
        depositoryContacts: '',
        depositoryTell: '',
        notes: ''
      },
      loading: false,
      repo: {
        depositoryContacts: '',
        depositoryAdd: '',
        company: '',
        depositoryContacts: '',
        depositoryTell: '',
        notes: ''
      },
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
      dialogFormVisible2: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getRepo()
    this.getList()
  },
  methods: {
    doSavePosition() {
      this.positionForm.repoId = this.repo.id
      doSavePosition(this.$qs.stringify(this.positionForm)).then(response =>{
        if (response.code === 200) {
            alert("添加成功")
            this.dialogFormVisible2 = false
            this.getList();
          } else {
            alert(response.msg)
          }
        })
    },
    // 保存仓库信息
    doAddRepo(){
      doSaveRepo(this.$qs.stringify(this.repoForm)).then(response =>{
        if (response.code === 200) {
            alert("添加成功,请重新登陆")
            this.repo = this.repoForm
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
            this.repo = this.repoForm
            this.dialogFormVisible = false
          } else {
            alert(response.msg)
          }
          console.log(this.repo)
        })
    },
    // 查看地图
    showMap () {
      this.$router.push('/showMap')
    },
    // 获取仓库基本信息
    getRepo() {
      getRepoInfo().then(response =>{
        debugger
        if (response.code === 200) {
          this.repo = response.data
          if(response.data === null)
          {
            alert('请添加仓库')
            return
          }
          this.repoShow = true
        } else {
          alert(response.msg)
        }
        console.log(this.repo)
      })
    },
    // 查看审核备注
    addRepo(row) {
      debugger
      this.dialogFormVisible = true

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
      doGetPositionPage(this.listQuery).then(response => {
        // debugger
        if (response.code === 200) {
          this.listLoading = false
          this.list = response.data.data
          console.log(this.list)
          this.total = response.data.total
        } else {
          this.listLoading = false
          // this.list = null
          // alert(response.msg)
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
