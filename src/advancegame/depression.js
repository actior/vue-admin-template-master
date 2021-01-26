import NP from 'number-precision'

export function depression(playerformLine, playerItem, roundNum, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if ([1, 2].includes(playerformLine.dice)) {
      if ([3, 46].includes(Math.abs(playerformLine.event))) {
        if (playerItem.skillDepressed === 1) {
          Message({
            message: '心理咨询师/观音免疫抑郁症',
            type: 'success',
            duration: 3 * 1000
          })
        } else {
          if (playerItem.depressed === 4) {
            if (playerItem.bankihttpRun) {
              if (NP.minus(roundNum, playerItem.bankihttpRun) <= 10) {
                playerItem.money = NP.plus(playerItem.money, 1000000)
              } else {
                console.log('银行保险已经过期了')
              }
            } else {
              console.log('暂时没有购买银行保险')
            }
            playerItem.money = playerItem.money - 500000
          }
          ++playerItem.depressed
          playerItem.cashFlow = playerItem.cashFlow - 2000
        }
      } else {
        if (playerItem.skillHealth === 1) {
          Message({
            message: '技能太极大师免疫亚健康',
            type: 'success',
            duration: 3 * 1000
          })
        } else {
          if (playerItem.health === 2) {
            if (playerItem.bankihttpRun) {
              if (NP.minus(roundNum, playerItem.bankihttpRun) <= 10) {
                playerItem.money = NP.plus(playerItem.money, 1000000)
              } else {
                console.log('银行保险已经过期了')
              }
            } else {
              console.log('暂时没有购买银行保险')
            }
            playerItem.money = NP.minus(playerItem.money, 500000)
          }
          ++playerItem.health
          playerItem.cashFlow = playerItem.cashFlow - 2000
        }
      }
    }
  }
  return playerItem
}
