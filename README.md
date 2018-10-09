# vue.js之使用Vue CLI开发多页面应用


---
### 简要说明
> Vue CLI是一个基于Vue.js进行快速开发的完整系统，是vue-cli的升级版，除含有快速搭建Vue项目的脚手架外还有许多实用功能，vue ui是个亮点，[官方详细文档传送门](https://cli.vuejs.org/zh/guide)。

## 一、安装Vue CLI
安装Vue CLI命令为`npm install -g vue@cli`,若已安装旧版vue-cli则需要先卸载vue-cli，卸载命令为`npm uninstall vue-cli -g` 。

## 二、创建vue工程
cmd命令`vue create project-name`创建vue工程，创建成功如下：
![微信截图_20181008221144.png-53.2kB][1]
使用IDE（我习惯使用webstorm）打开工程，结构如下：

![微信截图_20181008221837.png-89.4kB][2]
自动生成的README.md中为我们给出了常用的命令。执行`npm run serve`使工程以开发模式运行，编译完成后可正常访问http://localhost:8080说明成功。
> 这里会涉及一些vue的基础，我们在这篇博文中不做详细说明，不太了解的小哥哥小姐姐可以查阅vue相关教程（ps：vue的文档还是相当全面和详细的）。

## 三、多页面配置
> 使用vue脚手架创建的vue项目均为单页面应用（单页面应用有着多页面不具备的多种优势），但在有些场景下（如一套系统的管理端和客户端应分为不同的页面应用）我们需要构建多页面应用。使用旧版vue-cli构建的工程实现起来需要修改许多配置，相当繁琐，基于Vue CLI配置可以轻松实现多页面应用构建。

1、添加多页面配置

在工程根路径下（package.json同目录）添加添加vue.config.js配置文件，内容为：
```js
module.exports = {
    pages: {
        console: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/modules/console/console.js',

            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/console.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'console.html',

            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'console page',

            // 包含的模块，可选项
            chunks: ['console']
        },
        // 只有entry属性时，直接用字符串表示模块入口
        client: 'src/modules/client/client.js'
    }
}
```

2、创建多页面应用

首先，安装两个插件，vue-router和vue-wechat-title。vue-router不解释了，vue-wechat-title为单页面应用修改标题的插件，[详细说明点击传送门](https://www.npmjs.com/package/vue-wechat-title)。
其次为创建模块，在src下创建目录modules，在modules下创建两个模块console和client；在public下添加模版console.html和clien.html。完成后工程结构如下：

![微信截图_20181009103056.png-54.2kB][3]

3、应用路由配置

通过vue-router为应用配置路由，以console模块为例，在router.js中添加路由配置：
```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'login', component: r => { require(['./login/Login'], r) }, meta: { title: 'console 登录' }}
]

export default new VueRouter({
    routes: routes
})
```

4、应用title跟随路由切换

上面我们安装了vue-wechat-title插件，在console.js中引入`Vue.use(require('vue-wechat-title'))`，console.js完整内容为：
```
import Vue from 'vue'
import Console from './Console.vue'
import router from './router'

Vue.use(require('vue-wechat-title'))

new Vue({
    router,
    render: h => h(Console)
}).$mount('#console')
```
在console.vue中添加`v-wechat-title`指令，console.vue内容为：
```
<template>
    <div id="console" v-wechat-title="$route.meta.title">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "console"
    }
</script>

<style scoped>

</style>
```
至此，针对console模块的配置完成，对client模块做相同配置即可。
## 四、运行测试
执行`npm run serve`指令以开发模式运行工程，访问http://localhost:8080/console.html可以看到进入了我们在路由里为console应用设置的首页面，title也与我们设置的相同：
![微信截图_20181009110715.png-19.7kB][4]

访问http://localhost:8080/client.html进入了我们为client应用设置的首页面：
![微信截图_20181009111008.png-23.3kB][5]

### 补充说明：
> Vue CLI初始化的README.md内容为常用指令（上文有截图说明），这里被我用来做说明文档了，在此说明下以免误会。
文章内容为个人工作学习总结，难免有纰漏，欢迎指摘、讨论。

  [1]: http://static.zybuluo.com/louie-001/qlph33jyj30mldmynd4f6ive/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181008221144.png
  [2]: http://static.zybuluo.com/louie-001/mqwnnz344t5z3bzsv6tuae4t/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181008221837.png
  [3]: http://static.zybuluo.com/louie-001/dvr0506t5882rl3jk2e7n0uy/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181009103056.png
  [4]: http://static.zybuluo.com/louie-001/6a28jsgq4njodvvzzmgnpfy2/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181009110715.png
  [5]: http://static.zybuluo.com/louie-001/s6pk8gdr4n99qwefdube4jpn/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181009111008.png