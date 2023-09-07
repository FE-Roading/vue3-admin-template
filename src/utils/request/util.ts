import { getToken as _getToken } from "@/utils/auth"

/**
 * 获取token字符串
 * @returns string
 */
export function getToken() {
  return _getToken().accessToken
}

// token格式化。例如添加JWT前缀之类的
export { formatToken } from "@/utils/auth"
