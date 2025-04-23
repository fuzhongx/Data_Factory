import {
  List_processRoute,
  produce_unit
} from '@/requert/basic-data/product.js'

const formItems=[
    {
      type: "input",
      label: "产品编号",
      placeholder: "请输入产品编号",
      field: "productNumber",
      disabled:true,
      inpWidthHeight:'activeForm',
    },
    {
      type: "button",
      disabled:true,
    },
    {
        type: "input",
        label: "产品名称",
        placeholder: "请输入产品名称",
        field: "productName",
        disabled:false,
        inpWidthHeight:'activeForm',
      },
      {
          type: "input",
          label: "产品规格",
          placeholder: "请输入产品规格",
          field: "specification",
          disabled:false,
          inpWidthHeight:'activeForm',
        },
        {
          type: "input",
          label: "产品属性",
          placeholder: "请输入产品属性",
          field: "productAttribute",
          disabled:false,
          inpWidthHeight:'activeForm',
        },
        {
          type: "select",
          label: "工艺路线",
          placeholder: "请输入工艺路线",
          field: "routeName",
          disabled:false,
          inpWidthHeight:'activeForm',
          options:async () => {
            try {
              const res = await List_processRoute();
              return res.data.rows.map(item => ({
                label: item.processRouteName,
                value: item.processRouteId
              }));
            } catch (error) {
              console.error("获取工艺路线失败:", error);
              return []; // 返回空数组避免页面报错
            }
          }
        },
        {
          type: "select",
          label: "库存单位",
          placeholder: "请输入库存单位",
          field: "productUnit",
          disabled:false,
          inpWidthHeight:'activeForm',
          options:async () => {
            try {
              const res = await produce_unit();
              return res.data.data.map(item => ({
                label: item.dictLabel,
                value: item.dictValue
              }));
            } catch (error) {
              console.error("获取工艺路线失败:", error);
              return []; // 返回空数组避免页面报错
            }
          }
        },
        {
          type: "textarea",
          label: "备注",
          placeholder: "请输入备注",
          disabled:false,
          inpWidthHeight:'activeForm',
          field: "remark",
        }
  ]

export default {
    labelWidth: "68px",
    inline: true,
    formItems
  };
  