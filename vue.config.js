const cdn = {
    css: [
        "//unpkg.zhimg.com/element-ui@2.15.6/lib/theme-chalk/index.css",
    ],
    js: [
        "//unpkg.zhimg.com/vue@2.6.11/dist/vue.min.js",
        "//unpkg.zhimg.com/element-ui@2.15.6/lib/index.js",
        "//unpkg.zhimg.com/pdfjs-dist@2.4.456/build/pdf.min.js",
        "//unpkg.zhimg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js",
        "//unpkg.zhimg.com/jszip@3.7.1/dist/jszip.min.js",
        "//unpkg.zhimg.com/file-saver@2.0.5/dist/FileSaver.min.js",
    ]
}

module.exports = {
    publicPath: './',
    outputDir:"docs",   // 打包时生成的生产环境构建文件的目录
    productionSourceMap: process.env.NODE_ENV !== 'production',
    chainWebpack: config => {
        config.resolve.symlinks(true)
        if (process.env.NODE_ENV === 'production') {
            config.plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end()
        }
    },
    configureWebpack: {
        externals: {
            vue: "Vue",
            "element-ui": "ELEMENT",
            "pdfjs-dist": "pdfjsLib",
            "pdfjs-dist/build/pdf.worker.entry": "pdfjsWorker",
            "jszip": "JSZip",
            "file-saver": "saveAs",
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'PDF转图片',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            cdn: cdn
        }
    }
}