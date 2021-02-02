<template>
  <div>
    <el-card class="box-card" v-if="refresh">
      <div class="grid-box">
        <div class="grid-box-left">
          <div class="text item">现金：{{ list.money }}</div>
          <div class="text item">现金流：{{ list.cashFlow - list.carExpenses }}</div>
          <!-- <div class="text items">
            <div v-for="(item,index) in list.assetsArray" :key="'stock'+index">
              <div style="padding: 18px 0;" v-if="item.type===22">银行股票基金：{{ item.assetscost }}</div>
            </div>
          </div>
          <div class="text items">
            <div v-for="(item,index) in list.assetsArray" :key="'metail'+index">
              <div style="padding: 18px 0;" v-if="item.type===21">银行贵金属：{{ item.assetscost }}</div>
            </div>
          </div>
          <div class="text items">
            <div v-for="(item,index) in list.assetsArray" :key="'insta'+index">
              <div style="padding: 18px 0;" v-if="item.type===23">银行保险理财：{{ item.assetscost }}</div>
            </div>
          </div>-->
          <div class="text item">
            <el-popover placement="right" width="400" trigger="click">
              <el-card class="box-card">
                <div
                  v-for="(item,index) in list.assetsArray"
                  :key="'al'+index"
                  class="text item"
                >{{setAssets(item.type)}}&nbsp;{{item.assetsnumber}}份 —— {{item.assetscost || item.cost}} 元</div>
              </el-card>
              <el-button type="text" slot="reference">商业资产</el-button>
            </el-popover>
          </div>
          <div class="text item">
            <el-popover placement="right" width="400" trigger="click">
              <el-card class="box-card">
                <div
                  v-for="(item,index) in list.inteArray"
                  :key="'intel'+index"
                  class="text item"
                >{{setIntel(item.type)}}&nbsp;{{item.intelnumber}}份</div>
              </el-card>
              <el-button type="text" slot="reference">专利</el-button>
            </el-popover>
          </div>
          <div class="text item">技能数：{{ list.skill || 0 }}</div>
          <div class="text item">负债：-{{ list.carExpenses || 0 }}</div>
          <div class="text item">欠债：{{ list.borrower || 0 }}</div>
        </div>
        <div class="grid-box-right">
          <div class="text item">职业：{{ setProfessional(list.gameType.id) }}</div>
          <div class="text item">婚姻：{{ setMarriages(list.marriages) }}</div>
          <div class="text item">子女：{{ list.testsset || 0 }}</div>
          <div class="text item">亚健康：{{ list.health || 0 }}</div>
          <div class="text item">抑郁症：{{ list.depressed || 0 }}</div>
          <div class="text item">保险：{{ list.bankihttp || 0 }}</div>
          <div class="text item">
            <el-image
              style="width: 100px; height: 100px; border-radius: 50%"
              :src="require('@/assets/actor/'+list.image+'.png')"
              :fit="fit"
            />
          </div>
        </div>
        <div>
          <div class="text item">
            <el-button
              size="small"
              :type="list.disabled?'info':'success'"
              @click="handleSettlement"
              class="styleSettle"
              :disabled="list.disabled"
            >结算当前用户</el-button>
            <el-dropdown placement="bottom-start" trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleDel">删除当前用户</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text item">玩家编号：{{ id + 1 }}</div>
          <div class="text item">大学研发中心：{{ list.developed || 0 }}</div>
          <div class="text item">银行信贷信用卡：{{ list.credit*(list.creditRound/10) || 0 }}</div>
          <div class="text item">
            技能：
            <div
              v-for="(arr,arrIndex) in list.skillList"
              :key="'skill'+arrIndex"
            >{{arr.name}}——{{setSkillraid(arr.useCount)}}</div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="现金流结算界面" :visible.sync="dialogTableVisible" :modal="false">
      <el-table :data="gridData">
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="cashFlow" label="现金流"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone, debounce } from '@/utils'
export default {
  props: {
    option: {
      type: Object,
      default: () => { }
    },
    id: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fit: 'cover',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      list: this.option,
      dialogTableVisible: false,
      gridData: [],
      type: '1',
      refresh: true
    }
  },
  watch: {
    option: {
      handler(val) {
        // 移除组件
        this.refresh = false
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
          // 重新渲染组件
          this.list = val
          this.refresh = true
        })
      },
      deep: true
    }
  },
  methods: {
    getDialog() {
      const selteList = deepClone(this.list)
      this.gridData = []
      if (selteList.assetsArray) {
        selteList.assetsArray.map((item, index) => {
          console.log(item.cashFlow)
          if (item.houseType) {
            if ([1, 2, 3].includes(item.houseType)) {
              item.name = item.gameType.name + '—' + 'C类'
              item.cashFlow = -5000
            } else if ([4, 5].includes(item.houseType)) {
              item.name = item.gameType.name + '—' + 'B类'
              item.cashFlow = -3000
            } else {
              item.name = item.gameType.name + '—' + 'A类'
              item.cashFlow = 0
            }
          } else {
            item.name = item.gameType.name
            item.cashFlow = item.cashFlow
            console.log('item.cashFlow: ', item.cashFlow);
          }
          this.gridData.push(item)
        })
      }
      if (selteList.inteArray) {
        selteList.inteArray.map((item, index) => {
          item.name = item.gameType.name
          item.cashFlow = item.cashFlow
          this.gridData.push(item)
        })
      }
      const car = {
        name: '其他支出',
        cashFlow: '-' + selteList.carExpenses
      }
      this.gridData = this.gridData.concat(car)
      console.log('this.gridData: ', this.gridData);
    },
    // 当前结算用户数据
    handleSettlement: debounce(function () {
      this.dialogTableVisible = true
      // this.disabled
      console.log('this.disabled: ', this.disabled);
      this.getDialog()
      this.$emit('handleSettlement', this.id)
    }, 500)
    ,
    handleDel() {
      this.$emit('handleDel', this.id)
    },
    setMarriages(model) {
      const type = {
        0: '单身',
        1: '已婚'
      }
      return type[model]
    },
    setHealth(model) {
      const type = {
        0: '亚健康',
        1: '有病，而且病入膏肓',
        2: '神经病'
      }
      return type[model]
    },
    setProfessional(model) {
      const type = {
        1: '拆迁户',
        2: '个体经营者',
        3: '公务员',
        4: '医生',
        5: '学生',
        6: '白领'
      }
      return type[model]
    },
    setSkillraid(model) {
      const type = {
        '-1': '无',
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5
      }
      return type[model]
    },
    setAssets(model) {
      const type = {
        1: '小卖部',
        2: '火锅店',
        3: '网络服装店',
        4: '高档酒店',
        5: '实体服装店',
        6: '商场',
        7: '4S店',
        8: '电影院',
        9: '游乐场',
        10: '电商平台',
        11: 'KTV',
        12: '农场',
        13: '工厂',
        14: '直播公司',
        15: '心理咨询室',
        16: '婚恋公司',
        17: '旅行社',
        18: '生态农庄',
        19: '健康养生中心',
        20: '房产',
        21: '黄金',
        22: '股票',
        23: '保险理财'
      }
      return type[model]
    },
    setIntel(model) {
      const type = {
        1: '专辑',
        2: '专利药物',
        3: '著作',
        4: '电影',
        5: '研发专利'
      }
      return type[model]
    }
  }
}
</script>

<style>
.styleSettle {
  margin-right: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  /* display: grid; */
  border: 2px solid #000;
}
.grid-box {
  display: grid;
  grid-template-columns: 40% 30% 30%;
  /* grid-template-rows: 70% 30%; */
}
.grid-box-right {
  position: relative;
}
.grid-box-right::after {
  content: "";
  width: 1px;
  height: 60%;
  background-color: #000;
  position: absolute;
  top: 0;
  left: -5%;
}
</style>
