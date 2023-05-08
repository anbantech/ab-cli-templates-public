<template>
  <div class="home-page">
    <h1>pinia数据</h1>
    <div class="test-text">isOk: {{ store.isOk }} - 我的数据是来源于store: {{ testNum }}</div>
    <el-button type="primary" @click="changeStore">changeStore</el-button>
    <h1>mock数据</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="生日" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import useCounterStore from '/@/store/modules/app'
import { storeToRefs } from 'pinia'
import { GetDataApi } from '/@/apis/data.api'
import { onMounted, ref } from 'vue'
const store = useCounterStore()
const { testNum } = storeToRefs(store)
const textColor = ref('#ff0000')
const changeStore = () => {
  store.setIsOk(!store.isOk)
  testNum.value++
}
let tableData = ref([])
const getTableData = () => {
  GetDataApi().then((res) => {
    tableData.value = res.data
  })
}

onMounted(() => {
  getTableData()
})
</script>
<style lang="stylus" scoped>
.home-page {
  .test-text {
    color: v-bind(textColor);
  }
}
</style>
