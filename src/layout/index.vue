<template>
  <div class="app-wrapper">
    <div class="app-left">
      <siderbar />
    </div>
    <div class="app-right">
      <app-main />
    </div>
  </div>
</template>

<script>
import Siderbar from './siderbar'
import AppMain from './appmain'

export default {
  name: 'Layout',
  components: {
    Siderbar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
  }
  .app-left{
    width: 320px;
    height: 100%;
  }
  .app-right{
    flex: 1;
  }
</style>
