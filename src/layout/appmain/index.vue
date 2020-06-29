<template>
  <div class="container">
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return ''
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
  }
  .app-main {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 704px;
  }
</style>
