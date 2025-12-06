//封装本地读取数据与存储数据的方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
//封装本地读取数据与存储数据的方法
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
