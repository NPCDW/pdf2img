# pdf2img PDF转图片

基于 [pdfjs](https://github.com/mozilla/pdf.js/releases/tag/v2.11.338) 实现的在线PDF转图片功能

试一下：[https://npcdw.github.io/pdf2img/](https://npcdw.github.io/pdf2img/)

为什么要编写此项目？
1. 领导让我把 PDF 首页截个图当封面
2. 网上大部分这种项目都是收费的，或者让你关注公众号啥的
3. 隐私保护，信息可以泄露，但不能从我手上泄露出去

没有保存，就没有泄露

本站声明，绝不会保存您的任何资源

打开网页后，您可以断网（拔网线或开飞行模式）进行操作

![image](https://user-images.githubusercontent.com/32638459/147827418-87467a31-44ce-46c3-9316-856ab60c1598.png)

|  引用库   | 目的  |
|  ----  | ----  |
| [pdfjs](https://github.com/mozilla/pdf.js/releases/tag/v2.11.338)  | PDF转为Canvas |
| [jszip](https://github.com/Stuk/jszip)  | 将Canvas转的Blob数据，打包进一个zip文件中 |
| [FileSaver.js](https://github.com/eligrey/FileSaver.js)  | 下载文件 |
| [element-ui](https://github.com/ElemeFE/element)  |  |
| [vue](https://github.com/vuejs/vue)  |  |
