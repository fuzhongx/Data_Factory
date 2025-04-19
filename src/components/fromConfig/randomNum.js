
import { dateValue } from '@/ulit/getDate';
/**
* 自动生成编码
*/
export const randomCode=(modelValue)=>{
 
let randomNum = '';
for (let i = 0; i < 5; i++) {
   randomNum += Math.floor(Math.random() * 10);
}

//库存物料
let randomCode='WL'+dateValue()+randomNum
modelValue.value.materialNumber= randomCode

//客户
let randomClient='KH'+dateValue()+randomNum
 modelValue.value.clientNumber= randomClient

 //不良项
let randomDefect='BL'+dateValue()+randomNum
 modelValue.value.defectNumber= randomDefect
}