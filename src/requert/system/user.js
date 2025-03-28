import service from "@/ulit/requert";

export function deptTree(params){
    return service({
        url: "/system/user/deptTree",
        method: "get",
        params:params
    })
}
export function userList(params){
    return service({
        url: "/system/user/list",
        method: "get",
        params:params
    })
}