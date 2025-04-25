import axios from "axios";
import {procedure} from '@/requert/basic-data/processRoute'

const formItems=[
    {
      type: "input",
      label: "工艺路线编号",
      placeholder: "请输入工艺路线编号",
      field: "processRouteNumber",
      disabled:true,
      inpWidthHeight:'activeForm',
    },
    {
      type: "button",
      label: "自动生成",
      disabled:true,
    },
    {
        type: "input",
        label: "工艺路线名称",
        placeholder: "请输入工艺路线名称",
        field: "processRouteName",
        disabled:false,
        inpWidthHeight:'activeForm',
      },
        {
          type: "textarea",
          label: "备注",
          placeholder: "请输入备注",
          disabled:false,
          inpWidthHeight:'activeForm',
          field: "remark",
        }
  ]

  const tableItem=[
      {
        type: "txt",
        // prop: "processRouteNumber",
        label: "",
        width: "55px",
        align:'center',
      },
      {
        type: "select",
        prop: "procedureName",
        label: "工序",
        width: "auto",
        align:'center',
        options:async()=>{
          const res=await procedure()
          return res.data.rows.map(item=>({
            value:String(item.procedureId),
            label:item.procedureName
          }))
        }
      },
      {
        type: "input",
        prop: "procedureName",
        label: "工艺要求",
        width: "auto",
        disabled:true,
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
export default {
    labelWidth: "96px",
    inline: true,
    formItems,
    tableItem
  };
  