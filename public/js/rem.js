function remSize() {
    // 获取设备宽度
    let devWidth = document.documentElement.clientWidth || window.innerHeight
    if (devWidth >= 750) {
        devWidth = 750
    } else if (devWidth <= 320) {
        devWidth = 320
    }
    // 750px ==> 1rem=100px,  375px ==> 1rem=50px
    // document.documentElement 获取html元素
    document.documentElement.style.fontSize = (devWidth/7.5)+'px'
    document.body.style.fontSize = 0.3+'rem'
}
remSize()
window.onresize = function () {
    remSize()
}