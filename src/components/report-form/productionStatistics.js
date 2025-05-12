const column=[
    {
        type: "index",
        label: "",
        width: "55px",
        align:'center'
      },
      {
        type: "link",
        prop: "productName",
        label: "产品名称",
        width: "auto",
        align:'center',
      },
      {
        type: "link",
        prop: "productNumber",
        label: "产品编号",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "specification",
        label: "产品规格",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "productAttribute",
        label: " 产品属性",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "productUnit",
        label: "库存单位",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "customFields",
        label: "工艺路线",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "inventoryMax",
        label: "最大库存",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "inventoryMin",
        label: "最小库存",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "inventorySafe",
        label: "安全库存",
        width: "auto",
        align:'center'
      },
      {
        type: "link",
        prop: "productQuantity",
        label: "库存数量",
        width: "auto",
        align:'center'
      },
      {
        label: "合计",
        width: "auto",
        align:'center',
       childrens:[
        {
            type: "link",
            prop: "plannedQuantity",
            label: "良品数",
            width: "auto",
            align:'center',
            flag:'1-1'
        },
        {
            type: "link",
            prop: "goodQuantity",
            label: "不良品数",
            width: "auto",
            align:'center',
            flag:'1-1'
        },
          
       ]
      },
      
      {
        label: "2025-05-11",
        width: "auto",
        align:'center',
        childrens:[
            {
                type: "link",
                prop: "plannedQuantity",
                label: "良品数",
                width: "auto",
                align:'center',
                flag:'1-1'
            },
            {
                type: "link",
                prop: "goodQuantity",
                label: "不良品数",
                width: "auto",
                align:'center',
                flag:'1-1'
            },
              
           ]
      }
    ]
export default column