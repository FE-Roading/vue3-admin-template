import type { Directive, DirectiveBinding } from "vue"
interface ElType extends HTMLElement {
  __handleThrottleClick__: () => any
  disabled: boolean
}
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function"
    }
    let timer: NodeJS.Timeout | null = null
    el.__handleThrottleClick__ = function () {
      if (timer) {
        clearTimeout(timer)
      }
      if (!el.disabled) {
        el.disabled = true
        binding.value()
        timer = setTimeout(() => {
          el.disabled = false
        }, 1000)
      }
    }
    el.addEventListener("click", el.__handleThrottleClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleThrottleClick__)
  },
}

export default throttle
