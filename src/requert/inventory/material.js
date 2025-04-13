import service from "@/ulit/requert";

export function List_material(params){
    return service ({
        url:'/system/material/list',
        method:'get',
        params
    })
}

export function uPd_material(data){
    return service ({
        url:'/system/material',
        method:'put',
        data
    })
}

export function Add_material(data){
    return service ({
        url:'/system/material',
        method:'post',
        data
    })
}