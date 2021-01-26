import NP from 'number-precision'
import {
  Message
} from "element-ui";
// 奇人技能费用计算
export function skillMoney(playerItem, playerformLine, copySkill, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    // 技能花费
    let skillTasket = 0
    if (playerItem.skill > playerItem.skillList.length) {
      const skillofthe = [] // 奇人技能表
      copySkill.forEach(item => {
        if (playerformLine.ofthe === item.id) {
          item.skillOftheNumber = 1
          skillofthe.push(item)
          skillTasket = item.cost
        }
      })
      playerItem.skillList = playerItem.skillList.concat(skillofthe)
      if (playerformLine.ofthe == '3') {
        playerItem.cashFlow = playerItem.cashFlow + 2000
      } else if (playerformLine.ofthe == '9') {
        playerItem.cashFlow = playerItem.cashFlow + 1000
      } else if (playerformLine.ofthe == '10') {
        playerItem.cashFlow = playerItem.cashFlow + 500
      } else if (playerformLine.ofthe == '4') {
        if (playerItem.depressed > 0) {
          playerItem.cashFlow = playerItem.cashFlow + NP.times(playerItem.depressed, 2000)
          playerItem.depressed = 0
        }
        playerItem.skillDepressed = 1
      } else if (playerformLine.ofthe == '12') {
        if (playerItem.health > 0) {
          playerItem.cashFlow = playerItem.cashFlow + NP.times(playerItem.health, 2000)
          playerItem.health = 0
        }
        playerItem.skillHealth = 1
      } else if (playerformLine.ofthe == '13') {
        if (playerItem.depressed > 0) {
          playerItem.cashFlow = playerItem.cashFlow + NP.times(playerItem.depressed, 2000)
          playerItem.depressed = 0
        }
        playerItem.skillDepressed = 1
      }
      playerItem.money = playerItem.money - skillTasket
    } else {
      Message({
        message: '技能已经使用完了'
      })
      return
    }
  }
  return playerItem
}
