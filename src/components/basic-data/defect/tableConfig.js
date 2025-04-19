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
        prop: "defectNumber",
        label: "不良项编号",
        width: "auto",
        align:'center',
      },
      {
        type: "txt",
        prop: "defectName",
        label: "不良项名称",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "defectName",
        label: "不良项姓名",
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
        width: "180px",
        align:'center'
      },
    ]
  };
  