import NP from "number-precision";
import {
  Message
} from "element-ui";

export function research(
  playerformLine,
  playerItem,
  copyIntel,
  roundNum,
  playerIndex
) {
  if (playerformLine.number - 1 === playerIndex) {
    if ([5, 6].includes(playerItem.type)) {
      if (playerformLine.dice) {
        if ([1, 3, 5].includes(playerformLine.dice)) {
          const inteltable = [] // 知识产权
          copyIntel.forEach(item => {
            if (item.type === 5) {
              item.monryType = 2
              item.moneyId = Math.ceil(Math.random() * 9999999999999)
              item.intelnumber = playerformLine.assetsNum
              item.intelround = roundNum
              inteltable.push(item)
            }
          })
          if (playerItem.type === 5) {
            playerItem.money = NP.minus(playerItem.money, 2000)
            playerItem.cashFlow = NP.plus(playerItem.cashFlow, 5000)
          } else if (playerItem.type === 6) {
            playerItem.money = NP.minus(playerItem.money, 6000)
            playerItem.cashFlow = NP.plus(playerItem.cashFlow, 5000)
          }
          playerItem.inteArray = playerItem.inteArray.concat(inteltable)
        } else {
          if (playerItem.type === 5) {
            playerItem.money = NP.minus(playerItem.money, 2000)
          } else if (playerItem.type === 6) {
            playerItem.money = NP.minus(playerItem.money, 6000)
          }
        }
      } else {
        Message({
          message: "未选择骰子"
        })
      }
    } else {
      if (playerItem.developed == 1) {
        playerItem.developed = 0
          ++playerItem.skill
        if (playerItem.type === 1) {
          playerItem.money = NP.minus(playerItem.money, 30000)
        } else if (playerItem.type === 2) {
          playerItem.money = NP.minus(playerItem.money, 20000)
        } else if (playerItem.type === 3) {
          playerItem.money = NP.minus(playerItem.money, 10000)
        } else if (playerItem.type === 4) {
          playerItem.money = NP.minus(playerItem.money, 10000)
        }
      } else {
        if (playerItem.type === 1) {
          playerItem.money = NP.minus(playerItem.money, 30000)
            ++playerItem.developed
        } else if (playerItem.type === 2) {
          playerItem.money = NP.minus(playerItem.money, 20000)
            ++playerItem.developed
        } else if (playerItem.type === 3) {
          playerItem.money = NP.minus(playerItem.money, 10000)
            ++playerItem.developed
        } else if (playerItem.type === 4) {
          playerItem.money = NP.minus(playerItem.money, 10000)
            ++playerItem.developed
        }
      }
    }
  } else {
    console.log('0')
    if (playerItem.type === 3) {
      console.log('1')
      // 公务员被动加现金流
      if ([1, 3, 5].includes(playerformLine.dice)) {
        console.log('2')
        playerItem.cashFlow = playerItem.cashFlow + 500
      }
    }
  }
}
