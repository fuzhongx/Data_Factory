
import service from "@/ulit/requert";

export function postListApi(params){
    return service({
        url: "/system/post/list",
        method: "get",
        params:params
    })
}
export function addpostAPI(data){
    return service({
        url: "/system/post",
        method: "post",
        data:data
    })
}
export function delpostAPI(data){
    return service({
        url: "/system/post",
        method: "post",
        data:data
    })
}
export function updpostAPI(data){
    return service({
        url: "/system/post",
        method: "put",
        data:data
    })
}
