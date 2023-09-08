<script setup lang="ts">
import { computed, inject, toRaw } from "vue"
import { FormItemProps } from "element-plus"
import { type GridItemProps, GridItem } from "@/components/Grid"
import { FormSymbol } from "./type"

type IndexProps = Partial<FormItemProps> &
  GridItemProps & {
    // 用于Grid展开和折叠时的隐藏序号计算
    index: string
  }

defineOptions({
  name: "SearchItem",
})
const props = defineProps<IndexProps>()
const formValue = inject<Record<string, any>>(FormSymbol)

const gridItemPropsKeys = ["offset", "span", "suffix", "xs", "sm", "md", "lg", "xl", "index"]
const latestProps = computed<{ gridItemProps: GridItemProps; formItemProps: FormItemProps }>(() => {
  const _gridItemProps: any = {}
  const _formItemProps: any = {}
  const _props = toRaw(props)

  Object.keys(_props).forEach(key => {
    if (gridItemPropsKeys.includes(key)) {
      _gridItemProps[key] = _props[key]
    } else {
      _formItemProps[key] = _props[key]
    }
  })

  return {
    gridItemProps: _gridItemProps,
    formItemProps: _formItemProps,
  }
})
</script>

<template>
  <GridItem v-bind="latestProps.gridItemProps">
    <ElFormItem v-bind="latestProps.formItemProps">
      <slot :value="formValue" />
    </ElFormItem>
  </GridItem>
</template>
