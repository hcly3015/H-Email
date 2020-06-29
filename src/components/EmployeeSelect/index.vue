<template>
  <div class="employee-select-container">
    <el-dialog v-dialog-drag class="abow-dialog" :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible">
      <div class="select-content">
        <div class="top">
          <el-button type="text" :class="[{tabActives:tabActive==item.id}]" @click="tabClick(item.id)" v-for="(item, i) in tabItems" :key="i">{{item.text}}</el-button>
        </div>
        <div class="content">
          <div class="card">
            <div class="header">
              <el-input clearable placeholder="搜索" v-model="filterEmployee" suffix-icon="el-icon-search" style="width:100%;"></el-input>
            </div>
            <div class="section">
              <div class="list" v-show="tabActive==1">
                <div class="" v-if="recentSearch===false">
                  <div class="item" :class="[{isChecked: item.checked}]" v-for="(item, i) in recentlist" :key="i">
                    <div class="left">
                      <el-avatar shape="square" :size="30" fit="fit" :src="item.url"></el-avatar>
                      <div class="name">{{item.name}}</div>
                    </div>
                    <div class="right">
                      <div class="position">{{item.position}}</div>
                      <div class="addicon" @click="addSelected(item)">
                        <i :class="item.checked ? 'el-icon-success' : 'el-icon-circle-plus-outline'"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="" v-else>
                  <div class="item" :class="[{isChecked: item.checked}]" v-for="(item, i) in recentsearchlist" :key="i">
                    <div class="left">
                      <el-avatar shape="square" :size="30" fit="fit" :src="item.url"></el-avatar>
                      <div class="name">{{item.name}}</div>
                    </div>
                    <div class="right">
                      <div class="position">{{item.position}}</div>
                      <div class="addicon" @click="addSelected(item)"><i class="el-icon-circle-plus-outline"></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list" v-show="tabActive==2">
                <div class="" v-if="deptSearch===false">
                  <div class="item" :class="[{isChecked: item.checked}]" v-for="(item, i) in deptlist" :key="i">
                    <div class="left">
                      <el-avatar shape="square" :size="30" fit="fit" :src="item.url"></el-avatar>
                      <div class="name">{{item.name}}</div>
                    </div>
                    <div class="right">
                      <div class="position">{{item.position}}</div>
                      <div class="addicon" @click="addSelected(item)"><i class="el-icon-circle-plus-outline"></i></div>
                    </div>
                  </div>
                </div>
                <div class="" v-else>
                  <div class="item" :class="[{isChecked: item.checked}]" v-for="(item, i) in deptsearchlist" :key="i">
                    <div class="left">
                      <el-avatar shape="square" :size="30" fit="fit" :src="item.url"></el-avatar>
                      <div class="name">{{item.name}}</div>
                    </div>
                    <div class="right">
                      <div class="position">{{item.position}}</div>
                      <div class="addicon" @click="addSelected(item)"><i class="el-icon-circle-plus-outline"></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list" v-show="tabActive==3">
                <el-tree show-checkbox ref="tree" :props="employeeTreeProps" :data="orglist" node-key="id" @check="nodeClick" :filter-node-method="filterNode" :expand-on-click-node="true" :highlight-current="true">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                      <i :class="data.icon"></i>{{ data.name }}
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="header">
              <el-input clearable placeholder="搜索" v-model="filterSelected" suffix-icon="el-icon-search" style="width:100%;"></el-input>
            </div>
            <div class="section">
              <div class="list" v-if="selectedSearch===false">
                <div class="item" v-for="(item, i) in selectedlist" :key="i">
                  <div class="left">
                    <el-avatar shape="square" :size="30" fit="fit" :src="item.url"></el-avatar>
                    <div class="name">{{item.name}}</div>
                  </div>
                  <div class="right">
                    <div class="position">{{item.position}}</div>
                    <div class="removeicon" @click="removeSelected(item)"><i class="el-icon-error"></i></div>
                  </div>
                </div>
              </div>
              <div class="list" v-else>
                <div class="item" v-for="(item, i) in selectedsearchlist" :key="i">
                  <div class="left">
                    <el-avatar shape="square" :size="30" fit="fit" :src="item.url"></el-avatar>
                    <div class="name">{{item.name}}</div>
                  </div>
                  <div class="right">
                    <div class="position">{{item.position}}</div>
                    <div class="removeicon" @click="removeSelected(item)"><i class="el-icon-error"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EmployeeSelect',
  data () {
    return {
      tabItems: [
        {
          id: 1,
          text: '最近'
        },
        {
          id: 2,
          text: '同部门'
        },
        {
          id: 3,
          text: '组织架构'
        }
      ],
      dialogTitle: '选择人员',
      dialogVisible: false,
      tabActive: 1,
      itemActive: 0,
      filterEmployee: '',
      filterSelected: '',
      recentSearch: false,
      recentlist: [],
      recentsearchlist: [],
      deptSearch: false,
      deptlist: [],
      deptsearchlist: [],
      employeeTreeProps: {
        children: 'children',
        label: 'name'
      },
      orglist: [{
        id: 1,
        name: '一级 1',
        icon: 'el-icon-tickets',
        children: [{
          id: 4,
          name: '二级 1-1',
          icon: 'el-icon-tickets',
          children: [{
            id: 9,
            name: '三级 1-1-1',
            jobno: '2298',
            position: '平台部/前端开发',
            url: 'http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            checked: false,
            isEmployee: true,
            icon: 'el-icon-user-solid'
          }, {
            id: 10,
            name: '三级 1-1-2',
            jobno: '1581',
            position: '平台部/前端开发',
            url: 'http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            checked: false,
            isEmployee: true,
            icon: 'el-icon-user-solid'
          }]
        }]
      }, {
        id: 2,
        name: '一级 2',
        icon: 'el-icon-tickets',
        children: [{
          id: 5,
          name: '二级 2-1',
          jobno: '2249',
          position: '平台部/前端开发',
          url: 'http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
          isEmployee: true,
          icon: 'el-icon-user-solid'
        }, {
          id: 6,
          name: '二级 2-2',
          jobno: '658',
          position: '平台部/前端开发',
          url: 'http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
          isEmployee: true,
          icon: 'el-icon-user-solid'
        }]
      }, {
        id: 3,
        name: '一级 3',
        icon: 'el-icon-tickets',
        children: [{
          id: 7,
          name: '二级 3-1',
          jobno: '7591',
          position: '平台部/前端开发',
          url: 'http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
          isEmployee: true,
          icon: 'el-icon-user-solid'
        }, {
          id: 8,
          name: '二级 3-2',
          jobno: '1632',
          position: '平台部/前端开发',
          url: 'http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
          isEmployee: true,
          icon: 'el-icon-user-solid'
        }]
      }],
      selectedSearch: false,
      selectedlist: [],
      selectedsearchlist: []
    }
  },
  watch: {
    filterEmployee (val) {
      if (this.tabActive === 1) {
        if (val) {
          this.recentSearch = true
          let oldlist = this.recentlist
          let newlist = oldlist.filter(t => t.name.indexOf(val) !== -1 || (t.jobno && t.jobno.indexOf(val) !== -1))
          if (val) {
            this.recentsearchlist = newlist
          }
        } else {
          this.recentSearch = false
          this.recentsearchlist = []
        }
      }
      if (this.tabActive === 2) {
        if (val) {
          this.deptSearch = true
          let oldlist = this.deptlist
          let newlist = oldlist.filter(t => t.name.indexOf(val) !== -1 || (t.jobno && t.jobno.indexOf(val) !== -1))
          if (val) {
            this.deptsearchlist = newlist
          }
        } else {
          this.deptSearch = false
          this.deptsearchlist = []
        }
      }
      if (this.tabActive === 3) {
        this.$refs.tree.filter(val)
      }
    },
    filterSelected (val) {
      if (val) {
        this.selectedSearch = true
        let oldlist = this.selectedlist
        let newlist = oldlist.filter(t => t.name.indexOf(val) !== -1 || (t.jobno && t.jobno.indexOf(val) !== -1))
        if (val) {
          this.selectedsearchlist = newlist
        }
      } else {
        this.selectedSearch = false
        this.selectedsearchlist = []
      }
    }
  },
  created () {
    this.recentlist.push({ id: 1, name: '贺兴祥', jobno: '2298', position: '平台部/前端开发', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
    this.recentlist.push({ id: 2, name: '刘志强', jobno: '1581', position: '开发三部/前端开发', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
    this.recentlist.push({ id: 3, name: '谢忠来', jobno: '6523', position: '开发一部/前端开发', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
    this.recentlist.push({ id: 4, name: '薛海峰', jobno: '165', position: '开发一部/后端开发', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
    this.recentlist.push({ id: 5, name: '陈坤', jobno: '692', position: '开发一部/产品经理', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
    this.deptlist.push({ id: 11, name: '李腾', jobno: '5254', position: '开发三部/后端开发', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
    this.deptlist.push({ id: 12, name: '黄春霞', jobno: '2815', position: '开发三部/前端开发', url: 'http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', checked: false })
  },
  methods: {
    init (dialogTitle) {
      this.dialogVisible = true
      this.dialogTitle = dialogTitle
    },
    tabClick (type) {
      this.tabActive = type
    },
    addSelected (item) {
      item.checked = true
      this.itemActive = item.id
      let exist = this.selectedlist.filter(t => t.id === item.id)
      if (exist.length <= 0) {
        this.selectedlist.push(item)
      }
    },
    removeSelected (item) {
      item.checked = false
      this.selectedlist.splice(this.selectedlist.findIndex(t => t.id === item.id), 1)
      this.$refs.tree.setChecked(item.id, false)
    },
    nodeClick (data, checked, node) {
      let parentArr = this.$refs.tree.getHalfCheckedNodes()
      let childArr = this.$refs.tree.getCheckedNodes()
      let datas = parentArr.concat(childArr)
      for (let i = 0; i < datas.length; i++) {
        let item = datas[i]
        let exist = this.selectedlist.filter(t => t.id === item.id)
        if (item.isEmployee && exist.length <= 0) {
          this.selectedlist.push(item)
        }
      }
      let orgselectedlist = this.selectedlist.filter(t => t.isEmployee === true)
      let removelist = [...orgselectedlist].filter(x => [...datas].every(y => y.id !== x.id))
      for (let i = 0; i < removelist.length; i++) {
        let item = removelist[i]
        this.selectedlist.splice(this.selectedlist.findIndex(t => t.id === item.id), 1)
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 || (data.jobno && data.jobno.indexOf(value) !== -1)
    },
    closeDialog () {
      this.dialogVisible = false
      this.$emit('closeDialog', this.selectedlist)
    },
    loadEmployeeNode (node, resolve) {
      if (node.level === 0) {
        this.getRootInfo(resolve)
      } else {
        this.getChildNode(node, resolve)
      }
    },
    getRootInfo (resolve) {
      let root = [{ id: null, label: '深圳凌启电子有限公司' }]
      setTimeout(function () {
        resolve(root)
      }, 500)
    },
    getChildNode (node, resolve) {
      let parentId = node.data.id
      console.log(parentId)
      let root = []
      if (parentId == null) {
        root = [{ id: 2, label: '人力行政部', dept: true, leaf: false }, { id: 3, label: '财务部', dept: true, leaf: true }, { id: 500, label: '陈世美', dept: false, leaf: true }]
      }
      if (parentId === 2) {
        root = [{ id: 21, label: '人力资源', dept: true, leaf: false }, { id: 22, label: '行政', dept: true, leaf: true }]
      }
      if (parentId === 21) {
        root = [{ id: 211, label: '江一闻', dept: false, leaf: true }, { id: 212, label: '刘顺丰', dept: false, leaf: true }]
      }
      setTimeout(function () {
        resolve(root)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .employee-select-container {
    display: flex;
    .select-content {
      display: flex;
      flex: 1;
      flex-flow: column;
      overflow: auto;
      .top {
        margin: 10px 20px 0 20px;
        .el-button--text {
          color: #333;
        }
        .tabActives {
          color: #3B5D95;
        }
      }
      .content {
        display: flex;
        flex: 1;
        flex-flow: row;
        overflow: auto;
        .card {
          overflow: hidden;
          background: #fff;
          display: inline-block;
          vertical-align: middle;
          max-height: 100%;
          box-sizing: border-box;
          position: relative;
          margin: 10px 20px 0 20px;
          display: flex;
          flex-flow: column;
          flex: 1;
          .header {
            margin: 3px;
            box-sizing: border-box;
          }
          .section {
            margin: 3px;
            flex: 1;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            overflow: auto;
            .list {
              display: flex;
              flex-flow: column;
              overflow: auto;
              height: 100%;
              .item {
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px 10px;
                cursor: pointer;
                &:hover {
                  background-color:rgba(187,205,218,0.2);
                }
                .left {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-right: 20px;
                  .name {
                    margin-left: 10px;
                  }
                }
                .right {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .addicon {
                    margin-left: 10px;
                    font-size: 20px;
                    &:hover {
                      color: #3B5D95;
                    }
                  }
                  .removeicon {
                    color: #999;
                    margin-left: 10px;
                    font-size: 20px;
                    &:hover {
                      color: #3B5D95;
                    }
                  }
                }
              }
              .isChecked {
                color: #ccc;
                .right {
                  .addicon {
                    &:hover {
                      color: #ccc;
                    }
                  }
                }
              }
            }
          }
        }
        .btn-group {
          overflow: hidden;
          background: #fff;
          display: inline-block;
          vertical-align: middle;
          max-height: 100%;
          box-sizing: border-box;
          position: relative;
          margin: 20px 0;
          display: flex;
          flex-flow: column;
          .list-item {
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            .btn {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
  .abow-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /deep/ {
      .el-dialog {
        margin: 0 auto !important;
        height: 75%;
        overflow: hidden;
        position: relative;
        .el-dialog__header {
          background-color: rgba(187, 205, 218, .2);
        }
        .el-dialog__body {
          position: absolute;
          left: 0;
          top: 54px;
          bottom: 66px;
          right: 0;
          padding: 0;
          z-index: 1;
          overflow: hidden;
          overflow-y: auto;
          display: flex;
          flex: 1;
          min-height: 0;
        }
        .el-dialog__footer {
          height: 66px;
          position: absolute;
          left: 0;
          top: calc(100% - 66px);
          bottom: 66px;
          right: 0;
          background-color: rgba(187, 205, 218, .2);
          padding-top: 17px;
        }
      }
    }
  }
</style>
