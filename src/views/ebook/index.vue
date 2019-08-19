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
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMemu
  }
};
</script>
