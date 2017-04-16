//四个主页面 1外卖2发现3订单4我的 的最下方组件
<template>
  <div id="mainfooter">
      <router-link class="item" to="msite">
          <img src="./eleme-unclicked.svg">
          <p>外卖</p>
      </router-link>
      <router-link class="item" to="discover">
          <img src="./compass-unclicked.svg">
          <p>发现</p>
      </router-link>
      <router-link class="item" to="order">
          <img src="./menu-unclicked.svg">
          <p>订单</p>
      </router-link>
      <router-link class="item" to="profile">
          <img src="./person-unclicked.svg">
          <p>我的</p>
      </router-link>
  </div>
</template>
<script>
  
</script>
<style lang="css" scoped>
#mainfooter{
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    justify-content: space-around;
    align-content: center;
    height: 3.6rem;
    background-color: #fff;
}
.item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    flex: 1;
}
.item > p{
    color: #666;
    font-size: .5rem;
}
</style>
