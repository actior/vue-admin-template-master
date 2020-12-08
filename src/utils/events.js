// 事件集合
export function eventCounter(formInline, infoItem, infoIndex, partmoney) {
  if (formInline.affair) {
    const affairObj =
      formInline.affair == "1"
        ? crisis(infoItem)
        : formInline.affair == "2"
        ? riots(infoItem)
        : formInline.affair == "3"
        ? warheads(infoItem)
        : formInline.affair == "4"
        ? tsunami(infoItem)
        : formInline.affair == "5"
        ? promotion(infoItem)
        : formInline.affair == "6"
        ? technologyCopyright(infoItem)
        : formInline.affair == "7"
        ? proficiency(infoItem)
        : formInline.affair == "8"
        ? plaguerelease(infoItem)
        : formInline.affair == "9"
        ? housing(infoItem)
        : null;
    return affairObj;
  } else if (
    Math.abs(formInline.refuses) === 0 &&
    [3, 10, 22, 46].includes(formInline.event)
  ) {
    if (formInline.number - 1 === infoIndex) {
      const depressionObj = depression(formInline, infoItem);
      return depressionObj;
    }
  } else {
    const useskillObj = useskill(infoItem, formInline, infoIndex, partmoney);
    return useskillObj;
  }
}

// 技能使用
function useskill(infoItem, formInline, infoIndex, partmoney) {
  let usertable = formInline.moreplayer
    ? JSON.parse(
        JSON.stringify(formInline.moreplayer.split("")).replace(/"/g, "")
      )
    : "";
  if (Math.abs(formInline.refuses) === 1) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === "1") {
          --item.useCount;
        }
      });
      infoItem.money = infoItem.money + 2000 * usertable.length;
    }
    if (usertable.includes(infoIndex + 1)) {
      infoItem.money = infoItem.money - 2000;
    }
  } else if (Math.abs(formInline.refuses) === 2) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === "2") {
          --item.useCount;
        }
      });
      infoItem.money = infoItem.money + 5000;
    }
  } else if (Math.abs(formInline.refuses) === 4) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.money = infoItem.money + 8000;
    }
  } else if (formInline.dice && Math.abs(formInline.refuses) === 5) {
    if (formInline.dice === 1) {
      if (formInline.number - 1 === infoIndex) {
        infoItem.skillList.forEach(item => {
          if (item.id === "5") {
            --item.useCount;
          }
        });
        infoItem.money = infoItem.money + 20000;
      }
      if (usertable.includes(infoIndex + 1)) {
        infoItem.money = infoItem.money - formInline.usemoney + partmoney;
      } else if (formInline.number - 1 === infoIndex) {
        infoItem.money = infoItem.money;
      } else {
        infoItem.money = (infoItem.money * 0.9).toFixed(0);
      }
    }
  } else if (Math.abs(formInline.refuses) === 6) {
    infoItem.money =
      infoItem.money + formInline.assetsNum * 100 - formInline.usemoney;
  } else if (Math.abs(formInline.refuses) === 7) {
    if (formInline.number - 1 === infoIndex) {
      infoItem.skillList.forEach(item => {
        if (item.id === "7") {
          --item.useCount;
        }
      });
      infoItem.money = infoItem.money + 8000;
    }
  }
  return infoItem;
}
// 抑郁症
export function depression(formInline, infoItem) {
  if ([3, 46].includes(Math.abs(formInline.event))) {
    ++infoItem.depressed;
  } else {
    ++infoItem.health;
  }
  infoItem.cashFlow = infoItem.cashFlow - 2000;
  return infoItem;
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
  infoItem.metals = infoItem.metals * 2;
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
  infoItem.metals = infoItem.metals * 1.5;
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
  infoItem.metals = infoItem.metals * 1.5;
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
  infoItem.metals = infoItem.metals * 1.2;
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

// 瘟疫
export function plaguerelease(infoItem) {
  const gameTypeId = infoItem.gameType.id;
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
  return infoItem;
}

// 房产泡沫破裂
export function housing(infoItem) {
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
  infoItem.metals = infoItem.metals * 1.3;
  return infoItem;
}
