import service from "@/ulit/requert";

export function List_product(params){
    return service ({
        url:'/system/CustomInfo/list',
        method:'get',
        params
    })
}

export function Edit_product(data){
    return service ({
        url:'/system/CustomInfo',
        method:'put',
        data
    })
}
export function add_product(data){
    return service ({
        url:'/system/CustomInfo',
        method:'post',
        data
    })
}

export function custom_type(data){
    return service ({
        url:'/system/dict/data/type/custom_type',
        method:'get',
        data
    })
}