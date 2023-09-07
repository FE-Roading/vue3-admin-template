import Axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios"
import { ElLoading } from "element-plus"

import NProgress from "../progress"
import { getToken, formatToken } from "./util"
import { defaultConfig, RequestTokenKey, tokenDenyList, urlPrefix } from "./config"
import { RequestError, handleError } from "./errorHandler"
import { BusinessResponse, PureHttpError, PureHttpRequestConfig, PureHttpResponse, RequestErrorStage, RequestMethods } from "./type.d"

class PureHttp {
  private static loadingInstance: {
    close: CallableFunction
  }

  axiosInstance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = Axios.create(config)

    this.initRequestInterceptors()
    this.initResponseInterceptors()
  }

  // 请求拦截器
  private initRequestInterceptors() {
    // axios的拦截器运行顺序与添加顺序相反：先添加的后运行
    this.addRequestLoadingInterceptor()

    this.addRequestTokenInterceptor()
  }

  // 响应拦截器
  private initResponseInterceptors() {
    this.addResponseInterceptor()
  }

  // 添加token的请求拦截器：如果在config中添加了beforeRequestCallback函数，则会直接执行并返回。
  private addRequestTokenInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig): any => {
        // 如果传入了自定义的请求回调，则直接执行
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config)
          return config
        }

        // 不需要token的接口设置
        if (tokenDenyList.some((v) => config.url.indexOf(v) > -1)) {
          config.withToken = false
        }

        if (config.withToken) {
          config.headers = config.headers ?? new AxiosHeaders()

          const token = getToken()
          // @ts-ignore
          config.headers.set(RequestTokenKey, formatToken(token))
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  // 添加请求的Loading拦截器
  private addRequestLoadingInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig): any => {
        // 开启进度条动画
        NProgress.start()

        if (config.showLoading) {
          PureHttp.loadingInstance = ElLoading.service({ fullscreen: !config.loadingTarget, target: config.loadingTarget })
        }

        PureHttp.requestUrlConfig(config)

        return config
      },
      (error) => {
        NProgress.done()
        PureHttp.closeLoading()

        return Promise.reject(error)
      },
    )
  }

  private addResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config
        // 关闭进度条动画
        NProgress.done()
        if ($config.showLoading) {
          PureHttp.closeLoading()
        }

        // 如果有响应回调函数，直接执行并返回
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response)
          return response.data
        }

        const data: BusinessResponse = response.data
        // 直接使用原始响应，则直接返回
        if ($config.useRawRes) return data

        // 如果正常响应的代码不是200，则处理业务错误
        if (data.code != 200) {
          const requestError = new RequestError(RequestErrorStage.REQUEST_INTERCEPTOR, false, response.data)
          if ($config.showError !== false) {
            handleError(requestError)
          }

          return Promise.reject(requestError)
        }

        return response.data.data
      },
      (error: PureHttpError) => {
        // 关闭进度条动画
        NProgress.done()
        if (error.config.showLoading) {
          PureHttp.closeLoading()
        }

        // 生成新的对象
        const isCancel = Axios.isCancel(error)
        const requestError = new RequestError(RequestErrorStage.REQUEST_INTERCEPTOR, isCancel, error)

        // 对于非取消错误、需要显示错误信息的错误处理
        if (error.config.showError !== false && !isCancel) {
          handleError(requestError)
        }

        return Promise.reject(requestError)
      },
    )
  }

  // URL前缀处理：如果是以http或https开头，则不添加前缀
  private static requestUrlConfig(config: PureHttpRequestConfig): void {
    if (/^(http|https):\/\//.test(config.url)) return

    let _urlPrefix = urlPrefix
    if (urlPrefix.endsWith("/")) {
      _urlPrefix = _urlPrefix.substring(0, _urlPrefix.length - 1)
    }

    config.url = _urlPrefix + (config.url.startsWith("/") ? "" : "/") + config.url
  }

  private static closeLoading(): void {
    if (PureHttp.loadingInstance) {
      PureHttp.loadingInstance.close()
      PureHttp.loadingInstance = null
    }
  }

  /** 通用请求工具函数 */
  public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: PureHttpRequestConfig): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as PureHttpRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("post", url, params, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("get", url, params, config)
  }

  public put<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("put", url, params, config)
  }

  public patch<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("patch", url, params, config)
  }

  public delete<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("delete", url, params, config)
  }
}

const defRequest = new PureHttp(defaultConfig)

export default defRequest
