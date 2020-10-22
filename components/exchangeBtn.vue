<template>
  <svg
    class="exchange--btn"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512.025 512.025"
  >
    <g>
      <path
        :fill="
          rightColor === 'afk-color'
            ? '#4451ff'
            : rightColor === 'btc-color'
            ? '#f7932d'
            : rightColor === 'eth-color'
            ? '#50599c'
            : rightColor === 'ltc-color'
            ? '#838383'
            : rightColor === 'dash-color'
            ? '#018ee3'
            : ''
        "
        d="M480.013 304.093c0 44.8-26.88 48-32 48H54.573l84.64-84.64-22.56-22.72-112 112c-6.204 6.241-6.204 16.319 0 22.56l112 112 22.56-22.56-84.64-84.64h393.44c22.08 0 64-16 64-80v-48h-32v48z"
      ></path>
      <path
        :fill="
          leftColor === 'afk-color'
            ? '#4451ff'
            : leftColor === 'btc-color'
            ? '#f7932d'
            : leftColor === 'eth-color'
            ? '#50599c'
            : leftColor === 'ltc-color'
            ? '#838383'
            : leftColor === 'dash-color'
            ? '#018ee3'
            : ''
        "
        d="M32.013 208.093c0-44.8 26.88-48 32-48h393.44l-84.64 84.64 22.56 22.56 112-112c6.204-6.241 6.204-16.319 0-22.56l-112-112-22.72 22.72 84.8 84.64H64.013c-22.08 0-64 16-64 80v48h32v-48z"
      ></path>
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'ExchangeBtn',
    props: {
      leftColor: {
        type: String,
        default: 'exchange',
      },
      rightColor: {
        type: String,
        default: 'exchange',
      },
    },
  }
</script>

<style>
  .exchange--btn {
    transition: all 0.3s ease-in-out;
  }
  .exchange--btn path {
    transition: all 0.3s ease-in-out;
  }
</style>
