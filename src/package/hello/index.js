import Hello from './src/hello.vue';

/* istanbul ignore next */
Hello.install = function(Vue) {
  Vue.component(Hello.name, Hello);
};

export default Hello;
