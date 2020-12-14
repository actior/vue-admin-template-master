import NP from 'number-precision'

export function gridjs(playerformLine, playerItem, roundNum, copyIntel, copySkill, copyAssets, playerIndex) {
  const media = [16, 30, 58] // 换手机/电脑/车
  const credit = [2, 15, 26, 40] // 信用卡
  const plassets = [1, 69, 4, 12, 18, 21, 25, 29, 34, 41, 42, 49, 53, 55, 59, 60, 65, 7, 32, 67, 9, 17, 35, 43, 54] // 资产购买列表
  const gridData = credit.includes(playerformLine.event) ? secondGrid(playerformLine, playerItem, roundNum, playerIndex) : plassets.includes(playerformLine.event) ? fourthGrid(playerformLine, playerItem, copyAssets, roundNum, playerIndex) : [6, 14, 20, 37, 47, 52, 61, 68].includes(playerformLine.event) ? sixthGrid(playerformLine, playerItem, copyIntel, roundNum, copyAssets, playerIndex) : media.includes(playerformLine.event) ? sixteenGrid(playerItem, playerformLine, playerIndex) : [27, 63, 70].includes(playerformLine.event) ? auction(playerformLine, playerItem, playerIndex) : [39, 48, 62].includes(playerformLine.event) ? taxado(playerformLine, playerItem, playerIndex) : [5, 13, 24, 28, 31, 36, 44, 51, 57, 64].includes(playerformLine.event) ? skillMoney(playerItem, playerformLine, copySkill, playerIndex) : [3, 10, 22, 46].includes(playerformLine.event) ? depression(playerformLine, playerItem, playerIndex) : false
  return gridData
}
// 银行信贷信用卡
function secondGrid(playerformLine, playerItem, roundNum, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    playerItem.money = playerItem.money + playerformLine.noble
    playerItem.credit = NP.times(playerformLine.noble, 1.1)
    playerItem.round = roundNum
    playerItem.creditRound = 10
  }
  return playerItem
}
// 抑郁症
function depression(playerformLine, playerItem, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if ([1, 2].includes(playerformLine.dice)) {
      if ([3, 46].includes(Math.abs(playerformLine.event))) {
        if (playerItem.depressed === 2) {
          playerItem.money = playerItem.money - 500000
        }
        ++playerItem.depressed
      } else {
        ++playerItem.health
      }
      playerItem.cashFlow = playerItem.cashFlow - 2000
    }
  }
  return playerItem
}
// 小卖部
function fourthGrid(
  playerformLine,
  playerItem,
  copyAssets,
  roundNum,
  playerIndex
) {
  if (playerformLine.number - 1 === playerIndex) {
    const assetstable = [] // 资产列表
    copyAssets.forEach(item => {
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      item.assetscost = playerformLine.noble
      if (item.type === playerformLine.assets) {
        assetstable.push(item)
      }
    })
    playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
    if ([4, 21].includes(playerformLine.event)) {
      playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(40000, playerItem.assetsdiscount) : playerItem.money - NP.times(50000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 1000
    } else if (playerformLine.event === 12) {
      playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(160000, playerItem.assetsdiscount) : playerItem.money - NP.times(200000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 4000
    } else if ([18, 41].includes(playerformLine.event)) {
      playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(80000, playerItem.assetsdiscount) : playerItem.money - NP.times(100000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 2000
    } else if ([25, 29].includes(playerformLine.event)) {
      playerItem.money = playerItem.money - NP.times(200000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 5000
    } else if (playerformLine.event === 34) {
      playerItem.money = playerItem.money - NP.times(500000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 30000
    } else if (playerformLine.event === 42) {
      playerItem.money = playerItem.money - NP.times(300000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 9000
    } else if (playerformLine.event === 49) {
      playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(350000, playerItem.assetsdiscount) : playerItem.money - NP.times(400000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 20000
    } else if (playerformLine.event === 53) {
      playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(160000, playerItem.assetsdiscount) : playerItem.money - NP.times(200000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 14000
    } else if (playerformLine.event === 55) {
      playerItem.money = playerItem.money - NP.times(300000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 12000
    } else if (playerformLine.event === 59) {
      playerItem.money = playerItem.money - NP.times(400000, playerItem.assetsdiscount)
      playerItem.cashFlow = playerItem.cashFlow + 12000
    } else if (playerformLine.event === 60) {
      if (playerformLine.assetsNum <= 10) {
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000
      } else {
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 50000 + playerformLine.assetsNum * 2000
      }
    } else if (playerformLine.event === 65) {
      if (playerformLine.assetsNum <= 6) {
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000
      } else {
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 20000 + playerformLine.assetsNum * 2000
      }
    } else if ([1, 69].includes(playerformLine.event)) {
      if (playerformLine.noble && playerformLine.assets) {
        playerItem.money = playerItem.money - playerformLine.noble
      }
    } else if ([7, 32, 67].includes(playerformLine.event)) {
      if (playerformLine.assets == 20) {
        if ([1, 2, 3].includes(playerformLine.dice)) {
          playerItem.cashFlow = playerItem.cashFlow - 5000
        } else if ([5, 4].includes(playerformLine.dice)) {
          playerItem.cashFlow = playerItem.cashFlow - 3000
        }
        playerItem.money =
          playerItem.money - NP.times(150000, playerItem.assetsdiscount)
      }
    } else if ([9, 17, 35, 43, 54].includes(playerformLine.event)) {
      playerItem.money = playerItem.money - playerformLine.noble
    }
  }
  return playerItem
}
// 大学研发中心
function sixthGrid(
  playerformLine,
  playerItem,
  copyIntel,
  roundNum,
  copyAssets,
  playerIndex
) {
  if (playerformLine.intel) {
    if (playerformLine.number - 1 === playerIndex) {
      const inteltable = [] // 知识产权
      copyIntel.forEach(item => {
        if (item.type === playerformLine.intel) {
          item.intelnumber = playerformLine.assetsNum
          item.intelround = roundNum
          inteltable.push(item)
        }
      })
      playerItem.inteArray = playerItem.inteArray.concat(inteltable)
      if (playerformLine.intel == 1) {
        playerItem.money = playerItem.money - 10000
      } else if (playerformLine.intel == 2) {
        playerItem.money = playerItem.money - 20000
        playerItem.cashFlow = playerItem.cashFlow + 20000
      } else if (playerformLine.intel == 3) {
        playerItem.money = playerItem.money - 100000
        playerItem.cashFlow = playerItem.cashFlow + playerformLine.dice * 1000
      } else if (playerformLine.intel == 4) {
        playerItem.money = playerItem.money - 350000
        playerItem.movieShow = playerformLine.cashmoney
      }
    }
  } else if (playerformLine.assets) {
    if (playerformLine.number - 1 === playerIndex) {
      const assetstable = [] // 资产列表
      copyAssets.forEach(item => {
        item.assetsnumber = playerformLine.assetsNum
        item.assetsround = roundNum
        item.cashFlow = playerformLine.cashmoney ? Math.abs(playerformLine.cashmoney) * 1000 : playerformLine.dice * 1000
        if ([21, 22, 23].includes(playerformLine.assets)) {
          item.cost = playerformLine.noble
        }
        if (item.type === playerformLine.assets) {
          // this.cashHistory.cost = item.cost
          assetstable.push(item)
        }
      })
      playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
      if (playerformLine.assets == 14) {
        playerItem.money =
          playerItem.money - NP.times(50000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + playerformLine.dice * 1000
      } else if (playerformLine.assets == 15) {
        playerItem.money =
          playerItem.money - NP.times(50000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 4000
      } else if (playerformLine.assets == 16) {
        playerItem.money =
          playerItem.money - NP.times(200000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 15000
      } else if (playerformLine.assets == 17) {
        playerItem.money =
          playerItem.money - NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 6000
      } else if (playerformLine.assets == 18) {
        playerItem.money =
          playerItem.money - NP.times(200000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 15000
      }
    }
  } else {
    if (playerformLine.number - 1 === playerIndex) {
      if (playerItem.developed == 1) {
        playerItem.developed = 0
          ++playerItem.skill
        if (playerItem.type === 1) {
          playerItem.money = playerItem.money - 30000
        } else if (playerItem.type === 2) {
          playerItem.money = playerItem.money - 20000
        } else if (playerItem.type === 3) {
          playerItem.money = playerItem.money - 10000
        } else if (playerItem.type === 4) {
          playerItem.money = playerItem.money - 10000
        }
      } else {
        if (playerItem.type === 1) {
          playerItem.money = playerItem.money - 30000
            ++playerItem.developed
        } else if (playerItem.type === 2) {
          playerItem.money = playerItem.money - 20000
            ++playerItem.developed
        } else if (playerItem.type === 3) {
          playerItem.money = playerItem.money - 10000
            ++playerItem.developed
        } else if (playerItem.type === 4) {
          playerItem.money = playerItem.money - 10000
            ++playerItem.developed
        }
      }
    }
    if (playerItem.type === 5) {
      if (playerformLine.number - 1 === playerIndex) {
        if (playerformLine.dice === 1) {
          playerItem.money = playerItem.money - 2000
          playerItem.cashFlow = playerItem.cashFlow + 5000
          copyIntel.forEach(item => {
            if (item.type === 5) {
              item.intelnumber = playerformLine.assetsNum
              playerItem.inteArray.push(item)
            }
          })
        }
      }
    } else if (playerItem.type === 6) {
      if (playerformLine.number - 1 === playerIndex) {
        if (playerformLine.dice === 1) {
          playerItem.money = playerItem.money - 6000
          playerItem.cashFlow = playerItem.cashFlow + 5000
          copyIntel.forEach(item => {
            if (item.type === 5) {
              item.intelnumber = playerformLine.assetsNum
              playerItem.inteArray.push(item)
            }
          })
        }
      }
    } else if (playerItem.type === 3) {
      playerItem.cashFlow = playerItem.cashFlow + 500
    }
  }
  return playerItem
}

// 换手机/电脑/车
function sixteenGrid(playerItem, playerformLine, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if (playerItem.exchange === 0) {
      playerItem.money = playerItem.money - 8000
    } else if (playerItem.exchange === 1) {
      playerItem.money = playerItem.money - 10000
    } else if (playerItem.exchange === 2) {
      playerItem.money = playerItem.money - 200000
      playerItem.cashFlow = playerItem.cashFlow - 3000
    }
    ++playerItem.exchange
  }
  return playerItem
}

// 银行拍卖会
function auction(playerItem, playerformLine, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    playerItem.money = playerItem.money + playerformLine.cashmoney
  }
  return playerItem
}

// 税务稽查
function taxado(playerItem, playerformLine, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    playerItem.money = playerItem.money - playerformLine.cashmoney
  }
  return playerItem
}

// 奇人技能费用计算
function skillMoney(playerItem, playerformLine, copySkill, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    // 技能花费
    let skillTasket = 0
    const skillofthe = [] // 奇人技能表
    copySkill.forEach(item => {
      delete item.description
      delete item.upgrade
      delete item.upgradeDescription
      delete item.title
      if (playerformLine.ofthe === item.id) {
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
        playerItem.depressed = 0
        playerItem.cashFlow = playerItem.cashFlow + 2000
      }
    }
    playerItem.money = playerItem.money - skillTasket
  }
  return playerItem
}
