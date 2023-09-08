<template>
  <ElPagination
    :background="true"
    :current-page="page"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :total="total"
    :layout="layout"
    @size-change="onPageSizeChange"
    @current-change="onPageChange"
  />
</template>

<script setup lang="ts">
import { RePaginationProps } from "./type"

defineOptions({
  name: "RePagination",
})

withDefaults(defineProps<RePaginationProps>(), {
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: () => [10, 25, 50, 100],
})

const emit = defineEmits<{
  "size-change": [val: number]
  "page-change": [val: number]
}>()

function onPageSizeChange(size) {
  emit("size-change", size)
}
function onPageChange(page) {
  emit("page-change", page)
}
</script>
