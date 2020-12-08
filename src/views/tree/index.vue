<template>
  <div class="app-container">
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
          <div class="playerSatus-round">
            <h2 class="round">当前第{{ roundNum }}回合</h2>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd" />
          </div>
        </div>
        <div style="margin-top: 20px">
          <el-carousel :interval="4000" type="card" height="458px" :autoplay="false">
            <el-carousel-item v-for="(item, index) in playerInfos" :key="index">
              <panel :id="index" ref="handleEvents" :option="item" @handleDel="handleNowDel" />
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
              <el-input v-model.number="formInline.number" />
            </el-form-item>
            <el-form-item style="place-items: center">
              <el-button type="primary" @click="handleImplemented('ruleForm')">执行</el-button>
            </el-form-item>
            <el-form-item v-show="ofthe" label="奇人奇缘" prop="ofthe">
              <el-select
                v-model="formInline.ofthe"
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
            </el-form-item>
            <el-form-item v-show="ofthe" label="异事异见" prop="affair">
              <el-select
                v-model="formInline.affair"
                filterable
                placeholder="请选择事件"
                @visible-change="handleAffair"
              >
                <el-option
                  v-for="(item, index) in affairList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="资产购买" class="menufocus-item" prop="noble">
              <el-input v-model.number="formInline.noble" />
            </el-form-item>
            <el-form-item class="menufocus-itema">
              <el-button v-show="nomoney" type="warning" @click="handleOverlay">资产不足</el-button>
            </el-form-item>
            <el-form-item label="知识产权" class="menufocus-item" prop="intel">
              <el-select
                v-model="formInline.intel"
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
            </el-form-item>
            <el-form-item label="资产选项" class="menufocus-itema" prop="assets">
              <el-select
                v-model="formInline.assets"
                filterable
                placeholder="请选择资产"
                @change="handleAsstes"
                @visible-change="handleVisibleAsstes"
              >
                <el-option
                  v-for="(item, index) in AssetsList"
                  :key="index"
                  :label="item.gameType.name"
                  :value="item.type"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="多输入玩家" prop="moreplayer">
              <el-input v-model="formInline.moreplayer" />
            </el-form-item>
            <el-form-item label="资金使用" prop="usemoney">
              <el-input v-model.number="formInline.usemoney" />
            </el-form-item>
            <el-form-item label="资产出售" prop="sell">
              <!-- <el-input v-model="formInline.sell" /> -->
              <el-select
                v-model="formInline.sell"
                filterable
                placeholder="请选择资产"
                @change="changeSell"
                @visible-change="handleVisibleSell"
              >
                <el-option
                  v-for="(item, index) in sellList"
                  :key="index"
                  :label="item.gameType.name"
                  :value="index"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="技能使用" prop="refuses">
              <el-select
                v-model="formInline.refuses"
                filterable
                placeholder="请选择事件"
                @visible-change="handleUseOfthe"
              >
                <el-option
                  v-for="(item, index) in useOftheList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="买卖数量" prop="assetsNum">
              <el-input-number v-model="formInline.assetsNum" :min="1" :max="30" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="骰子/现金" prop="cashmoney">
              <el-input v-model="formInline.cashmoney">
                <!-- <template slot="append">万</template> -->
              </el-input>
            </el-form-item>
            <el-form-item label="骰子是否" prop="dice">
              <el-select v-model="formInline.dice" placeholder="请选择骰子单双数" @change="handleDice">
                <el-option v-for="o in 6" :key="o" :label="o" :value="o"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="place-items: center" class="menufocus-items">
              <el-button type="primary" @click="onSubmit('ruleForm')">购买/增加</el-button>
              <el-button @click.stop="handleSell('ruleForm')">出售/减少</el-button>
              <el-button type="success" @click="handleWholeRound">保存一整回合</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { eventCounter } from '@/utils/events'
import { deepClone } from '@/utils'
import { gridjs } from '@/utils/gridgain'
import { sell } from '@/utils/sell'
import { assetsList, buyAssetsList, saleAssetsList } from '@/api/assets'
import { getSkill } from '@/api/skill'
import { getIntel } from '@/api/intellectual-property'
import { getPlayerCash, delPlayerCash, addPlayerCash } from '@/api/playerCash'
import { getEvent } from '@/api/event'
import { getRound } from '@/api/round'
import { getRole } from '@/api/role'
import { addGameInfo } from '@/api/gameInfo'
import panel from '@/components/Panel/index'
import falseData from '@/assets/json/index.json'
import skillData from '@/assets/json/skill.json'
import eventData from '@/assets/json/event.json'
import intelData from '@/assets/json/intel.json'
import assetsData from '@/assets/json/assets.json'
import roleData from '@/assets/json/roleList.json'
import { mapActions } from 'vuex'
import NP from 'number-precision'
import _ from 'lodash'
export default {
  inject: ['reload'],
  components: {
    panel
  },
  data() {
    return {
      Overlay: false,
      nomoney: false,
      roundNum: 1,
      radio: 1,
      checkList: [1, 2, 3],
      playerInfos: [],
      // optionEvent: [],
      optionEvent: falseData,
      formInline: {
        affair: null,
        noble: null,
        event: null,
        number: null,
        assets: null,
        dice: null,
        assetsNum: 1,
        intel: null,
        ofthe: null,
        refuses: null,
        moreplayer: null,
        cashmoney: null,
        usemoney: null,
        sell: null
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
      roundData: [],
      rules: {
        event: [
          { required: true, message: '当前事件格子', trigger: 'change' }
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
        realCost: null
      },
      skillofthe: [], // 奇人技能表
      inteltable: [], // 知识产权
      partmoney: 0,
      sellround: 0
    }
  },
  computed: {
    events() {
      return this.formInline.event
    }
    // roundNum() {
    //   return this.$store.state.gameData.roundNumber
    // }
  },
  watch: {
    'formInline.intel': {
      handler: function (newval, oldval) {
        this.formInline.sell = null
        this.formInline.assets = null
      },
      deep: true
    },
    'formInline.assets': {
      handler: function (newval, oldval) {
        this.formInline.sell = null
        this.formInline.intel = null
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
        this.formInline.assetsNum = 1
        this.formInline.intel = null
        this.formInline.cashmoney = null
        this.formInline.refuses = null
        this.formInline.moreplayer = null
        this.formInline.usemoney = null
        this.formInline.sell = null
      },
      deep: true
    },
    playerInfos: {
      handler: function (newval, oldval) {
        // const difference = _.differenceWith(
        //   newval,
        //   oldval,
        //   (i, k) => JSON.stringify(i) === JSON.stringify(k)
        // )
        // console.log(difference)
        let arr3 = newval.concat(oldval);
        let result = arr3.filter(function (v) {
          return newval.every(n => JSON.stringify(n) !== JSON.stringify(v)) || oldval.every(n => JSON.stringify(n) !== JSON.stringify(v))
        })
        const temp = {}
        for (const i in result) {
          const key = result[i].id
          if (temp[key]) {
            temp[key].money = result[i].money - temp[key].money
            this.cashHistory.cash = temp[key].money
            this.cashHistory.realCost = temp[key].money
          } else {
            temp[key] = {};
            temp[key].money = result[i].money;
          }
        }
      },
      deep: true
    }
  },
  created() {
    // this.getData()
    this.optionEvent = falseData
    const sessionPlayerInfos = JSON.parse(window.sessionStorage.getItem('playerInfos'))
    const sessionRoundData = JSON.parse(window.sessionStorage.getItem('roundData'))
    const sessionRoundNumber = window.sessionStorage.getItem('roundNumber')
    if (sessionPlayerInfos) {
      this.playerInfos = sessionPlayerInfos
    }
    if (sessionRoundData) {
      this.roundData = sessionRoundData
      this.roundNum = sessionRoundNumber
    }
  },
  methods: {
    handleVisibleSell() {
      this.sellList = []
      if (this.formInline.assets) {
        this.playerInfos.map((item, index) => {
          if (this.formInline.number - 1 === index) {
            item.assetsArray.forEach((ites, indes) => {
              if (this.formInline.assets == ites.type) {
                this.sellList.push(ites)
              }
            })
          }
        })
      } else if (this.formInline.intel) {
        this.playerInfos.map((item, index) => {
          if (this.formInline.number - 1 === index) {
            item.inteArray.forEach((ites, indes) => {
              if (this.formInline.intel == ites.type) {
                this.sellList.push(ites)
              }
            })
          }
        })
      }
    },
    changeSell(e) {
      // console.log(e)
      this.sellList.forEach((item, index) => {
        if (index === e) {
          this.sellround = this.formInline.intel ? item.intelround : this.formInline.assets ? item.assetsround : false
          console.log(this.sellround)
        }
      })
    },
    handleDice(e) {
      console.log(typeof e)
    },
    // ...mapActions({
    //   addNumber: 'addRound'
    // }),
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
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
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
      this.$confirm('此操作将保存当前一轮回合的事件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const wholeround = deepClone(this.wholeData)
        const additionalround = deepClone(this.additionalData)
        if (this.roundNum === 1) {
          console.log(456)
          const data = {
            number: 1,
            roundList: wholeround,
            additional: additionalround
          }
          this.roundData.push(data)
        } else {
          this.roundData.forEach((item, index) => {
            if (this.roundNum === item.number) {
              item.roundList = wholeround
              item.additional = additionalround
            }
          })
        }
        this.handleAdd()
        window.sessionStorage.setItem('roundData', JSON.stringify(this.roundData))
        window.sessionStorage.setItem('roundNumber', this.roundNum)
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
    },
    // 保存当前玩家群
    handleSavePlayer() {
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.$prompt('请输入当前游戏名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value) return
        this.playerInfos.map((item, index) => {
          item.insurance = 0 // 银行保险理财
          item.insuranceRound = this.roundNum // 银行保险理财轮数
          item.patent = 0 // 专利
          item.developed = 0 // 大学研发中心
          item.play_serial = index // 玩家编号
          item.stock = 0 // 银行股票基金
          item.stockRound = this.roundNum // 股票基金轮数
          item.metalsRound = this.roundNum // 贵金属轮数
          item.metals = 0 // 贵金属
          item.depressed = 0 // 抑郁症次数
          item.health = 0 // 亚健康次数
          item.exchange = 0 // 换手机/电脑/车
          item.skillList = [] // 技能列表
          item.assetsArray = [] // 资产列表
          item.credit = 0 // 信贷信用卡
          item.creditRound = 0 // 信贷回合数
          item.inteArray = [] // 知识产权列表
          item.movieShow = 0 // 电影收益
          return item
        })
        window.sessionStorage.setItem('playerInfos', JSON.stringify(this.playerInfos))
        const arr = deepClone(this.playerInfos)
        const saveData = []
        arr.forEach((item, index) => {
          saveData.push({
            money: item.money,
            playerId: index + 1,
            type: item.type
          })
        })
        const data = {
          'createTime': 0,
          'id': null,
          'list': saveData,
          'name': value
        }
        window.sessionStorage.setItem('playerData', JSON.stringify(data))
        // addGameInfo(data).then((res) => {
        //   if (res.code === 1000) {
        //     this.$message({
        //       type: 'success',
        //       message: '保存成功!'
        //     })
        //     window.sessionStorage.setItem('playerData', JSON.stringify(res.data))
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleAsstes(val) {
      console.log(typeof val)
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
    // 添加玩家
    handleAddPlayer() {
      if (this.roleArray.length === 0) {
        this.$message('请选择玩家职业')
        return
      }
      this.roleList.forEach((item, index) => {
        if (this.roleArray.includes(item.id)) {
          this.playerInfos.push(item)
        }
      })
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
    handleAdd() {
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      // this.$store.dispatch('gameData/addRound')
      this.roundNum = ++this.roundNum
      this.playerInfos.map(item => {
        if (item.creditRound !== 0) {
          --item.creditRound
          item.money = item.money + item.cashFlow - item.carExpenses - item.credit / 10
        } else {
          item.money = item.money + item.cashFlow - item.carExpenses
        }
        item.metals = NP.times(item.metals, 1.3)
        return item
      })
      window.sessionStorage.setItem('playerInfos', JSON.stringify(this.playerInfos))
      const data = {
        number: this.roundNum,
        roundList: null,
        additional: null
      }
      this.roundData.push(data)
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
      console.log(typeof e)
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
          this.optionEvent.forEach((item, index) => {
            if (this.formInline.event === item.id) {
              this.wholeData.push(item)
            }
          })
          eventData.forEach((item, index) => {
            if (this.formInline.affair === item.id) {
              this.additionalData.push(item)
            }
          })
          this.playerInfos.map((item, index) => {
            if (Math.abs(this.formInline.refuses) === 5) {
              if (index !== Math.abs(this.formInline.number) - 1 && index !== Math.abs(this.formInline.moreplayer) - 1) {
                this.partmoney += Math.abs(item.money) * 0.1
              }
            }
          })
          this.playerInfos.map((item, index) => {
            item = eventCounter(this.formInline, item, index, this.partmoney)
            return item
          })
          window.sessionStorage.setItem('playerInfos', JSON.stringify(this.playerInfos))
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 数据提交
    onSubmit(formName) {
      if (this.playerInfos.length === 0) {
        this.$message('请添加玩家')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.map((item, index, arr) => {
            if (this.formInline.number - 1 === index) {
              item = gridjs(this.formInline, item, this.roundNum, intelData, skillData,assetsData)
            }
          })
          this.playerInfos = data
          window.sessionStorage.setItem('playerInfos', JSON.stringify(this.playerInfos))
          // this.optionEvent.forEach((item, index) => {
          //   if (this.formInline.event === item.id) {
          //     this.wholeData.push(item)
          //   }
          // })
          // console.log(this.wholeData)
          this.optionEvent.map(item => {
            if (item.id === this.formInline.event) {
              this.cashHistory.type = item.typeId
            }
          })
          this.cashHistory.operationType = 1
          this.cashHistory.round = this.roundNum
          const storagePlayerData = JSON.parse(sessionStorage.getItem('playerData'))
          storagePlayerData.list.forEach((item, index) => {
            if (Math.abs(this.formInline.number) === item.playerId) {
              this.cashHistory.playerId = item.playerId
              this.cashHistory.gameId = item.gameId
            }
          })
          // addPlayerCash(this.cashHistory).then((res) => {
          //   if (res.code === 1000) {
          //     console.log(res)
          //   }
          // })
          console.log(this.cashHistory)
          // if (this.formInline.assets) {
          //   buyAssetsList(this.cashHistory).then((res) => {
          //     if (res.code === 1000) {
          //       console.log(res)
          //     }
          //   })
          // }
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 卖出资产
    handleSell(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.playerInfos)
          data.map((item, index) => {
            if (this.formInline.number - 1 === index) {
              item = sell(item, this.formInline, this.roundNum, this.sellround)
            }
          })
          this.playerInfos = data
          window.sessionStorage.setItem('playerInfos', JSON.stringify(this.playerInfos))
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
.playerSatus {
  margin-top: 30px;
  position: relative;
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

