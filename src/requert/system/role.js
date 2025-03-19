import service from "@/ulit/requert";

export function roleListApi(params){
    return service({
        url: "/system/role/list",
        method: "get",
        params:params
    })
}
export function addroleAPI(data){
    return service({
        url: "/system/role",
        method: "post",
        data:data
    })
}
export function delroleAPI(data){
    return service({
        url: "/system/role",
        method: "DELETE",
        data:data
    })
}
export function updroleAPI(data){
    return service({
        url: "/system/role",
        method: "put",
        data:data
    })
}
export function treeselectAPI(data){
    return service({
        url: "/system/menu/treeselect",
        method: "get",
        data:data
    })
}

export function checkRoleAPI(data){
    return service({
        url: "system/menu/roleMenuTreeselect",
        method: "get",
        data:data
    })
}

export function dataScopeAPI(data){
    return service({
        url: "/system/role/dataScope",
        method: "put",
        data:data
    })
}