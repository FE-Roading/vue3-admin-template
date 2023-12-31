import { message } from "@/utils/message"
import { useEventListener } from "@vueuse/core"
import { copyTextToClipboard } from "@pureadmin/utils"
import { toRaw, type Directive, type DirectiveBinding } from "vue"

interface CopyEl extends HTMLElement {
  copyValue: string
}

const copy: Directive = {
  mounted(el: CopyEl, binding: DirectiveBinding) {
    const { value } = binding
    if (value) {
      el.copyValue = toRaw(value)
      const arg = binding.arg ?? "dblclick"
      // Register using addEventListener on mounted, and removeEventListener automatically on unmounted
      useEventListener(el, arg, () => {
        const success = copyTextToClipboard(el.copyValue)
        success ? message("复制成功", { type: "success" }) : message("复制失败", { type: "error" })
      })
    } else {
      throw new Error('[Directive: copy]: need value! Like v-copy="modelValue"')
    }
  },
  updated(el: CopyEl, binding: DirectiveBinding) {
    el.copyValue = binding.value
  },
}

export default copy
