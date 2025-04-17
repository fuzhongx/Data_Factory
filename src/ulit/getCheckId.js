import { ref } from "vue";
import bus from "@/ulit/Bus.js";

/**
 * 
 * @param {表格选中返回数据} row 
 */
export const getMaterialTableId = (row) => {
  const newId = ref(new Set());
  row.forEach((item) => {
    newId.value.add(item.materialId);
    const getCheckedBoxID = Array.from(newId.value);
    bus.emit("getCheckedBoxID", Array.from(getCheckedBoxID));
  });
};

export const getClientTableId = (row) => {
    const newId = ref(new Set());
    row.forEach((item) => {
      newId.value.add(item.materialId);
      const getCheckedBoxID = Array.from(newId.value);
      bus.emit("getCheckedBoxID", Array.from(getCheckedBoxID));
    });
  };
