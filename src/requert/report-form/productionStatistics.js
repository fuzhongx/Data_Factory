import service from "@/ulit/requert";

export function List_productionStatistics(params){
    return service ({
        url:'/system/product/productionStatistics',
        method:'get',
        params
    })
}