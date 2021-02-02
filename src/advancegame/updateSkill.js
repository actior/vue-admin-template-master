import NP from 'number-precision'
import {
  Message
} from "element-ui";

export function updateskill(playerformLine, playerItem, copyIntel, copyAssets, roundNum) {
  switch (Math.abs(playerformLine.refuses)) {
    case 1:
      sing(playerformLine, playerItem, copyIntel, roundNum)
      break;
    case 2:
      apothecary(playerformLine, playerItem, copyIntel, roundNum)
      break;
    case 3:
      anchor(playerformLine, playerItem, copyAssets, roundNum)
      break;
    case 4:
      psychiatrist(playerformLine, playerItem, copyAssets, roundNum)
      break;
    case 5:
      predestined(playerformLine, playerItem, copyAssets, roundNum)
      break;
    case 6:
      archaeological(playerformLine, playerItem)
      break;
    case 7:
      tourguide(playerformLine, playerItem, copyAssets, roundNum)
      break;
    case 8:
      huntfire(playerformLine, playerItem, copyAssets, roundNum)
      break;
    case 9:
      scrittore(playerformLine, playerItem, copyIntel, roundNum)
      break;
    case 10:
      performer(playerformLine, playerItem, copyIntel, roundNum)
      break;
    case 11:
      militarist(playerformLine, playerItem)
      break;
    case 12:
      demonstration(playerformLine, playerItem, copyAssets, roundNum)
      break;
    case 13:
      kannon(playerformLine, playerItem, roundNum)
      break;
    case 14:
      knight(playerformLine, playerItem)
      break;
  }
}

// 1.唱歌进阶
function sing(playerformLine, playerItem, copyIntel, roundNum) {
  const inteltable = [] // 知识产权
  copyIntel.map(item => {
    if (item.type === 1) {
      item.monryType = 2
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.intelnumber = playerformLine.assetsNum
      item.intelround = roundNum
      inteltable.push(item)
    }
  })
  playerItem.money = NP.minus(NP.plus(playerItem.money, NP.times(playerformLine.dice, 10000)), 10000)
  playerItem.inteArray = playerItem.inteArray.concat(inteltable)
  return playerItem
}

// 2.药师
function apothecary(playerformLine, playerItem, copyIntel, roundNum) {
  const inteltable = [] // 知识产权
  copyIntel.map(item => {
    if (item.type === 2) {
      item.monryType = 2
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.intelnumber = playerformLine.assetsNum
      item.intelround = roundNum
      item.cashFlow = 20000
      inteltable.push(item)
    }
  })
  if (Math.abs(playerItem.type) === 4) {
    if ([4, 5, 6].includes(playerformLine.dice)) {
      playerItem.cashFlow = NP.plus(playerItem.cashFlow, 20000)
      playerItem.inteArray = playerItem.inteArray.concat(inteltable)
    }
  } else if ([1, 2, 3, 5, 6].includes(Math.abs(playerItem.type))) {
    if ([5, 6].includes(playerformLine.dice)) {
      playerItem.cashFlow = NP.plus(playerItem.cashFlow, 20000)
      playerItem.inteArray = playerItem.inteArray.concat(inteltable)
    }
  }
  playerItem.money = NP.minus(playerItem.money, 20000)
  return playerItem
}

// 3.主播
function anchor(playerformLine, playerItem, copyAssets, roundNum) {
  const assetstable = [] // 资产列表
  copyAssets.map(item => {
    if (item.type === 14) {
      item.monryType = 1
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      item.cashFlow = NP.times(playerformLine.dice, 1000)
      assetstable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, NP.times(50000, playerItem.assetsdiscount))
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, NP.times(playerformLine.dice, 1000))
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
  return playerItem
}

// 4.心理咨询师
function psychiatrist(playerformLine, playerItem, copyAssets, roundNum) {
  const assetstable = [] // 资产列表
  copyAssets.map(item => {
    if (item.type === 15) {
      item.monryType = 1
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      assetstable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, NP.times(50000, playerItem.assetsdiscount))
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, 4000)
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
  return playerItem
}

// 5.红线仙
function predestined(playerformLine, playerItem, copyAssets, roundNum) {
  const assetstable = [] // 资产列表
  copyAssets.map(item => {
    if (item.type === 16) {
      item.monryType = 1
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      assetstable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, NP.times(200000, playerItem.assetsdiscount))
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, 15000)
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)

  return playerItem
}

// 6.考古王
function archaeological(playerformLine, playerItem) {
  playerItem.historyMon = 10000
  return playerItem
}

// 7.导游
function tourguide(playerformLine, playerItem, copyAssets, roundNum) {
  const assetstable = [] // 资产列表
  copyAssets.map(item => {
    if (item.type === 17) {
      item.monryType = 1
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      assetstable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, NP.times(100000, playerItem.assetsdiscount))
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, 6000)
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
  return playerItem
}

// 8.猎王
function huntfire(playerformLine, playerItem, copyAssets, roundNum) {
  const assetstable = [] // 资产列表
  copyAssets.map(item => {
    if (item.type === 18) {
      item.monryType = 1
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      assetstable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, NP.times(200000, playerItem.assetsdiscount))
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, 15000)
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)
  return playerItem
}

// 9.作家
function scrittore(playerformLine, playerItem, copyIntel, roundNum) {
  const inteltable = [] // 知识产权
  copyIntel.map(item => {
    if (item.type === 3) {
      item.monryType = 2
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.intelnumber = playerformLine.assetsNum
      item.intelround = roundNum
      inteltable.push(item)
    }
  })
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, NP.times(playerformLine.dice, 1000))
  playerItem.money = NP.minus(playerItem.money, 10000)
  playerItem.inteArray = playerItem.inteArray.concat(inteltable)
  return playerItem
}

// 10.演员
function performer(playerformLine, playerItem, copyIntel, roundNum) {
  const inteltable = [] // 知识产权
  copyIntel.map(item => {
    if (item.type === 4) {
      item.monryType = 2
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.intelnumber = playerformLine.assetsNum
      item.intelround = roundNum
      item.movieShow = NP.times(playerformLine.assetsNum, 10000)
      inteltable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, 350000)
  playerItem.inteArray = playerItem.inteArray.concat(inteltable)
  return playerItem
}

// 11.军事家
function militarist(playerformLine, playerItem) {
  for (let i of playerItem.skillList) {
    if (Math.abs(i.id) === 11) {
      i.useCount = 2
      i.name = "升阶博弈"
      playerItem.setup_game = 1
      playerItem.money = NP.minus(playerItem.money, 10000)
    }
  }

  return playerItem
}

// 12.太极大师
function demonstration(playerformLine, playerItem, copyAssets, roundNum) {
  const assetstable = [] // 资产列表
  copyAssets.map(item => {
    if (item.type === 19) {
      item.monryType = 1
      item.moneyId = Math.ceil(Math.random() * 9999999999999)
      item.assetsnumber = playerformLine.assetsNum
      item.assetsround = roundNum
      assetstable.push(item)
    }
  })
  playerItem.money = NP.minus(playerItem.money, NP.times(200000, playerItem.assetsdiscount))
  playerItem.cashFlow = NP.plus(playerItem.cashFlow, 20000)
  playerItem.assetsArray = playerItem.assetsArray.concat(assetstable)

  return playerItem
}

// 13.观音
function kannon(playerformLine, playerItem, roundNum) {
  for (let i of playerItem.skillList) {
    if (Math.abs(i.id) === 13) {
      playerItem.whofe = 1
      playerItem.whoferound = Math.abs(roundNum)
      playerItem.money = NP.minus(playerItem.money, 50000)
    }
  }

  return playerItem
}

// 14.侠客
function knight(playerformLine, playerItem) {
  for (let i of playerItem.skillList) {
    if (Math.abs(i.id) === 14) {
      playerItem.knight = 1
      playerItem.knightround = Math.abs(roundNum)
      playerItem.money = NP.minus(playerItem.money, 50000)
    }
  }
  return playerItem
}

export function skillRule(playerformLine) {
  if ([1, 2, 3, 9, 10].includes(Math.abs(playerformLine.refuses))) {
    if (!playerformLine.dice) {
      return 1
    }
  }
}
