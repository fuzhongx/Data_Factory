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
        prop: "processRouteNumber",
        label: "工艺路线编号",
        width: "auto",
        align:'center',
      },
      {
        type: "txt",
        prop: "processRouteName",
        label: "工艺路线名称",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "createName",
        label: "创建人",
        width: "auto",
        align:'center'
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
  