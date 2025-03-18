import service from "@/ulit/requert";

export function loginApi(data){
    return service({
        url: "login",
        method: "post",
        data
    })
}

export function captchaApi(params){
    return service({
        url: "/captchaImage",
        method: "get",
        params:params
    })
}
export function listApi(params){
    return service({
        url: "/tenant/list",
        method: "get",
        params:params
    })
}
export function refreshToken(data){
    return service({
        url: "/api/v1/auth/refresh-token",
        method: "post",
        data
    })
}
