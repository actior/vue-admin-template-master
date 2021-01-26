import NP from "number-precision";

export function ttassets(
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
