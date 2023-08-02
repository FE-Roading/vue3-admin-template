<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue"
import { type EChartsOption, type ECharts, init } from "echarts"
import useEcharts from "@/hooks/useEcharts"

type IndexProps = {
  options: EChartsOption
}

defineOptions({
  name: "Echarts",
})
const { options } = toRefs(defineProps<IndexProps>())

const echartsRef = ref<HTMLElement>()

onMounted(() => {
  const myChart: ECharts = init(echartsRef.value as HTMLElement)
  useEcharts(myChart, options)
})
</script>
<template>
  <div ref="echartsRef" class="card content-box" />
</template>
