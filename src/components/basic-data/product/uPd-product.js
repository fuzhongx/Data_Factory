import { Value } from "sass";

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
          field: "routeId",
          disabled:false,
          inpWidthHeight:'activeForm',
          option:[
            {
            label:'产品一工艺路线',
            Value:'1840673631837167617'
          }
        ]
        },
        {
          type: "select",
          label: "库存单位",
          placeholder: "请输入库存单位",
          field: "productUnit",
          disabled:false,
          inpWidthHeight:'activeForm',
          option:[]
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
  