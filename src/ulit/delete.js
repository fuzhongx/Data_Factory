import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
import cookies from 'vue-cookies'
const token = cookies.get('token')

export const handleDelete=(data)=>{
    ElMessageBox.confirm(
        '是否删除此选项！',
        '系统提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
    
        }
      ).then(() => {
        axios({
          url: data.url + data.ArrayId,
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
          if (response.data.code == 200) {
            ElMessage.success('删除成功')
            data.method()
          }
          else { ElMessage.error(response.data.msg) }
        })
      }).catch(()=>{
        ElMessage.error('操作取消') 
      })
}

export default handleDelete