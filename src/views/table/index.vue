<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom:30px;">添加职业</el-button>
    <div class="card-box">
      <el-card v-for="(item, index) in playerList" :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ item.name }}</span>&nbsp;
          <span style="color: #909399">职业：{{ item.occupations }}</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">初始可学技能数：{{ item.skill }}</div>
        <div class="text item">初始现金流：{{ item.cash }} 元</div>
      </el-card>
    </div>

    <!-- <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      playerList: [
        { name: '路人甲', occupations: '学生', skill: 4, cash: 1000 },
        { name: '路人乙', occupations: '拆迁户', skill: 1, cash: 600000 },
        { name: '路人丙', occupations: '白领', skill: 3, cash: 10000 },
        { name: '路人丁', occupations: '个体经营者', skill: 2, cash: 10000 },
        { name: '路人戊', occupations: '医生', skill: 3, cash: 15000 },
        { name: '路人己', occupations: '公务员', skill: 3, cash: 5000 }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.line {
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-bottom: 20px;
}
</style>

