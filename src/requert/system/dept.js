import service from "@/ulit/requert";

export function deptListApi(params){
    return service({
        url: "/system/dept/list",
        method: "get",
        params:params
    })
}
export function adddeptAPI(data){
    return service({
        url: "/system/dept",
        method: "post",
        data:data
    })
}
export function deldeptAPI(data){
    return service({
        url: "/system/dept",
        method: "post",
        data:data
    })
}
export function upddeptAPI(data){
    return service({
        url: "/system/dept",
        method: "put",
        data:data
    })
}
