import {custom_type} from "@/requert/basic-data/customInfo/product.js";
// 编辑操作配置
export default {
    LabelWidth:'122px',
    inline:false,
    formItems:[{
        type: 'input',
        label: '自定义字段名',
        placeholder: '请输入自定义字段名',
        disabled:false,
        field:'customName',
        inpWidthHeight:'activeForm',
      },
      {
        type: 'select',
        label: '自定义字段类型',
        placeholder: '请输入自定义字段类型',
        disabled:false,
        field:'customType',
        inpWidthHeight:'activeForm',
        options:async()=>{
            const res=await custom_type()
            return res.data.data.map(item=>({
                label:item.dictLabel,
                value:item.dictValue
            }))
          }
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
        customName: [
          { required: true, message: '请输入自定义字段名', trigger: 'blur' },
        ],
        customType: [
          { required: true, message: '请输入自定义字段类型', trigger: 'blur' },
        ]
      }
}