import service from "..";
// 获取游客信息 /register/anonimous
export function getAnonimous() {
    return service({
        method: 'get',
        url: '/register/anonimous'
    })
}
// 二维码key生成接口
export function getQrKey() {
    return service({
        method:'get',
        url:'/login/qr/key'
    })
}
// 二维码生成接口
export function getQrCode(key,time) {
    return service({
        method:'get',
        url:`/login/qr/create?key=${key}&qrimg=true&timestamp=${time}`
    })
}
// 检测二维码登录状态
export function checkQr(key) {
    return service({
        method:'get',
        url:`/login/qr/check?key=${key}`
    })
}

// 退出登录
export function logout() {
    return service({
        method:'get',
        url:'/logout'
    })
}
