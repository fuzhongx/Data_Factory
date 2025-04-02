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