<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :option="chartData" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      chartData: {
        xData: [3, 4, 5, 9, 10, 12, 20, 23, 31, 35, 39, 45, 50]
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
