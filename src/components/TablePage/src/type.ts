import { VNode, ComponentPublicInstance } from "vue"
import { TableColumnCtx } from "element-plus"
import type { SearchCol } from "@/components/Search"
import TablePage from "./src/index.vue"

export interface RePaginationProps {
  page: number
  pageSize: number
  total: number

  layout?: string
  pageSizes?: number[]
}

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}

export type RenderScope<T> = {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export type HeaderRenderScope<T> = {
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader">> {
  [x: string]: FieldNamesProps | any

  tag?: boolean // 是否是标签展示
  isHide?: boolean // 是否隐藏改列
  enum?: EnumProps[] | ((params?: any) => Promise<any>) // 枚举类型（字典）
  isFilterEnum?: boolean // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
  headerRender?: (scope: HeaderRenderScope<T>) => VNode // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
  _children?: ColumnProps<T>[] // 多级表头
}

export interface TablePageProps {
  // 是否显示搜索栏
  searchVisible?: boolean
  searchInitialValue?: { [key: string]: any }
  searchDefaultValue?: { [key: string]: any }
  searchCol?: SearchCol

  columns: ColumnProps[] // 列配置项  ==> 必传
  data?: any[] // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string // 表格标题，目前只在打印的时候用到 ==> 非必传
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
}

export type TablePageInstance = Omit<InstanceType<typeof TablePage>, keyof ComponentPublicInstance | keyof TablePageProps>
