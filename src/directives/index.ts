import { App, Directive } from "vue"

import auth from "./auth"
import copy from "./copy"
import waterMarker from "./waterMarker"
import draggable from "./draggable"
import debounce from "./debounce"
import throttle from "./throttle"
import longpress from "./longpress"

const directivesList: { [key: string]: Directive } = {
  auth,
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  longpress,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

// 调用：app.use(directives)
export default directives
