<template>
  <div>
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-memu></ebook-memu>
  </div>
</template>

<script>
import EbookReader from "../../components/ebook/EbookReader";
import EbookTitle from "../../components/ebook/EbookTitle";
import EbookMemu from "../../components/ebook/EbookMemu";
import { getReadTime, saveReadTime } from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMemu
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
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task);
    }
  }
};
</script>
