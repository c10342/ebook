<template>
  <div>
    <div id="read"></div>
    <!-- <div class="mask" @touchstart="touchstart" @touchend="touchend"></div> -->
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import {
  saveFontFamily,
  getFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
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
      this.initRendition();
      // 电子书解析完成
      this.book.ready.then(() => {
        // 分页
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
          .then(location => {
            this.setBookAvailable(true);
            // 分页完成刷新进度
            this.refreshLocation()
          });
      });
    },
    touchstart(event) {
      this.touchStartX = event.changedTouches[0].clientX;
      this.timeStamp = event.timeStamp;
    },
    touchend(event) {
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
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.hideTitleAndMenu();
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.hideTitleAndMenu();
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
      }
    },
    toggleTitleAndMenu() {
      if (!this.menuVisible) {
        this.setSettingVisible(-1);
      }
      this.setFontFamilyVisible(false);
      this.setMenuVisible(!this.menuVisible);
    },
    initRendition() {
      const baseUrl = process.env.VUE_APP_BASE_URL;
      // 解析电子书
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default" //兼容微信
      });
      // 获取是否存在进度
      const location = getLocation(this.fileName);
      // 显示电子书
      this.display(location, () => {
        this.initTheme();
        this.initFontFamily();
        this.initFontSize();
        this.initGlobalStyle();
        this.initGuest();
      });

      // this.rendition.display().then(() => {

      // });

      // 内容准备完成
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
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.setDefaultFontSize(fontSize);
        // 设置字体
        this.rendition.themes.fontSize(fontSize);
      }
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.setDefaultFontFamily(font);
        // 设置字体样式
        this.rendition.themes.font(font);
      }
    },
    initTheme() {
      // 注册主题
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      // 选择主题
      this.rendition.themes.select(defaultTheme);
    },
    initGuest() {
      // 监听手势
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
    }
  }
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
}
</style>
