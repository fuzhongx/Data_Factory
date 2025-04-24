import service from "@/ulit/requert";

export function List_processRoute(params){
    return service ({
        url:'/system/processRoute/list',
        method:'get',
        params
    })
}

export function procedure(params){
    return service ({
        url:'/system/procedure/list',
        method:'get',
        params
    })
}
