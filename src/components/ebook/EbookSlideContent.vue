<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          class="slide-contents-search-input"
          type="text"
          v-model="searchText"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage"
          @keyup.enter.exact='search'
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage()"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="48" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :class="{'selected': section === index}"
          :style="contentItemStyle(item)"
          @click="displayContent(item.href)"
        >{{item.label}}</span>
        <!-- <span class="slide-contents-item-page">{{item.page}}</span> -->
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContent(item.cfi, true)"
      ></div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import Scroll from "../common/Scroll";
import { px2rem } from "../../utils/utils";
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data() {
    return {
      searchText: "",
      searchVisible: false,
      searchList:[]
    };
  },
  methods: {
    search(){
      if(this.searchText && this.searchText.length>0){
        this.doSearch(this.searchText).then(list=>{
          // 对关键词进行高亮显示
          list = list.map(item=>{
            item.excerpt = item.excerpt.replace(this.searchText,`<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
          this.searchList = list
        })
      }
    },
    // 全文搜索
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(section =>
          section
            .load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)));//二维数组变一维数组
    },
    displayContent(target,highLight=false) {
      this.display(target, () => {
        this.hideTitleAndMenu();
        if(highLight){
          // 进行高亮显示
          this.currentBook.rendition.annotations.highlight(target)
        }
      });
    },
    showSearchPage() {
      this.searchVisible = true;
    },
    hideSearchPage() {
      this.searchVisible = false;
      this.searchText = ''
      this.searchList = []
    },
    contentItemStyle(item) {
      return `${px2rem(item.level * 15)}rem`;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: 0.36rem;
    margin: 0.2rem 0 0.1rem 0;
    padding: 0 0.15rem;
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      .center();
      .slide-contents-search-icon {
        flex: 0 0 0.28rem;
        font-size: 0.12rem;
        .center();
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: 0.32rem;
        font-size: 0.14rem;
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 0.5rem;
      font-size: 0.14rem;
      .right();
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: 0.9rem;
    padding: 0.1rem 0.15rem 0.2rem 0.15rem;
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 0.45rem;
      .slide-contents-book-img {
        width: 0.45rem;
        height: 0.6rem;
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 0.1rem;
      box-sizing: border-box;
      .slide-contents-book-title {
        width: 1.54rem;
        font-size: 0.14rem;
        line-height: 0.16rem;
        .left();
        .slide-contents-book-title-text {
          .ellipsis();
        }
      }
      .slide-contents-book-author {
        width: 1.54rem;
        font-size: 0.12rem;
        line-height: 0.14rem;
        margin-top: 0.1rem;
        .left();
        .slide-contents-book-author-text {
          .ellipsis();
        }
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 0.7rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .slide-contents-book-progress {
        .progress {
          font-size: 0.14rem;
        }
        .progress-text {
          font-size: 0.12rem;
        }
      }
      .slide-contents-book-time {
        font-size: 0.12rem;
        margin-top: 0.05rem;
      }
    }
  }
  .slide-contents-list {
    padding: 0 0.15rem;
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: 0.2rem 0;
      box-sizing: border-box;
      .slide-contents-item-label {
        // width: 2.5rem;
        // overflow: hidden;
        flex: 1;
        font-size: 0.14rem;
        line-height: 0.16rem;
        .ellipsis();
      }
      .slide-contents-item-page {
        flex: 0 0 0.3rem;
        font-size: 0.1rem;
        .right();
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 0.15rem;
    box-sizing: border-box;
    .slide-search-item {
      font-size: 0.14rem;
      line-height: 0.16rem;
      padding: 0.2rem 0;
      box-sizing: border-box;
    }
  }
}
</style>
