
import service from "@/ulit/requert";

export function dataApi(params){
    return service({
        url: "/api/v1/logs/visit-stats",
        method: "get",
        params:params
    })
}
export function homeEacarts(params){
    return service({
        url: "/api/v1/logs/visit-trend",
        method: "get",
        params:params
    })
}
