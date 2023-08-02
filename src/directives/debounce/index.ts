import type { Directive, DirectiveBinding } from "vue"
interface ElType extends HTMLElement {
  __handleDebounceClick__: () => any
}
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function"
    }
    let timer: NodeJS.Timeout | null = null
    el.__handleDebounceClick__ = function () {
      if (timer) {
        clearInterval(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 500)
    }
    el.addEventListener("click", el.__handleDebounceClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleDebounceClick__)
  },
}

export default debounce
