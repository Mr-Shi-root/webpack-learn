import Vue from 'vue';
import Index from './index.vue'
import { sum } from './js/sum';
import { chu } from './js/chu';
import { add } from './js/add';

sum(1+2)
chu(1+2)
add(1+2)

// 本地mode开发的，引用demo.vue
new Vue(Index).$mount("#app")

// 热更新，HMR，可以指定文件进行热更新，监听文件，当发生改变时，文件进行部分更新，不会全局更新
// vue react 中有自己的loader专门解决这个问题 vue-loader react-hot-loader
// 如果是一个js内嵌另一个，当另一个发生变化时，不会进行热更新
if (module.hot) {
    console.log('热更新');
    
    module.hot.accept([
        './js/sum',
        './js/chu',
    ], function() {
        // ... 用新样式替换旧样式
        console.log('???');
    })
}

// URL url = new URL('www.baidu.com');
