import { ElTable } from "element-plus"
import { toRefs, toRaw, unref, ref, shallowReactive } from "vue"

type UseTableHookProps<T> = {
  page: number
  pageSize: number
  total: number
  data: T[]

  loading: boolean

  selections: T[]
}

export type UseTableDataTransferRes = {
  page: number
  pageSize: number
  total: number
  data: any[]
}

interface UseTableParameters {
  api: (params: any) => Promise<any>
  paramsTransfer?: (params: Record<string, any>) => any
  dataTransfer?: (data: any) => UseTableDataTransferRes
}

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * */
export default function useTable<T = any>({ api, paramsTransfer, dataTransfer }: UseTableParameters) {
  // 表格 DOM 元素
  const tableRef = ref<InstanceType<typeof ElTable>>()
  const prevParams = ref<Record<string, any>>({})

  const state = shallowReactive<UseTableHookProps<T>>({
    page: 1,
    pageSize: 10,
    total: 0,

    loading: false,
    data: [],
    selections: [],
  })

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableData = async (query: Record<string, any> = {}) => {
    if (!api) return
    try {
      let params = Object.assign({ page: state.page, pageSize: state.pageSize }, unref(toRaw(query)))
      if (paramsTransfer) {
        params = paramsTransfer(params)
      }

      state.loading = true
      const data = await api(params)
      const formattedData: UseTableDataTransferRes = dataTransfer ? dataTransfer(data) : data

      Object.assign(state, {
        ...formattedData,
        loading: false,
      })
      console.log(formattedData)

      // 不是刷新页面，删除选中项
      if (state.page !== prevParams.value.page) {
        onClearSelection()
      }

      prevParams.value = params
    } catch (error) {
      Object.assign(state, {
        loading: false,
        data: [],
      })
    }
  }

  const refresh = () => {
    getTableData(unref(prevParams))
  }

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const onPageSizeChange = (size: number) => {
    state.page = 1
    state.pageSize = size

    getTableData()
  }

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const onPageChange = (page: number) => {
    state.page = page

    getTableData()
  }

  const onSelectionChange = (data: T[]) => {
    state.selections = data
  }

  const onClearSelection = () => {
    state.selections = []
    tableRef.value!.clearSelection()
  }

  return {
    ...toRefs(state),
    getTableData,
    onPageSizeChange,
    onPageChange,
    refresh,
    onSelectionChange,
    onClearSelection,

    tableRef,
  }
}
