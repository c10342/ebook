<template>
  <div>
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import {
  saveFontFamily,
  getFontFamily,
  getFontSize,
  saveFontSize
} from "../../utils/localStorage";
import Epub from "epubjs";
global.ePub = Epub;
export default {
  mixins: [ebookMixin],
  mounted() {
    // const filename = this.$route.params.filename;
    const filename = "Biomedicine|2014_Book_Self-ReportedPopulationHealthA";
    if (filename) {
      const files = filename.split("|").join("/");
      this.setFileName(files);
      this.initEpub();
    }
  },
  methods: {
    initEpub() {
      // const baseUrl = "http://192.168.1.101:8001";
      const baseUrl = process.env.VUE_APP_BASE_URL;
      const url = `${baseUrl}/epub/${this.fileName}.epub`;
      this.book = Epub(url);
      this.setCurrentBook(this.book);
      // 解析电子书
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default" //兼容微信
      });
      // 显示电子书
      this.rendition.display().then(() => {
        this.initFontFamily();
        this.initFontSize();
      });
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.timeStamp = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetx = event.changedTouches[0].clientX - this.touchStartX;
        const timeStamp = event.timeStamp - this.timeStamp;
        if (offsetx > 40 && timeStamp < 500) {
          //从左往右，并且操作时间不大于500ms
          this.prevPage();
        } else if (offsetx < 0 && timeStamp < 500) {
          // 从右往左
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        event.preventDefault();
        event.stopPropagation();
      });
      this.rendition.hooks.content.register(contents => {
        // 往iframe中添加样式文件
        // contents.addStylesheet(`${baseUrl}/fonts/cabin.css`)
        // contents.addStylesheet(`${baseUrl}/fonts/daysOne.css`)
        // contents.addStylesheet(`${baseUrl}/fonts/montserrat.css `)
        // contents.addStylesheet(`${baseUrl}/fonts/tangerine.css`)
        Promise.all([
          contents.addStylesheet(`${baseUrl}/fonts/cabin.css`),
          contents.addStylesheet(`${baseUrl}/fonts/daysOne.css`),
          contents.addStylesheet(`${baseUrl}/fonts/montserrat.css `),
          contents.addStylesheet(`${baseUrl}/fonts/tangerine.css`)
        ]).then(() => {
          console.log("字体加载完成");
        });
      });
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.hideTitleAndMenu();
        this.rendition.prev();
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.hideTitleAndMenu();
        this.rendition.next();
      }
    },
    toggleTitleAndMenu() {
      if (!this.menuVisible) {
        this.setSettingVisible(-1);
      }
      this.setFontFamilyVisible(false);
      this.setMenuVisible(!this.menuVisible);
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setFontFamilyVisible(false);
      this.setSettingVisible(-1);
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.setDefaultFontSize(fontSize);
        this.rendition.themes.fontSize(fontSize);
      }
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.setDefaultFontFamily(font);
        this.rendition.themes.font(font);
      }
    }
  }
};
</script>
