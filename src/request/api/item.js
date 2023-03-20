import service from "..";
// 获取歌单详情页的数据
export function getMusicItemList(data){
    return service({
        method:'get',
        url:`/playlist/detail?id=${data}`
    })
}
// 获取歌单列表
export function getMusicList(id){
    return service({
        method:'get',
        // detail?id
        url:`/playlist/track/all?id=${id}&limit=10&offset=0`
    })
}
// 获取歌词 /lyric?id=33894312
export function getLyrics(id){
    return service({
        method:'get',
        url:`/lyric?id=${id}`
    })
}

// 搜索结果
export function getSearchList(kw){
    return service({
        method:'get',
        url:`/cloudsearch?keywords=${kw}`
    })
}

// 歌曲推荐
export function getMusicRec(){
    return service({
        method:'get',
        url:'/personalized/newsong'
    })
}
