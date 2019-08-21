
// 把px换算成rem
export function px2rem(px) {
    const ratio = 375 / 100
    return px / ratio
}

//   换算出不同屏幕下的px
export function realPx(px) {
    const maxWidth = window.innerWidth > 750 ? 750 : window.innerWidth
    return px * (maxWidth / 375)
}
