<template>
  <div>
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Epub from "epubjs";
global.ePub = Epub;
export default {
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
    ...mapMutations({
      setFileName: "book/setFileName",
      setMenuVisible:'book/setMenuVisible'
    }),
    initEpub() {
      const baseUrl = "http://192.168.1.101:8001/epub/";
      const url = `${baseUrl}${this.fileName}.epub`;
      this.book = Epub(url);
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default" //兼容微信
      });
      this.rendition.display();
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
      });
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.hideTitleAndMenu()
        this.rendition.prev();
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.hideTitleAndMenu()
        this.rendition.next();
      }
    },
    toggleTitleAndMenu() {
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu(){
      this.setMenuVisible(false)
    }
  },
  computed: {
    ...mapGetters({
      fileName: "book/fileName",
      menuVisible:'book/menuVisible'
    })
  }
};
</script>
