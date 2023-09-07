import request from "@/utils/request"

type Result = {
  success: boolean
  data: Array<any>
}

export const getAsyncRoutes = () => {
  return request.request<Result>("get", "/getAsyncRoutes", {}, { useRawRes: true })
}
