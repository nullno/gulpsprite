# gulpsprite
适用PC/移动端的生成雪碧图glup工具

执行：
1.把需要合并的图片放到images 文件夹
2.根据项目使用如下命令
3.生成PX-xxxx/REM-xxxx 目录包含（sprite.css，sprite.png） 


```
npm run px 

npm run rem 

npm run clean
```





# 移动端适配

## hotcss
https://www.npmjs.com/package/hotcss

```
<meta name="hotcss" content="design-width=750">
<script src="/path/to/hotcss.js"></script>
<style>
body {width:7.5rem;margin:0 auto;}
</style> 
```


## setrem
```
   <script>
    (function (win, doc) {
      if (!win.addEventListener) return;
      var html = document.documentElement;
      function setFont() {
        var html = document.documentElement;
        var k = 750;
        html.style.fontSize = html.clientWidth / k * 100 + "px";
      }
      setFont();
      setTimeout(function () {
        setFont();
      }, 300);
      doc.addEventListener('DOMContentLoaded', setFont, false);
      win.addEventListener('resize', setFont, false);
      win.addEventListener('load', setFont, false);
    })(window, document);
   </script>
```
