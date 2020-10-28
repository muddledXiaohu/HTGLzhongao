<template>
    <div>
      <!-- 卡片视图 -->
      <div>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="always">
                总人数
                <div></div>
                <h3>13,00</h3>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                今日新增人数
                <div></div>
                <h3>13</h3>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                今日预约人数
                <div></div>
                <h3>0</h3>
              </el-card>
            </el-col>
          </el-row>
      </div>
      <!-- 折线图 -->
      <h2 class="itB">注册人数：</h2>
       <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
</template>
<script>
// 引入基本模板
// eslint-disable-next-line no-unused-vars
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'DataCount',
  data: () => ({
  }),
  mounted () {
    this.drawLine()
  },
  methods: {

    drawLine () {
    // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['注册人数']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2020-10-01', '2020-10-04', '2020-10-11', '2020-10-12', '2020-10-14', '2020-10-16', '2020-10-20']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '注册人数',
            type: 'line',
            data: [23, 56, 56, 67, 4, 99, 10],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      })
    }

  }
}
</script>

<style lang="less" scoped>
  #myChart{
    background-color: #fff;
    padding: 20px 0;
    border-radius: 5px;
  }
  .el-card{
    height: 150px;
    margin-top: 40px;
    margin-bottom: 70px;
    letter-spacing: 2px;
    color: #444;
    border-radius: 10px;
  }
  .el-card div{
    width: 100%;
    height: 1px;
    background-color: rgb(228, 225, 225);
    margin-top: 5px;
  }
  .el-card h3{
    font-size: 50px;
    line-height: 10px;
  }
  .itB{
    color: #444;
    font-size: 20px;
    padding-left: 10px;
    width: 120px;
    line-height: 40px;
    text-align: center;
    height: 40px;
    background-color: lightgrey;
    border-radius: 10px;
  }
</style>
