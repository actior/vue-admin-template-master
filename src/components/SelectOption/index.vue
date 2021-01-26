<template>
  <el-card class="box-card" v-if="refresh">
    <div class="text item">现金：{{ list.money }}</div>
    <div class="text item">当前花费：{{ list.cost }}</div>
  </el-card>
</template>

<script>
export default {
  props: {
    cashFlowList: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      list: this.cashFlowList,
      refresh: true
    }
  },
  watch: {
    cashFlowList: {
      handler(val) {
        // 移除组件
        this.refresh = false
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
          // 重新渲染组件
          this.list = val
          this.refresh = true
        })
      },
      deep: true
    }
  }
}
</script>
