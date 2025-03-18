<template>
  <div id="box" style="max-width: 100%; height:470px;max-height: 470px; padding: 20px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, reactive, watch } from 'vue';
import bus from '@/ulit/Bus.js'

const data = reactive({
  dates: [],
  ipList: [],
  pvList: [],
  isAdding: false
})
watch(() => [data.dates, data.ipList, data.pvList], (newValue, oldValue) => {
  if (newValue != oldValue) {
    setTimeout(() => {
      funs()
    }, 400);
  }
})

onMounted(() => {
  echartData()
  setTimeout(() => {
    funs()
  }, 400);
})
onUnmounted(() => {

})

const echartData=()=> {
  bus.on('dates', datas => {
    datas.forEach(e => {
      data.dates.push(e)

    });

  })
  bus.on('ipList', ipList => {
    ipList.forEach(e => {
      data.ipList.push(e)
    });
  })
  bus.on('pvList', pvList => {
    pvList.forEach(e => {
      data.pvList.push(e)
    });
    funs(data.dates, data.ipList, data.pvList)
  })
}
const funs = (a, b, c) => {
  const chartDom = document.getElementById('box');
  if (echarts.getInstanceByDom(chartDom)) {
    echarts.dispose(chartDom);
  }
  const myChart = echarts.init(chartDom);

  var option = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // data: [150, 232, 201, 154, 190, 330, 410]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: a
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '10%']
    },
    series: [
      {
        name: 'IP',
        type: 'line',
        stack: 'Total',
        data: b
      },
      {
        name: '浏览量',///
        type: 'line',
        stack: 'Total',
        data: c
      },
    ]
  }
  option && myChart.setOption(option);
  window.addEventListener('resize', function () {
    if (myChart) {
      myChart.resize();
    }

  });
}


</script>

<style lang="scss" scoped></style>