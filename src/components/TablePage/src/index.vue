<script setup lang="ts">
import { useAttrs, onMounted, ref, provide } from "vue"
import { Refresh, Operation } from "@element-plus/icons-vue"
import { type ElTable } from "element-plus"
import { Search } from "@/components/Search"
import useTable from "@/hooks/useTable"
import ReTableColumn from "./TableColumn.vue"
import RePagination from "./Pagination.vue"
import { ColumnProps, TablePageProps } from "./type"

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

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide("enumMap", enumMap)
const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return

  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== "function") return enumMap.value.set(col.prop!, col.enum!)
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}
props.columns.forEach(async col => {
  // 给每一项 column 添加 isShow && isFilterEnum 默认属性
  col.isHide = col.isHide ?? false
  col.isFilterEnum = col.isFilterEnum ?? true

  // 设置 enumMap
  setEnumMap(col)
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
      <div class="tp-table">
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
      </div>

      <RePagination
        :page="page"
        :pageSize="pageSize"
        :total="total"
        :layout="paginationLayout"
        @page-change="onPageChange"
        @size-change="onPageSizeChange"
        class="tp-pager"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-page-com {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tp {
    &-search {
      flex: none;
      padding: 18px 18px 0;
      margin-bottom: 10px;
      background-color: var(--el-bg-color);
      border: 1px solid var(--el-border-color-light);
      border-radius: 6px;
      box-shadow: 0 0 12px #0000000d;
    }

    &-body {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 20px;
      background-color: var(--el-bg-color);
      border: 1px solid var(--el-border-color-light);
      border-radius: 6px;
      box-shadow: 0 0 12px #0000000d;
    }

    &-header {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    &-table {
      flex: 1;
      height: 0;
      min-height: 0;

      .el-table {
        height: 100%;
      }
    }

    &-pager {
      display: flex;
      flex: none;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
</style>
