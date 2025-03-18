import service from "@/ulit/requert"

export function getRouter(params){
    return service({
        url: "/getRouters",
        method: "get",
        params:params
    })
}