import service from "..";
export function getBanner() {
    return service({
        method:'get',
        url:'/banner?type=2'
    })
}