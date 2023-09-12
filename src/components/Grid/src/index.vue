<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  useSlots,
  computed,
  provide,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onDeactivated,
  onActivated,
  VNodeArrayChildren,
  VNode,
} from "vue"
import type { BreakPoint, Gap } from "./type"

defineOptions({
  name: "Grid",
})

type Props = {
  cols?: number | Record<BreakPoint, number>
  collapsed?: boolean
  collapsedRows?: number
  // [行间距，列间距] | 行列间距
  gap?: Gap
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  collapsed: true,
  collapsedRows: 1,
  gap: 0,
})

onBeforeMount(() => props.collapsed && findIndex())
onMounted(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
  window.addEventListener("resize", resize)
})
onActivated(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
  window.addEventListener("resize", resize)
})
onUnmounted(() => {
  window.removeEventListener("resize", resize)
})
onDeactivated(() => {
  window.removeEventListener("resize", resize)
})

// 监听屏幕变化
const resize = (e: UIEvent) => {
  const width = (e.target as Window).innerWidth
  switch (!!width) {
    case width < 768:
      breakPoint.value = "xs"
      break
    case width >= 768 && width < 992:
      breakPoint.value = "sm"
      break
    case width >= 992 && width < 1200:
      breakPoint.value = "md"
      break
    case width >= 1200 && width < 1920:
      breakPoint.value = "lg"
      break
    case width >= 1920:
      breakPoint.value = "xl"
      break
  }
}

// 注入 gap 间距
provide("gap", Array.isArray(props.gap) ? props.gap[0] : props.gap)

// 注入响应式断点
const breakPoint = ref<BreakPoint>("xl")
provide("breakPoint", breakPoint)

// 注入要开始折叠的 index
const hiddenIndex = ref(-1)
provide("shouldHiddenIndex", hiddenIndex)

// 注入 cols
const gridCols = computed<number>(() => {
  if (typeof props.cols === "object") return props.cols[breakPoint.value]
  return props.cols
})
provide("cols", gridCols)

// 寻找需要开始折叠的字段 index
const slots = useSlots().default!()
const canCcllapsed = ref(false)

const findIndex = () => {
  const fields: VNodeArrayChildren = []
  let suffix: VNode | null = null

  slots.forEach((slot: any) => {
    // suffix
    if (typeof slot.type === "object" && slot.type.name === "GridItem" && slot.props?.suffix !== undefined) suffix = slot
    // slot children
    if (typeof slot.type === "symbol" && Array.isArray(slot.children) && slot.children.length > 0) {
      if (
        slot.children.length === 1 &&
        typeof slot.children[0].type === "symbol" &&
        Array.isArray(slot.children[0].children) &&
        slot.children[0].children.length > 0
      ) {
        fields.push(...slot.children[0].children)
      } else {
        fields.push(...slot.children)
      }
    }
  })

  // 计算 suffix 所占用的列
  let suffixCols = 0
  if (suffix) {
    suffixCols =
      ((suffix as VNode).props?.[breakPoint.value]?.span ?? (suffix as VNode).props?.span ?? 1) +
      ((suffix as VNode).props![breakPoint.value]?.offset ?? (suffix as VNode).props?.offset ?? 0)
  }
  try {
    let find = false
    const accumlatedSpan = fields.reduce<number>((prev = 0, current, index) => {
      prev +=
        ((current as VNode)!.props?.[breakPoint.value]?.span ?? (current as VNode)!.props?.span ?? 1) +
        ((current as VNode)!.props?.[breakPoint.value]?.offset ?? (current as VNode)!.props?.offset ?? 0)

      if (!find && Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
        hiddenIndex.value = index
        find = true
      }
      return prev
    }, 0)

    if (gridCols.value == 1) {
      canCcllapsed.value = false
      hiddenIndex.value = -1
    } else {
      canCcllapsed.value = suffix ? gridCols.value <= accumlatedSpan : gridCols.value < accumlatedSpan
    }

    if (!find) hiddenIndex.value = -1
  } catch (e) {
    // console.warn(e)
  }
}

// 断点变化时 执行 findIndex
watch(
  () => breakPoint.value,
  () => {
    if (props.collapsed) findIndex()
  },
)

// 监听 collapsed
watch(
  () => props.collapsed,
  value => {
    if (value) return findIndex()
    hiddenIndex.value = -1
  },
)

// 设置间距
const gridGap = computed(() => {
  if (typeof props.gap === "number") return `${props.gap}px`
  if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`
  return "unset"
})

// 设置 style
const style = computed(() => {
  return {
    display: "grid",
    gridGap: gridGap.value,
    gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
  }
})

defineExpose({ breakPoint, canCcllapsed })
</script>
