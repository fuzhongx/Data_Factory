import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * @property {handleDaochu} 导出函数
 */
export const handleDaochu = (data) => {
    // 创建一个workbook
    const workbook = XLSX.utils.book_new();
    // 导出数据
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'xlsx');
  
    // 将workbook转为二进制数据
    const excelData = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    // 创建blob对象并保存excel文件
    const blob = new Blob([excelData], { type: "application/octet-stream" });
    // 设置导出文件名字
    saveAs(blob, "xlsx");
  };