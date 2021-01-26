 import NP from 'number-precision'

 export function round(item, roundNum, benefits) {
   console.log('benefits: ', benefits);
   item.disabled = false
   if (item.borrowerNum) {
     --item.borrowerNum
   }
   item.assetsArray.forEach((arr) => {
     if (arr.type === 21) {
       arr.assetscost = NP.times(arr.assetscost, 1.03)
     } else if (arr.type === 23) {
       arr.assetscost = NP.times(arr.assetscost, 1.02)
     } else if (arr.type === 22) {
       arr.assetscost = NP.times(arr.assetscost, 1 + benefits / 100)
     } else if (arr.type === 20) {
       if (NP.minus(roundNum, arr.assetsround) > 10) {
         if ([1, 2, 3].includes(arr.houseType)) {
           item.cashFlow = NP.plus(item.cashFlow, 5000)
         } else if ([4, 5].includes(arr.houseType)) {
           item.cashFlow = NP.plus(item.cashFlow, 3000)
         }
       }
     }
   })
   if (item.plaguereleaseRound) {
     if (NP.minus(roundNum, item.plaguereleaseRound) === 2) {
       item.cashFlow = NP.plus(item.cashFlow, item.plaguereleaseSum ? item.plaguereleaseSum : 0)
     }
   }
   if (item.olympicsrun) {
     if (NP.minus(roundNum, item.olympicsrun) === 6) {
       item.cashFlow = NP.minus(item.cashFlow, item.olympicsNum)
     }
   }
   if (item.industrialRun) {
     if (NP.minus(roundNum, item.industrialRun) === 4) {
       item.cashFlow = NP.plus(item.cashFlow, item.industrialMon ? item.industrialMon : 0)
     }
   }
   return item
 }
