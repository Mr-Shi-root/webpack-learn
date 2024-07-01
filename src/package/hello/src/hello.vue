<template>
    <div class="hello">
      <div class="world">hello</div>
      <div>{{speName}}</div>
      <div>{{num}}</div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'WdHello',
      data() {
            return {
                num: 1
            };
        },
      props: {
        speName: {
            type: String,
            default: '123'
        },
      },
      methods: {
        getInitInfo(){
            this.num = 2
        }
      },
      setup() {
        this.getInitInfo()
      }
    }
  </script>
  
  <!-- <style lang="less" scoped>
  .hello {
    .world {
      color: red;
      font-size: 20px;
    }
  }
  </style> -->
  