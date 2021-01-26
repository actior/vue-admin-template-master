let promiseNumber = new Number()
function promise() {
  return new Promise(resolve => {
    MessageBox.confirm('当前是否直接支付30万', '确认', {
      confirmButtonText: '支付',
      cancelButtonText: '不支付',
      type: 'warning'
    }).then(() => {
      promiseNumber = 1
      resolve(promiseNumber)
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消支付，请在五回合支付清损失及赔偿，否则强制变卖资产或提供利息信贷'
      });
    });
  })
}
await promise().then(data => {
  promiseNumber = data
})
if (promiseNumber === 1) {
  console.log(123)
  if (NP.minus(infoItem.money, 3000000) < 0) {
    infoItem.borrower = NP.minus(infoItem.money, 300000)
  }
  infoItem.money = NP.minus(infoItem.money, 300000)
}
