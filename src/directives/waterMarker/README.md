## 元素水印

给元素添加背景水印。

### 思路

1. 使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等
2. 将其设置为背景图片，从而实现页面或组件水印效果

### 示例

```vue
<div v-waterMarker="{ text: '版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }"></div>
```

bind value 类型：

```ts
{
  text: string // 水印文本
  font: string // 水印的字体类型设置
  textColor: string // 水印颜色
}
```
