<script setup lang="ts">
import { useAttrs, onMounted } from "vue"
import { Refresh, Operation } from "@element-plus/icons-vue"
import { type ElTable } from "element-plus"
import { Search } from "@/components/Search"
import useTable from "@/hooks/useTable"
import ReTableColumn from "./TableColumn.vue"
import RePagination from "./Pagination.vue"
import { TablePageProps } from "./type"

defineOptions({
  name: "TablePage",
})

const props = withDefaults(defineProps<TablePageProps>(), {
  searchVisible: false,
  searchDefaultValue: () => ({}),
  searchInitialValue: () => ({}),
  requestAuto: true,
})

const attrs = useAttrs()
const {
  page,
  pageSize,
  total,
  data,
  loading,
  tableRef,
  selections,
  onSelectionChange,
  onClearSelection,
  onPageChange,
  onPageSizeChange,
  getTableData,
} = useTable({
  api: props.requestApi,
})

function onReset(params) {
  getTableData({ ...params, page: 1 })
}

onMounted(() => {
  if (props.requestAuto) {
    getTableData({ ...props.searchDefaultValue, ...props.searchInitialValue })
  }
})

defineExpose({
  selections,
  onClearSelection,
  tableRef,
})
</script>

<template>
  <div class="table-page-com">
    <Search
      :initialValue="searchInitialValue"
      :defaultValue="searchDefaultValue"
      :searchCol="searchCol"
      @reset="onReset"
      @search="getTableData"
      class="tp-search"
      v-if="searchVisible"
    >
      <template #default>
        <slot name="search" />
      </template>
    </Search>
    <div class="tp-body">
      <div class="tp-header">
        <div class="tp-header-left">
          <slot name="headerLeft" />
        </div>
        <div class="tp-header-right">
          <ElButton :icon="Refresh" />
          <ElButton :icon="Operation" />
        </div>
      </div>
      <!-- 表格主体 -->
      <ElTable
        ref="tableRef"
        v-bind="attrs"
        :data="data"
        :border="border"
        :row-key="rowKey"
        @selection-change="onSelectionChange"
        v-loading="loading"
        empty-text="暂无数据"
      >
        <!-- 默认插槽 -->
        <slot />
        <template v-for="item in columns" :key="item">
          <!-- selection || index || expand -->
          <ElTableColumn
            v-if="item.type && ['selection', 'index', 'expand'].includes(item.type)"
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type == 'selection'"
          >
            <template v-if="item.type == 'expand'" #default="scope">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>
          </ElTableColumn>
          <!-- other -->
          <ReTableColumn v-if="!item.type && item.prop && !item.isHide" :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope" />
            </template>
          </ReTableColumn>
        </template>
        <!-- 插入表格最后一行之后的插槽 -->
        <template #append>
          <slot name="append" />
        </template>
        <!-- 无数据 -->
        <template #empty>
          <slot name="empty" />
        </template>
      </ElTable>
      <RePagination
        :page="page"
        :pageSize="pageSize"
        :total="total"
        @page-change="onPageChange"
        @size-change="onPageSizeChange"
        class="tp-pager"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-page-com {
  .tp {
    &-search {
      margin-bottom: 20px;
    }
  }
}
</style>
