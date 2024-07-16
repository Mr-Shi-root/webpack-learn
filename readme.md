#Webpack5-sjn

**这是一个自研的组件库demo**

本demo是基于webpack5和vue3搭建，里面通过vue.install，暴露组件的内容。demo做了单个组件的编译。下载以后，可以通过import方法引入所需组件，即可使用。

####安装方法
```npm install webpack5-sjn```


    <template>
      <div class="menu">
        menu1
        <wd-hello :speName.sync="speName"></wd-hello>
    
      </div>
    </template>
    
    <script>
    import { WdHello } from 'webpack5-sjn';
    export default {
      name: "Menu",
      components: {
        'wd-hello': WdHello
      },
      data() {
        return {
          speName: '1111'
        };
      },
    };
    </script>
    