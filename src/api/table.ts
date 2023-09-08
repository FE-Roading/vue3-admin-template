import request from "@/utils/request"

export const getSimpleTableData = params => {
  return request.request<any>("get", "/table/simple", { params })
}
