// 直接加减现金变化
export function sellreduce(formInline, infoItem, infoIndex, val) {
  if (formInline.number - 1 === infoIndex) {
    if (val === 1) {
      infoItem.money = infoItem.money - formInline.cashmoney;
    } else if (val === 2) {
      infoItem.money = infoItem.money + formInline.cashmoney;
    }
  }
  return infoItem;
}
