/**
 * 显示成功提示消息
 * @param {string} message
 */
export function showSuccess(message: string) {
  uni.showToast({
    title: message,
    icon: 'success',
    duration: 1000,
  })
}

/**
 * 显示「非」成功提示消息
 * @param {string} message
 */
export function showTip(message: string) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 1000,
  })
}

/**
 * 显示失败提示消息
 * @param {string} message
 */
export function showError(message: string, duration = 1000) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration,
  })
}

export function showLoading(message = '加载中') {
  uni.showLoading({
    title: message,
  })
}

export function hideLoading() {
  uni.hideLoading()
}
