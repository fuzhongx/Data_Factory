
export default {
    LabelWidth:'68px',
      inline:true,
      formItems:[{
          type: 'input',
          label: '物料编号',
          placeholder: '请输入物料编号',
          field:'materialNumber'
        },
        {
          type: 'input',
          label: '物料名称',
          placeholder: '请输入物料名称',
          field:'materialName'
        },
        {
          type: 'select',
          label: '库存单位',
          placeholder: '请输入库存单位',
          field:'materialUnit',
          option:[
            {
                label: "个",
                value: "个"
              },
              {
                label: "件",
                value: "件"
              },
              {
                label: "套",
                value: "套"
              },
              {
                label: "PCS",
                value: "PCS"
              },
          ]
        },
        {
          type: 'input',
          label: '物料规格',
          placeholder: '请输入物料规格',
          field:'specification'
        },
        {
          type: 'input',
          label: '物料属性',
          placeholder: '请输入物料属性',
          field:'materialAttribute'
        },
        {
          type: 'input',
          label: '备注',
          placeholder: '请输入备注',
          field:'remark'
        },
        ]
  }