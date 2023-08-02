## 节流

防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。

### 思路

1. 第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
2. 将需要触发的方法绑定在指令上

### 示例

```vue
<button v-throttle="throttleClick">节流提交</button>
```

bind value 类型：`CallbackFunction`
