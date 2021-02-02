import NP from 'number-precision'
// 技能使用

export function useskill(formInline, infoItem, infoIndex, partmoney, roundNum, sumCashFolw, playerlength, userd, poorindex) {
  if (Math.abs(formInline.refuses) === 1) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '1') {
          --item.useCount
        }
      })
      infoItem.money = NP.plus(infoItem.money, NP.times(2000, formInline.moreplayer.length))
    }
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      infoItem.money = NP.minus(infoItem.money, 2000)
    }
  } else if (Math.abs(formInline.refuses) === 2) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '2') {
          --item.useCount
        }
      })
      infoItem.money = NP.plus(infoItem.money, 5000)
    }
  } else if (Math.abs(formInline.refuses) === 4) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.money = NP.plus(infoItem.money, NP.times(8000, formInline.moreplayer.length))
    }
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      infoItem.money = NP.minus(infoItem.money, 8000)
      infoItem.cashFlow = NP.plus(infoItem.cashFlow, NP.times(2000, infoItem.depressed))
      infoItem.depressed = 0
    }
  } else if (formInline.dice && Math.abs(formInline.refuses) === 5) {
    if (formInline.dice === 1) {
      if (formInline.number - 1 === infoIndex) {
        infoItem.skillList.forEach(item => {
          if (item.id === '5') {
            --item.useCount
          }
        })
        // infoItem.money = infoItem.money + 20000
        infoItem.money = NP.plus(infoItem.money, 20000)
      }
      if (formInline.moreplayer.includes(infoIndex + 1)) {
        // infoItem.money = infoItem.money - formInline.noble + partmoney
        infoItem.money = NP.minus(NP.plus(infoItem.money, partmoney), formInline.noble)
        infoItem.marriages = 1
        infoItem.testssetRound = Math.abs(roundNum)
        // infoItem.cashFlow = infoItem.cashFlow + 5000
        infoItem.cashFlow = NP.plus(infoItem.cashFlow, 5000)
      } else if (formInline.number - 1 === infoIndex) {
        infoItem.money = infoItem.money
      } else {
        infoItem.money = NP.times(infoItem.money, 0.9)
      }
    }
  } else if (Math.abs(formInline.refuses) === 6) {
    if (infoItem.historyMon) {
      // infoItem.money = infoItem.money + formInline.assetsNum * 100 - infoItem.historyMon
      infoItem.money = NP.minus(NP.plus(infoItem.money, NP.times(formInline.assetsNum, 100)), infoItem.historyMon)
    } else {
      // infoItem.money = infoItem.money + formInline.assetsNum * 100
      infoItem.money = NP.plus(infoItem.money, NP.times(formInline.assetsNum, 100))
    }
  } else if (Math.abs(formInline.refuses) === 7) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '7') {
          --item.useCount
        }
      })
      // infoItem.money = infoItem.money + 8000
      infoItem.money = NP.plus(infoItem.money, 8000)
    }
  } else if (Math.abs(formInline.refuses) === 11) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '11') {
          --item.useCount
        }
      })
      infoItem.money = NP.plus(infoItem.money, sumCashFolw)
    }
  } else if (Math.abs(formInline.refuses) === 12) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '12') {
          --item.useCount
        }
      })
      // infoItem.money = infoItem.money + 8000 * formInline.moreplayer.length
      infoItem.money = NP.plus(infoItem.money, NP.times(8000, formInline.moreplayer.length))
    }
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      // infoItem.money = infoItem.money - 8000
      infoItem.money = NP.minus(infoItem.money, 8000)
      // infoItem.cashFlow = infoItem.cashFlow + 2000 * infoItem.health
      infoItem.cashFlow = NP.plus(infoItem.cashFlow, NP.times(2000, infoItem.health))
      infoItem.health = 0
    }
  } else if (Math.abs(formInline.refuses) === 13) {
    if (formInline.dice) {
      if (formInline.moreplayer.includes(infoIndex + 1)) {
        infoItem.money = NP.times(infoItem.money, 0.5)
      } else {
        infoItem.money = NP.plus(infoItem.money, NP.divide(userd, NP.minus(playerlength, 1)))
      }
      console.log('playerlength: ', playerlength);
      console.log('userd: ', userd);
      // infoItem.money = infoItem.money + NP.divide(userd, playerlength)
    } else {
      if (formInline.number - 1 === infoIndex) {
        infoItem.skillList.forEach(item => {
          if (item.id === '13') {
            --item.useCount
          }
        })
        // infoItem.money = infoItem.money + 30000 * formInline.moreplayer.length
        infoItem.money = NP.plus(infoItem.money, NP.times(30000, formInline.moreplayer.length))
      }
      if (formInline.moreplayer.includes(infoIndex + 1)) {
        infoItem.testsset = NP.plus(infoItem.testsset, 1)
        infoItem.cashFlow = NP.minus(infoItem.cashFlow, 10000)
      }
    }
  } else if (Math.abs(formInline.refuses) === 14) {
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      infoItem.money = NP.times(infoItem.money, 0.5)
    }
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === '14') {
          --item.useCount
        }
      })
      infoItem.money = NP.plus(infoItem.money, NP.times(userd, 0.25))
    }
    if (poorindex === infoIndex) {
      infoItem.money = NP.plus(infoItem.money, NP.times(userd, 0.25))
    }
  }
  return infoItem
}

// 进入事件判断
export function skillEvent(formInline, infoItem) {
  for (let k of infoItem) {
    if (k.playerId === formInline.number) {
      for (let j of k.skillList) {
        if (Math.abs(j.id) === Math.abs(formInline.refuses)) {
          if (Math.abs(j.useCount === 0)) {
            return 7
          }
        }
      }
    }
  }
  if (Math.abs(formInline.refuses) === 1) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    }
  } else if (Math.abs(formInline.refuses) === 2) {
    if ([8, 11, 23, 33, 45, 50, 56].includes(formInline.event)) {

    } else {
      return 8
    }
  } else if (Math.abs(formInline.refuses) === 4) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    }
  } else if (Math.abs(formInline.refuses) === 5) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    } else if (formInline.moreplayer.length !== 1) {
      return 3
    } else if (!formInline.noble) {
      return 4
    } else if (formInline.noble) {
      for (let i of infoItem) {
        if (i.playerId === formInline.number && Math.abs(i.money) < Math.abs(formInline.noble)) {
          return 5
        }
      }
    }
  } else if (Math.abs(formInline.refuses) === 6) {
    if ([8, 11, 23, 33, 45, 50, 56].includes(formInline.event)) {
      if (formInline.assetsNum <= 1) {
        return 6
      }
    } else {
      return 8
    }

  } else if (Math.abs(formInline.refuses) === 11) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    }
  } else if (Math.abs(formInline.refuses) === 12) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    }
  } else if (Math.abs(formInline.refuses) === 13) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    }
  } else if (Math.abs(formInline.refuses) === 14) {
    if (!formInline.moreplayer) {
      return 1
    } else if (formInline.moreplayer.includes(formInline.number)) {
      return 2
    } else if (formInline.moreplayer.length !== 1) {
      return 3
    }
  }
}
