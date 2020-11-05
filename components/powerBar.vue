<template>
  <div class="bar--setup">
    <div class="bar">
      <div
        class="main-height"
        :style="{ height: `${chartHeight}%`, top: `${100 - chartHeight}%` }"
      ></div>
    </div>
    <div class="text">{{ chartText }}</div>
  </div>
</template>

<script>
  export default {
    name: 'PowerBar',
    props: {
      chartHeight: {
        type: Number,
        default: 100,
      },
      chartText: {
        type: String,
        default: 'MO',
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bar--setup {
    display: flex;
    flex-wrap: wrap;
    width: 19px;
    height: 200px;

    .bar {
      height: 90%;
      width: 100%;
      position: relative;
      .main-height {
        width: 100%;
        background: #000;
        position: absolute;
        border-radius: 6px;
      }
    }
    .text {
      width: 100%;
      margin-top: 10px;
      color: #000000;
    }
  }
</style>
