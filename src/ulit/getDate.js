/**
 * @param {dateValue}获取当前时间
 */
export const dateValue = () => {
  const date = new Date()
  const y = date.getFullYear()
  const w = (date.getMonth() + 1)>= 10 ? (date.getMonth()+1) : '0' + (date.getMonth()+1)
  const d = date.getDate()>= 10 ? date.getDate() : '0' + date.getDate()
  const h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  const m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  // const s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  return y+w+d+h+m 
}