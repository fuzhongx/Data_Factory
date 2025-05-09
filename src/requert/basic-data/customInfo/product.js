import service from "@/ulit/requert";

export function List_product(params){
    return service ({
        url:'system/CustomInfo/list',
        method:'get',
        params
    })
}