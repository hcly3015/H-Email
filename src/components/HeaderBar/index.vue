<template>
  <div class="headerbar-container">
    <div class="header-title"><span>邮 件</span></div>
    <div class="header-select">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">{{ emailType.text }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changeEmail(item)" v-for="(item, i) in emailTypes" :key="i">{{ item.text }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      emailType: '',
      emailTypes: [
        {
          name: 'inbox',
          text: '收件箱'
        },
        {
          name: 'outbox',
          text: '发件箱'
        },
        {
          name: 'drafts',
          text: '草稿箱'
        },
        {
          name: 'star',
          text: '星标邮件'
        },
        {
          name: 'archive',
          text: '归档邮件'
        },
        {
          name: 'recycle',
          text: '回收站'
        }
      ]
    }
  },
  created () {
    this.emailType = this.emailTypes[0]
  },
  methods: {
    changeEmail (item) {
      this.emailType = item
      this.$emit('changeEmail', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .headerbar-container {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    margin: 0px 20px 0 20px;
    height: 60px;
    align-items: center;
    .header-select {
      .el-dropdown {
        cursor: pointer;
        color: #3B5D95;
      }
    }
  }
</style>
