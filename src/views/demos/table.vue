<template>
  <div class="table-box">
    <TablePage
      rowKey="id"
      ref="proTable"
      title="用户列表"
      :columns="columns"
      :request-api="getTableData"
      border
      search-visible
      :search-initial-value="searchInitialValue"
      :search-default-value="searchDefaultValue"
    >
      <!-- 表格 header 按钮 -->
      <template #search>
        <SearchItem index="0" label="field1" prop="field1">
          <template #default="query">
            <el-input placeholder="input field" v-model="query.value.field1" />
          </template>
        </SearchItem>
        <SearchItem index="0" label="field2" prop="field2">
          <template #default="query">
            <el-input placeholder="input field" v-model="query.value.field2" />
          </template>
        </SearchItem>
        <SearchItem index="0" label="field3" prop="field3">
          <template #default="query">
            <el-input placeholder="input field" v-model="query.value.field3" />
          </template>
        </SearchItem>
      </template>
      <template #headerLeft>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="console.log"> 新增用户 </el-button>
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="console.log"> 批量添加用户 </el-button>
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="console.log"> 导出用户数据 </el-button>
        <el-button type="primary" plain @click="toDetail"> To 子集详情页面 </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- usernameHeader -->
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
        </el-button>
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="onOperate(scope)"> 查看 </el-button>
        <el-button type="primary" link :icon="EditPen" @click="onOperate(scope)"> 编辑 </el-button>
        <el-button type="primary" link :icon="Refresh" @click="onOperate(scope)"> 重置密码 </el-button>
        <el-button type="primary" link :icon="Delete" @click="onOperate(scope)"> 删除 </el-button>
      </template>
    </TablePage>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { TablePage } from "@/components/TablePage"
import { TablePageInstance, ColumnProps } from "@/components/TablePage"
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue"
import { getSimpleTableData } from "@/api/table"
import { SearchItem } from "@/components/Search"

const router = useRouter()

const searchInitialValue = reactive({
  field1: "field1 inited",
})

const searchDefaultValue = reactive({
  field1: "default inited",
})

// 跳转详情页
const toDetail = () => {
  router.push(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`)
}

// 获取 TablePage 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<TablePageInstance>()

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 TablePage 组件上绑定	:requestApi="getUserList"
const getTableData = (params: any) => {
  const newParams = JSON.parse(JSON.stringify(params))
  newParams.createTime && (newParams.startTime = newParams.createTime[0])
  newParams.createTime && (newParams.endTime = newParams.createTime[1])
  delete newParams.createTime

  return getSimpleTableData(newParams)
}

// 自定义渲染表头（使用tsx语法）
const headerRender = scope => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}>
      {scope.column.label}
    </el-button>
  )
}

// 表格配置项
const columns: ColumnProps<any>[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "#", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "username",
    label: "用户姓名",
    resizable: true,
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
          {scope.row.username}
        </el-button>
      )
    },
  },
  {
    prop: "gender",
    headerRender(_) {
      return <div>dddd</div>
    },
    fieldNames: { label: "genderLabel", value: "genderValue" },
  },
  {
    // 多级 prop
    prop: "user.detail.age",
    label: "年龄",
  },
  { prop: "idCard", label: "身份证号", search: { el: "input" } },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    fieldNames: { label: "userLabel", value: "userStatus" },
    render: scope => {
      return (
        <>
          {scope.row.status ? (
            <el-switch
              model-value={scope.row.status}
              active-text={scope.row.status ? "启用" : "禁用"}
              active-value={1}
              inactive-value={0}
              onClick={console.log}
            />
          ) : (
            <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
          )}
        </>
      )
    },
  },
  {
    prop: "createTime",
    label: "创建时间",
    headerRender,
    width: 180,
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 },
]

function onOperate(data) {
  console.log("data: ", data)
}
</script>
