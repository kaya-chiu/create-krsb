export const showLoading = (message) => {
  const frames = ['-', '\\', '|', '/']
  let i = 0

  const interval = setInterval(() => {
    process.stdout.write(`\r${frames[i]} ${message}`)
    i = (i + 1) % frames.length
  }, 100)

  // 返回停止動畫的方法
  return () => clearInterval(interval)
}
