import { mapGetters, mapMutations } from 'vuex'
import { themeList, removeAllCss, addCss } from "./book";
import { saveLocation } from "./localStorage";
import { getReadTimeByMinute } from './book'

export const ebookMixin = {
    computed: {
        ...mapGetters({
            fileName: "book/fileName",
            menuVisible: 'book/menuVisible',
            settingVisible: 'book/settingVisible',
            defaultFontSize: 'book/defaultFontSize',
            defaultFontFamily: 'book/defaultFontFamily',
            fontFamilyVisible: 'book/fontFamilyVisible',
            defaultTheme: 'book/defaultTheme',
            bookAvailable: 'book/bookAvailable',
            progress: 'book/progress',
            section: 'book/section',
            isPaginating: 'book/isPaginating',
            currentBook: 'book/currentBook',
            navigation: 'book/navigation',
            cover: 'book/cover',
            metadata: 'book/metadata',
            paginate: 'book/paginate',
            pagelist: 'book/pagelist',
            offsetY: 'book/offsetY',
            isBookmark: 'book/isBookmark'
        }),
        themeList() {
            return themeList(this);
        }
    },
    methods: {
        ...mapMutations({
            setFileName: "book/setFileName",
            setMenuVisible: "book/setMenuVisible",
            setSettingVisible: 'book/setSettingVisible',
            setDefaultFontSize: 'book/setDefaultFontSize',
            setDefaultFontFamily: 'book/setDefaultFontFamily',
            setFontFamilyVisible: 'book/setFontFamilyVisible',
            setDefaultTheme: 'book/setDefaultTheme',
            setBookAvailable: 'book/setBookAvailable',
            setProgress: 'book/setProgress',
            setSection: 'book/setSection',
            setIsPaginating: 'book/setIsPaginating',
            setCurrentBook: 'book/setCurrentBook',
            setNavigation: 'book/setNavigation',
            setCover: 'book/setCover',
            setMetadata: 'book/setMetadata',
            setPaginate: 'book/setPaginate',
            setPagelist: 'book/setPagelist',
            setOffsetY: 'book/setOffsetY',
            setIsBookmark: 'book/setIsBookmark'
        }),
        initGlobalStyle() {
            const baseUrl = process.env.VUE_APP_BASE_URL
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(`${baseUrl}/theme/theme_default.css`)
                    break
                case 'Eye':
                    addCss(`${baseUrl}/theme/theme_eye.css`)
                    break
                case 'Gold':
                    addCss(`${baseUrl}/theme/theme_gold.css`)
                    break
                case 'Night':
                    addCss(`${baseUrl}/theme/theme_night.css`)
                    break
                default:
                    addCss(`${baseUrl}/theme/theme_default.css`)
                    break
            }
        },
        // 刷新进度
        refreshLocation() {
            // 获取当前位置
            const currentLocation = this.currentBook.rendition.currentLocation();
            if (currentLocation && currentLocation.start && currentLocation.start.cfi) {
                const startCfi = currentLocation.start.cfi
                // 根据cfi获取当前进度百分比
                const progress = this.currentBook.locations.percentageFromCfi(
                    startCfi
                );
                // 保存章节
                this.setSection(currentLocation.start.index)
                this.setProgress(Math.floor(progress * 100));
                // 保存当前章节内容
                saveLocation(this.fileName, startCfi)
            }
        },
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) {
                        cb()
                    }
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) {
                        cb()
                    }
                })
            }
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false);
            this.setFontFamilyVisible(false);
            this.setSettingVisible(-1);
        },

        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        }
    }
}