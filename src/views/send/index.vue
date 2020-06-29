<template>
  <div class="send-container">
    <div class="page-header">
      <tool-bar :title="headerTitle" :toolbars="toolbars" @toolBarClick="toolBarClick"></tool-bar>
    </div>
    <div class="page-content">
      <div class="form-label">
        <div class="text"><span>收件人/抄送人:</span></div>
        <div class="right">
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="addSecret">添加密送</el-button>
        </div>
      </div>
      <div class="form-input">
        <el-select v-model="form.acceptlist" multiple filterable reserve-keyword placeholder="请添加收件人" value-key="name" :multiple-limit="multiplelimit" style="width:100%;">
          <el-option v-for="item in options" :key="item.id" :label="`${item.name}(${item.jobno})`" :value="item.id"></el-option>
        </el-select>
        <el-button icon="el-icon-user" @click.native="selectEmployee(1)"></el-button>
      </div>
      <div class="form-input">
        <el-select v-model="form.cclist" multiple filterable reserve-keyword placeholder="请添加抄送人" value-key="name" :multiple-limit="multiplelimit" style="width:100%;">
          <el-option v-for="item in options" :key="item.id" :label="`${item.name}(${item.jobno})`" :value="item.id"></el-option>
        </el-select>
        <el-button icon="el-icon-user" @click.native="selectEmployee(2)"></el-button>
      </div>
      <div class="form-input" v-for="(inputs, i) in secretRows" :key="i">
        <el-select v-model="form.secretlist" multiple filterable reserve-keyword placeholder="请添加密送人" value-key="name" :multiple-limit="multiplelimit" style="width:100%;">
          <el-option v-for="item in options" :key="item.id" :label="`${item.name}(${item.jobno})`" :value="item.id"></el-option>
        </el-select>
        <el-button icon="el-icon-user" @click.native="selectEmployee(3)"></el-button>
        <div class="remove-row" @click="removeSecret(inputs)"><i class="el-icon-remove-outline"></i></div>
      </div>
      <div class="form-label">
        <div class="text"><span>主题:</span></div>
        <div class="right">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ emailLevel.text }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeLevel(item)" v-for="(item, i) in emailLevels" :key="i">{{ item.text }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-upload multiple class="upload-multiple" action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="small" type="primary" icon="el-icon-paperclip"></el-button>
          </el-upload>
        </div>
      </div>
      <div class="form-input">
        <el-input v-model="form.title" maxlength="150" placeholder="请输入您的标题内容"></el-input>
      </div>
      <vue-ueditor-wrap v-model="form.content" :config="uEditConfig"></vue-ueditor-wrap>
    </div>
    <div class="page-bottom">
      <bottom-bar @btnClear="btnClear" @btnSave="btnSave" @btnSend="btnSend"></bottom-bar>
    </div>
    <!-- 选择人员 -->
    <employee-select v-if="showEmployeeSelectDialog" ref="employeeSelectDialog" @closeDialog="closeDialog"></employee-select>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar'
import BottomBar from '@/components/BottomBar'
import VueUeditorWrap from 'vue-ueditor-wrap'
import EmployeeSelect from '@/components/EmployeeSelect'

export default {
  name: 'Send',
  components: {
    ToolBar,
    BottomBar,
    VueUeditorWrap,
    EmployeeSelect
  },
  data () {
    return {
      headerTitle: '发布邮件',
      toolbars: ['close'],
      uEditConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 370,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件地址
        serverUrl: '',
        toolbars: [[
          'undo',
          'redo',
          'bold',
          'indent',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'fontborder',
          'superscript',
          'formatmatch',
          'source',
          'blockquote',
          'pasteplain',
          'selectall',
          'print',
          'preview',
          'horizontal',
          'removeformat',
          'time',
          'date',
          'unlink',
          'insertrow',
          'insertcol',
          'mergeright',
          'mergedown',
          'deleterow',
          'deletecol',
          'splittorows',
          'splittocols',
          'splittocells',
          'deletecaption',
          'inserttitle',
          'mergecells',
          'deletetable',
          'cleardoc',
          'insertparagraphbeforetable',
          'fontfamily',
          'fontsize',
          'paragraph',
          'emotion',
          'spechars',
          'map',
          'gmap',
          'justifyleft',
          'justifyright',
          'justifycenter',
          'justifyjustify',
          'forecolor',
          'backcolor',
          'insertorderedlist',
          'insertunorderedlist',
          'fullscreen',
          'directionalityltr',
          'directionalityrtl',
          'rowspacingtop',
          'rowspacingbottom',
          'pagebreak',
          'imagenone',
          'imageleft',
          'imageright',
          'imagecenter',
          'lineheight',
          'edittip ',
          'customstyle',
          'autotypeset',
          'touppercase',
          'tolowercase',
          'inserttable'
        ]]
      },
      emailLevel: {name: '1', text: '一般'},
      emailLevels: [
        {
          name: '1',
          text: '一般'
        },
        {
          name: '2',
          text: '重要'
        },
        {
          name: '3',
          text: '非常重要'
        }
      ],
      form: {
        acceptlist: [],
        cclist: [],
        secretlist: [],
        title: '',
        content: '',
        level: '1'
      }, // 表单对象
      multiplelimit: 500, // 下拉选择人员最大数
      secretRows: [], // 密送人行集合
      options: [
        {
          id: 1,
          name: '贺兴祥',
          jobno: '2298',
          py: 'hxx'
        },
        {
          id: 2,
          name: '刘志强',
          jobno: '1581',
          py: 'lzq'
        },
        {
          id: 3,
          name: '黄春霞',
          jobno: '2815',
          py: 'hcx'
        },
        {
          id: 4,
          name: '陈利',
          jobno: '3277',
          py: 'cl'
        }
      ], // 初始化数据
      employeeActive: 1,
      showEmployeeSelectDialog: false
    }
  },
  methods: {
    addSecret () {
      let rows = this.secretRows.length
      if (rows <= 0) {
        this.secretRows.push({ value: '', key: Date.now() })
      }
    },
    removeSecret (item) {
      let index = this.secretRows.indexOf(item)
      if (index !== -1) {
        this.secretRows.splice(index, 1)
        this.form.secretlist = []
      }
    },
    selectEmployee (type) {
      let dialogTitle = '选择人员'
      this.employeeActive = type
      this.showEmployeeSelectDialog = true
      if (type === 1) {
        dialogTitle = '选择收件人'
      }
      if (type === 2) {
        dialogTitle = '选择抄送人'
      }
      if (type === 3) {
        dialogTitle = '选择密送人'
      }
      this.$nextTick(() => {
        this.$refs.employeeSelectDialog.init(dialogTitle)
      })
    },
    changeLevel (item) {
      this.emailLevel = item
      this.form.level = item.name
    },
    closeDialog (vals) {
      let ids = []
      if (vals.length > 0) {
        ids = vals.map(t => t.id)
      }
      if (this.employeeActive === 1) {
        this.form.acceptlist = ids
      }
      if (this.employeeActive === 2) {
        this.form.cclist = ids
      }
      if (this.employeeActive === 3) {
        this.form.secretlist = ids
      }
    },
    btnClear () {
      this.form.acceptlist = []
      this.form.cclist = []
      this.form.secretlist = []
      this.form.title = ''
      this.form.content = ''
      this.changeLevel({name: '1', text: '一般'})
    },
    btnSave () {
      console.log('Send.vue触发底部按钮事件:保存' + JSON.stringify(this.form))
    },
    btnSend () {
      console.log('Send.vue触发底部按钮事件:发送' + JSON.stringify(this.form))
    },
    toolBarClick (item) {
      console.log('Send.vue触发工具栏点击事件:' + item.text + item.name)
      if (item.name === 'close') {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .send-container {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(187, 205, 218, .2);
    height: 100vh;
    display: flex;
    flex-direction: column;
    .page-header {
      height: 60px;
    }
    .page-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      display: flex;
      flex-flow: column;
      padding: 0 20px 20px 20px;
      .form-label {
        padding: 25px 0 0 0;
        display: flex;
        justify-content: space-between;
        .text {
          display: flex;
          align-items: center;
        }
        .right {
          display: flex;
          flex-flow: row;
          align-items: center;
          .el-dropdown {
            margin-right: 20px;
            color: #3B5D95;
            cursor: pointer;
          }
          .el-upload {
            .el-button--small {
              padding: 6px 13px;
            }
          }
        }
      }
      .form-input {
        display: flex;
        padding: 10px 0 10px 0;
        /deep/ input.el-input__inner {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .el-button--medium {
          padding: 6px 12px;
          border-left: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .remove-row {
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-self: center;
          margin-left: 19px;
          :hover {
            color: red;
          }
        }
      }
    }
    .page-bottom {
      height: 60px;
    }
  }
</style>
