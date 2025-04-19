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
        prop: "clientNumber",
        label: "客户编号",
        width: "auto",
        align:'center',
      },
      {
        type: "txt",
        prop: "clientName",
        label: "客户名称",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "clientAvatar",
        label: "客户简称",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "clientContact",
        label: "联系人",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "clientPhone",
        label: "联系电话",
        width: "auto",
        align:'center'
      },
      {
        type: "txt",
        prop: "clientAbbreviation",
        label: "客户地址",
        width: "auto",
        align:'center'
      },
      {
        type: "switch",
        prop: 'status',
        label: "客户状态",
        width: "auto",
        align:'center',
        filed:'false'

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
  