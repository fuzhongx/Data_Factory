import service from "@/ulit/requert";

export function List_material(params){
    return service ({
        url:'/system/material/list',
        method:'get',
        params
    })
}