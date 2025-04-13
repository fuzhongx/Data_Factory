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
      prop: "materialNumber",
      label: "物料编码",
      width: "auto",
      align:'center',
    },
    {
      type: "txt",
      prop: "materialName",
      label: "物料名称",
      width: "auto",
      align:'center'
    },
    {
      type: "txt",
      prop: "materialUnit",
      label: "物料单位",
      width: "auto",
      align:'center'
    },
    {
      type: "txt",
      prop: "specification",
      label: "物料规格",
      width: "auto",
      align:'center'
    },
    {
      type: "txt",
      prop: "materialAttribute",
      label: "物料属性",
      width: "auto",
      align:'center'
    },
    {
      type: "txt",
      prop: "createName",
      label: "姓名",
      width: "auto",
      align:'center'
    },
    {
      type: "txt",
      prop: "createTime",
      label: "创建时间",
      width: "auto",
      align:'center'
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
