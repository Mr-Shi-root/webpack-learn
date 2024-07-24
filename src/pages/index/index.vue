<template>
  <div>
    赵静1111
    <hello></hello>
    <div class="scroll-content">
      <div class="content-item"></div>
      <div class="scroll-wrap">
        <div class="scroll-x-content"></div>
      </div>
      <div class="content-item"></div>
    </div>
    <ul id="container"></ul>
  </div>
</template>
    
  <script>
import Hello from "../../package/hello/src/hello.vue";
export default {
  name: "",
  components: {
    Hello,
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
  },
};
</script>
    
    <style lang="less" scoped>
.scroll-content {
  width: 200px;
  height: 400px;
  border: 2px solid #f4f4f4;
  overflow: scroll;
  .content-item {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  .scroll-wrap {
    width: 200px;
    height: 100px;
    overflow-x: scroll;
    .scroll-x-content {
      width: 400px;
      height: 100px;
      background-color: linear-gradient(
        to right,
        #ff8177 0%,
        #ff867a 0%,
        #ff8c7f 21%,
        #f99185 52%,
        #cf556c 78%,
        #b12a5b 100%
      );
    }
  }
}
</style>