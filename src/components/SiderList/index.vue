<template>
  <div class="siderlist-container">
    <div class="infinite-list-wrapper">
      <div class="list-wrapper" v-infinite-scroll="scrollLoad" infinite-scroll-disabled="disabled">
        <div v-for="(item, i) in emaillist" class="item" :key="i" :class="[{isSelected: item.isSelected}, isToday(item) ? 'isToday':'isEarly']">
          <div class="item-container" @click="goBrowse(item, $event)">
            <div class="item-img" :class="{isUnRead: !item.isRead}">
                <el-image style="width: 40px; height: 40px" :src="item.url" fit="cover"></el-image>
                <div class="name">{{item.name.substring(0, 1)}}</div>
            </div>
            <div class="item-content">
              <div class="top">
                <div class="left">
                  <div class="name"><span>{{ item.name + i }}</span></div>
                  <div class="annex" v-show="item.isAnnex"><i class="el-icon-paperclip"></i></div>
                </div>
                <div class="right">
                  <div class="datetime"><span>{{ $moment(item.datetime).format('HH:mm') }}</span></div>
                  <div class="star"><i :class="item.isStar ? 'fa fa-star' : 'fa fa-star-o'"></i></div>
                </div>
              </div>
              <div class="bottom">
                <div class="title">{{ item.title }}</div>
                <div class="content" v-text="emailText(item.content)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="bottom-wrapper">
        <div class="line-text">加载中...</div>
        </div>
      <div v-if="!hasMore" class="bottom-wrapper">
        <div class="line"></div>
        <div class="line-text">我是有底线的</div>
        <div class="line"></div>
      </div>
      <el-backtop target=".listitem" style="left: 250px"></el-backtop>
    </div>
  </div>
</template>

<script>
import { getEmails } from '@/api/email.js'

export default {
  name: 'SiderList',
  data () {
    return {
      emailType: {
        name: 'inbox',
        text: '收件箱'
      },
      pageIndex: 0,
      pageSize: 10,
      hasMore: false,
      loading: false,
      emaillist: []
    }
  },
  computed: {
    disabled () {
      return this.loading || this.hasMore
    }
  },
  methods: {
    // 初始化加载
    loadEmails () {
      getEmails(Object.assign({ pageIndex: this.pageIndex, pageSize: this.pageSize })).then((response) => {
        console.log('加载邮件列表:')
        let datas = response.data.data.data
        if (datas.length <= 0) {
          this.hasMore = false
          this.loading = false
        } else {
          this.emaillist.push(...datas)
          this.loading = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 滚动加载
    scrollLoad () {
      this.loading = true
      this.pageIndex++
      this.loadEmails()
    },
    // 加载邮件(下拉选择邮件类型是触发)
    refreshEmail (item) {
      this.emailType = item
      console.log('SiderList.vue触发加载邮件事件:' + item.text + item.name)
      this.emaillist = []
      this.pageIndex = 1
      this.loadEmails()
      this.$router.push({ path: '/' })
    },
    // 搜索邮件
    searchEmail (filter) {
      console.log('SiderList.vue触发搜索邮件事件:' + filter + ',邮箱类型:' + this.emailType.text + this.emailType.name)
    },
    // 搜索邮件(更多)
    searchMoreEmail (filter) {
      console.log('SiderList.vue触发搜索更多邮件事件:' + filter + ',邮箱类型:' + this.emailType.text + this.emailType.name)
    },
    // 点击邮件项跳转详情
    goBrowse (item, e) {
      this.emaillist.forEach(element => {
        element.isSelected = false
      })
      item.isSelected = true
      this.$router.push({ name: 'browse', params: { id: item.id, url: item.url } })
    },
    isToday (item) {
      let date = new Date(item.datetime)
      let now = new Date()
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .siderlist-container {
    .list-wrapper {
      display: flex;
      flex-flow: column;
      .item {
        position: relative;
        &:hover {
          background-color:rgba(187,205,218,0.2);
        }
        &.isSelected {
          background-color:rgba(187,205,218,0.2);
        }
        .item-container {
          display: flex;
          flex: 1;
          padding: 15px 20px;
          cursor: pointer;
          .item-img {
            width: 40px;
            height: 40px;
            position: relative;
            &.isUnRead:before {
              content: " ";
              border: 4px solid red;
              border-radius: 5px;
              position: absolute;
              z-index: 1000;
              left: 0%;
              margin-left: 36px;
              margin-top: -3px;
            }
            .el-image {
              border-radius: 5px;
            }
            .name {
              position: absolute;
              top: 12px;
              left: 11px;
              color: #fff;
            }
          }
          .item-content {
            display: flex;
            flex: 1;
            flex-flow: column;
            .top {
              display: flex;
              justify-content: space-between;
              margin-left: 20px;
              .left {
                display: flex;
                align-items: center;
                .name {
                  color: #333333;
                  margin-right: 20px;
                }
                .annex {
                  color: #879095;
                }
              }
              .right {
                display: flex;
                align-items: center;
                .datetime {
                  color: #808080;
                  font-size: 12px;
                }
                .star {
                  color: #879095;
                  margin-left: 20px;
                  .fa-star {
                    font-size: 16px;
                    color: #F58A6C;
                  }
                  .fa-star-o {
                    font-size: 16px;
                  }
                }
              }
            }
            .bottom {
              font-size: 12px;
              margin-top: 10px;
              margin-left: 20px;
              .title {
                color: #333333;
                max-width: 220px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .content {
                color: #808080;
                margin-top: 10px;
                max-width: 220px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
        &.isToday:first-child {
          margin-top: 35px;
          &::before {
            content: '今日';
            font-size: 12px;
            position: absolute;
            top: -25px;
            left: 19px;
          }
        }
        &.isEarly {
          margin-top: 35px;
          &::before {
            content: '更早';
            font-size: 12px;
            position: absolute;
            top: -25px;
            left: 19px;
          }
        }
        &.isEarly~.isEarly {
          margin-top: 0;
          &::before {
            content: '';
          }
        }
      }
    }
    .bottom-wrapper {
      padding-top: 20px;
      padding-bottom: 20px;
      color: #808080;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .line {
        width: 20%;
        height: 1px;
        border-top: solid 1px rgba(135, 144, 149, 0.2);
      }
      .line-text {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
</style>
