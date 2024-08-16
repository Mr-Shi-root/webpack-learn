import Index from './src/index.vue';

/* istanbul ignore next */
Index.install = function(Vue) {
  Vue.component(Index.name, Index);
};

export default Index;
