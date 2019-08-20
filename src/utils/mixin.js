import { mapGetters, mapMutations } from 'vuex'
import { themeList, removeAllCss, addCss } from "./book";

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
        }
    }
}