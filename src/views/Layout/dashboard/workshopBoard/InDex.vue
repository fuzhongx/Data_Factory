<template>
  <div class="contair">
    <div class="boxview">
    <!-- 标题 -->
    <!-- <div class="header">
      <div class="nav_img">
        <img src="@/assets/image/download.png" alt="" />
      </div>
      <div class="title">云脉数字工厂大屏</div>
      <div class="nav_time">456</div>
    </div>

  
    <div class="echsrts-show">
      <div class="column">123</div>
      <div class="column">123</div>
    </div> -->
  </div>
  </div>
  
</template>

<script setup>
</script>

<style lang="scss" scoped>
.echsrts-show {
  padding: 0.125rem 0.6875rem 0.125rem 0.6875rem;
  display: flex;
  flex-direction: column;
  .column {
    flex: 2;
    background-color: green;
  }
  .column:nth-child(2) {
    flex: 1;
    background-color: orange;
  }
}

.header {
  // height: 0.725rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.125rem;
  .title {
    color: #fff;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
  }
  .nav_img {
    color: #fff;
    font-size: 0.6rem;
    font-weight: 200px;
    padding-top: 0.26rem;
    padding-left: 0.5rem;
    img {
      width: 0.35rem;
      height: 0.35rem;
    }
  }
  .nav_time {
    color: #fff;
    font-size: 0.225rem;
    font-weight: 200px;
    padding-top: 0.28rem;
    padding-right: 0.5rem;
  }
}
.contair{
  // position:absolute;
  // left: 0;
  // right: 0;
  // bottom:0;
  // top: 0;
  background-color: #01182f;
}
.boxview {
  transform: scale(0.865625);
  transform-origin: 0px 0px;
  margin-left: 0px;
  width: 24rem;
  height: 13.5rem;
   background-image: url("@/assets/image/board-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>