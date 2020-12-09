export function sell(playerItem, formInline, roundNum, sellround) {
  const sellgrid = [8, 11, 23, 33, 45, 50, 56];
  const gridData = sellgrid.includes(formInline.event)
    ? sellAssets(playerItem, formInline, roundNum, sellround)
    : [6, 14, 20, 37, 47, 52, 61, 68].includes(formInline.event)
    ? sellreduce(playerItem, formInline)
    : false;
  return gridData;
}

// 卖出资产系列
function sellAssets(playerItem, formInline, roundNum, sellround) {
  let sellkeys = null;
  if (formInline.assets) {
    Object.keys(playerItem.assetsArray).forEach(key => {
      const assType = playerItem.assetsArray[key];
      if (formInline.assets == assType.type) {
        if (assType.assetsround == sellround) {
          if (formInline.assetsNum == assType.assetsnumber) {
            if (formInline.assets == 21) {
              playerItem.money =
                playerItem.money +
                assType.assetscost *
                  formInline.assetsNum *
                  Math.pow(1.03, roundNum - assType.assetsround);
            } else if (formInline.assets == 23) {
              playerItem.money =
                playerItem.money +
                assType.assetscost *
                  formInline.assetsNum *
                  Math.pow(1.02, roundNum - assType.assetsround);
            } else if (formInline.assets == 22) {
              playerItem.money =
                playerItem.money + assType.assetscost * formInline.assetsNum;
            } else if (formInline.assets == 20) {
              playerItem.money =
                playerItem.money + assType.salePrice * formInline.assetsNum;
            } else {
              playerItem.money =
                playerItem.money + assType.cost * formInline.assetsNum;
            }
            playerItem.cashFlow =
              playerItem.cashFlow - assType.cashFlow * formInline.assetsNum;
          } else {
            playerItem.money =
              playerItem.money + assType.cost * formInline.assetsNum;
            playerItem.cashFlow =
              playerItem.cashFlow - assType.cashFlow * formInline.assetsNum;
            assType.assetsnumber = assType.assetsnumber - formInline.assetsNum;
          }
        }
      }
    });
    playerItem.assetsArray.splice(sellkeys, 1);
  } else if (formInline.intel) {
    Object.keys(playerItem.inteArray).forEach(key => {
      const intelType = playerItem.inteArray;
      // console.log('intelType: ', intelType);
      if (intelType[key].intelround == sellround) {
        // console.log('sellround: ', sellround);
        // console.log("key: ", key);
        if (formInline.intel == intelType[key].type) {
          // playerItem.inteArray.pop()
          playerItem.money =
            playerItem.money - intelType[key].cost + intelType[key].salePrice;
          playerItem.cashFlow = playerItem.cashFlow - intelType[key].cashFlow;
          sellkeys = key;
        }
      }
    });
    playerItem.inteArray.splice(sellkeys, 1);
  }
  return playerItem;
}

function sellreduce(playerItem, formInline) {
  playerItem.money = playerItem.money - formInline.cashmoney;
  return playerItem;
}
