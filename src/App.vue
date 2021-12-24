<template>
  <div class="canvas-container">
    <input type="file" accept="application/pdf" @change="handlePdfUpload($event)"/>
    <div style="margin-bottom: 10px">
      <template>
        <span style="margin-right: 8px">{{ (scale * 100) + '%' }}</span>
        <el-button type="primary" @click="_renderPage(currentPage, scale + 0.25)" style="margin-right: 8px">放大
        </el-button>
        <el-button type="primary" @click="_renderPage(currentPage, scale - 0.25)" style="margin-right: 8px">缩小
        </el-button>
      </template>
      <template>
        <el-input-number v-model="jumpPage" @pressEnter="_renderPage(jumpPage, scale)" :min="1" :max="total" />
        <span style="margin-right: 8px"> / {{ total }} </span>
        <el-button :disabled="currentPage === 1" @click="_renderPage(--currentPage, scale)" style="margin-right: 8px">
          上一页
        </el-button>
        <el-button :disabled="currentPage === total" @click="_renderPage(++currentPage, scale)" type="primary"
                   style="margin-right: 8px">下一页
        </el-button>
      </template>
    </div>
    <canvas ref="the-canvas">
    </canvas>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'

PDFJS.workerSrc = workerSrc;

export default {
  name: 'Pdf',
  data() {
    return {
      pdfDoc: null,
      currentPage: 1,
      total: 0,
      scale: 1,
      spinning: false,
      jumpPage: 1,
    };
  },
  methods: {
    _renderPage(currentPage, scale) {
      if (currentPage < 1) {
        currentPage = 1
      }
      if (currentPage > this.total) {
        currentPage = this.total
      }
      this.jumpPage = this.currentPage = currentPage
      if (scale < 0.25) {
        return
      }
      this.scale = scale
      this.spinning = true
      this.pdfDoc.getPage(currentPage).then((page) => {
        let viewport = page.getViewport({scale: this.scale,});

        let canvas = this.$refs['the-canvas'];
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      }).finally(() => {
        this.spinning = false
      });
    },
    _loadFile(data) {
      const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/cmaps/';
      PDFJS.getDocument({data: data, cMapUrl: CMAP_URL, cMapPacked: true}).promise.then((pdf) => {
        this.pdfDoc = pdf
        this.total = pdf.numPages
        this.$nextTick(() => {
          this._renderPage(this.currentPage, this.scale);
        });
      })
    },
    handlePdfUpload(event) {
      if (!event.target.files[0]) {
        return
      }
      let self = this
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0])
      reader.onload = function(){
        self._loadFile(this.result)
      }
    },
  }
};
</script>

<style scoped>
.canvas-container {
  margin: 0 auto;
  padding: 24px;
}

canvas {
  box-shadow: 0 0 5px 1px #999
}
</style>
