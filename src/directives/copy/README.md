## 文本复制

在绑定指令的标签上双击即可复制标签内的文本。

### 思路

1. 初始化时，将需要被复制的内容绑定到指令上。
2. 双击元素时，自动将内容复制到剪贴板。

### 示例

```vue
<span v-copy="debounceClick">节流提交</button>
```

bind value 类型：`string | Ref<string>`
