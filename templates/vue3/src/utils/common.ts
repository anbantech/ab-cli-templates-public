import { ElMessage as Message } from 'element-plus'
import store from '../store'
/**
 * throw error if NODE_ENV is development
 */
export function warn(msg: any, pop = true, context?: any): void | never {
  if (pop) {
    const message = typeof msg === 'string' ? msg : msg.data && msg.data.errorInfo ? msg.data.errorInfo : msg.message
    if (context) {
      context.$message.error(message)
    } else {
      Message.error(message)
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('%cSTACK DETAILS ONLY SHOW IN TEST ENVIRONMENT\n', 'background:#FF1A2E;color: white;', new Error(msg))
  }
}

export function formateDate(date: string | Date | undefined | null, type: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' = 'YYYY-MM-DD') {
  const currentDate = typeof date === 'string' ? new Date(date) : date && (date as Date).getTime ? date : new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()

  const ymd = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  const hms = ` ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

  if (type === 'YYYY-MM-DD') return ymd
  if (type === 'YYYY-MM-DD HH:mm:ss') return ymd + hms
}

export function Types() {
  return Object.freeze({
    0: '待审核',
    1: '未通过',
    2: '已发布',
    3: '待提交'
  })
}

export function isSampleUser() {
  const vuexUser = store.state.userName
  const userInfoString = localStorage.getItem('userInfo') || '{"role": 0}'
  const userInfo = JSON.parse(userInfoString)
  return vuexUser === userInfo.name
}
