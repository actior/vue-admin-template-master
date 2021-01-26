import NP from 'number-precision'
// 银行信贷信用卡
export function imageCredits(playerformLine, playerItem, roundNum) {
  if (playerItem.type === 5) {
    playerItem.credit = NP.plus(playerItem.credit, NP.times(playerformLine.noble, 1))
  } else {
    playerItem.credit = NP.plus(playerItem.credit, NP.times(playerformLine.noble, 1.1))
  }
  playerItem.money = NP.plus(playerItem.money, playerformLine.noble)
  playerItem.round = roundNum
  playerItem.creditRound = 10
  return playerItem
}
