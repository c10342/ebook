<template>
  <div class='ebook' ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-memu></ebook-memu>
    <ebook-book-mark></ebook-book-mark>
  </div>
</template>

<script>
import EbookReader from "../../components/ebook/EbookReader";
import EbookTitle from "../../components/ebook/EbookTitle";
import EbookMemu from "../../components/ebook/EbookMemu";
import EbookBookMark from '../../components/ebook/EbookBookMark'
import { getReadTime, saveReadTime } from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMemu,
    EbookBookMark
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        readTime = 0;
      }
      this.task = setInterval(() => {
        readTime++;
        // 每30秒保存一次阅读时间
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime);
        }
      }, 1000);
    }
  },
  mounted() {
    this.startLoopReadTime();
  },
  watch:{
    offsetY(v){
      if(this.menuVisible || !this.bookAvailable){
        return
      }
      if(v>0){
        this.$refs.ebook.style.top = `${v}px`
      }else if(v== 0){
        this.$refs.ebook.style.transition = 'all .2s linear'
        this.$refs.ebook.style.top = 0
        setTimeout(() => {
          this.$refs.ebook.style.transition = ''
        }, 200);
      }
    }
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task);
    }
  }
};
</script>

<style lang="less" scoped>
.ebook{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
