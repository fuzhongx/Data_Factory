import service from "@/ulit/requert";

export function List_Attachment(params){
    return service ({
        url:'system/attachment/list',
        method:'get',
        params
    })
}
export function Ruku_Attachment(data){
    return service ({
        url:'/system/purveyor',
        method:'post',
        data
    })
}
export function Ruku_Num_Attachment(data){
    return service ({
        url:'/system/attachment',
        method:'PUT',
        data
    })
}

// 类型
export function inventory_types(params){
    return service ({
        url:'/system/dict/data/type/inventory_types',
        method:'get',
        params
    })
}

// 产品
export function product_list(params){
    return service ({
        url:'/system/product/list',
        method:'get',
        params
    })
}

//物料
export function material_list(params){
    return service ({
        url:'/system/material/list',
        method:'get',
        params
    })
}