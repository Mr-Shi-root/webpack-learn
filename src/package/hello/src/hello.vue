<template>
    <div class="hello">
        <div class="world">hello</div>
        <div class="useLoader"></div>
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
        getInitInfo() {
            this.num = 2
        }
    },
    // setup() {
    //     this.getInitInfo()
    // }
}
</script>
  
<style lang="less" scoped>
.hello {
    .world {
        display: flex;
        color: red;
        font-size: 20px;
    }
}
.useLoader {
  width: 100px;
  height: 100px;
  background-image: url('../../../img/22.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
  