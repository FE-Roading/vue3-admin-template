<template>
  <div v-show="isShow" :style="style">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed, inject, Ref, ref, useAttrs, watch } from "vue"
import { BreakPoint, GridItemProps } from "./type"

const props = withDefaults(defineProps<GridItemProps>(), {
  offset: 0,
  span: 1,
  suffix: false,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
})

defineOptions({
  name: "GridItem",
})

const attrs = useAttrs() as { index: string }
const isShow = ref(true)

// 注入断点
const breakPoint = inject<Ref<BreakPoint>>("breakPoint", ref("xl"))
const shouldHiddenIndex = inject<Ref<number>>("shouldHiddenIndex", ref(-1))
watch(
  () => [shouldHiddenIndex.value, breakPoint.value],
  (n) => {
    if (attrs.index) {
      isShow.value = !(n[0] !== -1 && parseInt(attrs.index) >= Number(n[0]))
    }
  },
  { immediate: true },
)

const gap = inject("gap", 0)
const cols = inject("cols", ref(4))
const style = computed(() => {
  const span = props[breakPoint.value]?.span ?? props.span
  const offset = props[breakPoint.value]?.offset ?? props.offset
  if (props.suffix) {
    return {
      gridColumnStart: cols.value - span - offset + 1,
      gridColumnEnd: `span ${span + offset}`,
      marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset",
    }
  } else {
    return {
      gridColumn: `span ${span + offset > cols.value ? cols.value : span + offset}/span ${span + offset > cols.value ? cols.value : span + offset}`,
      marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset",
    }
  }
})
</script>
