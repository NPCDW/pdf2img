<template>
  <div class="container">
    <div style="margin-right: 20px;">
      <div style="margin-bottom: 40px">
        <template>
          <el-button type="primary" @click="_renderPage(currentPage, scale + 0.25, rotate)" style="margin-right: 8px" :disabled="pdfDoc == null">放大</el-button>
          <span style="margin-right: 8px">{{ (scale * 100) + '%' }}</span>
          <el-button type="primary" @click="_renderPage(currentPage, scale - 0.25, rotate)" style="margin-right: 8px" :disabled="pdfDoc == null">缩小</el-button>
        </template>
        <template>
          <el-input-number v-model="currentPage" @change="_renderPage(currentPage, scale, rotate)" :min="1" :max="total" />
          <span style="margin-right: 8px"> / {{ total }} </span>
        </template>
        <template>
          <el-button type="primary" @click="_renderPage(currentPage, scale, rotate - 90)" style="margin-right: 8px" :disabled="pdfDoc == null">旋转</el-button>
          <span style="margin-right: 8px"> {{ rotate }}° </span>
        </template>
      </div>
      <div style="margin-bottom: 40px">
        <div style="margin-bottom: 10px">请选择导出图片选项</div>
        <div style="margin-bottom: 10px">
          <el-radio v-model="exportImgRadio" :label="0" >当前页</el-radio>
          <el-radio v-model="exportImgRadio" :label="1" >全部页</el-radio>
          <el-radio v-model="exportImgRadio" :label="2" >自定义范围</el-radio>
        </div>
        <div style="margin-bottom: 10px" v-if="exportImgRadio === 2">
          <el-input-number v-model="startPage" :min="1" :max="total"></el-input-number>
          <span> - </span>
          <el-input-number v-model="endPage" :min="1" :max="total"></el-input-number>
        </div>
        <div>
          <el-button @click="exportImg" :loading="exportImgButtonLoading" :disabled="pdfDoc == null" type="primary">导出图片</el-button>
        </div>
      </div>
      <div style="margin-bottom: 40px">
        <p style="text-align: center; color: red;">没有保存，就没有泄露</p>
        <p style="text-align: center; color: red;">本站声明，绝不会保存您的任何资源</p>
        <p style="text-align: center; color: red;">如果不放心，您可以断网（拔网线或开飞行模式）进行操作</p>
      </div>
    </div>
    <div class="canvas" :style="{height: height + 'px', width: width + 'px'}">
      <canvas ref="the-canvas" :height="height" :width="width">
      </canvas>
      <input type="file" accept="application/pdf" @change="handlePdfUpload($event)" style="position: absolute;width: 100%;height: 100%;top:0;left: 0;opacity: 0"/>
    </div>
    <a href="https://github.com/NPCDW/pdf2img" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'
import { saveAs } from 'file-saver';
import JSZip from 'jszip'

PDFJS.workerSrc = workerSrc;

export default {
  name: 'App',
  data() {
    return {
      pdfDoc: null,
      currentPage: 1,
      total: 0,
      scale: 1,
      rotate: 0,
      height: 842,
      width: 595,

      exportImgRadio: 0,
      exportImgButtonLoading: false,
      startPage: 1,
      endPage: 1,
      fileName: null,
    };
  },
  methods: {
    exportImg() {
      this.exportImgButtonLoading = true
      this.$nextTick(() => {
        if (this.exportImgRadio === 0) {
          new Promise((resolve) => {
            this.canvasToImg(this.currentPage, this.scale, this.rotate, resolve)
          }).then((imgData) => {
            saveAs(imgData, this.fileName + '.' + this.currentPage + ".png");
            this.exportImgButtonLoading = false
          })
        } else {
          if (this.exportImgRadio === 1) {
            this.startPage = 1
            this.endPage = this.total
          }
          let allPromise = []
          let zip = new JSZip();
          let img = zip.folder(this.fileName);
          for (let i = this.startPage; i <= this.endPage; i++) {
            let promise = new Promise((resolve) => {
              this.canvasToImg(i, this.scale, this.rotate, resolve)
            }).then((imgData) => {
              img.file(i + '.png', imgData);
            })
            allPromise.push(promise)
          }
          Promise.all(allPromise).then(() => {
            zip.generateAsync({type:"blob"}).then(content => saveAs(content, this.fileName + ".zip"));
            this.exportImgButtonLoading = false
          })
        }
      })
    },
    canvasToImg(currentPage, scale, rotate, resolve) {
      this.pdfDoc.getPage(currentPage).then((page) => {
        let viewport = page.getViewport({scale, rotation: rotate});

        let canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        page.render(renderContext).promise.then(() => {
          canvas.toBlob((imgData) => {
            resolve(imgData)
          })
        });
      })
    },
    _renderPage(currentPage, scale, rotate) {
      if (currentPage < 1) {
        currentPage = 1
      }
      if (currentPage > this.total) {
        currentPage = this.total
      }
      this.currentPage = currentPage
      if (scale < 0.25) {
        return
      }
      this.scale = scale
      this.rotate = rotate % 360
      this.pdfDoc.getPage(currentPage).then((page) => {
        let viewport = page.getViewport({scale, rotation: rotate});

        let canvas = this.$refs['the-canvas'];
        let context = canvas.getContext('2d');
        this.height = viewport.height;
        this.width = viewport.width;

        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      })
    },
    _loadFile(data) {
      // https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/cmaps/
      const CMAP_URL = 'https://unpkg.zhimg.com/pdfjs-dist@2.4.456/cmaps/';
      PDFJS.getDocument({data: data, cMapUrl: CMAP_URL, cMapPacked: true}).promise.then((pdf) => {
        this.pdfDoc = pdf
        this.total = pdf.numPages
        this.scale = 1
        this.currentPage = 1
        this.rotate = 0
        this.$nextTick(() => {
          this._renderPage(this.currentPage, this.scale, this.rotate);
        });
      })
    },
    handlePdfUpload(event) {
      let file = event.target.files[0];
      if (!file) {
        return
      }
      this.fileName = file.name.substr(0, file.name.length - 4)
      let self = this
      let reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = function(){
        self._loadFile(this.result)
      }
    },
  }
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 24px;
  display: flex;
}

.canvas {
  box-shadow: 0 0 5px 1px #999;
  position: relative;
}

.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
</style>
