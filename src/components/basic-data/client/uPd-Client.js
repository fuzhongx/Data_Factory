// 编辑操作配置
export default {
    LabelWidth:'100px',
    inline:false,
    formItems:[{
        type: 'input',
        label: '客户编号',
        placeholder: '请输入客户编号',
        disabled:true,
        field:'clientNumber',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'input',
        label: '客户名称',
        placeholder: '请输入客户名称',
        disabled:false,
        field:'clientName',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'input',
        label: '客户简称',
        placeholder: '请输入客户简称',
        disabled:false,
        field:'clientAvatar',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'input',
        label: '联系人',
        placeholder: '请输入联系人',
        disabled:false,
        field:'clientContact',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'input',
        label: '联系电话',
        placeholder: '请输入联系电话',
        disabled:false,
        field:'clientPhone',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'input',
        label: '客户地址',
        placeholder: '请输入客户地址',
        disabled:false,
        field:'clientAbbreviation',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'textarea',
        label: '备注',
        placeholder: '请输入备注',
        disabled:false,
        field:'remark',
        inpWidthHeight:'activeForm',
      }
      ],
      rules:{
        clientNumber: [
          { required: true, message: '请输入客户编号', trigger: 'blur' },
        ],
        clientName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
        ]
      }
}