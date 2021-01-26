import NP from 'number-precision'

export function settlement(item, roundNum) {
  item.disabled = true
  if (item.creditRound !== 0) {
    --item.creditRound
    // item.money = item.money + item.cashFlow - item.carExpenses - item.credit / 10
    item.money = NP.minus(NP.plus(item.money, item.cashFlow), item.carExpenses, NP.divide(item.credit, 10))
  } else {
    if (roundNum === 1) {
      // item.money = item.money + item.cashFlow
      item.money = NP.plus(item.money, item.cashFlow)
    } else {
      // item.money = item.money + item.cashFlow - item.carExpenses
      item.money = NP.minus(NP.plus(item.money, item.cashFlow), item.carExpenses)
    }
  }
  if (item.marriages === 1 && NP.minus(roundNum, item.testssetRound) === 2) {
    // 生育孩子时间2回合
    item.marriages = 2 // 标识已经生过小孩了
    item.testsset = item.eventTestsset ? NP.plus(item.eventTestsset, item.testsset) : NP.plus(item.testsset, 1)
    item.cashFlow = item.eventTestsset ? NP.minus(item.cashFlow, NP.times(10000, item.eventTestsset)) : NP.minus(item.cashFlow, 10000) // 当事件发生双胞胎减掉双倍现金流
  }
  if (item.economyId) {
    if (item.economyId === 8 && NP.minus(roundNum, item.economyRound) === 3) {
      item.cashFlow = NP.plus(item.cashFlow, item.reduceshFlow)
      item.assetsdiscount = 1
      item.economyId = -1
    }
  }
  if (item.housingId) {
    if (item.housingId === 10 && NP.minus(roundNum, item.housingRound) === 2) {
      item.assetsdiscount = 1
      item.housingId = -1
    }
  }
  return item
}
