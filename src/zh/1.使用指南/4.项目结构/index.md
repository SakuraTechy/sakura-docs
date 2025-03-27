# 项目结构

## 前端结构

```bash
Sakura.Automation.Platform.Web
├── docs                                  # 项目文档
├── public                                # 公共文件
│   └── logo.png                          # LOGO
│   └── index.html                        # Vue 入口模板
├── src                                   # 主目录
│   ├── api                               # Api ajax 等
│   ├── assets                            # 本地静态资源
│   ├── config                            # 项目基础配置，包含路由，全局设置
│   ├── components                        # 业务通用组件
│   ├── core                              # 项目引导, 全局配置初始化，依赖包引入等
│   ├── directive                         # 自定义指令
│   ├── router                            # Vue-Router
│   ├── store                             # Vuex
│   ├── utils                             # 工具库
│   ├── locales                           # 国际化资源
│   ├── views                             # 业务页面入口和常用模板
│   ├── App.vue                           # Vue 模板入口
│   └── main.js                           # Vue 入口 JS
│   └── permission.js                     # 路由守卫(路由权限控制)
│   └── global.less                       # 全局样式
├── tests                                 # 测试工具
├── .eslintrc.js                          # ESLint 配置项
├── .browserslistrc                       # Babel 转码配置
├── .editorconfig                         # 定义代码格式
├── .gitignore                            # Git 忽略项
├── babel.config.js                       # Babel-loader 配置
├── vue.config.js                         # Vue-cli 配置
├── postcss.config.js                     # PostCSS 配置
├── package.json                          # npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
└── README.md                             # 项目说明文档
```

## 后端结构

```bash
Sakura.Automation.Platform.Api
├── sakura-admin                          # 系统启动入口
├── sakura-common                         # 工具类
│       └── annotation                    # 自定义注解
│       └── config                        # 全局配置
│       └── constant                      # 通用常量
│       └── core                          # 核心控制
│       └── enums                         # 通用枚举
│       └── exception                     # 通用异常
│       └── filter                        # 过滤器处理
│       └── utils                         # 通用类处理
├── sakura-controller                      # 前台控制器
├── sakura-framework                      # 框架核心
│       └── aspectj                       # 注解实现
│       └── config                        # 系统配置
│       └── datasource                    # 数据权限
│       └── interceptor                   # 拦截器
│       └── manager                       # 异步处理
│       └── security                      # 权限控制
│       └── web                           # 前端控制
├── sakura-generator                      # 代码生成工具
├── sakura-quartz                         # 定时任务
├── sakura-system                         # 系统管理
├── sakura-xxxxxx                         # 其他模块
├── pom.xml                               # Maven 项目核心配置文件
└── README.md                             # 项目说明文档
```
