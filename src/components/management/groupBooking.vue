<template>
  <div>
      <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>多人预约</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
                    <el-cascader
                      v-model="ruleForm.region"
                      :options="options"
                      :props="cateProps"
                      clearable>
                    </el-cascader>
          </el-form-item>

            <!-- 多人预约统计 -->
          <el-form-item class="groups" label="成员登记" prop="group">
                <el-input-number @change="handleChange" v-model="num" :min="1" :max="100" label="描述文字">

                </el-input-number>
                <el-button type="primary" @click="submitHU">确定人数</el-button>
          </el-form-item>

           <el-form-item label="预约邀请">
             <h3>湖州市平安实训基地暨吴兴平安实训学院:   </h3>
             <p>兹有</p>
             <el-input placeholder="请输入单位名称" class="inputIntroduce" v-model="introduce"></el-input>
             <p>带领部分同志前往贵学院参观学习，目的是为了加强公共安全意识及提高实际公共安全应变处置操作能力，请贵学院予以接洽。</p>
           </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <el-dialog
        title="成员登记表"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose">
        <!-- form表单登记信息 -->
        <el-form class="formgroup">
            <el-steps :space="470" :active="6" finish-status="success">
                <el-step title="姓名"></el-step>
                <el-step title="性别"></el-step>
                <el-step title="手机号"></el-step>
                <el-step title="工作单位"></el-step>
                <el-step title="职务"></el-step>
            </el-steps>
            <el-form-item :label="index + 1 + ''" v-for="(item, index) in num" :key="index">
                <el-col :span="4">
                    <el-input v-model="form[index].name"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form[index].sex"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form[index].mobile"></el-input>
                </el-col>
                <el-col :span="7">
                    <el-input v-model="form[index].Company"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form[index].post"></el-input>
                </el-col>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="determineGroup">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      dialogVisible: false,
      introduce: '',
      // 预约人数选择
      num: 1,
      activeIndex: '1',
      ruleForm: {
        name: '',
        region: 0,
        mobile: '',
        // 名单
        group: [],
        // 介绍信
        introduce: ''
      },
      form: [
        {
          name: '',
          sex: '',
          mobile: '',
          //   单位
          Company: '',
          // 职务
          post: ''
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择预约项目', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      cateProps: { multiple: true, emitPath: false },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  created () {
  },
  methods: {
    async handleChange (value) {
      console.log(value)
      await this.form.push({
        name: '',
        sex: '',
        mobile: '',
        //   单位
        Company: '',
        // 职务
        post: ''
      })
    },
    async submitForm (formName) {
      this.ruleForm.introduce = `湖州市平安实训基地暨吴兴平安实训学院:兹有${this.introduce}带领部分同志前往贵学院参观学习，目的是为了加强公共安全意识及提高实际公共安全应变处置操作能力，请贵学院予以接洽。`

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })

      const data = await this.$http.post('/group/establish', this.ruleForm)
      console.log(data)
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.num = 1
      this.introduce = ''
    },
    // 确定人数按钮
    submitHU () {
      console.log(this.num)
      this.dialogVisible = true
    },

    // 登记表单关闭
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 确定人数提交按钮
    determineGroup () {
      this.dialogVisible = false
      console.log(this.form)
      this.ruleForm.group = this.form
    }
  }
}
</script>

<style lang="less" scoped>
  .el-form{
    width: 50%;
    margin-left: 13%;
    margin-top: 3%;
    padding: 5%;
    background-color: #fff;
  }
  .el-input-number{
      margin-right: 4%;
  }
  .el-steps{
      margin-left: 4%;
  }
  .formgroup{
      margin-top: -5%;
      margin-left: 0;
  }
  /deep/.inputIntroduce input{
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
  /deep/.el-step__head{
    display: none;
  }
  /deep/.el-step__title.is-success {
    color: #333;
}
/deep/.el-dialog__header {
    text-align: center;
}
</style>
