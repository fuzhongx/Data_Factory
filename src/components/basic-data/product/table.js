// 表格配置

export default {
    columns: [
      {
        type: "selection",
        width: "55px",
        align:'center'
      },
      {
        type: "txt",
        prop: "productNumber",
        label: "产品编号",
        width: "auto",
        align:'center',
      },
      {
        type: "txt",
        prop: "productName",
        label: "产品名称",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "routeName",
        label: "工艺路线",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "productUnit",
        label: "库存单位",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "specification", 
        label: "产品规格",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "productAttribute",
        label: "产品属性",
        width: "auto",
        align:'center'
      },
      {
        type: "text",
        prop: 'createName',
        label: "创建人",
        width: "auto",
        align:'center',
      },
      {
        type: "text",
        prop: 'createTime',
        label: "创建时间",
        width: "auto",
        align:'center',
      },
      {
        type: "txt",
        prop: "operation",
        label: "操作",
        width: "auto",
        align:'center'
      },
    ]
  };
  