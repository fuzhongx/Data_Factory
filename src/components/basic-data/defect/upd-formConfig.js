export default {
    LabelWidth:'100px',
    inline:true,
    formItems: [
      {
        type: "input",
        label: "不良项编号",
        placeholder: "请输入不良项编号",
        field: "defectNumber",
        disabled:true,
        inpWidthHeight:'activeForm',
      },
      {
        type: "button",
      },
      {
          type: "input",
          label: "不良项名称",
          placeholder: "请输入不良项名称",
          field: "defectName",
          disabled:false,
          inpWidthHeight:'activeForm',
        },
        {
            type: "textarea",
            label: "备注",
            placeholder: "请输入备注",
            field: "remark",
            disabled:false,
            inpWidthHeight:'activeForm',
          },
          
    ],
    rules:{
      defectNumber: [
        { required: true, message: '请输入不良项编号', trigger: 'blur' },
      ],
      defectName: [
        { required: true, message: '请输入不良项名称', trigger: 'blur' },
      ]
    }
  };