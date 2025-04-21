import service from "@/ulit/requert";

export function List_Produc(params){
    return service ({
        url:'/system/product/list',
        method:'get',
        params
    })
}
export function List_processRoute(params){
    return service ({
        url:'/system/processRoute/list',
        method:'get',
        params
    })
}