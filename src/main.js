import sum from './js/sum'
import count from './js/count'
import './css/index.css';
import './css/index.less';
import './css/iconfont.css';
// import Vue from 'vue';
// import Dialog from 'element-ui'

// console.log(Dialog);

// eslint 写了no-var
// var a = sum(1234);
// console.log(a);
console.log(sum(1, 6, 2, 3, 4, 5));
console.log(count(7, 8));

// 组件的注册方法，打包生产的时候，单独抽出去执行
import WdHello from './package/hello/index'

const install = function (Vue) {
    Vue.component(WdHello.name, WdHello);
};

export default {
    install,
    WdHello
}
// 组件的注册方法，打包生产的时候，单独抽出去执行

// URL url = new URL('www.baidu.com');
