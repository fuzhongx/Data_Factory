import service from "@/ulit/requert";

export function List_Produce(params){
    return service ({
        url:'/system/product/list',
        method:'get',
        params
    })
}

export function add_Produce(data){
    return service ({
        url:'/system/product',
        method:'post',
        data
    })
}
export function edit_Produce(data){
    return service ({
        url:'/system/product',
        method:'put',
        data
    })
}

export function List_processRoute(params){
    return service ({
        url:'/system/processRoute/list',
        method:'get',
        params
    })
}


export function produce_unit(params){
    return service ({
        url:'/system/dict/data/type/produce_unit',
        method:'get',
        params
    })
}