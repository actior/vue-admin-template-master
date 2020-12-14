import NP from 'number-precision'

// 事件集合
export function eventCounter(formInline, infoItem, infoIndex, partmoney, roundNum) {
  if (formInline.affair) {
    const affairObj = formInline.affair == '1' ? crisis(infoItem) : formInline.affair == '2' ? riots(infoItem) : formInline.affair == '3' ? warheads(infoItem) : formInline.affair == '4' ? tsunami(infoItem) : formInline.affair == '5' ? promotion(infoItem) : formInline.affair == '6' ? technologyCopyright(infoItem) : formInline.affair == '7' ? proficiency(infoItem) : formInline.affair == '8' ? economy(infoItem, roundNum) : formInline.affair == '9' ? plaguerelease(infoItem, roundNum) : formInline.affair == '10' ? housing(infoItem, roundNum) : null
    return affairObj
  } else {
    const useskillObj = useskill(infoItem, formInline, infoIndex, partmoney)
    return useskillObj
  }
}

// 技能使用
function useskill(infoItem, formInline, infoIndex, partmoney) {
  let usertable = formInline.moreplayer ? JSON.parse(JSON.stringify(formInline.moreplayer.split('')).replace(/"/g, '')) : ''
  if (Math.abs(formInline.refuses) === 1) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '1') {
          --item.useCount
        }
      })
      infoItem.money = infoItem.money + 2000 * usertable.length
    }
    if (usertable.includes(infoIndex + 1)) {
      infoItem.money = infoItem.money - 2000
    }
  } else if (Math.abs(formInline.refuses) === 2) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '2') {
          --item.useCount
        }
      })
      infoItem.money = infoItem.money + 5000
    }
  } else if (Math.abs(formInline.refuses) === 4) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.money = infoItem.money + 8000
    }
  } else if (formInline.dice && Math.abs(formInline.refuses) === 5) {
    if (formInline.dice === 1) {
      if (formInline.number - 1 === infoIndex) {
        infoItem.skillList.forEach(item => {
          if (item.id === '5') {
            --item.useCount
          }
        })
        infoItem.money = infoItem.money + 20000
      }
      if (usertable.includes(infoIndex + 1)) {
        infoItem.money = infoItem.money - formInline.usemoney + partmoney
        infoItem.marriages = 1
        infoItem.cashFlow = infoItem.cashFlow + 5000
      } else if (formInline.number - 1 === infoIndex) {
        infoItem.money = infoItem.money
      } else {
        infoItem.money = NP.times(infoItem.money, 0.9)
      }
    }
  } else if (Math.abs(formInline.refuses) === 6) {
    infoItem.money = infoItem.money + formInline.assetsNum * 100 - formInline.usemoney
  } else if (Math.abs(formInline.refuses) === 7) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '7') {
          --item.useCount
        }
      })
      infoItem.money = infoItem.money + 8000
    }
  } else { }
  return infoItem
}
// 抑郁症
// export function depression(formInline, infoItem) {
//   if ([1, 2].includes(formInline.dice)) {
//     if ([3, 46].includes(Math.abs(formInline.event))) {
//       if (infoItem.depressed === 2) {
//         infoItem.money = infoItem.money - 500000
//       }
//       ++infoItem.depressed
//     } else {
//       ++infoItem.health
//     }
//     infoItem.cashFlow = infoItem.cashFlow - 2000
//   }
//   return infoItem
// }

// 金融危机
export function crisis(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 5000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 4000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 3000
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow - 4000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 4000
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = item.assetscost * 2
      }
    })
  }
  return infoItem
}

// 局部暴乱
export function riots(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.money = infoItem.money - 30000
  } else if (gameTypeId === 2) {
    infoItem.money = infoItem.money - 20000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 3000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow + 2000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.5)
      }
    })
  }
  return infoItem
}

// 贸易战
export function warheads(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.5)
      }
    })
  }
  return infoItem
}

// 地震海啸
export function tsunami(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow + 500
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.2)
      }
    })
  }
  return infoItem
}

// 5G技术应用推广
export function promotion(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow + 2000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow + 2000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 500
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  }
  return infoItem
}

// ARVR技术应用推广
export function technologyCopyright(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 500
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  }
  return infoItem
}

// 人工智能推广
export function proficiency(infoItem) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow + 3000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow + 3000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 500
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 3000
  }
  return infoItem
}

// 经济萧条
function economy(infoItem, roundNum) {
  infoItem.cashFlow = NP.times(infoItem.cashFlow, 0.5)
  infoItem.reduceshFlow = infoItem.cashFlow
  infoItem.economyRound = roundNum
  infoItem.economydiscount = 0.7
  infoItem.assetsdiscount = infoItem.economydiscount
  infoItem.economyId = 8
  return infoItem
}

// 瘟疫
export function plaguerelease(infoItem, roundNum) {
  const gameTypeId = infoItem.gameType.id
  infoItem.plaguereleaseRound = roundNum
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 2000
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 4000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000
  }
  if (infoItem.assetsArray.length !== 0) {
    let assTypeNumber = 0
    infoItem.assetsArray.forEach(item => {
      if (item.type === 14) {
        // item.cashFlow = item.cashFlow, 1.5
        assTypeNumber++
      }
    })
    infoItem.cashFlow = infoItem.cashFlow + assTypeNumber * 2000
  }
  infoItem.plaguerelease = 9
  return infoItem
}

// 房产泡沫破裂
export function housing(infoItem, roundNum) {
  const gameTypeId = infoItem.gameType.id
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 2000
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.3)
        item.salePrice = 100000
      }
    })
  }
  infoItem.housingId = 10
  infoItem.housingRound = roundNum
  infoItem.housingDiscount = 0.8
  infoItem.assetsdiscount = infoItem.housingDiscount
  return infoItem
}
