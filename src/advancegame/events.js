import NP from "number-precision";
import {
  Message,
  MessageBox
} from "element-ui";

// 事件集合
export function eventCounter(
  formInline,
  infoItem,
  roundNum,
  infoIndex,
  roleData,
  assetsData
) {
  switch (Math.abs(formInline.affair)) {
    case 1: // 金融危机
      crisis(infoItem);
      break;
    case 2: // 局部暴乱
      riots(infoItem);
      break;
    case 3: // 贸易战
      warheads(infoItem);
      break;
    case 4: // 地震海啸
      tsunami(infoItem);
      break;
    case 5: // 5G技术应用推广
      promotion(infoItem);
      break;
    case 6: // ARVR技术应用推广
      technologyCopyright(infoItem);
      break;
    case 7: // 人工智能推广
      proficiency(infoItem);
      break;
    case 8: // 经济萧条
      economy(infoItem, roundNum);
      break;
    case 9: // 瘟疫
      plaguerelease(infoItem, roundNum);
      break;
    case 10: // 房产泡沫破裂
      housing(infoItem, roundNum);
      break;
    case 11: // 恒恒资金链断裂房产促销
      capitalf(formInline, infoItem, roundNum, infoIndex, assetsData);
      break;
    case 12: // 恒恒资金链断裂房产促销
      taxes(infoItem);
      break;
    case 13: // 社会老龄化
      aging(infoItem, roundNum);
      break;
    case 14: // 发现新能源
      renewable(infoItem);
      break;
    case 15: // 科技革命
      rhineland(infoItem);
      break;
    case 16: // 生态崩溃
      ecological(infoItem);
      break;
    case 17: // 双胞胎
      twinsby(formInline, infoItem, infoIndex);
      break;
    case 18: // 2014年全面放开限购
      foreign(infoItem);
      break;
    case 19: // 2008-2010，四万亿投资计划
      trillion(infoItem);
      break;
    case 20: // 2015年，股市大牛市
      market(infoItem);
      break;
    case 21: // 2015年，股灾
      crashes(infoItem);
      break;
    case 22: // 2016年1月4日，A股\"熔断\"
      qfusing(formInline, infoItem);
      break;
    case 23: // 2006年，股市大牛市
      usmarket(infoItem);
      break;
    case 24: // 政府采购征用
      government(infoItem);
      break;
    case 25: // 生生科技假疫苗事件
      vaccine(formInline, infoItem)
      break;
    case 26: // 员工工伤
      employees(formInline, infoItem, roundNum, infoIndex)
      break;
    case 27: //台台酒股票基金
      taitaiWine(formInline, infoItem)
      break;
    case 28: // 发现大规模金矿
      gold(infoItem);
      break;
    case 29: // 提前退休
      retirement(formInline, infoItem, roundNum, infoIndex, roleData);
      break;
    case 30: // 公司裁员失业
      layoffs(formInline, infoItem, roundNum, infoIndex, roleData);
      break;
    case 31: // 公司倒闭潮
      collapse(formInline, infoItem, roundNum, infoIndex, roleData);
      break;
    case 32: // 亚健康
      nohealth(formInline, infoItem, roundNum, infoIndex);
      break;
    case 33: // 抑郁症
      depressionface(formInline, infoItem, roundNum, infoIndex);
      break;
    case 34: // 家中失火
      fireline(formInline, infoItem, roundNum, infoIndex);
      break;
    case 35: // 交通事故
      roadworks(formInline, infoItem, roundNum, infoIndex)
      break;
    case 37: // 实业倒闭潮
      industrial(formInline, infoItem, roundNum, infoIndex);
      break;
    case 38: // 互联网+
      internet(infoItem);
      break;
    case 39: // 家中老人住院
      folded(formInline, infoItem, roundNum, infoIndex)
      break;
    case 40: // 服用保健品意外中毒
      healthsold(formInline, infoItem, roundNum, infoIndex)
      break;
    case 41: // 城市举办奥运会
      olympics(infoItem, roundNum);
      break;
    case 42: // 财神降临
      thegods(formInline, infoItem);
      break;
    case 43: // 天降横财
      theskys(infoItem);
      break;
    case 44: // 天降神童
      childof(formInline, infoItem, infoIndex);
      break;
    case 45: // 老人遗愿
      holding(formInline, infoItem, infoIndex);
      break;
    case 46: // 瘟神降临
      lorene(formInline, infoItem, roundNum, infoIndex);
      break;
    case 47: // 救治公爵
      treatment(formInline, infoItem, infoIndex);
      break;
    case 48: // 开导女王
      channel(formInline, infoItem, infoIndex);
      break;
  }
}

// 金融危机
export function crisis(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 5000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 4000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 3000;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow - 4000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 4000;
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = item.assetscost * 2;
      }
    });
  }
  return infoItem;
}

// 局部暴乱
export function riots(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.money = infoItem.money - 30000;
  } else if (gameTypeId === 2) {
    infoItem.money = infoItem.money - 20000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 3000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow + 2000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.5);
      }
    });
  }
  return infoItem;
}

// 贸易战
export function warheads(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.5);
      }
    });
  }
  return infoItem;
}

// 地震海啸
export function tsunami(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow + 500;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.2);
      }
    });
  }
  return infoItem;
}

// 5G技术应用推广
export function promotion(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow + 2000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow + 2000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 500;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  }
  return infoItem;
}

// ARVR技术应用推广
export function technologyCopyright(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 500;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  }
  return infoItem;
}

// 人工智能推广
export function proficiency(infoItem) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow + 3000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow + 3000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 500;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 1000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 3000;
  }
  return infoItem;
}

// 经济萧条
function economy(infoItem, roundNum) {
  infoItem.cashFlow = NP.times(infoItem.cashFlow, 0.5);
  infoItem.reduceshFlow = infoItem.cashFlow;
  infoItem.economyRound = roundNum;
  infoItem.economydiscount = 0.7;
  infoItem.assetsdiscount = infoItem.economydiscount;
  infoItem.economyId = 8;
  return infoItem;
}

// 瘟疫
export function plaguerelease(infoItem, roundNum) {
  const gameTypeId = infoItem.gameType.id;
  infoItem.plaguereleaseRound = Math.abs(roundNum);
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow + 2000;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow + 4000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 1000;
  }
  if (infoItem.assetsArray.length !== 0) {
    let assTypeNumber = 0;
    let plaguereleaseSum = new Number(0);
    infoItem.assetsArray.forEach(item => {
      if (item.type === 14) {
        // item.cashFlow = item.cashFlow, 1.5
        assTypeNumber++;
      }
      if ([2, 4, 5, 6, 8, 11].includes(item.type)) {
        plaguereleaseSum += item.cashFlow;
      }
    });
    infoItem.cashFlow =
      infoItem.cashFlow - plaguereleaseSum + assTypeNumber * 2000;
    infoItem.plaguereleaseSum = plaguereleaseSum;
  }
  return infoItem;
}

// 房产泡沫破裂
export function housing(infoItem, roundNum) {
  const gameTypeId = infoItem.gameType.id;
  if (gameTypeId === 1) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 2) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 3) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 4) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 5) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  } else if (gameTypeId === 6) {
    infoItem.cashFlow = infoItem.cashFlow - 2000;
  }
  if (infoItem.assetsArray.length !== 0) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 21) {
        item.assetscost = NP.times(item.assetscost, 1.3);
        item.salePrice = 100000;
      }
    });
  }
  infoItem.housingId = 10;
  infoItem.housingRound = roundNum;
  infoItem.housingDiscount = 0.8;
  infoItem.assetsdiscount = infoItem.housingDiscount;
  return infoItem;
}

// 11.恒恒资金链断裂房产促销
function capitalf(formInline, infoItem, roundNum, infoIndex, assetsData) {
  if (formInline.moreplayer && formInline.dices) {
    if (formInline.moreplayer.length === 1) {
      if (formInline.moreplayer.includes(infoIndex + 1)) {
        let assetstable = [] // 资产列表
        assetsData.map(item => {
          if (item.type === 20) {
            item.monryType = 1
            item.assetsnumber = 1
            item.assetsround = Math.abs(roundNum)
            item.assetscost = formInline.noble
            item.houseType = Math.abs(formInline.dices[0])
            item.moneyId = Math.ceil(Math.random() * 9999999999999)
            assetstable.push(item)
          }
        })
        if ([5].includes(formInline.dices[0])) {
          infoItem.cashFlow = NP.minus(infoItem.cashFlow, 3000)
        }
        infoItem.money = NP.minus(infoItem.money, 100000)
        infoItem.assetsArray = infoItem.assetsArray.concat(assetstable)
      }
      return infoItem;
    } else if (formInline.moreplayer.length === 2) {
      if (formInline.moreplayer.includes(infoIndex + 1)) {
        let assetstable = [] // 资产列表
        formInline.moreplayer.map((items, indexs) => {
          if (items === infoIndex + 1) {
            assetsData.map(item => {
              if (item.type === 20) {
                item.monryType = 1
                item.assetsnumber = 1
                item.assetsround = Math.abs(roundNum)
                item.assetscost = formInline.noble
                item.houseType = Math.abs(formInline.dices[indexs])
                item.moneyId = Math.ceil(Math.random() * 9999999999999)
                let arritem = Object.assign({}, item)
                assetstable.push(arritem)
              }
            })
            if ([5].includes(Math.abs(formInline.dices[indexs]))) {
              console.log('456')
              infoItem.cashFlow = NP.minus(infoItem.cashFlow, 3000)
            }
          }
        })
        infoItem.money = NP.minus(infoItem.money, 100000)
        infoItem.assetsArray = infoItem.assetsArray.concat(assetstable)
        return infoItem;
      }
    }
  } else {
    Message({
      message: "请输入多玩家编号"
    })
    return
  }
}

// 12.房产税出台
function taxes(infoItem) {
  infoItem.assetsArray.map(item => {
    if (item.type === 20) {
      item.salePrice = 200000
    }
  })
  return infoItem;
}

// 13.社会老龄化
function aging(infoItem, roundNum) {
  if (Math.abs(roundNum) > 15) {
    if (infoItem.testsset === 0) {
      infoItem.cashFlow = infoItem.cashFlow - 20000;
    } else {
      infoItem.cashFlow = infoItem.cashFlow + 20000 * infoItem.testsset;
    }
    return infoItem;
  } else {
    Message({
      message: '当前回合数未达到15回合'
    })
    return
  }
}

// 14.发现新能源
function renewable(infoItem) {
  infoItem.cashFlow = NP.times(infoItem.cashFlow, 1.5);
  return infoItem;
}

// 15.科技革命
function rhineland(infoItem) {
  infoItem.cashFlow = NP.times(infoItem.cashFlow, 2);
  return infoItem;
}

// 16.生态崩溃
function ecological(infoItem) {
  let result = [];
  for (let i of infoItem.assetsArray) {
    if (i.type === 12) {
      result.push(i);
    }
  }
  infoItem.cashFlow =
    NP.times(infoItem.cashFlow, 0.5) + NP.times(2000, result.length);
  return infoItem;
}

// 17.双胞胎
function twinsby(formInline, infoItem, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (infoItem.marriages === 1) {
      infoItem.eventTestsset = 2;
    } else {
      Message({
        message: "目前你是单身狗",
        type: "warning"
      });
      return;
    }
    return infoItem;
  }
}

// 18.2014年全面放开限购
function foreign(infoItem) {
  infoItem.assetsArray.map(item => {
    if (item.type === 20) {
      item.salePrice = 800000
    }
  })
  return infoItem;
}

// 19.2008-2010.四万亿投资计划
function trillion(infoItem) {
  infoItem.cashFlow = NP.plus(5000, infoItem.cashFlow);
  infoItem.assetsArray.forEach(arr => {
    if (arr.type === 21) {
      arr.assetscost = NP.times(arr.assetscost, 1.5);
    }
  });
  return infoItem;
}

// 20.2015年，股市大牛市
function market(infoItem) {
  return infoItem;
}

// 21.2015年,股市
function crashes(infoItem) {
  return infoItem;
}

// 22.2016年1月4日，A股熔断
function qfusing(formInline, infoItem) {
  if (formInline.thereof) {
    infoItem.assetsArray.forEach(arr => {
      if (arr.type === 22) {
        arr.assetscost = NP.times(
          arr.assetscost,
          NP.plus(1, NP.times(formInline.thereof[0], 0.01))
        );
      }
    });
  } else {
    Message({
      message: "你未输入当前股票基金汇率"
    });
    return;
  }
  return infoItem;
}

// 23.2006年，股市大牛市
function usmarket(infoItem) {
  return infoItem;
}

// 24.政府采购征用
function government(infoItem) {
  let assets = new Number();
  infoItem.assetsArray.map(item => {
    if ([2, 4, 8, 17, 18, 19].includes(item.type)) {
      assets += item.cashFlow;
    }
  });
  infoItem.money = infoItem.money + NP.times(assets, 5);
  return infoItem;
}

// 25.生生科技假疫苗事件
function vaccine(formInline, infoItem) {
  if (formInline.thereof) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 22) {
        formInline.thereof.map(items => {
          item.assetscost = NP.times(item.assetscost, NP.plus(NP.times(items, 0.01), 1))
        })
      }
    })
  }
  return infoItem;
}

// 26.员工工伤
function employees(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (!infoItem.bankihttpRun) {
      infoItem.borrower = NP.plus(infoItem.borrower, 300000)
      infoItem.borrowerRound = roundNum
      infoItem.borrowerNum = 6
    } else {
      if (NP.minus(roundNum, infoItem.bankihttpRun) > 10) {
        infoItem.borrower = NP.plus(infoItem.borrower, 300000)
        infoItem.borrowerRound = roundNum
        infoItem.borrowerNum = 6
      } else {
        Message({
          message: '该费用由保险公司支付',
          type: 'success'
        })
        return
      }
    }
  }
  return infoItem
}

// 27.台台酒股票基金
function taitaiWine(formInline, infoItem) {
  if (formInline.thereof) {
    infoItem.assetsArray.forEach(item => {
      if (item.type === 22) {
        formInline.thereof.map(items => {
          item.assetscost = NP.times(item.assetscost, NP.plus(NP.times(items, 0.01), 1))
        })
      }
    })
  }
}

// 28.发现大规模金矿
function gold(infoItem) {
  infoItem.assetsArray.map(item => {
    if (item.type === 21) {
      item.assetscost = NP.times(item.assetscost, 0.9);
    }
  });
  return infoItem;
}

// 29.提前退休
function retirement(formInline, infoItem, roundNum, infoIndex, roleData) {
  if (formInline.number - 1 === infoIndex) {
    if (infoItem.bankihttpRun) {
      if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
        roleData.map(items => {
          if (items.type === infoItem.type) {
            infoItem.cashFlow = NP.plus(
              NP.times(2, items.cashFlow),
              infoItem.cashFlow
            );
          }
        });
      } else {
        console.log("银行保险已经过期了");
      }
    } else {
      console.log("暂时没有购买银行保险");
    }
    roleData.map(items => {
      if (items.type === infoItem.type) {
        infoItem.cashFlow = NP.minus(infoItem.cashFlow, items.cashFlow);
      }
    });
  }
  return infoItem;
}

// 30.公司裁员失业
function layoffs(formInline, infoItem, roundNum, infoIndex, roleData) {
  if (formInline.number - 1 === infoIndex) {
    if (infoItem.bankihttpRun) {
      if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
        infoItem.cashFlow = NP.plus(2000, infoItem.cashFlow);
      } else {
        console.log("银行保险已经过期了");
      }
    } else {
      console.log("暂时没有购买银行保险");
    }
    roleData.map(items => {
      if (items.type === infoItem.type) {
        infoItem.cashFlow = NP.minus(infoItem.cashFlow, items.cashFlow);
      }
    });
  }
  return infoItem;
}

// 31.公司倒闭潮
function collapse(formInline, infoItem, roundNum, infoIndex, roleData) {
  if (formInline.moreplayer && [1, 3, 5].includes(formInline.dice)) {
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      if (infoItem.bankihttpRun) {
        if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
          infoItem.cashFlow = NP.plus(2000, infoItem.cashFlow);
        } else {
          console.log("银行保险已经过期了");
        }
      } else {
        console.log("暂时没有购买银行保险");
      }
      roleData.map(items => {
        if (items.type === infoItem.type) {
          infoItem.cashFlow = NP.minus(infoItem.cashFlow, items.cashFlow);
        }
      });
    }
  } else {
    Message({
      message: "请选择多选玩家或者骰子点数"
    });
    return;
  }
  return infoItem;
}

// 32.亚健康
function nohealth(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (infoItem.skillHealth === 1) {
      Message({
        message: "技能太极大师免疫亚健康",
        type: "success",
        duration: 3 * 1000
      });
    } else {
      if (infoItem.health === 2) {
        if (infoItem.bankihttpRun) {
          if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
            infoItem.money = NP.plus(infoItem.money, 1000000);
          } else {
            console.log("银行保险已经过期了");
          }
        } else {
          console.log("暂时没有购买银行保险");
        }
        infoItem.money = infoItem.money - 500000;
      }
      ++infoItem.health;
      infoItem.cashFlow = infoItem.cashFlow - 2000;
    }
  }
  return infoItem;
}
// 33.抑郁症
function depressionface(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (infoItem.skillDepressed === 1) {
      Message({
        message: "职业心理咨询师免疫抑郁症",
        type: "success",
        duration: 3 * 1000
      });
    } else {
      if (infoItem.depressed === 2) {
        if (infoItem.bankihttpRun) {
          if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
            infoItem.money = NP.plus(infoItem.money, 1000000);
          } else {
            console.log("银行保险已经过期了");
          }
        } else {
          console.log("暂时没有购买银行保险");
        }
        infoItem.money = infoItem.money - 500000;
      }
      ++infoItem.depressed;
      infoItem.cashFlow = infoItem.cashFlow - 2000;
    }
  }
  return infoItem;
}

// 34.家中失火
function fireline(formInline, infoItem, infoIndex, roundNum) {
  if (formInline.number - 1 === infoIndex) {
    if (!infoItem.bankihttpRun) {
      infoItem.borrower = NP.plus(infoItem.borrower, 200000)
      infoItem.borrowerRound = roundNum
      infoItem.borrowerNum = 6
    } else {
      if (NP.minus(roundNum, infoItem.bankihttpRun) > 10) {
        infoItem.borrower = NP.plus(infoItem.borrower, 200000)
        infoItem.borrowerRound = roundNum
        infoItem.borrowerNum = 6
      } else {
        Message({
          message: '该费用由保险公司支付',
          type: 'success'
        })
        return
      }
    }
  }
  return infoItem
}

// 35.交通事故
function roadworks(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (!infoItem.bankihttpRun) {
      infoItem.borrower = NP.plus(infoItem.borrower, 300000)
      infoItem.borrowerRound = roundNum
      infoItem.borrowerNum = 6
    } else {
      if (NP.minus(roundNum, infoItem.bankihttpRun) > 10) {
        infoItem.borrower = NP.plus(infoItem.borrower, 300000)
        infoItem.borrowerRound = roundNum
        infoItem.borrowerNum = 6
      } else {
        Message({
          message: '该费用由保险公司支付',
          type: 'success'
        })
        return
      }
    }
  }
  return infoItem
}

// 36.传送卡

// 37.实业倒闭潮
function industrial(formInline, infoItem, roundNum, infoIndex) {
  let industrialMon = new Number();
  if (formInline.moreplayer) {
    // let usertable = formInline.moreplayer ? JSON.parse(JSON.stringify(formInline.moreplayer.split('')).replace(/"/g, '')) : ''
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      infoItem.industrialRun = roundNum;
      infoItem.assetsArray.map(item => {
        if (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20].includes(item.type)
        ) {
          industrialMon += item.cashFlow;
        }
      });
      infoItem.cashFlow = NP.minus(infoItem.cashFlow, industrialMon);
      infoItem.industrialMon = industrialMon;
      return infoItem;
    }
  } else {
    Message({
      message: "请输入输掉的玩家编号"
    });
    return;
  }
}

// 38.互联网+
function internet(infoItem) {
  let assetsbef = new Number();
  let assetsaft = new Number();
  infoItem.assetsArray.map(item => {
    if ([1, 2, 4, 6, 7, 12, 13].includes(item.type)) {
      assetsbef += item.cashFlow;
      assetsaft += NP.times(item.cashFlow, 1.5);
      item.cashFlow = NP.times(item.cashFlow, 1.5);
    }
  });
  infoItem.cashFlow = NP.plus(
    infoItem.cashFlow,
    NP.minus(assetsaft, assetsbef)
  );
  return infoItem;
}

// 39.家中老人住院
function folded(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (!infoItem.bankihttpRun) {
      infoItem.borrower = NP.plus(infoItem.borrower, 50000)
      infoItem.borrowerRound = roundNum
      infoItem.borrowerNum = 6
    } else {
      if (NP.minus(roundNum, infoItem.bankihttpRun) > 10) {
        infoItem.borrower = NP.plus(infoItem.borrower, 50000)
        infoItem.borrowerRound = roundNum
        infoItem.borrowerNum = 6
      } else {
        Message({
          message: '该费用由保险公司支付',
          type: 'success'
        })
        return
      }
    }
  }
  return infoItem
}

// 40.服用保健品意外中毒
function healthsold(formInline, infoItem, roundNum, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (!infoItem.bankihttpRun) {
      infoItem.borrower = NP.plus(infoItem.borrower, 100000)
      infoItem.borrowerRound = roundNum
      infoItem.borrowerNum = 6
    } else {
      if (NP.minus(roundNum, infoItem.bankihttpRun) > 10) {
        infoItem.borrower = NP.plus(infoItem.borrower, 100000)
        infoItem.borrowerRound = roundNum
        infoItem.borrowerNum = 6
      } else {
        infoItem.money = NP.plus(infoItem.money, 100000)
        Message({
          message: '该费用由保险公司支付',
          type: 'success'
        })
      }
    }
  }
  return infoItem
}

// 41.城市举办奥运会
function olympics(infoItem, roundNum) {
  let olympicsNum = new Number();
  infoItem.olympicsrun = roundNum;
  infoItem.assetsArray.map(item => {
    if ([2, 6, 8, 9, 11, 4].includes(item.type)) {
      olympicsNum += item.cashFlow;
    }
  });
  infoItem.cashFlow = NP.plus(infoItem.cashFlow, olympicsNum);
  infoItem.olympicsNum = olympicsNum;
  return infoItem;
}

// 42.财神降临
function thegods(formInline, infoItem) {
  if (!formInline.dice) {
    Message({
      message: "请选择骰子点数"
    });
    return;
  }
  infoItem.money = NP.plus(infoItem.money, NP.times(formInline.dice, 10000));
  return infoItem;
}

// 43.天降横财
function theskys(infoItem) {
  infoItem.money = NP.plus(infoItem.money, 1000000);
  infoItem.hlikewise = 10;
  return infoItem;
}

// 44.天降神童
function childof(formInline, infoItem, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    if (infoItem.childofNum && infoItem.testsset === infoItem.childofNum) {
      infoItem.money = NP.plus(infoItem.money, 200000);
      infoItem.cashFlow = NP.plus(infoItem.cashFlow, 10000);
      ++infoItem.childofNum;
    } else {
      infoItem.childofNum = 1;
    }
  }
  return infoItem;
}

// 45.老人遗愿
function holding(formInline, infoItem, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    let treatmentNum = new Number();
    infoItem.assetsArray.map(item => {
      if (item.type === 2) {
        treatmentNum += item.assetsnumber;
      }
    });
    infoItem.skillList.map(item => {
      if ([8, 9].includes(Math.abs(item.id))) {
        treatmentNum += item.skillOftheNumber;
      }
    });
    let treatmentMoney =
      treatmentNum === 1 ?
      50000 :
      treatmentNum === 2 ?
      100000 :
      treatmentNum === 3 ?
      500000 :
      new Number();
    infoItem.money = NP.plus(infoItem.money, treatmentMoney);
    return infoItem;
  }
}

// 46.瘟神降临
function lorene(formInline, infoItem, roundNum, infoIndex) {
  if (infoItem.skillDepressed === 0) {
    infoItem.depressed = NP.plus(infoItem.depressed, 2);
    infoItem.cashFlow = NP.minus(infoItem.cashFlow, 4000);
    if (infoItem.depressed === 3 || NP.minus(infoItem.depressed, 3) === 1) {
      if (infoItem.bankihttpRun) {
        if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
          infoItem.money = NP.plus(infoItem.money, 1000000);
        } else {
          console.log("银行保险已经过期了");
        }
      } else {
        console.log("暂时没有购买银行保险");
      }
      infoItem.money = infoItem.money - 500000;
      return;
    }
  }
  if (infoItem.skillHealth === 0) {
    infoItem.health = NP.plus(infoItem.health, 2);
    infoItem.cashFlow = NP.minus(infoItem.cashFlow, 4000);
    if (infoItem.health === 3 || NP.minus(infoItem.health, 3) === 1) {
      if (infoItem.bankihttpRun) {
        if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
          infoItem.money = NP.plus(infoItem.money, 1000000);
        } else {
          console.log("银行保险已经过期了");
        }
      } else {
        console.log("暂时没有购买银行保险");
      }
      infoItem.money = infoItem.money - 500000;
      return;
    }
  }
  if (formInline.moreplayer) {
    // let usertable = formInline.moreplayer ? JSON.parse(JSON.stringify(formInline.moreplayer.split('')).replace(/"/g, '')) : ''
    if (formInline.moreplayer.includes(infoIndex + 1)) {
      if (infoItem.skillDepressed === 0) {
        infoItem.depressed = NP.plus(infoItem.depressed, 1);
        infoItem.cashFlow = NP.minus(infoItem.cashFlow, 2000);
        if (infoItem.depressed === 3) {
          if (infoItem.bankihttpRun) {
            if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
              infoItem.money = NP.plus(infoItem.money, 1000000);
            } else {
              console.log("银行保险已经过期了");
            }
          } else {
            console.log("暂时没有购买银行保险");
          }
          infoItem.money = infoItem.money - 500000;
        }
      }
      if (infoItem.skillHealth === 0) {
        infoItem.health = NP.plus(infoItem.health, 1);
        infoItem.cashFlow = NP.minus(infoItem.cashFlow, 2000);
        if (infoItem.health === 3) {
          if (infoItem.bankihttpRun) {
            if (NP.minus(roundNum, infoItem.bankihttpRun) <= 10) {
              infoItem.money = NP.plus(infoItem.money, 1000000);
            } else {
              console.log("银行保险已经过期了");
            }
          } else {
            console.log("暂时没有购买银行保险");
          }
          infoItem.money = infoItem.money - 500000;
        }
      }
    }
  } else {
    Message({
      message: "请填写多输入玩家"
    });
    return;
  }
  return infoItem;
}

// 47.救治公爵
function treatment(formInline, infoItem, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    let treatmentNum = new Number();
    infoItem.inteArray.map(item => {
      if (item.type === 2) {
        treatmentNum += item.intelnumber;
      }
    });
    infoItem.skillList.map(item => {
      if (Math.abs(item.id) === 12) {
        treatmentNum += item.skillOftheNumber;
      }
    });
    let treatmentMoney =
      treatmentNum === 1 ?
      50000 :
      treatmentNum === 2 ?
      100000 :
      treatmentNum === 3 ?
      500000 :
      new Number();
    infoItem.money = NP.plus(infoItem.money, treatmentMoney);
    return infoItem;
  }
}

// 48.开导女王
function channel(formInline, infoItem, infoIndex) {
  if (formInline.number - 1 === infoIndex) {
    let treatmentNum = new Number();
    infoItem.skillList.map(item => {
      if ([4, 5, 13].includes(Math.abs(item.id))) {
        treatmentNum += item.skillOftheNumber;
      }
    });
    let treatmentMoney =
      treatmentNum === 1 ?
      50000 :
      treatmentNum === 2 ?
      100000 :
      treatmentNum === 3 ?
      500000 :
      new Number();
    console.log("treatmentMoney: ", treatmentMoney);
    infoItem.money = NP.plus(infoItem.money, treatmentMoney);
    return infoItem;
  }
}
