import { v4 as uuidv4 } from 'uuid';
// 游客的uuid
export const get_uuid = ()=>{
    // 获取到uuid
    let wyy_uuid = localStorage.getItem('wyy_token')
    // 如果没有就设置一个
    if(!wyy_uuid){
        wyy_uuid = uuidv4()
        localStorage.setItem('wyy_token',uuid)
    }
    return wyy_uuid
}