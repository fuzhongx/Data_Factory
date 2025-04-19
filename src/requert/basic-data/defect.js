import service from "@/ulit/requert";

export function List_Defect(params){
    return service ({
        url:'/system/defect/list',
        method:'get',
        params
    })
}

export function edit_Defect(data){
    return service ({
        url:'/system/defect',
        method:'put',
        data
    })
}
export function add_Defect(data){
    return service ({
        url:'/system/defect',
        method:'post',
        data
    })
}