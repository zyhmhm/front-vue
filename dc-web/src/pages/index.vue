<template>
  <el-container>
    <el-header class="topbar" style="height: 80px !important; background-color: #42B983 !important;">
      <el-menu :default-active="activeIndex" background-color="#42B983" text-color="#FFF" mode="horizontal" @select="handleSelect"
        style="height: 80px; margin-left: 12%;">
        <el-menu-item index="1" style="font-size: 30px;">首页</el-menu-item>
        <el-menu-item index="2" style="font-size: 30px;">我的订单</el-menu-item>
        <el-menu-item index="3" style="font-size: 30px;">我要开店</el-menu-item>
        <el-menu-item index="4" style="font-size: 30px;">购物车</el-menu-item>
        <span v-if="status">
          亲爱的用户，您已经登陆！
        </span>
        <span v-else>亲爱的用户您还未登陆！[<a href="#">登陆</a>]&nbsp;&nbsp;[<a href="#">去注册</a>]</span>
        <img src="./2.jpg" style="height: 60px; width: 60px; margin-top: 10px; margin-left: 5%;" />
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 用户信息显示操作栏-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">我的收藏</el-dropdown-item>
            <el-dropdown-item icon="el-icon-position">我的地址</el-dropdown-item>
            <div class="line"></div>
            <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </el-header>


    <!-- 地址显示栏，搜索栏-->
    <el-header style="height: 60px; width: 100%; margin-top: 30px; margin-bottom: 30px;">
      <div style="text-align: left !important; ">
        <div style="display: inline;">
          <i class="el-icon-location" style="font-size: 20px; margin-left: 13%;">当前位置:<span style="font-family: 仿宋;">{{currentLocation}}</span><a
              href="#">[切换地址]</a></i>
        </div>
        <div style="display: inline;">
        <el-input placeholder="输入商家,美食" v-model="input" clearable style="width: 20%; margin-left: 35%;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        </div>
      </div>

    </el-header>
    <!-- 商品展示栏-->
    <el-main>
      <el-row style="margin-left: 9%;">
        <el-col :span="4" v-for="(o, index) in 16" :key="index" :offset="1" style="margin-bottom:40px">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 懒加载，======,一次加载20个点击之后在加载20个-->
      <div style="font-size: 30px; height: 80px;background-color: rgb(226, 220, 220); width: 72%; margin-left: 13%;">
        <a href="#">点击加载更多</a>
      </div>
    </el-main>


<!-- 底部，有联系我们这些提示 -->
    <el-footer >
      <div style="border-width: 2px;height: 50px; width: 100%;"></div>

    </el-footer>
  </el-container>
</template>

<style>
  /* 下拉菜单样式*/
  .el-dropdown-link {
    cursor: pointer;
    color: #FFFFFF;
    margin-top: 0px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown {
    display: inline-block;
    position: relative;
    color: #5a5757;
    font-size: 25px;
  }

  /* */

  .el-header {
    padding: 0 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  .el-menu--horizontal>.el-menu-item {
    float: left;
    height: 80px;
    line-height: 80px;
    margin: 0;
    border-bottom: 4px solid transparent;
    color: #909399;
  }

  .topbar {
    display: block;
    line-height: 80px;
    background-color: #1e89e0;
    height: 80px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<script>
  export default {
    data() {
      return {
        currentDate: new Date(),
        activeIndex: "1",
        status: 0,
        currentLocation: "郑州市金水区文化路"
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
