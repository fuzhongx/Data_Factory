import service from "@/ulit/requert";

export function menuApi(params){
    return service({
      url: "/api/v1/menus",
      method: "get",
      params:params
    });
  }