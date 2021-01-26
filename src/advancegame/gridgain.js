import NP from 'number-precision'
import {
  Message
} from "element-ui";
import {
  assetsList,
  buyAssetsList,
  batchBuyAssetsList
} from '@/api/assets'

export function gridjs(playerformLine, playerItem, roundNum, copyIntel, copySkill, copyAssets, playerIndex) {
  const media = [16, 30, 58] // 换手机/电脑/车
  const credit = [2, 15, 26, 40] // 信用卡
  const plassets = [1, 69, 4, 12, 18, 21, 25, 29, 34, 41, 42, 49, 53, 55, 59, 60, 65, 7, 32, 67, 9, 17, 35, 43, 54] // 资产购买列表
  const gridData = credit.includes(playerformLine.event) ? secondGrid(playerformLine, playerItem, roundNum, playerIndex) : plassets.includes(playerformLine.event) ? fourthGrid(playerformLine, playerItem, copyAssets, roundNum, playerIndex) : [6, 14, 20, 37, 47, 52, 61, 68].includes(playerformLine.event) ? sixthGrid(playerformLine, playerItem, copyIntel, roundNum, copyAssets, playerIndex) : media.includes(playerformLine.event) ? sixteenGrid(playerItem, playerformLine, playerIndex) : [27, 63, 70].includes(playerformLine.event) ? auction(playerformLine, playerItem, playerIndex) : [39, 48, 62].includes(playerformLine.event) ? taxado(playerformLine, playerItem, playerIndex) : [3, 10, 22, 46].includes(playerformLine.event) ? depression(playerformLine, playerItem, roundNum, playerIndex) : [19, 38, 66].includes(playerformLine.event) ? bankrupt(playerformLine, playerItem, roundNum, playerIndex) : false
  return gridData
}
// 银行信贷信用卡
function secondGrid(playerformLine, playerItem, roundNum, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if (playerItem.type === 5) {
      playerItem.credit = NP.times(playerformLine.noble, 1)
    } else {
      playerItem.credit = NP.times(playerformLine.noble, 1.1)
    }
    playerItem.money = playerItem.money + playerformLine.noble
    playerItem.round = roundNum
    playerItem.creditRound = 10
  }
  return playerItem
}
// 抑郁症
function depression(playerformLine, playerItem, roundNum, playerIndex) {
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
          if (playerItem.depressed === 2) {
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
// 小卖部
export function fourthGrid(
  playerformLine,
  playerItem,
  copyAssets,
  roundNum,
  playerIndex
) {
  if (playerformLine.number - 1 === playerIndex) {
    if (playerformLine.assetsNum === 1) {
      let assetstable = [] // 资产列表
      if (playerItem.assetsArray.length !== 0) {
        for (let a of playerItem.assetsArray) {
          if (a.type === playerformLine.assets && [21, 22, 23].includes(a.type)) {
            a.assetscost = NP.plus(a.assetscost, playerformLine.noble)
            playerItem.money = playerItem.money - playerformLine.noble
            return
          }
        }
        copyAssets.forEach(item => {
          item.monryType = 1
          item.assetsnumber = 1
          item.assetsround = Math.abs(roundNum)
          item.assetscost = playerformLine.noble
          item.houseType = 0
          item.moneyId = Math.ceil(Math.random() * 9999999999999)
          if (item.type === playerformLine.assets) {
            if (item.type === 20) {
              item.houseType = playerformLine.dice
            }
            let arritem = Object.assign({}, item)
            assetstable.push(arritem)
          }
        })
      } else if (playerItem.assetsArray.length === 0) {
        copyAssets.forEach(item => {
          item.assetsnumber = 1
          item.monryType = 1
          item.assetsround = Math.abs(roundNum)
          item.assetscost = playerformLine.noble
          item.houseType = 0
          item.moneyId = Math.ceil(Math.random() * 9999999999999)
          if (item.type === playerformLine.assets) {
            let cashHistory = {
              cost: item.cost,
              gameId: playerItem.gameId,
              playerId: playerItem.playerId,
              realCost: playerItem.type === 2 ? NP.times(item.cost, 0.8, playerItem.assetsdiscount) : NP.times(item.cost, playerItem.assetsdiscount),
              round: Math.abs(roundNum),
              type: item.type
            }
            if (item.type === 20) {
              item.houseType = playerformLine.dice
            }
            // (async () => {
            //   try {
            //     let data =
            // buyAssetsList(cashHistory).then((res) => {
            //   store.commit('SET_ID', .data.id)
            // })
            //     console.log(data)
            //   } catch (err) {
            //     console.log(err)
            //   }
            // })()
            // let resDataid = buyAssetsList(cashHistory).then((res) => {
            //   return new Promise(res.data)
            // })
            // store.dispatch('gameData/buyAssetsList', cashHistory)
            // console.log(store.state.gameData.assetsid);
            assetstable.push(item)
          }
        })
      }
      if ([4, 21].includes(playerformLine.event)) {
        playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(40000, playerItem.assetsdiscount) : playerItem.money - NP.times(50000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 1000
      } else if (playerformLine.event === 12) {
        playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(160000, playerItem.assetsdiscount) : playerItem.money - NP.times(200000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 4000
      } else if ([18, 41].includes(playerformLine.event)) {
        playerItem.money = playerItem.type === 2 ? playerItem.money - NP.times(80000, playerItem.assetsdiscount) : playerItem.money - NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 2000
      } else if ([25].includes(playerformLine.event)) {
        playerItem.money = playerItem.money - NP.times(200000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 50000
      } else if ([29].includes(playerformLine.event)) {
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
        // if (playerformLine.assetsNum <= 10) {
        //   playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        //   playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000
        //   playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
        // } else {
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 50000 + playerformLine.assetsNum * 2000
        // }
      } else if (playerformLine.event === 65) {
        // if (playerformLine.assetsNum <= 6) {
        //   playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        //   playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000
        // } else {
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 20000 + playerformLine.assetsNum * 2000
        // }
      } else if ([1, 69].includes(playerformLine.event)) {
        if (playerformLine.noble && playerformLine.assets) {
          playerItem.money = playerItem.money - playerformLine.noble
        }
      } else if ([7, 32, 67].includes(playerformLine.event)) {
        if (playerformLine.assets == 20) {
          if (playerformLine.dice) {
            if ([1, 2, 3].includes(playerformLine.dice)) {
              playerItem.cashFlow = playerItem.cashFlow - 5000
            } else if ([5, 4].includes(playerformLine.dice)) {
              playerItem.cashFlow = playerItem.cashFlow - 3000
            }
            playerItem.money =
              playerItem.money - NP.times(150000, playerItem.assetsdiscount)
          }
        }
      } else if ([9, 17, 35, 43, 54].includes(playerformLine.event)) {
        playerItem.money = playerItem.money - playerformLine.noble
      }
      playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
    } else {
      if ([60, 65].includes(playerformLine.event)) {
        let assetstable = [] // 资产列表
        let cashHistorys = []
        copyAssets.forEach(item => {
          if (item.type === playerformLine.assets) {
            let exmple = []
            for (let i = 0; i < playerformLine.assetsNum; i++) {
              let cashHistory = {}
              cashHistory = {
                monryType: 1,
                assetscost: item.cost, // 请求时assetscost改回cost
                gameId: playerItem.gameId,
                moneyId: Math.ceil(Math.random() * 9999999999999),
                playerId: playerItem.playerId,
                realCost: playerItem.type === 2 ? NP.times(item.cost, 0.8, playerItem.assetsdiscount) : NP.times(item.cost, playerItem.assetsdiscount),
                round: Math.abs(roundNum),
                assetsround: Math.abs(roundNum),
                type: item.type,
                cost: item.cost,
                cashFlow: item.cashFlow,
                gameType: item.gameType //请求接口时注释掉
              }
              exmple.push(cashHistory)
            }
            console.log(exmple)
            cashHistorys = cashHistorys.concat(exmple)
          }
        })
        console.log('cashHistorys: ', cashHistorys);
        // let cashHistory = {}
        // copyAssets.forEach(item => {
        //   if (item.type === playerformLine.assets) {
        //     cashHistory = {
        //       cost: item.cost,
        //       gameId: gameId,
        //       playerId: playerItem.playerId,
        //       realCost: playerItem.type === 2 ? NP.times(item.cost, 0.8, playerItem.assetsdiscount) : NP.times(item.cost, playerItem.assetsdiscount),
        //       round: Math.abs(roundNum),
        //       type: item.type
        //     }
        //     let exmple = []
        //     for (let i = 0; i < playerformLine.assetsNum; i++) {
        //       exmple.push(i)
        //     }
        //     cashHistory = exmple.fill(cashHistory)
        //   }
        // })
        // let resData = []
        // batchBuyAssetsList({
        //   list: cashHistory
        // }).then((res) => {
        //   window.sessionStorage.setItem('resData', JSON.stringify(res.data))
        // })
        // if (window.sessionStorage.getItem('resData')) {
        //   let resData = window.sessionStorage.getItem('resData')
        //   JSON.parse(resData).map((item) => {
        //     delete item.history
        //     item.assetsnumber = 1
        //     item.assetsround = Math.abs(roundNum)
        //     item.assetsid = item.id
        //     copyAssets.map((items) => {
        //       if (items.type === playerformLine.assets) {
        //         item.gameType = items.gameType
        //         item.cost = items.cost
        //         item.cashFlow = items.cashFlow
        //       }
        //     })
        //     assetstable.push(item)
        //   })
        // }
        playerItem.money = playerItem.money - playerformLine.assetsNum * NP.times(100000, playerItem.assetsdiscount)
        if ([60].includes(playerformLine.event)) {
          if (playerformLine.assetsNum >= 10) {
            playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000 + 50000
            console.log('playerItem.cashFlow:12 ', playerItem.cashFlow);
          } else {
            playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000
            console.log('playerItem.cashFlow: 111', playerItem.cashFlow);
          }
        }
        if ([65].includes(playerformLine.event)) {
          if (playerformLine.assetsNum >= 6) {
            playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000 + 20000
            console.log('playerItem.cashFlow:12 ', playerItem.cashFlow);
          } else {
            playerItem.cashFlow = playerItem.cashFlow + playerformLine.assetsNum * 2000
            console.log('playerItem.cashFlow: 111', playerItem.cashFlow);
          }
        }
        playerItem.assetsArray = playerItem.assetsArray.concat(cashHistorys)
      }
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
          item.monryType = 2
          item.moneyId = Math.ceil(Math.random() * 9999999999999)
          item.intelnumber = playerformLine.assetsNum
          item.intelround = roundNum
          item.movieShow = playerformLine.cashmoney
          if (Math.abs(playerformLine.intel) === 2) {
            item.cashFlow = 20000
          }
          inteltable.push(item)
        }
      })
      if (playerformLine.intel == 1) {
        // playerItem.money = playerItem.money - 10000
        // playerItem.inteArray = playerItem.inteArray.concat(inteltable)
      } else if (playerformLine.intel == 2) {
        if (Math.abs(playerItem.type) === 4) {
          if ([4, 5, 6].includes(playerformLine.dice)) {
            playerItem.cashFlow = playerItem.cashFlow + 20000
            playerItem.inteArray = playerItem.inteArray.concat(inteltable)
          }
        } else if ([1, 2, 3, 5, 6].includes(Math.abs(playerItem.type))) {
          if ([5, 6].includes(playerformLine.dice)) {
            playerItem.cashFlow = playerItem.cashFlow + 20000
            playerItem.inteArray = playerItem.inteArray.concat(inteltable)
          }
        }
        playerItem.money = playerItem.money - 20000
      } else if (playerformLine.intel == 3) {
        playerItem.money = playerItem.money - 100000
        playerItem.cashFlow = playerItem.cashFlow + playerformLine.dice * 1000
        playerItem.inteArray = playerItem.inteArray.concat(inteltable)
      } else if (playerformLine.intel == 4) {
        playerItem.money = playerItem.money - 350000
        playerItem.inteArray = playerItem.inteArray.concat(inteltable)
      } else if (playerformLine.intel == 5) {
        if (playerItem.type === 5) {
          if (playerformLine.number - 1 === playerIndex) {
            if ([1, 3, 5].includes(playerformLine.dice)) {
              playerItem.money = playerItem.money - 2000
              playerItem.cashFlow = playerItem.cashFlow + 5000
              playerItem.inteArray = playerItem.inteArray.concat(inteltable)
            } else {
              playerItem.money = playerItem.money - 2000
            }
          }
        } else if (playerItem.type === 6) {
          if (playerformLine.number - 1 === playerIndex) {
            if ([1, 3, 5].includes(playerformLine.dice)) {
              playerItem.money = playerItem.money - 6000
              playerItem.cashFlow = playerItem.cashFlow + 5000
              playerItem.inteArray = playerItem.inteArray.concat(inteltable)
            } else {
              playerItem.money = playerItem.money - 6000
            }
          }
        }
      }
    } else {
      if (playerformLine.intel == 5 && playerItem.type === 3) {
        // 公务员被动加现金流
        if ([1, 3, 5].includes(playerformLine.dice)) {
          playerItem.cashFlow = playerItem.cashFlow + 500
        }
      }
    }
  } else if (playerformLine.assets) {
    if (playerformLine.number - 1 === playerIndex) {
      const assetstable = [] // 资产列表
      copyAssets.forEach(item => {
        item.monryType = 1
        item.moneyId = Math.ceil(Math.random() * 9999999999999)
        item.assetsnumber = playerformLine.assetsNum
        item.assetsround = roundNum
        item.cashFlow = playerformLine.cashmoney ? Math.abs(playerformLine.cashmoney) : playerformLine.dice * 1000
        if ([21, 22, 23].includes(playerformLine.assets)) {
          item.cost = playerformLine.noble
        }
        if (item.type === playerformLine.assets) {
          // this.cashHistory.cost = item.cost
          assetstable.push(item)
        }
      })
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
      } else if (playerformLine.assets == 19) {
        playerItem.money =
          playerItem.money - NP.times(200000, playerItem.assetsdiscount)
        playerItem.cashFlow = playerItem.cashFlow + 20000
      }
      playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
    }
  }
  // else if (Math.abs(playerformLine.refuses) === 11) {
  //   if (playerformLine.number - 1 === playerIndex) {
  //     playerItem.setup_game = 1
  //     for (let i of playerItem.skillList) {
  //       if (Math.abs(i.id) === Math.abs(playerformLine.refuses)) {
  //         i.useCount = 2
  //         i.name = "升阶博弈"
  //       }
  //     }
  //     playerItem.money = playerItem.money - 10000
  //   }
  // } else if (Math.abs(playerformLine.refuses) === 13) {
  //   if (playerformLine.number - 1 === playerIndex) {
  //     playerItem.whofe = 1
  //     playerItem.whoferound = Math.abs(roundNum)
  //     playerItem.money = playerItem.money - 50000
  //   }
  // }
  else {
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
  }
  return playerItem
}

// 换手机/电脑/车
function sixteenGrid(playerItem, playerformLine, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if ([0, 1, 2].includes(playerItem.exchange)) {
      playerItem.money = playerItem.money - 8000
    } else if ([3, 4].includes(playerItem.exchange)) {
      playerItem.money = playerItem.money - 10000
    } else if ([5, 6, 7, 8].includes(playerItem.exchange)) {
      playerItem.money = playerItem.money - 200000
      playerItem.carExpenses = playerItem.carExpenses + 3000
    }
    ++playerItem.exchange
  }
  return playerItem
}

// 银行拍卖会
function auction(playerformLine, playerItem, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if ([1, 3, 5].includes(playerformLine.dice)) {
      ++playerItem.auctions
      playerItem.money = playerItem.auctions === 1 ? playerItem.money + 10000 : playerItem.auctions === 2 ? playerItem.money + 20000 : playerItem.auctions === 3 ? playerItem.money + 30000 : playerItem.auctions === 4 ? playerItem.money + 50000 : playerItem.auctions === 5 ? playerItem.money + 100000 : playerItem.auctions === 6 ? playerItem.money + 200000 : false
    }

  }
  return playerItem
}

// 税务稽查
function taxado(playerformLine, playerItem, playerIndex) {
  if (playerformLine.number - 1 == playerIndex) {
    ++playerItem.taxpayer
    playerItem.money = playerItem.taxpayer === 1 ? playerItem.money - 3000 : playerItem.taxpayer === 2 ? playerItem.money - 8000 : playerItem.taxpayer === 3 ? playerItem.money - 10000 : playerItem.taxpayer === 4 ? playerItem.money - 20000 : playerItem.taxpayer === 5 ? playerItem.money - 50000 : playerItem.taxpayer === 6 ? playerItem.money - 100000 : playerItem.taxpayer === 7 ? playerItem.money - 200000 : false
  }
  return playerItem
}

// 银行保险
function bankrupt(playerformLine, playerItem, roundNum, playerIndex) {
  if (playerformLine.number - 1 === playerIndex) {
    if ([0, 1, 2].includes(playerItem.bankihttp)) {
      playerItem.money = playerItem.money - 5000
    } else if ([3, 4, 5].includes(playerItem.bankihttp)) {
      playerItem.money = playerItem.money - 20000
    } else if ([6, 7, 8, 9].includes(playerItem.bankihttp)) {
      playerItem.money = playerItem.money - 500000
    }
    playerItem.bankihttpRun = roundNum
      ++playerItem.bankihttp
  }
  return playerItem
}
