import service from "@/ulit/requert";

export function List_purveyor(params){
    return service ({
        url:'/system/purveyor/list',
        method:'get',
        params
    })
}