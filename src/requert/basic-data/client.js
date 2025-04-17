import service from "@/ulit/requert";

export function List_Client(params){
    return service ({
        url:'/system/client/list',
        method:'get',
        params
    })
}

export function uPd_Client(data){
    return service ({
        url:'/system/client',
        method:'put',
        data
    })
}
export function Add_Client(data){
    return service ({
        url:'/system/client',
        method:'post',
        data
    })
}