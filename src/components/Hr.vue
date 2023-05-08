<template>
  <div class="hr-wrapper">
    <hr :style="{ background: color }" />
    <p v-if="title">{{ title }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Hr',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    color: {
      type: String,
      default: '#ddd',
      required: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.hr-wrapper {
  margin: 24px auto;
  position: relative;

  >p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #606266;
    background: #f6f8fe;
    text-align: center;
    position: absolute;
    width: 100px;
    top: -23px;
    left: calc(50% - 50px);
  }

  >hr {
    height: 1px;
    border: none;
  }
}
</style>
