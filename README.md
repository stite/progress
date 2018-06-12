# progress.js 一个网页加载进度插件
如果页面内容够多，加载页面前期有个进度条，对用户来说是很美好的一个体验，但javascript并没有一个方法可以监控到页面的加载进度，只能通过模拟，或手动计算加载到哪里给出多少进度，而progress.js算是一个伪装的加载进度，根据DOM加载完及图片加载多少给出加载了多少进度，算出一个不是很准确的伪进度条

## 使用
```html
<script src="build/progress.min.js"></script>
<script>
  var progress = new progress();
</script>
```
* 这里的引用需要放在页面的顶部
如：
```html
<title>页面title</title>
<script src="build/progress.min.js"></script>
<script>
  var progress = new progress();
</script>
```
注意注意需要放在页面顶部，不然进度条非常不准确

## 自定义进度条
<table width="100%">
    <thead>
        <tr>
            <td>参数</td>
            <td>默认值</td>
            <td>说明</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>必填</td>
            <td>#自定义进度条ID</td>
        </tr>
        <tr>
            <td>domload</td>
            <td>false</td>
            <td>是否DOM加载完隐藏进度条</td>
        </tr>
        <tr>
            <td>width</td>
            <td>-</td>
            <td>宽度的domId</td>
        </tr>
        <tr>
            <td>number</td>
            <td>-</td>
            <td>进度数字的domId</td>
        </tr>
    </tbody>
</table>

例：
```js
var progress = new progress({
  id: 'jindu-load', // 自定义loadID
  width: 'process-width',
  number: 'process-dom',
});
```
### 方法
#### change
监听进度变化时执行，例：
```js
var progress = new progress({
  id: 'jindu-load', // 自定义loadID
  width: 'process-width',
  number: 'process-dom',
});
progress.change(function(d){
  console.log(d);
})
```
[demo](http://www.stite.net/content/progress/)