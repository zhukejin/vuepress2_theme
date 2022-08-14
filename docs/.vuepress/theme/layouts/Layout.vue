<template>
  <div class="theme-container">
    <aside class="left-side">
      菜单
    </aside>
    <Content class="main-content markdown" />
    <aside class="right-side">
      小组件
    </aside>
  </div>
</template>

<style lang="less">
@import '../static/styles/common.less';

.theme-container {
  display: flex;
}

aside {
  flex-shrink: 0;
  flex-grow: 0;
}

.main-content {
  flex: 1;
  padding: 24px;
}

.left-side {
  width: 16.66667%;
  background: linear-gradient(to right, #1a2433 0%, #253449 80%, #253449 100%);
  color: #fff;
}


</style>