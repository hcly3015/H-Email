<template>
  <div class="browse-container">
    <div class="page-header">
      <tool-bar ref="toolbar" :title="item.title" :toolbars="toolbars" @toolBarClick="toolBarClick" @deleteEmail="deleteEmail"></tool-bar>
    </div>
    <div class="page-content">
      <div class="header">
        <div class="img">
          <el-image style="width: 40px; height: 40px" :src="headerImg" fit="cover"></el-image>
          <div class="name">{{item.name.substring(0, 1)}}</div>
        </div>
        <div class="content">
          <div class="top">
            <div class="left">发自: <div class="name">{{ item.name }}</div></div>
            <div class="right">{{ $moment(item.datetime).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
          <div class="bottom">
            <div class="left" :class="showReceive?'isSelected':'unSelected'" @click="openReceive">
              <div class="title">收发明细</div>
              <div class="arrow"><i :class="showReceive?'fa fa-chevron-down':'fa fa-chevron-up'"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="receive" v-if="showReceive">
        <div class="receive-group">
          <div class="accept">
            <div class="title">收件人:</div>
            <div class="content">
              <div class="item" v-for="(data, i) in item.acceptlist" :key="i">
                <el-popover placement="bottom" width="280" trigger="click">
                  <div class="popover-container">
                    <div class="popover-container-avatar">
                      <el-avatar shape="square" :size="50" :src="deptUrl" v-if="data.type===1"></el-avatar>
                      <el-avatar shape="square" :size="50" :src="staffUrl" v-else></el-avatar>
                    </div>
                    <div class="popover-container-info" v-if="data.type===1">
                      <div class="text">{{ data.info.name }}</div>
                      <div class="text">
                        <div class="label">负责人:</div>
                        <div class="value">{{ data.info.managerName }}</div>
                      </div>
                      <div class="text">
                        <div class="label">人数:</div>
                        <div class="value">{{ data.info.number }}人</div>
                      </div>
                      <div class="text">
                        <div class="label">成员:</div>
                        <div class="value">{{ data.info.members }}</div>
                      </div>
                    </div>
                    <div class="popover-container-info" v-else>
                      <div class="text">{{ data.info.name }}({{ data.info.jobNo }})</div>
                      <div class="text">
                        <div class="label">职位:</div>
                        <div class="value">{{ data.info.position }}</div>
                      </div>
                      <div class="text">
                        <div class="label">部门:</div>
                        <div class="value">{{ data.info.dept }}</div>
                      </div>
                      <div class="text">
                        <div class="label">电话:</div>
                        <div class="value">{{ data.info.tel }}</div>
                      </div>
                    </div>
                  </div>
                  <el-button type="text" slot="reference">{{ data.name }}</el-button>
                </el-popover>
                <!-- <div class="name">{{ data.name }}</div> -->
                <div class="img" :class="data.isRead?'isRead':'noRead'"><i :class="data.isRead?'fa fa-envelope-open':'fa fa-envelope'"></i></div>
              </div>
            </div>
          </div>
          <div class="accept">
            <div class="title">抄送人:</div>
            <div class="content">
              <div class="item" v-for="(data, i) in item.cclist" :key="i">
                <el-popover placement="bottom" width="280" trigger="click">
                  <div class="popover-container">
                    <div class="popover-container-avatar">
                      <el-avatar shape="square" :size="50" :src="deptUrl" v-if="data.type===1"></el-avatar>
                      <el-avatar shape="square" :size="50" :src="staffUrl" v-else></el-avatar>
                    </div>
                    <div class="popover-container-info" v-if="data.type===1">
                      <div class="text">{{ data.info.name }}</div>
                      <div class="text">
                        <div class="label">负责人:</div>
                        <div class="value">{{ data.info.managerName }}</div>
                      </div>
                      <div class="text">
                        <div class="label">人数:</div>
                        <div class="value">{{ data.info.number }}人</div>
                      </div>
                      <div class="text">
                        <div class="label">成员:</div>
                        <div class="value">{{ data.info.members }}</div>
                      </div>
                    </div>
                    <div class="popover-container-info" v-else>
                      <div class="text">{{ data.info.name }}({{ data.info.jobNo }})</div>
                      <div class="text">
                        <div class="label">职位:</div>
                        <div class="value">{{ data.info.position }}</div>
                      </div>
                      <div class="text">
                        <div class="label">部门:</div>
                        <div class="value">{{ data.info.dept }}</div>
                      </div>
                      <div class="text">
                        <div class="label">电话:</div>
                        <div class="value">{{ data.info.tel }}</div>
                      </div>
                    </div>
                  </div>
                  <el-button type="text" slot="reference">{{ data.name }}</el-button>
                </el-popover>
                <!-- <div class="name">{{ data.name }}</div> -->
                <div class="img" :class="data.isRead?'isRead':'noRead'"><i :class="data.isRead?'fa fa-envelope-open':'fa fa-envelope'"></i></div>
              </div>
            </div>
          </div>
          <div class="accept">
            <div class="title">密送人:</div>
            <div class="content">
              <div class="item" v-for="(data, i) in item.secretlist" :key="i">
                <el-popover placement="bottom" width="280" trigger="click">
                  <div class="popover-container">
                    <div class="popover-container-avatar">
                      <el-avatar shape="square" :size="50" :src="deptUrl" v-if="data.type===1"></el-avatar>
                      <el-avatar shape="square" :size="50" :src="staffUrl" v-else></el-avatar>
                    </div>
                    <div class="popover-container-info" v-if="data.type===1">
                      <div class="text">{{ data.info.name }}</div>
                      <div class="text">
                        <div class="label">负责人:</div>
                        <div class="value">{{ data.info.managerName }}</div>
                      </div>
                      <div class="text">
                        <div class="label">人数:</div>
                        <div class="value">{{ data.info.number }}人</div>
                      </div>
                      <div class="text">
                        <div class="label">成员:</div>
                        <div class="value">{{ data.info.members }}</div>
                      </div>
                    </div>
                    <div class="popover-container-info" v-else>
                      <div class="text">{{ data.info.name }}({{ data.info.jobNo }})</div>
                      <div class="text">
                        <div class="label">职位:</div>
                        <div class="value">{{ data.info.position }}</div>
                      </div>
                      <div class="text">
                        <div class="label">部门:</div>
                        <div class="value">{{ data.info.dept }}</div>
                      </div>
                      <div class="text">
                        <div class="label">电话:</div>
                        <div class="value">{{ data.info.tel }}</div>
                      </div>
                    </div>
                  </div>
                  <el-button type="text" slot="reference">{{ data.name }}</el-button>
                </el-popover>
                <!-- <div class="name">{{ data.name }}</div> -->
                <div class="img" :class="data.isRead?'isRead':'noRead'"><i :class="data.isRead?'fa fa-envelope-open':'fa fa-envelope'"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="annexs">
        <div class="files-group" v-for="(annex, i) in item.annexlist" :key="i">
          <div class="file-left">
            <div class="annex"><i class="el-icon-paperclip"></i></div>
            <div class="file-id" hidden>{{ annex.id }}</div>
            <div class="file-title">{{ annex.name }}</div>
            <div class="file-name" v-if="annex.name.length>12">{{ annex.name.split('.')[1] }}</div>
          </div>
          <div class="file-right">
            <div class="file-img"><i class="fa fa-download"></i></div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="content" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmail } from '@/api/email.js'

import ToolBar from '@/components/ToolBar'

export default {
  name: 'Browse',
  components: {
    ToolBar
  },
  data () {
    return {
      headerImg: '',
      headerTitle: '',
      toolbars: ['reply', 'replyall', 'forward', 'backward', 'unread', 'delete'],
      showReceive: false,
      item: {
        id: 0,
        name: '',
        title: '',
        content: '',
        url: '',
        datetime: '',
        isStar: false,
        isAnnex: false,
        isRead: true,
        isSelected: false
      },
      deptUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      staffUrl: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
    }
  },
  created () {
    let mailId = this.$route.params.id
    let url = this.$route.params.url
    this.headerImg = url
    console.log(mailId)
    console.log(url)
    this.loadEmails(mailId)
  },
  methods: {
    loadEmails (id) {
      console.log('加载单个邮件,id:' + id)
      getEmail(Object.assign({ id: id })).then((response) => {
        let data = response.data
        if (data.length > 0) {
          this.item = data[0]
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    openReceive () {
      this.showReceive = !this.showReceive
    },
    toolBarClick (item) {
      console.log('Browse.vue触发工具栏点击事件:' + item.text + item.name)
    },
    deleteEmail () {
      let id = this.item.id
      console.log('Browse.vue触发工具栏删除事件:' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .browse-container {
    height: 100%;
    min-height: 100vh;
    background-color: rgba(187, 205, 218, .2);
    display: flex;
    flex-direction: column;
    .page-header {
      height: 60px;
    }
    .page-content {
      flex: 1;
      padding: 0 20px 0 20px;
      overflow: auto;
      .header {
        display: flex;
        padding-top: 20px;
        .img {
          width: 40px;
          height: 40px;
          position: relative;
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
        .content {
          display: flex;
          flex: 1;
          flex-flow: column;
          padding-left: 20px;
          justify-content: space-between;
          .top {
            display: flex;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              color: #333333;
              font-size: 15px;
              .name {
                padding-left: 15px;
              }
            }
            .right {
              display: flex;
              align-items: center;
              color: #808080;
              font-size: 13px;
            }
          }
          .bottom {
            display: flex;
            color: #666666;
            font-size: 12px;
            .left {
              display: flex;
              cursor: pointer;
              &.isSelected {
                color: #3B5D95;
              }
              .title {
                margin-right: 5px;
              }
            }
          }
        }
      }
      .receive {
        display: flex;
        padding-top: 15px;
        .receive-group {
          border: solid 1px rgba(135, 144, 149, 0.2);
          background-color: #fff;
          color: #666;
          font-size: 14px;
          padding: 0px;
          flex: 1;
          .accept {
            display: flex;
            flex-flow: row;
            flex-wrap: wrap;
            margin-left: 15px;
            margin-top: 8px;
            .title {
              margin-right: 5px;
              margin-top: 9px;
            }
            .content {
              display: flex;
              flex: 1;
              flex-flow: row;
              flex-wrap: wrap;
              border-bottom: 1px solid rgba(135, 144, 149, 0.2);
              .item {
                display: flex;
                margin: 0 0 0px 0;
                padding: 0 15px;
                .img {
                  font-size: 10px;
                  display: flex;
                  align-items: center;
                  &.isRead {
                    color: #666;
                    padding-left: 10px;
                  }
                  &.noRead {
                    color: #3B5D95;
                    padding-left: 10px;
                  }
                }
              }
            }
          }
          .accept:last-child {
            display: flex;
            padding-top: 0px;
            padding-bottom: 8px;
            border: none;
            .content {
              border: none;
            }
          }
        }
      }
      .annexs {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        padding-top: 20px;
        .files-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: solid 1px rgba(135, 144, 149, 0.2);
          width: 275px;
          height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-radius: 4px;
          margin: 10px 10px 10px 0;
          padding: 10px;
          cursor: pointer;
          &:hover {
            color: #3B5D95;
            border: 1px solid #3B5D95;
          }
          .file-left {
            display: flex;
            .annex {
              display: flex;
              padding-right: 5px;
              color: #879095;
            }
            .file-title {
              font-size: 14px;
              overflow: hidden;
              width: 185px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .file-name {
              font-size: 14px;
            }
          }
          .file-right {
            color: #879095;
          }
        }
      }
      .container {
        padding-top: 30px;
        .content{
          max-width: 1200px;
        }
      }
    }
    .el-button--text {
      color: #666;
    }
  }
  .popover-container {
    display: flex;
    flex-flow: row;
    height: 95px;
    .popover-container-avatar {
      margin-right: 10px;
      display: flex;
      flex-flow: column;
    }
    .popover-container-info {
      flex: 1;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      .text {
        display: flex;
        white-space: nowrap;
        .label {
          width: 55px;
        }
        .value {
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 150px;
          overflow: hidden;
        }
      }
    }
  }
</style>
