const kToken = 'token'
const kTokenExpire = 'token_expire'
const kUserInfo = 'user_info'

/**
 * @param token
 * @param expire 过期时间，时间戳，秒
 */
export function saveToken(token: string, expire: number) {
  uni.setStorageSync(kToken, token)
  uni.setStorageSync(kTokenExpire, expire)
}

export function getToken(): string | undefined {
  return uni.getStorageSync(kToken) || undefined
}

export function clearUserInfo() {
  uni.removeStorageSync(kToken)
  uni.removeStorageSync(kUserInfo)
  uni.removeStorageSync(kTokenExpire)
}

export function getOptions() {
  const pages = getCurrentPages()
  const currentPages = pages[pages.length - 1]
  const options = (currentPages as any).options
  return options
}

// 手机号验证
export function checkphone(phone: string) {
  if (phone.trim() == '') {
    return false
  }
  if (
    phone.match(
      /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    )
  ) {
    return true
  } else {
    return false
  }
}

/**
 * 获取当前日期是第几周
 * @param dateTime 当前传入的日期值
 * @returns 返回第几周数字值
 */
export function getWeek(dateTime: Date): number {
  let temptTime = new Date(dateTime.getTime())
  // 周几
  let weekday = temptTime.getDay() || 7
  // 周1+5天=周六
  temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
  let firstDay = new Date(temptTime.getFullYear(), 0, 1)
  let dayOfWeek = firstDay.getDay()
  let spendDay = 1
  if (dayOfWeek != 0) spendDay = 7 - dayOfWeek + 1
  firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
  let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
  let result = Math.ceil(d / 7)
  return result
}
/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(date: Date, format: string): string {
  let we = date.getDay() // 星期
  let z = getWeek(date) // 周
  let qut = Math.floor((date.getMonth() + 3) / 3).toString() // 季度
  const opt: { [key: string]: string } = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    'q+': qut, // 季度
  }
  // 中文数字 (星期)
  const week: { [key: string]: string } = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
  }
  // 中文数字（季度）
  const quarter: { [key: string]: string } = {
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
  }
  if (/(W+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '星期' + week[we]
          : '周' + week[we]
        : week[we]
    )
  if (/(Q+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut]
    )
  if (/(Z+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length == 3 ? '第' + z + '周' : z + ''
    )
  for (let k in opt) {
    let r = new RegExp('(' + k + ')').exec(format)
    // 若输入的长度不为1，则前面补零
    if (r)
      format = format.replace(
        r[1],
        RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0')
      )
  }
  return format
}
