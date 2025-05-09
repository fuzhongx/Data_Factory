import service from "@/ulit/requert";

export function List_Client(params){
    return service ({
        url:'/system/client/list',
        method:'get',
        params
    })
}