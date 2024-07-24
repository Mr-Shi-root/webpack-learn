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
    <!-- <div v-for="(item, index) in 10000" :key="index">
              {{ item }} {{ index }}
          </div> -->
    <ul id="container"></ul>
  </div>
</template>
  
<script>
import Hello from "../../../package/hello/src/hello.vue";
export default {
  name: "",
  components: {
    Hello,
  },
  data() {
    return {
      now: null,
      total: 100000,
      ul: null,
    };
  },
  created() {},
  // mounted() {
  //     // 10万条数据的加载
  //     // 首先，10万条数据一起循环加载，会造成卡顿
  //     // 记录任务开始时间
  //     /**
  //      * 渲染过程
  //      * 1.运行js
  //      * 2.输出JS运行时间
  //      * 3.渲染页面，
  //      * 4.执行宏观队列总运行时间
  //      *
  //      */
  //     // 问题：js运行时间快，但是页面渲染时间很慢
  //     let now = Date.now();
  //     const total = 100000;
  //     // 获取容器
  //     let ul = document.getElementById('container');
  //     // 将数据插入容器中
  //     for (let i = 0; i < total; i++) {
  //         let li = document.createElement('li');
  //         li.innerText = ~~(Math.random() * total)
  //         ul.appendChild(li);
  //     }

  //     console.log('JS运行时间：',Date.now() - now);
  //     setTimeout(()=>{
  //         console.log('总运行时间：',Date.now() - now);
  //     },0)
  //     // print: JS运行时间： 187
  //     // print: 总运行时间： 2844
  // }
  //   mounted() {
  //     // 解决上面的做法
  //     // 方法1
  //     // 利用setTimeOut分批加载
  //     let now = Date.now();
  //     // 获取容器
  //     this.ul = document.getElementById("container");
  //     // 将数据插入容器中
  //     const index = 0;
  //     this.loop(this.total, index);

  //     // print: JS运行时间： 187
  //     // print: 总运行时间： 2844
  //   },
  //   mounted() {
  //     // 解决上面的做法
  //     // 方法1
  //     // 利用setTimeOut分批加载
  //     // 缺点：因为setTimeout对于渲染时间的不可控，导致下拉会出现闪屏显现
  //     // 解决：利用requestAnimationFrame方法
  //     let now = Date.now();
  //     // 获取容器
  //     this.ul = document.getElementById("container");
  //     // 将数据插入容器中
  //     const index = 0;
  //     const flag = true
  //     // this.loop(this.total, index, flag, now);
  //     setTimeout(() => {
  //       console.log("总运行时间：", Date.now() - now);
  //     }, 0);

  //     // print: JS运行时间： 3
  //     // print: 总运行时间： 4
  //   },
  mounted() {
    // 方法2
    // 把setTimeout替换成requestAnimationFrame
    let now = Date.now();
    // 获取容器
    this.ul = document.getElementById("container");
    // 将数据插入容器中
    const index = 0;
    const flag = true;
    this.loop(this.total, index, flag, now);
    setTimeout(() => {
      console.log("总运行时间：", Date.now() - now);
    }, 0);

    // print: JS运行时间： 3
    // print: 总运行时间： 4
  },

  methods: {
    loop(curTotal, curIndex, flag, now) {
      // 方法2
      // 把setTimeout替换成requestAnimationFrame
      console.log(curTotal);
      if (curTotal < 0) return false;

      let pageCount = Math.min(curTotal, 20);

      window.requestAnimationFrame(() => {
        if (flag) {
          console.log("JS运行时间：", Date.now() - now);
          flag = false;
        }
        for (let i = 0; i < pageCount; i++) {
          let li = document.createElement("li");
          li.innerText = curIndex + i + " : " + ~~(Math.random() * this.total);
          this.ul.appendChild(li);
        }
        this.loop(curTotal - pageCount, curIndex + pageCount, false, 0);
      });
    },
    // loop(curTotal, curIndex, flag, now) {
    //   // 方法1
    //   // 利用循环加载去实现部分加载，保证先加载首屏，后续未可见部分持续加载
    //   // 缺点：因为setTimeout对于渲染时间的不可控，导致下拉会出现闪屏显现
    //   console.log(curTotal);
    //   if (curTotal < 0) return false;

    //   let pageCount = Math.min(curTotal, 20);

    //   setTimeout(() => {
    //     if (flag) {
    //       console.log("JS运行时间：", Date.now() - now);
    //       flag = false;
    //     }
    //     for (let i = 0; i < pageCount; i++) {
    //       let li = document.createElement("li");
    //       li.innerText = curIndex + i + " : " + ~~(Math.random() * this.total);
    //       this.ul.appendChild(li);
    //     }
    //     this.loop(curTotal - pageCount, curIndex + pageCount, false, 0);
    //   }, 0);
    // },
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