export default {
    LabelWidth:'68px',
    inline:true,
    formItems:[{
        type: 'input',
        label: '库存编号',
        placeholder: '请输入库存编号',
        field:'username'
      },
      {
        type: 'password',
        label: '库存编号',
        placeholder: '请输入库存编号',
        field:'password'
      },
    
      {
        type: 'select',
        label: '状态',
        placeholder: '请选择状态',
        field:'select',
        option: [
          {
            label: "正常",
            value: "0"
          },
          {
            label: "异常",
            value: "1"
          },
        ]
      },
      {
        type: 'switch',
        label: '库存编号',
        field:'switch',
        placeholder: '请输入库存编号'
      },
      {
        type: 'radio',
        label: '库存编号',
        field:'radio',
        placeholder: '请输入库存编号',
        radio:[
            {
                label:'正常',
                value:'radio1'
            },
            {
                label:'停用',
                value:'radio2'
            },
        ]
      },
      {
        type: 'checkbox',
        label: '库存编号',
        field:'kucun',
        placeholder: '请输入库存编号',
        checkbox:[
            {
            label:'正常',
            name:'type',
            value:'checkbox'
        },
        {
            label:'停用',
            name:'type',
            value:'checkbox2'
        },
    ]
      },
      {
        type: 'date',
        label: '日期',
        field:'date',
        placeholder: '请输入库存编号'
      },]
}
