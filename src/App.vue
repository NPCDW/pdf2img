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
      <div>
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
    </div>
    <div class="canvas" :style="{height: height + 'px', width: width + 'px'}">
      <canvas ref="the-canvas" :height="height" :width="width">
      </canvas>
      <input type="file" accept="application/pdf" @change="handlePdfUpload($event)" style="position: absolute;width: 100%;height: 100%;top:0;left: 0;opacity: 0"/>
    </div>
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
      const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/cmaps/';
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
</style>
