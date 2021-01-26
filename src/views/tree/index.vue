<template>
  <div class="app-container">
    <div class="rightPanel">
      <el-button @click="drawer = true" type="primary" icon="el-icon-s-tools"></el-button>
    </div>
    <div>
      <div class="playerRound">
        <div class="playerRound-timelineName">
          <div class="text item">回合：</div>
          <div class="text item">事件：</div>
          <div class="text item">事件叠加：</div>
        </div>
        <div class="playerRound-timeline">
          <ul class="playerRound-ul">
            <li v-for="(item, index) in roundData" :key="index">
              <div class="playerRound-li">
                <el-popover placement="right" width="400" trigger="click">
                  <el-card class="box-card">
                    <div
                      v-for="(arr, inde) in item.roundList"
                      :key="inde"
                      class="text item"
                    >{{ arr.name }}</div>
                  </el-card>
                  <el-button slot="reference">事件列表</el-button>
                </el-popover>
              </div>
              <br />
              <div class="playerRound-incident">
                <el-popover placement="right" width="400" trigger="click">
                  <el-card class="box-card">
                    <div
                      v-for="(arr, inde) in item.additional"
                      :key="inde"
                      class="text item"
                    >{{ arr.name }}</div>
                  </el-card>
                  <el-button slot="reference">事件叠加</el-button>
                </el-popover>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="playerSatus">
        <h1>玩家状态</h1>
        <div class="playerSatus-title">
          <div class="playerStaus-addPlayer">
            <el-select v-model="roleArray" collapse-tags multiple placeholder="请选择">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.gameType.name"
                :value="item.id"
              />
            </el-select>
            <el-button type="primary" style="margin-left: 10px" @click="handleAddPlayer">新增玩家</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="handleSavePlayer">保存当期玩家群</el-button>
            <el-button
              type="primary"
              style="margin-left: 10px"
              @click="handleDelSessionstorage"
            >测试按钮删除本地数据</el-button>
          </div>
        </div>
        <div class="playerSatus-round">
          <h2 class="round">当前第{{ roundNum }}回合</h2>
        </div>
        <div style="margin-top: 20px">
          <el-carousel :interval="4000" type="card" height="500px" :autoplay="false">
            <el-carousel-item v-for="(item, index) in playerInfos" :key="index">
              <panel
                :id="index"
                ref="handleEvents"
                :option="item"
                :disabled="disabled"
                @handleDel="handleNowDel"
                @handleSettlement="handleSettlement"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="playerForm">
        <el-card style="margin-bottom: 20px">
          <el-form
            ref="ruleForm"
            :inline="true"
            :model="formInline"
            class="demo-form-inline menufocus"
            :rules="rules"
          >
            <el-form-item label="当前格子事件" prop="event">
              <el-select
                v-model="formInline.event"
                class="menufocus-select-first"
                clearable
                filterable
                placeholder="请选择事件"
                @change="handleSelect"
              >
                <el-option
                  v-for="(item, index) in optionEvent"
                  :key="index"
                  :label="item.id + '-' + item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="玩家编号" prop="number">
              <el-select v-model.number="formInline.number" clearable placeholder="请选择玩家编号">
                <el-option
                  v-for="item in playerInfos"
                  :key="item.playerId"
                  :label="item.playerId"
                  :value="item.playerId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="place-items: center">
              <el-button
                v-show="[16,30,58,39, 48, 62,27, 63].includes(formInline.event)"
                type="primary"
                @click="onSubmit('ruleForm')"
              >执行</el-button>
              <el-button
                v-show="[6, 14, 20, 37, 47, 52, 61, 68].includes(formInline.event)"
                type="primary"
                @click="handleResearch('ruleForm')"
              >大学/研发中心</el-button>
              <el-button
                type="warning"
                plain
                v-show="compensation"
                @click="handleCompenstaion('ruleForm')"
              >赔偿 ({{compensationRun}})</el-button>
            </el-form-item>
            <el-form-item v-show="ofthe" label="奇人技能" prop="ofthe">
              <el-select
                v-model="formInline.ofthe"
                clearable
                filterable
                placeholder="请选择事件"
                :disabled="Overlay"
                @visible-change="handleOfthe"
              >
                <el-option
                  v-for="(item, index) in oftheList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-button
                type="primary"
                style="margin-left:20px;"
                @click="hanaleAddSkill('ruleForm')"
              >添加</el-button>
            </el-form-item>
            <el-form-item v-show="ofthe" label="异事事件" prop="affair">
              <el-select
                v-model="formInline.affair"
                clearable
                filterable
                placeholder="请选择事件"
                @visible-change="handleAffair"
              >
                <el-option
                  v-for="(item, index) in affairList"
                  :key="index"
                  :label="item.id+'.'+item.name"
                  :value="item.id"
                />
              </el-select>
              <el-button
                type="primary"
                style="margin-left:20px;"
                @click="handleImplemented('ruleForm')"
              >执行</el-button>
            </el-form-item>
            <el-form-item label="骰子是否" prop="dice" class="menufocus-item">
              <el-select v-model="formInline.dice" placeholder="请选择骰子单双数" clearable>
                <el-option v-for="o in 6" :key="o" :label="o" :value="o" />
              </el-select>
              <el-button
                v-show="[3, 10, 22, 46].includes(formInline.event)"
                type="primary"
                style="margin-left:20px;"
                @click="handleDepression('ruleForm')"
              >执行</el-button>
            </el-form-item>
            <el-form-item
              label="多选房产"
              prop="dices"
              class="menufocus-item"
              v-show="[11].includes(Math.abs(formInline.affair))"
            >
              <el-select v-model="formInline.dices" placeholder="请选择骰子" clearable multiple>
                <el-option label="A类" value="6"></el-option>
                <el-option label="B类" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="menufocus-itema">
              <el-button v-show="nomoney" type="warning" @click="handleOverlay">资产不足</el-button>
            </el-form-item>
            <el-form-item label="资产使用" prop="noble">
              <el-input
                v-model.number="formInline.noble"
                placeholder="请输入资产金额"
                :class="classObject"
              />
              <el-button
                v-show="[2, 15, 26, 40].includes(formInline.event)"
                type="primary"
                style="margin-left:10px;"
                @click="handleCredited('ruleForm')"
              >购买信贷</el-button>
            </el-form-item>
            <el-form-item label="多输入" prop="thereof">
              <el-select
                v-model="formInline.thereof"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="可创建多个数值"
              >
                <el-option v-for="item in thereofOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="多输入玩家" prop="moreplayer">
              <el-select v-model="formInline.moreplayer" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in playerInfos"
                  :key="item.playerId"
                  :label="item.playerId"
                  :value="item.playerId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买卖数量" prop="assetsNum">
              <el-input-number v-model="formInline.assetsNum" :min="1" :max="99" label="描述文字" />
            </el-form-item>
            <el-form-item label="资产选项" prop="assets">
              <el-select
                v-model="formInline.assets"
                clearable
                filterable
                placeholder="请选择资产"
                @visible-change="handleVisibleAsstes"
              >
                <el-option
                  v-for="(item, index) in AssetsList"
                  :key="index"
                  :label="item.gameType.name"
                  :value="item.type"
                />
              </el-select>
              <el-button
                type="primary"
                style="margin-left:20px;"
                @click="handleBuyAssets('ruleForm')"
              >购买</el-button>
              <!-- <el-button
                v-show="[6, 14, 20, 37, 47, 52, 61, 68].includes(formInline.event)"
                type="primary"
                style="margin-left:20px;"
                @click="onSubmit('ruleForm')"
              >资产进阶</el-button>-->
            </el-form-item>
            <el-form-item label="资产出售" prop="sell">
              <!-- <el-input v-model="formInline.sell" /> -->
              <el-select
                v-model="formInline.sell"
                clearable
                filterable
                multiple
                collapse-tags
                placeholder="请选择资产"
                @change="changeSell"
                @visible-change="handleVisibleSell"
              >
                <el-option
                  v-for="(item, index) in sellList"
                  :key="index"
                  :label="item.gameType.name"
                  :value="item.moneyId"
                >{{item.gameType.name}}&nbsp;{{setType(item.houseType)}}</el-option>
              </el-select>
              <el-button
                type="primary"
                style="margin-left:20px;"
                @click.stop="handleSell('ruleForm')"
              >出售</el-button>
            </el-form-item>
            <el-form-item label="技能使用" prop="refuses">
              <el-select
                v-model="formInline.refuses"
                filterable
                placeholder="请选择事件"
                clearable
                @visible-change="handleUseOfthe"
              >
                <el-option
                  v-for="(item, index) in useOftheList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-button
                type="primary"
                style="margin-left:20px;"
                @click="handleUseRefuses('ruleForm')"
              >使用</el-button>
              <el-button
                v-show="[6, 14, 20, 37, 47, 52, 61, 68].includes(formInline.event)"
                type="primary"
                style="margin-left:20px;"
                @click="handleUpdateSkill('ruleForm')"
              >技能进阶</el-button>
            </el-form-item>
            <el-form-item label="现金流动" prop="cashmoney" class="cashmoney">
              <el-input v-model.number="formInline.cashmoney" placeholder="请请输入现金" />
              <el-button type="info" circle @click="handleToolmoney(1)">减少</el-button>
              <el-button type="primary" circle @click="handleToolmoney(2)">增加</el-button>
            </el-form-item>
            <!-- <el-form-item label="知识产权" prop="intel">
              <el-select
                v-model="formInline.intel"
                clearable
                filterables
                placeholder="请选择知识产权"
                @visible-change="handleIntel"
              >
                <el-option
                  v-for="(item, index) in IntelList"
                  :key="index"
                  :label="item.gameType.name"
                  :value="item.type"
                />
              </el-select>
              <el-button
                type="primary"
                style="margin-left:20px;"
                @click="handleAddIntel('ruleForm')"
              >添加</el-button>
              <el-button
                v-show="[6, 14, 20, 37, 47, 52, 61, 68].includes(formInline.event)"
                type="primary"
                style="margin-left:20px;"
                @click="onSubmit('ruleForm')"
              >产权进阶</el-button>
            </el-form-item>-->
            <el-form-item style="place-items: center" class="menufocus-items">
              <el-button type="success" @click="handleWholeRound">保存一整回合</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-drawer
      title="事件描述"
      :visible.sync="drawer"
      :with-header="false"
      custom-class="demo-drawer"
      size="20%"
    >
      <div class="demo-drawer__content" style="margin-top:40px;">
        <selectoption />
      </div>
    </el-drawer>
    <el-dialog title="消费提示" :visible.sync="dialogVisible" width="20%">
      <el-card class="box-card">
        <div class="text item">现金余额：{{ cashHistory.money }}</div>
        <div class="text item">当前花费：{{ cashHistory.realCost }}</div>
        <div
          class="text item"
          v-show="cashHistory.assetsFind"
        >资产变动：{{ cashHistory.assetsFind }}&nbsp;{{setType(cashHistory.assetsFindHouse)}}</div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sessionData } from '@/utils/local'
import { deepClone } from '@/utils'
import { assetsList, buyAssetsList, saleAssetsList } from '@/api/assets'
import { getSkill } from '@/api/skill'
import { getIntel, intellectual, saleIntel } from '@/api/intellectual-property'
import { getPlayerCash, delPlayerCash, addPlayerCash } from '@/api/playerCash'
import { getEvent } from '@/api/event'
import { getRound } from '@/api/round'
import { getRole } from '@/api/role'
import { addGameInfo } from '@/api/gameInfo'
import { gridjs } from '@/advancegame/gridgain' // 格子事件
import { imageCredits } from '@/advancegame/credited' // 信贷信用卡
import { eventCounter } from '@/advancegame/events' // 事件执行
import { useskill } from '@/advancegame/causes' // 技能使用
import { sell } from '@/advancegame/sell' // 资产卖出
import { compensation } from '@/advancegame/compensation'
import { sellreduce } from '@/advancegame/sumCashFlows' // 直接现金增加
import { skillMoney } from '@/advancegame/userefuses' // 技能添加
import { updateskill } from '@/advancegame/updateSkill' // 技能升阶
import { ttassets } from '@/advancegame/ttassets' // 购买资产
import { research } from '@/advancegame/research' // 大学研究中心
import { round } from '@/advancegame/round'
import { settlement } from '@/advancegame/settlement'
import panel from '@/components/Panel/index'
import falseData from '@/assets/json/index.json'
import skillData from '@/assets/json/skill.json'
import eventData from '@/assets/json/event.json'
import intelData from '@/assets/json/intel.json'
import assetsData from '@/assets/json/assets.json'
import roleData from '@/assets/json/roleList.json'
import expenssData from '@/assets/json/expenss.json'
import NP from 'number-precision'
import selectoption from '@/components/SelectOption'
import _ from 'lodash'
export default {
  name: 'Tree',
  inject: ['reload'],
  components: {
    panel,
    selectoption
  },
  data() {
    return {
      compensation: false, // 赔偿事件的显示
      compensationRun: 0, //赔偿回合
      drawer: false,
      Overlay: false,
      nomoney: false,
      roundNum: sessionData('get', 'roundNumber') ? sessionData('get', 'roundNumber') : 1,
      radio: 1,
      checkList: [1, 2, 3],
      playerInfos: sessionData('get', 'playerInfos') ? sessionData('get', 'playerInfos') : [],
      // optionEvent: [],
      oldSearchJobType: [],
      optionEvent: falseData,
      thereofOptions: [10, 15, 20, 25],
      formInline: {
        event: null,
        affair: null,
        noble: null,
        number: null,
        assets: null,
        dice: null,
        assetsNum: 1,
        intel: null,
        ofthe: null,
        refuses: null,
        moreplayer: null,
        cashmoney: null,
        sell: [],
        dices: null,
        thereof: []
      },
      ofthe: false, // 奇人异事
      IntelList: [], // 知识产权
      AssetsList: [], // 资产
      oftheList: [], // 奇人
      useOftheList: [], //技能使用
      sellList: [], // 出售资产
      affairList: [], // 异事
      roleList: roleData,
      // roleList: [],
      roleArray: [],
      oftheaffair: [5, 13, 24, 28, 31, 36, 44, 51, 57, 64],
      wholeData: [], // 回合事件列表
      additionalData: [], // 事件叠加
      roundData: sessionData('get', 'roundData') ? sessionData('get', 'roundData') : [],
      rules: {
        event: [
          { required: true, message: '当前事件格子', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请填写玩家编号', trigger: 'blur' }
        ]
      },
      cashHistory: {
        cash: null,
        gameId: null,
        operationType: null,
        playerId: null,
        round: null,
        cost: null,
        realCost: null,
        salePrice: null,
        id: null,
        money: null,
        assetsFind: null,
        assetsFindHouse: null
      },
      skillofthe: [], // 奇人技能表
      inteltable: [], // 知识产权
      partmoney: 0, // 技能结婚
      sumCashFolw: 0, // 技能博弈
      userd: 0, // 最有钱的人
      poorindex: 0, // 最穷的下标
      disabled: false,
      dialogVisible: false,
      iSprompt: false, // 提示判断
      initData: {
        affair: null,
        noble: null,
        number: null,
        assets: null,
        dice: null,
        assetsNum: 1,
        intel: null,
        ofthe: null,
        refuses: null,
        moreplayer: null,
        cashmoney: null,
        sell: [],
        dices: null,
        thereof: []
      },
      newPlayerId: null
    }
  },
  computed: {
    events() {
      return this.formInline.event
    },
    numbers() {
      return this.formInline.number
    },
    classObject() {
      return [2, 15, 26, 40].includes(this.formInline.event) ? 'inputclass' : ''
    }
  },
  watch: {
    numbers: {
      handler: function (newval, oldval) {
        this.newPlayerId = oldval
        this.playerInfos.map((item, index) => {
          this.cashHistory.playerId = item.playerId
          this.cashHistory.gameId = item.gameId
          if (Math.abs(newval) - 1 === index) {
            if (item.borrowerRound) {
              if (NP.minus(this.roundNum, item.borrowerRound) < 5) {
                this.compensation = true
                this.compensationRun = NP.minus(this.roundNum, item.borrowerRound) === 5 ? 0 : NP.minus(item.borrowerNum, 1)
              } else {
                this.compensation = false
              }
            } else {
              this.compensation = false
            }
          }
        })
      },
      deep: true
    },
    events: {
      handler: function (newval, oldval) {
        this.formInline.ofthe = null
        this.formInline.noble = null
        this.formInline.affair = null
        this.formInline.number = null
        this.formInline.assets = null
        this.formInline.dice = null
        this.formInline.dices = null
        this.formInline.assetsNum = 1
        this.formInline.intel = null
        this.formInline.cashmoney = null
        this.formInline.refuses = null
        this.formInline.moreplayer = null
        this.formInline.sell = []
        this.formInline.thereof = null
        this.compensation = false
      },
      deep: true
    },
    playerInfos: {
      handler: function (newval, oldval) {
        let newNumber = 0
        let oldNumber = 0
        newval.map(item => {
          if (Math.abs(this.newPlayerId) === Math.abs(item.playerId)) {
            newNumber = item.money
          }
        })
        oldval.map(item => {
          if (this.newPlayerId === item.playerId) {
            oldNumber = item.money
          }
        })
        this.cashHistory.money = newNumber
        this.cashHistory.cash = Math.abs(NP.minus(newNumber, oldNumber))
        this.cashHistory.realCost = Math.abs(NP.minus(newNumber, oldNumber))
        this.cashHistory.salePrice = Math.abs(NP.minus(newNumber, oldNumber))
        // this.iSprompt = _.isEqual(newval, oldval)
        // const arrrr = _.differenceWith(newval, oldval, _.isEqual)
        // console.log('arrrr: ', arrrr);
        // const arr3 = newval.concat(oldval);
        // const result = arr3.filter(function (v) {
        //   return newval.every(n => JSON.stringify(n) !== JSON.stringify(v)) || oldval.every(n => JSON.stringify(n) !== JSON.stringify(v))
        // })
        // const temp = {}
        // for (const i in result) {
        //   const key = result[i].playerId
        //   if (temp[key]) {
        //     temp[key].money = result[i].money - temp[key].money
        //     this.cashHistory.cash = Math.abs(temp[key].money)
        //     this.cashHistory.realCost = Math.abs(temp[key].money)
        //     this.cashHistory.salePrice = Math.abs(temp[key].money)
        //   } else {
        //     temp[key] = {};
        //     temp[key].money = result[i].money;
        //     this.cashHistory.money = result[i].money
        //   }
        // }
      },
      deep: true
    }
  },
  created() {
    // this.getData()
    this.optionEvent = falseData
  },
  methods: {
    setType(model) {
      const type = {
        1: 'C类',
        2: 'C类',
        3: 'C类',
        4: 'B类',
        5: 'B类',
        6: 'A类'
      }
      return type[model]
    },
    handleVisibleSell() {
      this.sellList = [
        {
          moneyId: -1,
          gameType: {
            name: '全选'
          }
        }
      ]
      let sellLists = []
      this.playerInfos.map((item, index) => {
        if (this.formInline.number - 1 === index) {
          sellLists = item.assetsArray.concat(item.inteArray)
        }
      })
      sellLists.map(item => {
        this.sellList.push(item)
      })
      console.log('this.sellList: ', this.sellList);
    },
    changeSell(val) {
      // this.sellround = e
      const allValues = [];
      // 保留所有值
      for (const item of this.sellList) {
        allValues.push(item.moneyId)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldSearchJobType.length === 1 ? this.oldSearchJobType[0] : [];
      // 若是全部选择
      if (val.includes(-1)) this.formInline.sell = allValues;
      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes(-1) && !val.includes(-1)) this.formInline.sell = [];
      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes(-1) && val.includes(-1)) {
        const index = val.indexOf(-1);
        val.splice(index, 1); // 排除全选选项
        this.formInline.sell = val
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes(-1) && !val.includes(-1)) {
        if (val.length === allValues.length - 1) this.formInline.sell = [-1].concat(val)
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldSearchJobType[0] = this.formInline.sell;
    },
    // 测试按钮删除本地数据
    handleDelSessionstorage() {
      this.$confirm('当前按钮为测试操作会清空本地sessionstorage, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.reload()
        this.$message({
          type: 'success',
          message: '清空成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 资产不足按钮时，奇人异事下拉出现
    handleOverlay() {
      this.ofthe = true
      this.Overlay = true
    },
    // 保存一整回合
    handleWholeRound() {
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.$prompt('请输入当前回合股票效益', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '数字格式不正确'
      }).then(({ value }) => {
        this.$confirm('此操作将保存当前一轮回合的事件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const wholeround = deepClone(this.wholeData)
          const additionalround = deepClone(this.additionalData)
          const data = {
            number: this.roundNum,
            roundList: wholeround,
            additional: additionalround
          }
          this.roundData.push(data)
          this.handleAdd(value)
          sessionData('set', 'roundData', this.roundData)
          sessionData('set', 'roundNumber', this.roundNum)
          this.wholeData.length = 0
          this.additionalData.length = 0
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 保存当前玩家群
    handleSavePlayer() {
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.$prompt('请输入当前游戏名称', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: '测试文档',
        inputErrorMessage: '输入框不能为空',
        inputValidator: (value) => {
          if (!value) {
            return '输入不能为空'
          }
        },
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.confirmButtonText = "提交中..."
            let value = instance.inputValue
            let _this = this
            instance.$refs['confirm'].$el.onclick = function () {
              if (value && value != '') {
                const random = String(Math.random()).split('.')[1].slice(0, 16) // 本地开发数据，上线注释掉
                _this.playerInfos.map((item, index) => {
                  item.marriages = 0 // 配偶
                  item.skillHealth = 0 // 获取技能：太极大师标识
                  item.skillDepressed = 0 // 获取技能：心理咨询师
                  item.playerId = index + 1
                  item.gameId = random
                  item.disabled = false
                  item.borrower = 0 // 欠债数目
                  item.whofe = 0 // 进阶观音送子专属字段
                  item.whoferound = _this.roundNum // 当前回合
                  item.setup_game = 0 // 进阶博弈专属字段
                  item.developed = 0 // 大学研发中心
                  item.play_serial = index // 玩家编号
                  item.depressed = 0 // 抑郁症次数
                  item.auctions = 0 // 银行拍卖会
                  item.health = 0 // 亚健康次数
                  item.exchange = 0 // 换手机/电脑/车
                  item.bankihttp = 0 // 银行保险
                  item.bankihttpRun = null // 银行保险当前回合数
                  item.taxpayer = 0 // 税务稽查
                  item.skillList = [] // 技能列表
                  item.assetsArray = [] // 资产列表
                  item.credit = 0 // 信贷信用卡
                  item.creditRound = 0 // 信贷回合数
                  item.inteArray = [] // 知识产权列表
                  item.reduceshFlow = 0 // 现金流减少50%
                  item.reduceshFlowRound = 0 // 现金流减少回合
                  item.assetsdiscount = 1 // 资产折扣购买
                  item.testsset = 0 // 子女
                  item.testssetRound = _this.roundNum // 生育时间回合
                  item.borrower = 0 // 欠债钱数
                  item.borrowerRound = null // 欠债回合数
                  item.borrowerNum = 0 // 欠债剩余回合数
                  return item
                })
                // const saveData = []
                // _this.playerInfos.map((item, index) => {
                //   saveData.push({
                //     createTime: +new Date(),
                //     money: item.money,
                //     gameId: random,
                //     playerId: index + 1,
                //     type: item.type
                //   })
                // })
                // const data = {
                //   'createTime': +new Date(),
                //   'id': random,
                //   'list': saveData,
                //   'name': value
                // }
                sessionData('set', 'playerInfos', _this.playerInfos)
                // sessionData('set', 'playerData', data)
                //TODO 请求接口
                // addGameInfo(data).then((res) => {
                //   if (res.code === 1000) {
                //     _this.$message({
                //       type: 'success',
                //       message: '保存成功!'
                //     })
                //     window.sessionStorage.setItem('playerData', JSON.stringify(res.data))
                //   }
                // })
                _this.reload()
                done()
              }
            }();
          } else {
            done()
          }
        }
      }).catch(() => { })
    },
    // 赔偿
    handleCompenstaion(formName) {
      this.playerInfos.forEach((item, index) => {
        if (this.formInline.number - 1 === index) {
          item = compensation(this.formInline, item, this.roundNum, index)
          return item
        }
      })
      sessionData('set', 'playerInfos', this.playerInfos)
      this.dialogVisible = true
      this.compensation = false
      this.$refs[formName].resetFields()
    },
    // 资产选项下拉框触发事件
    handleVisibleAsstes(e) {
      this.AssetsList = assetsData
      // assetsList({ start: 0, length: 100 }).then((res) => {
      //   if (res.code === 1000) {
      //     this.AssetsList = res.data.list
      //   }
      // })
    },
    // 知识下拉框触发事件
    handleIntel(e) {
      this.IntelList = intelData
      // getIntel({ start: 0, length: 100 }).then((res) => {
      //   if (res.code === 1000) {
      //     this.IntelList = res.data.list
      //   }
      // })
    },
    // 删除当前玩家
    handleNowDel(val) {
      this.playerInfos.splice(val, 1)
    },
    // 结算当前用户现金
    handleSettlement(val) {
      this.playerInfos.map((item, index) => {
        if (index === val) {
          // item.disabled = true
          this.cashHistory.round = Math.abs(this.roundNum)
          this.cashHistory.playerId = item.playerId
          this.cashHistory.gameId = item.gameId
          this.cashHistory.cash = item.cashFlow - item.carExpenses
          if (this.cashHistory.cash < 0) {
            this.cashHistory.operationType = 2
            this.cashHistory.cash = Math.abs(this.cashHistory.cash)
          } else {
            this.cashHistory.operationType = 1
          }
          // console.log(item)
          console.log('资产现金流结算变动: ', this.cashHistory);
          // addPlayerCash(this.cashHistory).then((res) => {
          //   if (res.code === 1000) {
          //     console.log(res)
          //   }
          // })
          item = settlement(item, this.roundNum)
          // if (item.creditRound !== 0) {
          //   --item.creditRound
          //   item.money = item.money + item.cashFlow - item.carExpenses - item.credit / 10
          // } else {
          //   if (this.roundNum === 1) {
          //     item.money = item.money + item.cashFlow
          //   } else {
          //     item.money = item.money + item.cashFlow - item.carExpenses
          //   }
          // }
          // if (item.marriages === 1 && this.roundNum - item.testssetRound === 2) {
          //   // 生育孩子时间2回合
          //   item.marriages = 2 // 标识已经生过小孩了
          //   item.testsset = item.eventTestsset ? item.eventTestsset + item.testsset : item.testsset + 1
          //   item.cashFlow = item.eventTestsset ? item.cashFlow - NP.times(10000, item.eventTestsset) : item.cashFlow - 10000 // 当事件发生双胞胎减掉双倍现金流
          // }
          // if (item.economyId) {
          //   if (item.economyId === 8 && this.roundNum - item.economyRound === 3) {
          //     item.cashFlow = item.cashFlow + item.reduceshFlow
          //     item.assetsdiscount = 1
          //     item.economyId = -1
          //   }
          // }
          // if (item.housingId) {
          //   if (item.housingId === 10 && this.roundNum - item.housingRound === 2) {
          //     item.assetsdiscount = 1
          //     item.housingId = -1
          //   }
          // }
        }
        return item
      })
      sessionData('set', 'playerInfos', this.playerInfos)
      this.cashHistory = {}
    },
    // 添加玩家
    handleAddPlayer() {
      if (this.roleArray.length === 0) {
        this.$message('请选择玩家职业')
        return
      }
      const playerList = deepClone(this.roleList)
      for (let i in this.roleArray) {
        playerList.map((item, index) => {
          if (this.roleArray[i] === item.id) {
            this.playerInfos.push(item)
          }
        })
      }
      this.roleArray = []
    },
    // 异事执行
    handleSelect(e) {
      const isOfthe = [5, 13, 24, 28, 31, 36, 44, 51, 57, 64]
      this.ofthe = isOfthe.includes(e)
      const isMoney = [4, 7, 12, 18, 21, 25, 29, 32, 34, 41, 42, 49, 53, 55, 59, 60, 65, 67]
      this.nomoney = isMoney.includes(e)
      this.Overlay = false
    },
    // 回合添加
    handleAdd(val) {
      let benefits = 0
      if (typeof (val) === 'string') {
        benefits = Math.abs(val)
      } else {
        benefits = 0
      }
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.roundNum = ++this.roundNum
      this.playerInfos.map((item, index) => {
        item = round(item, this.roundNum, benefits)
        // item.disabled = false
        // if (item.borrowerNum) {
        //   --item.borrowerNum
        // }
        // item.assetsArray.forEach((arr) => {
        //   if (arr.type === 21) {
        //     arr.assetscost = NP.times(arr.assetscost, 1.03)
        //   } else if (arr.type === 23) {
        //     arr.assetscost = NP.times(arr.assetscost, 1.02)
        //   } else if (arr.type === 22) {
        //     arr.assetscost = NP.times(arr.assetscost, 1 + benefits / 100)
        //   } else if (arr.type === 20) {
        //     if (NP.minus(this.roundNum, arr.assetsround) > 10) {
        //       if ([1, 2, 3].includes(arr.houseType)) {
        //         item.cashFlow = NP.plus(item.cashFlow, 5000)
        //       } else if ([4, 5].includes(arr.houseType)) {
        //         item.cashFlow = NP.plus(item.cashFlow, 3000)
        //       }
        //     }
        //   }
        // })
        // if (item.plaguereleaseRound) {
        //   if (NP.minus(this.roundNum, item.plaguereleaseRound) === 2) {
        //     item.cashFlow = NP.plus(item.cashFlow, item.plaguereleaseSum ? item.plaguereleaseSum : 0)
        //   }
        // }
        // if (item.olympicsrun) {
        //   if (NP.minus(this.roundNum, item.olympicsrun) === 6) {
        //     item.cashFlow = NP.minus(item.cashFlow, item.olympicsNum)
        //   }
        // }
        // if (item.industrialRun) {
        //   if (NP.minus(this.roundNum, item.industrialRun) === 4) {
        //     item.cashFlow = NP.plus(item.cashFlow, item.industrialMon ? item.industrialMon : 0)
        //   }
        // }
        return item
      })
      this.reload()
      sessionData('set', 'playerInfos', this.playerInfos)
    },
    // 奇人列表获取
    handleOfthe(e) {
      if (e) {
        // getSkill({ start: 0, length: 100 }).then((res) => {
        //   this.oftheList = res.data.list
        // })
        this.oftheList = skillData
      }
    },
    handleUseOfthe(e) {
      if (e) {
        this.useOftheList = skillData
      }
    },
    // 异事列表获取
    handleAffair(e) {
      if (e) {
        // getEvent({ start: 0, length: 100 }).then((res) => {
        //   this.affairList = res.data.list
        // })
        this.affairList = eventData
      }
    },
    // 初始获取数据
    getData() {
      getRound({ start: 0, length: 100 }).then((res) => {
        this.optionEvent = res.data.list
      })
      getRole({ start: 0, length: 100 }).then((res) => {
        this.roleList = res.data.list
      })
    },
    // 执行事件
    handleImplemented(formName) {
      if (this.playerInfos.length === 0) {
        this.$message('当前没有玩家')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.optionEvent.map((item, index) => {
            if (this.formInline.event === item.id) {
              this.wholeData.push(item)
            }
          })
          eventData.map((item, index) => {
            if (this.formInline.affair === item.id) {
              this.additionalData.push(item)
            }
          })
          // this.playerInfos.map((item, index, arr) => {
          //   if (Math.abs(this.formInline.refuses) === 5) {
          //     if (index !== Math.abs(this.formInline.number) - 1 && index !== Math.abs(this.formInline.moreplayer) - 1) {
          //       this.partmoney += NP.times(item.money, 0.1)
          //     }
          //   } else if (Math.abs(this.formInline.refuses) === 11) {
          //     let playerArr = this.formInline.moreplayer ? JSON.parse(JSON.stringify(this.formInline.moreplayer.split('')).replace(/"/g, '')) : ''
          //     if (playerArr.includes(index + 1)) {
          //       this.sumCashFolw += item.cashFlow
          //     } else if (index !== Math.abs(this.formInline.number) - 1 && !this.formInline.moreplayer) {
          //       this.sumCashFolw += item.cashFlow
          //     }
          //   } else if ([13, 14].includes(Math.abs(this.formInline.refuses))) {
          //     let playerArr = this.formInline.moreplayer ? JSON.parse(JSON.stringify(this.formInline.moreplayer.split('')).replace(/"/g, '')) : ''
          //     if (playerArr.includes(index + 1)) {
          //       this.userd = NP.times(item.money, 0.5)
          //     }
          //   }
          // })
          // this.poorindex = this.playerInfos.map(els => els.money).indexOf((Math.min.apply(Math, this.playerInfos.map((ele, index) => { return ele.money }))))
          this.playerInfos.forEach((item, index) => {
            item = eventCounter(this.formInline, item, this.roundNum, index, roleData, assetsData)
            return item
          })
          sessionData('set', 'playerInfos', this.playerInfos)
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 抑郁症/亚健康
    handleDepression(formName) {
      if (!this.formInline.dice) {
        this.$message({
          message: '请选择骰子点数',
          type: 'warning'
        })
        return
      }
      this.onSubmit(formName)
    },
    // 大学研究中心
    handleResearch(formName) {
      this.cashHistory = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.forEach((item, index, arr) => {
            if (this.formInline.number - 1 === index) {
              item = research(this.formInline, item, intelData, this.roundNum, index)
            }
            return item
          })
          this.playerInfos = data
          sessionData('set', 'playerInfos', this.playerInfos)
          console.log(this.iSprompt)
          if (!this.iSprompt) {
            this.optionEvent.map((item, index) => {
              if (this.formInline.event === item.id) {
                this.wholeData.push(item)
                this.cashHistory.type = item.typeId
                this.cashHistory.assetsFind = item.name
              }
            })
            this.cashHistory.operationType = 1
            this.cashHistory.round = Math.abs(this.roundNum)
            this.dialogVisible = true
            console.log('this.cashHistory: ', this.cashHistory);
          }
          // addPlayerCash(this.cashHistory).then((res) => {
          //   console.log('现金购买变动: ', this.cashHistory);
          //   if (res.code === 1000) {
          //   }
          // })
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 信贷信用卡
    handleCredited(formName) {
      this.cashHistory = {}
      if (!this.formInline.noble) {
        this.$message('请输入信贷信用卡的数额')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.forEach((item, index, arr) => {
            if (this.formInline.number - 1 === index) {
              item = imageCredits(this.formInline, item, this.roundNum)
            }
            return item
          })
          this.playerInfos = data
          sessionData('set', 'playerInfos', this.playerInfos)
          console.log(this.iSprompt)
          if (!this.iSprompt) {
            this.optionEvent.map((item, index) => {
              if (this.formInline.event === item.id) {
                this.wholeData.push(item)
                this.cashHistory.type = item.typeId
                this.cashHistory.assetsFind = item.name
              }
            })
            this.cashHistory.operationType = 1
            this.cashHistory.round = Math.abs(this.roundNum)
            this.dialogVisible = true
            console.log('this.cashHistory: ', this.cashHistory);
          }
          // addPlayerCash(this.cashHistory).then((res) => {
          //   console.log('现金购买变动: ', this.cashHistory);
          //   if (res.code === 1000) {
          //   }
          // })
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 知识产权购买
    // handleAddIntel(formName) {
    //   if (!this.formInline.intel) {
    //     this.$message({
    //       message: '请选择知识产权',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.onSubmit(formName)
    // },
    // 资产购买
    handleBuyAssets(formName) {
      if (!this.formInline.assets) {
        this.$message({
          message: '请选择资产',
          type: 'warning'
        })
        return
      } else if ([21, 22, 23].includes(this.formInline.assets)) {
        if (!this.formInline.noble) {
          this.$message({
            message: '请填写金额',
            type: 'warning'
          })
          return
        }
      } else if (this.formInline.assets === 20) {
        if (!this.formInline.dice) {
          this.$message({
            message: '请选择骰子数',
            type: 'warning'
          })
          return
        }
      }
      this.cashHistory = {}
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.forEach((item, index, arr) => {
            item = ttassets(this.formInline, item, assetsData, this.roundNum, index)
            return item
          })
          this.playerInfos = data
          sessionData('set', 'playerInfos', this.playerInfos)
          if (!this.iSprompt) {
            this.optionEvent.map((item, index) => {
              if (this.formInline.event === item.id) {
                this.wholeData.push(item)
                this.cashHistory.type = item.typeId
                this.cashHistory.assetsFind = item.name
              }
            })
            this.cashHistory.operationType = 1
            this.cashHistory.round = Math.abs(this.roundNum)
            if (this.formInline.assets) {
              this.AssetsList.map((item, index) => {
                if (this.formInline.assets === item.type) {
                  this.cashHistory.cost = [21, 22, 23].includes(this.formInline.assets) ? this.formInline.noble : item.cost
                  this.cashHistory.realCost = [21, 22, 23].includes(this.formInline.assets) ? this.formInline.noble : item.cost
                  this.cashHistory.cash = [21, 22, 23].includes(this.formInline.assets) ? this.formInline.noble : item.cost
                  this.cashHistory.assetsFind = item.gameType.name
                  this.cashHistory.assetsFindHouse = [20].includes(this.formInline.assets) ? this.formInline.dice : ''
                }
              })
            }
            this.dialogVisible = true
            console.log('this.cashHistory: ', this.cashHistory);
          }
          // addPlayerCash(this.cashHistory).then((res) => {
          //   console.log('现金购买变动: ', this.cashHistory);
          //   if (res.code === 1000) {
          //   }
          // })
          if (this.formInline.assets) {
            // buyAssetsList(this.cashHistory).then((res) => {
            //   console.log('资产购买变动: ', this.cashHistory);
            //   if (res.code === 1000) {
            //   }
            // })
          }
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 技能使用
    handleUseRefuses(formName) {
      if (!this.formInline.refuses) {
        this.$message({
          message: '请选择技能使用',
          type: 'warning'
        })
        return
      } else if (!Math.abs(this.formInline.refuses) === 11 && !this.formInline.moreplayer) {
        this.$message({
          message: '请输入多输入玩家',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.optionEvent.forEach((item, index) => {
          //   if (this.formInline.event === item.id) {
          //     this.wholeData.push(item)
          //   }
          // })
          // eventData.forEach((item, index) => {
          //   if (this.formInline.affair === item.id) {
          //     this.additionalData.push(item)
          //   }
          // })
          this.playerInfos.map((item, index, arr) => {
            if (Math.abs(this.formInline.refuses) === 5) {
              if (index !== Math.abs(this.formInline.number) - 1 && index !== this.formInline.moreplayer[0] - 1) {
                this.partmoney += NP.times(item.money, 0.1)
              }
            } else if (Math.abs(this.formInline.refuses) === 11) {
              if (this.formInline.moreplayer.includes(index + 1)) {
                this.sumCashFolw += item.cashFlow
              } else if (index !== Math.abs(this.formInline.number) - 1 && !this.formInline.moreplayer) {
                this.sumCashFolw += item.cashFlow
              }
            } else if ([13, 14].includes(Math.abs(this.formInline.refuses))) {
              if (this.formInline.moreplayer.includes(index + 1)) {
                this.userd = NP.times(item.money, 0.5)
              }
            }
          })
          this.poorindex = this.playerInfos.map(els => els.money).indexOf((Math.min.apply(Math, this.playerInfos.map((ele, index) => { return ele.money }))))
          const data = deepClone(this.playerInfos)
          data.map((item, index) => {
            item = useskill(this.formInline, item, index, this.partmoney, this.roundNum, this.sumCashFolw, this.playerInfos.length, this.userd, this.poorindex)
            return item
          })
          this.playerInfos = data
          skillData.map(item => {
            if (item.id === this.formInline.refuses) {
              this.cashHistory.assetsFind = item.name
            }
          })
          this.dialogVisible = true
          sessionData('set', 'playerInfos', this.playerInfos)
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 直接现金变动
    handleToolmoney(val) {
      if (!this.formInline.number) {
        this.$message({
          message: '请填写玩家编号',
          type: 'warning'
        })
        return
      } else if (!this.formInline.cashmoney) {
        this.$message({
          message: '请填写现金流动',
          type: 'warning'
        })
        return
      }
      const data = deepClone(this.playerInfos)
      data.map((item, index, arr) => {
        item = sellreduce(this.formInline, item, index, val)
      })
      this.cashHistory.assetsFind = val === 1 ? '现金减少' : '现金增加'
      this.dialogVisible = true
      this.playerInfos = data
      sessionData('set', 'playerInfos', this.playerInfos)
      this.formInline.number = null
      this.formInline.cashmoney = null
    },
    // 数据提交
    onSubmit(formName) {
      this.cashHistory = {}
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.forEach((item, index, arr) => {
            if (this.formInline.number - 1 === index) {
              this.cashHistory.playerId = item.playerId
              this.cashHistory.gameId = item.gameId
            }
            item = gridjs(this.formInline, item, this.roundNum, intelData, skillData, assetsData, index)
            return item
          })
          this.playerInfos = data
          sessionData('set', 'playerInfos', this.playerInfos)
          console.log(this.iSprompt)
          if (!this.iSprompt) {
            this.optionEvent.map((item, index) => {
              if (this.formInline.event === item.id) {
                this.wholeData.push(item)
                this.cashHistory.type = item.typeId
                this.cashHistory.assetsFind = item.name
              }
            })
            this.cashHistory.operationType = 1
            this.cashHistory.round = Math.abs(this.roundNum)
            // if (this.formInline.assets) {
            //   this.AssetsList.map((item, index) => {
            //     if (this.formInline.assets === item.type) {
            //       this.cashHistory.cost = [21, 22, 23].includes(this.formInline.assets) ? this.formInline.noble : item.cost
            //       this.cashHistory.realCost = [21, 22, 23].includes(this.formInline.assets) ? this.formInline.noble : item.cost
            //       this.cashHistory.cash = [21, 22, 23].includes(this.formInline.assets) ? this.formInline.noble : item.cost
            //       this.cashHistory.assetsFind = item.gameType.name
            //       this.cashHistory.assetsFindHouse = [20].includes(this.formInline.assets) ? this.formInline.dice : ''
            //     }
            //   })
            // } else if (this.formInline.intel) {
            //   this.IntelList.map((item, index) => {
            //     if (this.formInline.intel === item.type) {
            //       this.cashHistory.assetsFind = item.gameType.name
            //     }
            //   })
            // }
            this.dialogVisible = true
            console.log('this.cashHistory: ', this.cashHistory);
          }
          // addPlayerCash(this.cashHistory).then((res) => {
          //   console.log('现金购买变动: ', this.cashHistory);
          //   if (res.code === 1000) {
          //   }
          // })
          if (this.formInline.assets) {
            // buyAssetsList(this.cashHistory).then((res) => {
            //   console.log('资产购买变动: ', this.cashHistory);
            //   if (res.code === 1000) {
            //   }
            // })
          } else if (this.formInline.intel) {
            // intellectual(this.cashHistory).then((res) => {
            //   console.log('知识产权购买变动: ', this.cashHistory)
            //   if (res.code === 1000) {
            //   }
            // })
          }
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 卖出资产
    handleSell(formName) {
      if (!this.formInline.sell) {
        this.$message({
          message: '请先选择资产',
          type: 'warning'
        })
        return
      }
      this.cashHistory = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.map((item, index) => {
            if (this.formInline.number - 1 === index) {
              item = sell(item, this.formInline, this.roundNum, this.oldSearchJobType[0])
            }
          })
          this.playerInfos = data
          sessionData('set', 'playerInfos', this.playerInfos)
          if (!this.iSprompt) {
            this.optionEvent.map((item, index) => {
              if (this.formInline.event === item.id) {
                this.wholeData.push(item)
                this.cashHistory.type = item.typeId
              }
            })
            this.cashHistory.operationType = 2
            this.cashHistory.round = this.roundNum
            this.dialogVisible = true
            console.log('this.cashFlowList: ', this.cashHistory)
          }
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 技能升阶
    handleUpdateSkill(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.map((item, index) => {
            if (this.formInline.number - 1 === index) {
              if (item.skillList.length === 0) {
                this.$message({
                  message: '当前你没有学习技能',
                  type: 'warning'
                })
              } else {
                item.skillList.map((items) => {
                  if (Math.abs(items.id) === Math.abs(this.formInline.refuses)) {
                    item = updateskill(this.formInline, item, intelData, assetsData, this.roundNum)
                  } else {
                  }
                })
              }
            }
            return item
          })
          this.playerInfos = data
          if (this.iSprompt) {
            this.dialogVisible = true
          }
          sessionData('set', 'playerInfos', this.playerInfos)
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 技能添加
    hanaleAddSkill(formName) {
      this.cashHistory = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.map((item, index) => {
            if (this.formInline.number - 1 === index) {
              item = skillMoney(item, this.formInline, skillData, index)
              return item
            }
          })
          this.playerInfos = data
          this.optionEvent.map((item, index) => {
            if (this.formInline.event === item.id) {
              this.wholeData.push(item)
              this.cashHistory.type = item.typeId
            }
          })
          this.cashHistory.operationType = 1
          this.cashHistory.round = Math.abs(this.roundNum)
          if (this.formInline.ofthe) {
            this.oftheList.map((item, index) => {
              if (this.formInline.ofthe === item.id) {
                this.cashHistory.assetsFind = item.name
              }
            })
          }
          this.dialogVisible = true
          sessionData('set', 'playerInfos', this.playerInfos)
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 现金变动
    playerCash(cashList) {
      addPlayerCash(cashList).then((res) => {
        if (res.code === 1000) {
          console.log(res)
        }
      })
    },
    // 资产变动
    playerAssets(cashList) {
      saleAssetsList(cashList).then((res) => {
        if (res.code === 1000) {
          console.log('资产出售变动: ', res)
        }
      })
    },
    // 知识产权变动
    playerIntel(cashList) {
      saleIntel(cashList).then((res) => {
        if (res.code === 1000) {
          console.log('知识产权出售变动: ', res)
        }
      })
    }
  }
}
</script>
<style>
.app-container {
  position: relative;
}
.rightPanel {
  position: fixed;
  top: 50%;
  right: 60px;
  transform: translate(100%);
  z-index: 100;
}
.playerSatus {
  margin-top: 30px;
  position: relative;
}
.inputclass {
  width: 62%;
}
.playerSatus::after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: #000;
  position: absolute;
  left: 0;
  top: -2.5%;
}
.playerSatus-checkbox {
  padding: 10px 0;
}
.el-radio__inner {
  width: 30px;
  height: 30px;
}
.playerForm {
  margin-top: 30px;
  position: relative;
}
.playerForm::after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: #000;
  position: absolute;
  left: 0;
  top: -2.5%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
</style>

