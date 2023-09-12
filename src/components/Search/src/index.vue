<script setup lang="ts">
import { ref, useSlots, provide, computed, nextTick } from "vue"
import { FormInstance } from "element-plus"
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue"
import { Grid, GridItem } from "@/components/Grid"
import { removeEmptyProperties } from "@/utils/common"
import { FormSymbol, SearchCol } from "./type"
import { unref } from "vue"

interface IndexProps {
  initialValue?: { [key: string]: any } // 表单初始值
  defaultValue?: { [key: string]: any } // 表单默认值，reset时使用
  searchCol?: SearchCol
}

// 默认值
const props = withDefaults(defineProps<IndexProps>(), {
  initialValue: () => ({}),
  defaultValue: () => ({}),
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
})
const emit = defineEmits<{
  reset: [params: { [key: string]: any }]
  search: [params: { [key: string]: any }]
}>()
defineOptions({
  name: "Search",
})

const formValue = ref({ ...props.defaultValue, ...props.initialValue })
provide(FormSymbol, formValue)

// 是否默认折叠搜索项
const collapsed = ref(true)
const slots = useSlots()?.default?.() ?? []

// 获取响应式断点
const formRef = ref<FormInstance>()
const gridRef = ref<InstanceType<typeof Grid> | null>(null)

const showCollapse = computed(() => gridRef.value?.canCcllapsed)

const onReset = () => {
  formValue.value = {}
  formRef.value?.resetFields()

  nextTick(() => {
    formValue.value = { ...props.defaultValue }
  })

  emit("reset", props.defaultValue)
}

const onSearch = () => {
  emit("search", removeEmptyProperties(unref(formValue)))
}
</script>

<template>
  <div class="card search-com" v-if="slots.length > 0">
    <el-form ref="formRef" :model="formValue">
      <Grid :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol" ref="gridRef">
        <slot :value="formValue" />
        <GridItem suffix>
          <div class="operation" style="text-align: right">
            <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
            <el-button :icon="Delete" @click="onReset">重置</el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? "展开" : "合并" }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp" />
              </el-icon>
            </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>

<style lang="scss">
.search-com {
  .operation {
    margin-bottom: 18px;
  }
}
</style>
