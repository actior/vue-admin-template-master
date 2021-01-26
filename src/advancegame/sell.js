import NP from 'number-precision'
import {
  Message
} from "element-ui";
export function sell(playerItem, formInline, roundNum, sellround) {
  const sellgrid = [8, 11, 23, 33, 45, 50, 56];
  const gridData = sellgrid.includes(formInline.event) ? sellAssets(playerItem, formInline, roundNum, sellround) : false
  // [6, 14, 20, 37, 47, 52, 61, 68].includes(formInline.event) ? sellreduce(playerItem, formInline) : false;
  return gridData;
}

// 卖出资产系列
function sellAssets(playerItem, formInline, roundNum, sellround) {
  console.log('sellround: ', sellround);

  // let reg = /^.*[-](\d+)$/
  // let sellType = sellround.replace(reg, '$1')
  // let sellId = sellround.substr(0, (sellround.lastIndexOf('-')))
  // let sellkeys = new Number()
  // if (Math.abs(sellType) === 1) {

  if (!sellround && typeof sellround !== 'Array') {
    throw new Error('数据出错！')
  }
  sellround.map(itemid => {
    playerItem.assetsArray.map((item, index) => {
      if (item.moneyId === Math.abs(itemid)) {
        let sellkeys = new Number()
        sellkeys = index
        if (item.type == 21) {
          if (formInline.noble) {
            if (item.assetscost > formInline.noble) {
              item.assetscost = NP.minus(item.assetscost, formInline.noble)
              playerItem.money = playerItem.money + NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
            } else if (item.assetscost = formInline.noble) {
              playerItem.money = playerItem.money + NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
              playerItem.assetsArray.splice(sellkeys, 1);
            } else {
              Message({
                message: '当前输入可用资金超过现有的黄金'
              })
            }
          } else {
            playerItem.money = playerItem.money + NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
            playerItem.assetsArray.splice(sellkeys, 1);
          }
        } else if (item.type == 23) {
          if (formInline.noble) {
            if (item.assetscost > formInline.noble) {
              item.assetscost = NP.minus(item.assetscost, formInline.noble)
              playerItem.money = playerItem.money + NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
            } else if (item.assetscost = formInline.noble) {
              playerItem.money = playerItem.money + NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
              playerItem.assetsArray.splice(sellkeys, 1);
            } else {
              Message({
                message: '当前输入可用资金超过现有的资金'
              })
            }
          } else {
            playerItem.money = playerItem.money + NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
            playerItem.assetsArray.splice(sellkeys, 1);
          }
        } else if (item.type == 22) {
          if (formInline.noble) {
            if (item.assetscost > formInline.noble) {
              item.assetscost = NP.minus(item.assetscost, formInline.noble)
              playerItem.money = NP.plus(playerItem.money, formInline.noble)
            } else if (item.assetscost = formInline.noble) {
              playerItem.money = NP.plus(playerItem.money, item.assetscost)
              playerItem.assetsArray.splice(sellkeys, 1);
            } else {
              Message({
                message: '当前输入可用资金超过现有的资金'
              })
            }
          } else {
            playerItem.money = NP.plus(playerItem.money, item.assetscost)
            playerItem.assetsArray.splice(sellkeys, 1);
          }
        } else if (item.type == 20) {
          if (NP.minus(roundNum, item.assetsround) >= 4) {
            playerItem.money = NP.plus(playerItem.money, item.salePrice)
            if (NP.minus(roundNum, item.assetsround) <= 10) {
              if ([4, 5].includes(item.houseType)) {
                playerItem.cashFlow = NP.plus(playerItem.cashFlow, 3000)
              } else if ([1, 2, 3].includes(item.houseType)) {
                playerItem.cashFlow = NP.plus(playerItem.cashFlow, 5000)
              }
            }
            playerItem.assetsArray.splice(sellkeys, 1);
          } else {
            Message({
              message: "房产未到四回合之后"
            })
          }
        } else {
          playerItem.money = NP.plus(playerItem.money, NP.times(item.cost, roundNum === item.assetsround ? 1 : 1.01, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)))
          playerItem.cashFlow = NP.minus(playerItem.cashFlow, item.cashFlow)
          playerItem.assetsArray.splice(sellkeys, 1);
        }
      }
    })
    playerItem.inteArray.map((item, index) => {
      if (item.moneyId === Math.abs(itemid)) {
        let sellkeys = new Number()
        sellkeys = index
        playerItem.money = NP.plus(playerItem.money, item.salePrice, item.movieShow ? item.movieShow : 0)
        playerItem.cashFlow = NP.minus(playerItem.cashFlow, item.cashFlow)
        playerItem.inteArray.splice(sellkeys, 1);
      }
    })
  })


  // playerItem.assetsArray.splice(sellkeys, 1);
  // } else if (Math.abs(sellType) === 2) {


  // }



  // if (formInline.assets) {
  //   Object.keys(playerItem.assetsArray).forEach(key => {
  //     const assType = playerItem.assetsArray[key];
  //     if (formInline.assets == assType.type) {
  //       sellkeys = key;
  //       if (assType.assetsround == sellround) {
  //         if (formInline.assetsNum == assType.assetsnumber) {
  //           if (formInline.assets == 21) {
  //             playerItem.money = playerItem.money + assType.assetscost * formInline.assetsNum * Math.pow(1.03, roundNum - assType.assetsround)
  //           } else if (formInline.assets == 23) {
  //             playerItem.money = playerItem.money + assType.assetscost * formInline.assetsNum * Math.pow(1.02, roundNum - assType.assetsround);
  //           } else if (formInline.assets == 22) {
  //             playerItem.money = playerItem.money + assType.assetscost * formInline.assetsNum;
  //           } else if (formInline.assets == 20) {
  //             playerItem.money = playerItem.money + assType.salePrice * formInline.assetsNum;
  //           } else {
  //             playerItem.money = playerItem.money + assType.cost * formInline.assetsNum * (Math.abs(roundNum) - sellround) * 1.01;
  //           }
  //           if (assType.houseType) {
  //             if ([1, 2, 3].includes(assType.houseType)) {
  //               playerItem.cashFlow = playerItem.cashFlow + 5000
  //             } else if ([4, 5].includes(assType.houseType)) {
  //               playerItem.cashFlow = playerItem.cashFlow + 3000
  //             } else if (assType.houseType === 6) {
  //               playerItem.cashFlow = playerItem.cashFlow + assType.cashFlow
  //             }
  //           } else {
  //             playerItem.cashFlow = playerItem.cashFlow - assType.cashFlow * formInline.assetsNum;
  //           }
  //         } else {
  //           playerItem.money = playerItem.money + assType.cost * formInline.assetsNum;
  //           playerItem.cashFlow = playerItem.cashFlow - assType.cashFlow * formInline.assetsNum;
  //           assType.assetsnumber = assType.assetsnumber - formInline.assetsNum;
  //         }
  //       }
  //     }
  //   });
  //   playerItem.assetsArray.splice(sellkeys, 1);
  // } else if (formInline.intel) {
  //   Object.keys(playerItem.inteArray).forEach(key => {
  //     const intelType = playerItem.inteArray;
  //     if (intelType[key].intelround == sellround) {
  //       if (formInline.intel == intelType[key].type) {
  //         // playerItem.inteArray.pop()
  //         playerItem.money = playerItem.money + intelType[key].salePrice + intelType[key].movieShow;
  //         playerItem.cashFlow = playerItem.cashFlow - intelType[key].cashFlow;
  //         sellkeys = key;
  //       }
  //     }
  //   });
  //   playerItem.inteArray.splice(sellkeys, 1);
  // }
  return playerItem;
}
