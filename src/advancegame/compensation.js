import NP from "number-precision";
import {
  Message
} from "element-ui";
 // 赔偿
export function compensation(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.noble && formInline.sell.length === 0) {
    if (NP.minus(infoItem.money, formInline.noble) >= 0) {
      infoItem.money = NP.minus(infoItem.money, formInline.noble)
      if (NP.minus(infoItem.borrower, formInline.noble) < 0) {
        infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, formInline.noble)), infoItem.money)
        infoItem.borrower = 0
      } else {
        infoItem.borrower = NP.minus(infoItem.borrower, formInline.noble)
      }
    } else {
      Message({
        message: '当前输入的金额超过现有的金额'
      })
      return
    }
  }
  if (formInline.sell.length !== 0) {
    formInline.sell.map(itemid => {
      infoItem.assetsArray.map((item, index) => {
        if (item.moneyId === Math.abs(itemid)) {
          if (item.type == 21) {
            if (formInline.noble) {
              if (item.assetscost >= formInline.noble) {
                item.assetscost = NP.minus(item.assetscost, formInline.noble)
                if (NP.minus(infoItem.borrower, NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8)) < 0) {
                  infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))), infoItem.money)
                  infoItem.borrower = 0
                } else {
                  infoItem.borrower = NP.minus(infoItem.borrower, NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))
                }
                if (item.assetscost === 0) {
                  infoItem.assetsArray.splice(index, 1);
                }
              } else {
                Message({
                  message: '当前输入可用资金超过现有的资金'
                })
                return
              }
            } else {
              if (infoItem.borrower > 0) {
                if (NP.minus(infoItem.borrower, NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8)) < 0) {
                  infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))), infoItem.money)
                  infoItem.borrower = 0
                } else {
                  infoItem.borrower = NP.minus(infoItem.borrower, NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.03, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))
                }
                infoItem.assetsArray.splice(index, 1);
              } else {
                return
              }
            }
          } else if (item.type == 22) {
            if (formInline.noble) {
              if (item.assetscost > formInline.noble) {
                item.assetscost = NP.minus(item.assetscost, formInline.noble)
                if (NP.minus(infoItem.borrower, NP.times(formInline.noble, 0.8)) < 0) {
                  infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(formInline.noble, 0.8))), infoItem.money)
                  infoItem.borrower = 0
                } else {
                  infoItem.borrower = NP.minus(infoItem.borrower, NP.times(formInline.noble, 0.8))
                }
                if (item.assetscost === 0) {
                  infoItem.assetsArray.splice(index, 1);
                }
              } else {
                Message({
                  message: '当前输入可用资金超过现有的资金'
                })
                return
              }
            } else {
              if (infoItem.borrower > 0) {
                if (NP.minus(infoItem.borrower, NP.times(item.assetscost, 0.8)) < 0) {
                  infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(item.assetscost, 0.8))), infoItem.money)
                  infoItem.borrower = 0
                } else {
                  infoItem.borrower = NP.minus(infoItem.borrower, NP.times(item.assetscost, 0.8))
                }
                infoItem.assetsArray.splice(index, 1);
              } else {
                return
              }
            }
          } else if (item.type == 23) {
            if (formInline.noble) {
              if (item.assetscost > formInline.noble) {
                item.assetscost = NP.minus(item.assetscost, formInline.noble)
                if (NP.minus(infoItem.borrower, NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8)) < 0) {
                  infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))), infoItem.money)
                  infoItem.borrower = 0
                } else {
                  infoItem.borrower = NP.minus(infoItem.borrower, NP.times(formInline.noble, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))
                }
                if (item.assetscost === 0) {
                  infoItem.assetsArray.splice(index, 1);
                }
              } else {
                Message({
                  message: '当前输入可用资金超过现有的资金'
                })
                return
              }
            } else {
              if (infoItem.borrower > 0) {
                if (NP.minus(infoItem.borrower, NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8)) < 0) {
                  infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))), infoItem.money)
                  infoItem.borrower = 0
                } else {
                  infoItem.borrower = NP.minus(infoItem.borrower, NP.times(item.assetscost, Math.pow(roundNum === item.assetsround ? 1 : 1.02, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround)), 0.8))
                }
                infoItem.assetsArray.splice(index, 1);
              } else {
                return
              }
            }
          } else if (item.type == 20) {
            if (infoItem.borrower > 0) {
              if (NP.minus(infoItem.borrower, NP.times(item.salePrice, 0.8)) < 0) {
                infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(item.salePrice, 0.8))), infoItem.money)
                infoItem.borrower = 0
              } else {
                infoItem.borrower = NP.minus(infoItem.borrower, NP.times(item.salePrice, 0.8))
              }
              if (NP.minus(roundNum, item.assetsround) < 10) {
                if ([1, 2, 3].includes(arr.houseType)) {
                  infoItem.cashFlow = NP.plus(infoItem.cashFlow, 5000)
                } else if ([4, 5].includes(arr.houseType)) {
                  infoItem.cashFlow = NP.plus(infoItem.cashFlow, 3000)
                }
              }
              infoItem.assetsArray.splice(index, 1);
            } else {
              return
            }
          } else {
            if (infoItem.borrower > 0) {
              if (NP.minus(infoItem.borrower, NP.times(item.cost, roundNum === item.assetsround ? 1 : 1.01, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround), 0.8)) < 0) {
                infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(item.cost, roundNum === item.assetsround ? 1 : 1.01, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround), 0.8))), infoItem.money)
                infoItem.borrower = 0
              } else {
                infoItem.borrower = NP.minus(infoItem.borrower, NP.times(item.cost, roundNum === item.assetsround ? 1 : 1.01, NP.minus(roundNum === item.assetsround ? NP.plus(roundNum, 1) : roundNum, item.assetsround), 0.8))
              }
              infoItem.cashFlow = NP.minus(infoItem.cashFlow, item.cashFlow)
              infoItem.assetsArray.splice(index, 1);
            } else {
              return
            }
            return
          }
        }
      })
      infoItem.inteArray.map((item, index) => {
        if (item.moneyId === Math.abs(itemid)) {
          if (infoItem.borrower > 0) {
            if (NP.minus(infoItem.borrower, NP.times(item.salePrice, 0.8), NP.times(item.movieShow ? item.movieShow : 0, 0.8)) < 0) {
              infoItem.money = NP.plus(Math.abs(NP.minus(infoItem.borrower, NP.times(item.salePrice, 0.8), NP.times(item.movieShow ? item.movieShow : 0, 0.8))), infoItem.money)
              infoItem.borrower = 0
            } else {
              infoItem.borrower = NP.minus(infoItem.borrower, NP.times(item.salePrice, 0.8), NP.times(item.movieShow ? item.movieShow : 0, 0.8))
            }
            infoItem.cashFlow = NP.minus(infoItem.cashFlow, item.cashFlow)
          }
          infoItem.inteArray.splice(index, 1);
          return
        }
      })
    })
  }
  if (infoItem.borrower <= 0) {
    infoItem.borrowerRound = null
  }
  return infoItem
}
