import { Message } from "element-ui";

export function gridjs(
  playerformLine,
  playerItem,
  roundNum,
  copyIntel,
  copySkill,
  copyAssets
) {
  const metalList = [9, 17, 35, 43, 54]; // 贵金属，股票
  const media = [16, 30, 58]; // 换手机/电脑/车
  const credit = [2, 15, 26, 40]; // 信用卡
  const plassets = [
    1,
    69,
    4,
    12,
    18,
    21,
    25,
    29,
    34,
    41,
    42,
    49,
    53,
    55,
    59,
    60,
    65,
    7,
    32,
    67,
    9,
    17,
    35,
    43,
    54
  ]; // 资产购买列表
  const gridData = credit.includes(playerformLine.event)
    ? secondGrid(playerformLine, playerItem, roundNum)
    : plassets.includes(playerformLine.event)
    ? fourthGrid(playerformLine, playerItem, copyAssets, roundNum)
    : [6, 14, 20, 37, 47, 52, 61, 68].includes(playerformLine.event)
    ? sixthGrid(playerformLine, playerItem, copyIntel, roundNum, copyAssets)
    : media.includes(playerformLine.event)
    ? sixteenGrid(playerItem)
    : // : metalList.includes(playerformLine.event)
    // ? ninethGrid(playerformLine, playerItem, roundNum)
    [27, 63, 70].includes(playerformLine.event)
    ? auction(playerformLine, playerItem)
    : [39, 48, 62].includes(playerformLine.event)
    ? taxado(playerformLine, playerItem)
    : [5, 13, 24, 28, 31, 36, 44, 51, 57, 64].includes(playerformLine.event)
    ? skillMoney(playerItem, playerformLine, copySkill)
    : false;
  return gridData;
}
// 银行保险理财
function firstGrid(playerformLine, playerItem, roundNum) {
  if (playerformLine.assets == 23) {
    playerItem.money = playerItem.money - playerformLine.noble;
    playerItem.insurance = playerformLine.noble + Number(playerItem.insurance);
    playerItem.insuranceRound = roundNum;
    return playerItem;
  } else {
    Message({
      message: "请选择资产选择项",
      type: "error",
      duration: 5 * 1000
    });
  }
}

// 银行信贷信用卡
function secondGrid(playerformLine, playerItem, roundNum) {
  playerItem.money = playerItem.money + playerformLine.noble;
  playerItem.credit = playerformLine.noble * 1.1;
  playerItem.round = roundNum;
  playerItem.creditRound = 10;
  return playerItem;
}

// 小卖部
function fourthGrid(playerformLine, playerItem, copyAssets, roundNum) {
  let assetstable = []; // 资产列表
  copyAssets.forEach(item => {
    item.assetsnumber = playerformLine.assetsNum;
    item.assetsround = roundNum;
    item.assetscost = playerformLine.noble;
    if (item.type === playerformLine.assets) {
      // this.cashHistory.cost = item.cost;
      assetstable.push(item);
    }
  });
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable);
  if ([4, 21].includes(playerformLine.event)) {
    playerItem.money =
      playerItem.type === 2
        ? playerItem.money - 40000
        : playerItem.money - 50000;
    playerItem.cashFlow = playerItem.cashFlow + 1000;
  } else if (playerformLine.event === 12) {
    playerItem.money =
      playerItem.type === 2
        ? playerItem.money - 160000
        : playerItem.money - 200000;
    playerItem.cashFlow = playerItem.cashFlow + 4000;
  } else if ([18, 41].includes(playerformLine.event)) {
    playerItem.money =
      playerItem.type === 2
        ? playerItem.money - 80000
        : playerItem.money - 100000;
    playerItem.cashFlow = playerItem.cashFlow + 2000;
  } else if ([25, 29].includes(playerformLine.event)) {
    playerItem.money = playerItem.money - 200000;
    playerItem.cashFlow = playerItem.cashFlow + 5000;
  } else if (playerformLine.event === 34) {
    playerItem.money = playerItem.money - 500000;
    playerItem.cashFlow = playerItem.cashFlow + 30000;
  } else if (playerformLine.event === 42) {
    playerItem.money = playerItem.money - 300000;
    playerItem.cashFlow = playerItem.cashFlow + 9000;
  } else if (playerformLine.event === 49) {
    playerItem.money =
      playerItem.type === 2
        ? playerItem.money - 350000
        : playerItem.money - 400000;
    playerItem.cashFlow = playerItem.cashFlow + 20000;
  } else if (playerformLine.event === 53) {
    playerItem.money =
      playerItem.type === 2
        ? playerItem.money - 160000
        : playerItem.money - 200000;
    playerItem.cashFlow = playerItem.cashFlow + 14000;
  } else if (playerformLine.event === 55) {
    playerItem.money = playerItem.money - 300000;
    playerItem.cashFlow = playerItem.cashFlow + 12000;
  } else if (playerformLine.event === 59) {
    playerItem.money = playerItem.money - 400000;
    playerItem.cashFlow = playerItem.cashFlow + 12000;
  } else if (playerformLine.event === 60) {
    if (playerformLine.assetsNum <= 10) {
      playerItem.money = playerItem.money - playerformLine.assetsNum * 100000;
      playerItem.cashFlow =
        playerItem.cashFlow + playerformLine.assetsNum * 2000;
    } else {
      playerItem.money = playerItem.money - playerformLine.assetsNum * 100000;
      playerItem.cashFlow =
        playerItem.cashFlow + 50000 + playerformLine.assetsNum * 2000;
    }
  } else if (playerformLine.event === 65) {
    if (playerformLine.assetsNum <= 6) {
      playerItem.money = playerItem.money - playerformLine.assetsNum * 100000;
      playerItem.cashFlow =
        playerItem.cashFlow + playerformLine.assetsNum * 2000;
    } else {
      playerItem.money = playerItem.money - playerformLine.assetsNum * 100000;
      playerItem.cashFlow =
        playerItem.cashFlow + 20000 + playerformLine.assetsNum * 2000;
    }
  } else if ([1, 69].includes(playerformLine.event)) {
    playerItem.money = playerItem.money - playerformLine.noble;
  } else if (playerformLine.assets == 20) {
    if ([1, 2, 3].includes(playerformLine.dice)) {
      playerItem.cashFlow = playerItem.cashFlow - 5000;
    } else if ([5, 4].includes(playerformLine.dice)) {
      playerItem.cashFlow = playerItem.cashFlow - 3000;
    }
    playerItem.money = playerItem.money - 150000;
  } else if ([9, 17, 35, 43, 54].includes(playerformLine.event)) {
    if (playerformLine.assets == 21) {
      playerItem.metals = playerItem.metals + playerformLine.noble;
      playerItem.metalsRound = roundNum;
    } else if (playerformLine.assets == 22) {
      playerItem.stock = playerItem.stock + playerformLine.noble;
      playerItem.stockRound = roundNum;
    }
    playerItem.money = playerItem.money - playerformLine.noble;
  }
  return playerItem;
}
// 大学研发中心
function sixthGrid(
  playerformLine,
  playerItem,
  copyIntel,
  roundNum,
  copyAssets
) {
  if (playerformLine.intel) {
    let inteltable = []; // 知识产权
    copyIntel.forEach(item => {
      if (item.type === playerformLine.intel) {
        item.intelnumber = playerformLine.assetsNum;
        item.intelround = roundNum;
        inteltable.push(item);
      }
    });
    playerItem.inteArray = playerItem.inteArray.concat(inteltable);
    if (playerformLine.intel == 1) {
      playerItem.money = playerItem.money - 10000;
    } else if (playerformLine.intel == 2) {
      playerItem.money = playerItem.money - 20000;
      playerItem.cashFlow = playerItem.cashFlow + 20000;
    } else if (playerformLine.intel == 3) {
      playerItem.money = playerItem.money - 100000;
      playerItem.cashFlow = playerItem.cashFlow + playerformLine.dice * 1000;
    } else if (playerformLine.intel == 4) {
      playerItem.money = playerItem.money - 350000;
      playerItem.movieShow = playerformLine.cashmoney;
    }
  } else if (playerformLine.assets) {
    let assetstable = []; // 资产列表
    copyAssets.forEach(item => {
      item.assetsnumber = playerformLine.assetsNum;
      item.assetsround = roundNum;
      if ([21, 22, 23].includes(playerformLine.assets)) {
        item.cost = playerformLine.noble;
      }
      if (item.type === playerformLine.assets) {
        // this.cashHistory.cost = item.cost;
        assetstable.push(item);
      }
    });
    playerItem.assetsArray = playerItem.assetsArray.concat(assetstable);
    if (playerformLine.assets == 14) {
      playerItem.money = playerItem.money - 50000;
      playerItem.cashFlow = playerItem.cashFlow + playerformLine.dice * 1000;
    } else if (playerformLine.assets == 15) {
      playerItem.money = playerItem.money - 50000;
      playerItem.cashFlow = playerItem.cashFlow + 4000;
    } else if (playerformLine.assets == 16) {
      playerItem.money = playerItem.money - 200000;
      playerItem.cashFlow = playerItem.cashFlow + 15000;
    } else if (playerformLine.assets == 17) {
      playerItem.money = playerItem.money - 100000;
      playerItem.cashFlow = playerItem.cashFlow + 6000;
    } else if (playerformLine.assets == 18) {
      playerItem.money = playerItem.money - 200000;
      playerItem.cashFlow = playerItem.cashFlow + 15000;
    }
  } else {
    if (playerItem.developed == 1) {
      playerItem.developed = 0;
      ++playerItem.skill;
      if (playerItem.type === 1) {
        playerItem.money = playerItem.money - 30000;
      } else if (playerItem.type === 2) {
        playerItem.money = playerItem.money - 20000;
      } else if (playerItem.type === 3) {
        playerItem.money = playerItem.money - 10000;
      } else if (playerItem.type === 4) {
        playerItem.money = playerItem.money - 10000;
      }
    } else {
      if (playerItem.type === 1) {
        playerItem.money = playerItem.money - 30000;
        ++playerItem.developed;
      } else if (playerItem.type === 2) {
        playerItem.money = playerItem.money - 20000;
        ++playerItem.developed;
      } else if (playerItem.type === 3) {
        playerItem.money = playerItem.money - 10000;
        ++playerItem.developed;
      } else if (playerItem.type === 4) {
        playerItem.money = playerItem.money - 10000;
        ++playerItem.developed;
      }
    }
    if (playerItem.type === 5) {
      if (playerformLine.dice === 1) {
        playerItem.money = playerItem.money - 2000;
        playerItem.cashFlow = playerItem.cashFlow + 5000;
        copyIntel.forEach(item => {
          if (item.type === 5) {
            item.intelnumber = playerformLine.assetsNum;
            playerItem.inteArray.push(item);
          }
        });
      }
    } else if (playerItem.type === 6) {
      if (playerformLine.dice === 1) {
        playerItem.money = playerItem.money - 6000;
        playerItem.cashFlow = playerItem.cashFlow + 5000;
        copyIntel.forEach(item => {
          if (item.type === 6) {
            item.intelnumber = playerformLine.assetsNum;
            playerItem.inteArray.push(item);
          }
        });
      }
    }
  }
  return playerItem;
}
// 房产
// function houseBuy(playerformLine, playerItem) {
//   if (playerformLine.assets == 20) {
//     if ([1, 2, 3].includes(playerformLine.dice)) {
//       playerItem.cashFlow = playerItem.cashFlow - 5000;
//     } else if ([5, 4].includes(playerformLine.dice)) {
//       playerItem.cashFlow = playerItem.cashFlow - 3000;
//     }
//     playerItem.money = playerItem.money - 150000;
//   }
//   return playerItem;
// }

// 森林交易所
function eighthGrid() {}

// 银行贵金属 基金股票
function ninethGrid(playerformLine, playerItem, roundNum) {
  if (playerformLine.assets == 21) {
    playerItem.metals = playerItem.metals + playerformLine.noble;
    playerItem.metalsRound = roundNum;
  } else if (playerformLine.assets == 22) {
    playerItem.stock = playerItem.stock + playerformLine.noble;
    playerItem.stockRound = roundNum;
  }
  playerItem.money = playerItem.money - playerformLine.noble;
  return playerItem;
}

// 换手机/电脑/车
function sixteenGrid(playerItem) {
  if (playerItem.exchange === 0) {
    playerItem.money = playerItem.money - 8000;
  } else if (playerItem.exchange === 1) {
    playerItem.money = playerItem.money - 10000;
  } else if (playerItem.exchange === 2) {
    playerItem.money = playerItem.money - 200000;
    playerItem.cashFlow = playerItem.cashFlow - 3000;
  }
  ++playerItem.exchange;
  return playerItem;
}

// 银行拍卖会
function auction(playerItem, playerformLine) {
  playerItem.money = playerItem.money + playerformLine.cashmoney;
  return playerItem;
}

// 税务稽查
function taxado(playerItem, playerformLine) {
  playerItem.money = playerItem.money - playerformLine.cashmoney;
  return playerItem;
}

// 奇人技能费用计算
function skillMoney(playerItem, playerformLine, copySkill) {
  // 技能花费
  let skillTasket = 0;
  let skillofthe = []; // 奇人技能表
  copySkill.forEach(item => {
    delete item.description;
    delete item.upgrade;
    delete item.upgradeDescription;
    delete item.title;
    if (playerformLine.ofthe === item.id) {
      skillofthe.push(item);
      skillTasket = item.cost;
    }
  });
  playerItem.skillList = playerItem.skillList.concat(skillofthe);
  if (playerformLine.ofthe == "3") {
    playerItem.cashFlow = playerItem.cashFlow + 2000;
  } else if (playerformLine.ofthe == "9") {
    playerItem.cashFlow = playerItem.cashFlow + 1000;
  } else if (playerformLine.ofthe == "10") {
    playerItem.cashFlow = playerItem.cashFlow + 500;
  } else if (playerformLine.ofthe == "4") {
    if (playerItem.depressed > 0) {
      playerItem.depressed = 0;
      playerItem.cashFlow = playerItem.cashFlow + 2000;
    }
  }
  playerItem.money = playerItem.money - skillTasket;
  return playerItem;
}
