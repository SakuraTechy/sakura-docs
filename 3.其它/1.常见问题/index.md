# 常见问题

:::tip

- 温馨提示：本篇整理大家在使用 Sakura Automation Platform 过程中可能遇到的一些问题。

:::

## 谷歌浏览器自动升级版本后，通过驱动无法正常启动？

- 问题分析：
  - https://blog.csdn.net/Z_Lisa/article/details/133307151
  - https://www.cnblogs.com/interdrp/p/17650069.html
- 解决方案：
  - 需要安装对应版本的ChromeDriver驱动，才能正常打开浏览器
    - Chrome <= 114： http://chromedriver.storage.googleapis.com/index.html
    - Chrome > 114： https://googlechromelabs.github.io/chrome-for-testing
- 操作步骤：
  - 查看浏览器对应版本，找到对应版本的驱动，下载即可
  ![alt text](image.png)
  ![alt text](image-1.png)
  ![alt text](image-2.png)
  ![alt text](image-11.png)
  - 找到自己的【谷歌浏览器安装目录】，解压chromedriver.exe到该目录即可
    - 安装目录：【C:\\Program Files\\Google\\Chrome\\Application\\chromedriver.exe】
    - 谷歌浏览器需要默认安装到C:\\Program Files\\Google\\Chrome\\Application\\下，默认是这个目录

## 登录页面的图片验证码如何自动识别？

- 问题分析：
  - https://github.com/sml2h3/ddddocr
- 解决方案：
  - 使用Python的通用验证码识别OCR库 ddddocr
- 操作步骤：
  - 安装python <= 3.9
    - https://share.weiyun.com/Cg0JGPP7
  - 安装依赖：
    - pip install ddddocr -i https://pypi.tuna.tsinghua.edu.cn/simple
  - 检查安装：
    - pip list
  
    ![alt text](image-3.png)

- 解决验证码识别乱码问题：
  ![alt text](image-4.png)
  - 打开 【D:\Program\Python\3.9.0\Lib\site-packages\ddddocr\init.py】文件
  - 修改 【Image.ANTIALIAS => Image.BICUBIC】

  ![alt text](image-5.png)

## UI自动化执行测试场景，Jenkins提示环境异常，无法自动跳转?

- 问题分析：
  - 跨站请求伪造保护（CSRF）未关闭
    - https://blog.csdn.net/weixin_45005012/article/details/131667811
    - Jenkins Build：status code: 403, reason phrase: Forbidden

- 解决方案：
  - 进入Jenkins【系统管理-脚本命令行】，执行下面命令：
    - hudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION = true

    ![alt text](image-6.png)

## UI自动化测试报告打开乱码?

- 问题分析：
  - https://developer.aliyun.com/article/1309251
  - https://blog.csdn.net/qq_39813400/article/details/128118472

- 解决方案：
  - 进入Jenkins【系统管理-脚本命令行】，执行下面命令：
    - System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
  
    ![alt text](image-7.png)

  - 修改hosts文件，添加以下内容：
    - Linux：/etc/hosts
    - Windows：C:/Windows/System32/drivers/etc/hosts
    - 末尾添加：
      - 192.169.120.162 cdn.rawgit.com
      - 104.21.23.24 cdn.jsdelivr.net
      - 172.67.208.113 cdn.jsdelivr.net

    ![alt text](image-10.png)

## 上传头像后，图片显示空白？

- 问题分析：
  - https://blog.csdn.net/qq_42991839/article/details/124815798
  - https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#图片上传成功不能显示

- 解决方案：
  - nginx配置文件里配置了过滤，注释以下内容即可

```nginx
#过滤相关文件，前端访问会404，可注释
# location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
# {
#    expires      30d;
#    error_log /dev/null;
#    access_log /dev/null;
# }
```

![alt text](image-8.png)

## 浏览器上传文件，保存弹窗元素无法定位？

- 问题分析：
  - https://www.jb51.net/article/283640.htm
  - https://blog.csdn.net/mo_sss/article/details/138634919
- 解决方案：
  - 使用Autoit 上传文件
  - https://www.cnblogs.com/wsy0202/p/11836924.html
  
  ![alt text](image-9.png)

## xpath如何自动更新？

- 问题分析：
  - [https://kns.cnki.net/kcms2/article/abstract](https://kns.cnki.net/kcms2/article/abstract?v=aKxFI3wG76hCuZUmclYXQgXErTFMkQhH4ZWnx9eTEsF3Gi2oJYBSBTt8646OUHH770bhmhAAF9KuBd1lSFqYvUDi6NnICfLnCR2osqmmqHdioF9AczyjZ3zndmNz0aHpLi-_QVvV0nU=&uniplatform=NZKPT)
- 解决方案：
  - 使用xpath插件，自动更新xpath

## 添加场景步骤，操作类型和操作方法，操作步骤不清楚？

```java
export const operations = [
  {
    name: '浏览器操作',
    id: '1',
    children: [
      {
        id: 'web-geturl',
        name: '打开默认网页',
        config: [{ paramsName: 'value', paramsValue: 'https://172.19.5.33/login' }],
      },
      {
        id: 'web-geturls',
        name: '打开指定网页',
        config: [{ paramsName: 'value', paramsValue: 'https://172.19.5.33/login' }],
      },
      {
        id: 'web-close',
        name: '关闭当前标签页',
        config:null
      },
      {
        id: 'web-quit',
        name: '关闭全部标签页',
        config:null
      },
      {
        id: 'web-refresh',
        name: '页面刷新',
        config:null
      },
      {
        id: 'web-getcode',
        name: '获取图片验证码',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@placeholder='验证码'])[1]`},
          { paramsName: 'url', paramsValue: `(//img[@title='点击刷新'])[1]`},
          { paramsName: 'element', paramsValue: `(//button[contains(text(),'登录')])[1]`},
          { paramsName: 'value', paramsValue: `(//div[@class='body-content'])[1]`},
          { paramsName: 'expect', paramsValue: `验证码错误`},
          { paramsName: 'message', paramsValue: `(//button[@type='button'][contains(text(),'确定')])[1]`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'switch-window',
        name: '切换当前最新窗口',
        config:null
      },
      {
        id: 'switch-windows',
        name: '切换指定窗口',
        config: [{ paramsName: 'value', paramsValue: '1' }],
      },
      {
        id: 'switch-Iframe',
        name: '切换Iframe控件',
        config: [
          { paramsName: 'value', paramsValue: `1`},
          { paramsName: 'locator', paramsValue: `xpath=(//iframe[@region='center'])[1]`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'return-Iframe',
        name: '返回上一级Iframe控件',
        config:null
      },
      {
        id: 'quit-Iframe',
        name: '返回最上级Iframe控件',
        config:null
      },
    ],
  },
  {
    name: '点击操作',
    id: '2',
    children: [
      {
        id: 'web-click',
        name: '元素点击',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//button[@type='button'][contains(text(),'确定')])[1]`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'select-click',
        name: '选项框点击',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@placeholder='请选择'])[2]`},
          { paramsName: 'value', paramsValue: `(//span[contains(text(),'一般告警')])[1]`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'input-click',
        name: '选项框搜索点击',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@placeholder='请选择'])[1]`},
          { paramsName: 'value', paramsValue: `姓名`},
          { paramsName: 'element', paramsValue: `(//span[contains(text(),'姓名')])[1]`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
    ],
  },
  {
    name: '弹窗操作',
    id: '3',
    children: [
      {
        id: 'click-ok',
        name: '点击浏览器弹框确定键',
        config:null
      },
      {
        id: 'click-cancel',
        name: '点击浏览器弹框取消键',
        config:null
      },
      {
        id: 'click-text',
        name: '浏览器文本弹框的文本输入',
        config: [
          { paramsName: 'value', paramsValue: `姓名`}
        ],
      },
    ],
  },
  {
    name: '输入操作',
    id: '4',
    children: [
      {
        id: 'web-input',
        name: '输入文本',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@placeholder='请输入开始地址'])[1]`},
          { paramsName: 'value', paramsValue: `172.19.5.29`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-inputdate',
        name: '输入时间',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@placeholder='请选择'])[4]`},
          { paramsName: 'key', paramsValue: `HH:mm`},
          { paramsName: 'keys', paramsValue: `-60*4`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-inputfile',
        name: 'Web端上传文件操作，指定文件目录',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@type='file'])[1]`},
          { paramsName: 'localpath', paramsValue: `D:/Jenkins/workspace/Ankki.Web.UI.Automation.Test/TestData/Zip/system_update_9.9.9.zip`},
          { paramsName: 'delete', paramsValue: `false`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-inputfiles',
        name: 'Web端上传文件操作，默认当前工作目录',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@type='file'])[1]`},
          { paramsName: 'catalogue', paramsValue: `user.home`},
          { paramsName: 'localpath', paramsValue: '/Downloads/${manualBackup}'},
          { paramsName: 'delete', paramsValue: `false`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-inputzs',
        name: 'Web端上传证书操作',
        config: [
          { paramsName: 'device', paramsValue: `AAS_WS`},
          { paramsName: 'locator', paramsValue: `xpath=(//input[@type='file'])[1]`},
          { paramsName: 'catalogue', paramsValue: `user.dir`},
          { paramsName: 'localpath', paramsValue: `/TestData/License/`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-inputclear',
        name: '输入框清空',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//input[@placeholder='请选择'])[4]`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
    ],
  },
  {
    name: '检查操作',
    id: '5',
    children: [
      {
        id: 'web-check',
        name: '检查Web界面元素的文本值',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//div[@class='body-content'])[1]`},
          { paramsName: 'expect', paramsValue: `这里填写预期结果`},
          { paramsName: 'message', paramsValue: `这里填写检查失败的提示内容(实际结果和预期结果不一致)`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-notcheck',
        name: '不检查Web界面元素的文本值',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//div[@class='body-content'])[1]`},
          { paramsName: 'expect', paramsValue: `这里填写预期结果`},
          { paramsName: 'message', paramsValue: `这里填写检查失败的提示内容(实际结果和预期结果不一致)`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-checkvalue',
        name: '检查Web界面元素的属性值',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//label[@title='操作步骤'])[1]`},
          { paramsName: 'value', paramsValue: 'title'},
          { paramsName: 'expect', paramsValue: `这里填写预期结果`},
          { paramsName: 'message', paramsValue: `这里填写检查失败的提示内容(实际结果和预期结果不一致)`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-checkjs',
        name: '检查Web界面调用JS返回的值',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//div[@class='body-content'])[1]`},
          { paramsName: 'value', paramsValue: '/Downloads/${manualBackup}'},
          { paramsName: 'expect', paramsValue: `这里填写预期结果`},
          { paramsName: 'message', paramsValue: `这里填写检查失败的提示内容(实际结果和预期结果不一致)`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-checklist',
        name: '检查从数据库中查询出的结果中的值',
        config: [
          { paramsName: 'details', paramsValue: `condition:Proportion1;subject:xxxx`},
          { paramsName: 'expect', paramsValue: `这里填写预期结果`},
          { paramsName: 'message', paramsValue: `这里填写检查失败的提示内容(实际结果和预期结果不一致)`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-checkset',
        name: '检查Web本地缓存的list中的元素',
        config: [
          { paramsName: 'value', paramsValue: '${test}'},
          { paramsName: 'expect', paramsValue: '这里填写检查失败的提示内容'},
          { paramsName: 'message', paramsValue: '这里填写检查失败的提示内容(实际结果和预期结果不一致)'},
        ],
      },
      {
        id: 'web-notchecklists',
        name: '不检查Web本地缓存的list中的元素',
        config: [
          { paramsName: 'value', paramsValue: '${test}'},
          { paramsName: 'expect', paramsValue: '这里填写检查失败的提示内容'},
          { paramsName: 'message', paramsValue: '这里填写检查失败的提示内容(实际结果和预期结果不一致)'},
        ],
      },
      {
        id: 'web-fuzzycheck',
        name: '模糊检查Web界面元素的内容',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//div[contains(@class,'one-list-title scroll-wrap')])[1]`},
          { paramsName: 'regex', paramsValue: '^(.*(Between :V001 And :V002)).*$'},
          { paramsName: 'message', paramsValue: '审计失败，操作语句错误(实际结果和预期结果不一致)'},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-checkset',
        name: '检查Web本地缓存的list中的元素',
        config: [
          { paramsName: 'value', paramsValue: '${test}'},
          { paramsName: 'expect', paramsValue: '测试'},
          { paramsName: 'message', paramsValue: '错误提示'},
        ],
      },
      {
        id: 'web-notchecklists',
        name: '不检查Web本地缓存的list中的元素',
        config: [
          { paramsName: 'value', paramsValue: '${test}'},
          { paramsName: 'expect', paramsValue: '测试'},
          { paramsName: 'message', paramsValue: '错误提示'},
        ],
      },
      {
        id: 'web-fuzzycheck',
        name: '模糊检查Web界面元素的内容',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//div[contains(@class,'one-list-title scroll-wrap')])[1]`},
          { paramsName: 'regex', paramsValue: '^(.*(Between :V001 And :V002)).*$'},
          { paramsName: 'message', paramsValue: '审计失败，操作语句错误(实际结果和预期结果不一致)'},
        ],
      },
    ],
  },
  {
    name: '等待操作',
    id: '6',
    children: [
      {
        id: 'wait-forced',
        name: '强制等待',
        config: [
          { paramsName: 'value', paramsValue: `20000`},
        ],
      },
      {
        id: 'web-implicit',
        name: '隐式等待',
        config: [
          { paramsName: 'value', paramsValue: `20000`},
        ],
      },
    ],
  },
  {
    name: '全局变量操作',
    id: '7',
    children: [
      {
        id: 'web-set',
        name: '设置值到全局',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=//[@id='loginFailedNumChart']/div[2]`},
          { paramsName: 'script', paramsValue: `document.getElementsByClassName("input-inner")[0].value`},
          { paramsName: 'regex', paramsValue: `(?<= : )(.?)(?= ()`},
          { paramsName: 'regex', paramsValue: `(?&lt;=共\s)(.*?)(?=\s条)`},
          { paramsName: 'regex', paramsValue: `\d{1,3}\.\d{1,3}\.\d{1,3}\.`},
          { paramsName: 'details', paramsValue: `key:fail`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
      {
        id: 'web-setdate',
        name: '获取日期设置值到全局',
        config: [
          { paramsName: 'key', paramsValue: `获取当天日期时间`},
          { paramsName: 'value', paramsValue: `yyyy-MM-dd`},
          { paramsName: 'key', paramsValue: `获取自定义时间`},
          { paramsName: 'value', paramsValue: `yyyy-MM-dd HH:mm:ss`},
          { paramsName: 'details', paramsValue: `key:today`},
          { paramsName: 'script', paramsValue: `-60*60*24`}
        ],
      },
      {
        id: 'web-setsysinfo',
        name: '获取系统信息设置值到全局',
        config: [
          { paramsName: 'key', paramsValue: `主机IP`},
          { paramsName: 'details', paramsValue: `key:ip`}
        ],
      },
      {
        id: 'web-setusableip',
        name: '获取可用IP设置值到全局',
        config: [
          { paramsName: 'value', paramsValue: `172.19.3.`},
          { paramsName: 'details', paramsValue: `start:1;end:3;key:IP`}
        ],
      },
      {
        id: 'web-setproperties',
        name: '获取配置文件信息',
        config: [
          { paramsName: 'value', paramsValue: `AAS_DBSG_Login_IP`},
          { paramsName: 'details', paramsValue: `key:Agent_IP`}
        ],
      },
      {
        id: 'web-setcalculationformula',
        name: '获取计算公式设置值到全局',
        config: [
          { paramsName: 'key', paramsValue: "${total4}/(${total4}+${total5}+${total6})*100"},
          { paramsName: 'keys', paramsValue: `#.00`},
          { paramsName: 'details', paramsValue: `key:Proportion1`}
        ],
      },
    ],
  },
  {
    name: 'Windows系统操作',
    id: '8',
    children: [
      {
        id: 'windows-keybg',
        name: '模拟键盘普通按键',
        config: [
          { paramsName: 'key', paramsValue: `END`},
        ],
      },
      {
        id: 'windows-keybc',
        name: '模拟键盘组合按键',
        config: [
          { paramsName: 'key', paramsValue: `Ctrl`},
          { paramsName: 'keys', paramsValue: `K`},
        ],
      },
      {
        id: 'windows-skeybc',
        name: '模拟键盘特殊组合按键',
        config: [
          { paramsName: 'key', paramsValue: `Ctrl`},
          { paramsName: 'keys', paramsValue: `Tab`},
        ],
      },
      {
        id: 'windows-skeybcm',
        name: '模拟键盘多重特殊组合按键',
        config: [
          { paramsName: 'key', paramsValue: `Ctrl`},
          { paramsName: 'keys', paramsValue: `Shift`},
          { paramsName: 'value', paramsValue: `K`}
        ],
      },
      {
        id: 'windows-cmd',
        name: '模拟执行CMD命令',
        config: [
          { paramsName: 'value', paramsValue: `D:/King/Eclipse/Ankki.Dmp.Web.Test/Plug-in/AutoIT.exe`}
        ],
      },
    ],
  },
  {
    name: '鼠标操作',
    id: '9',
    children: [
      {
        id: 'mouse-move',
        name: '移动鼠标到指定位置1',
        config: [
          { paramsName: 'details', paramsValue: `x:340;y:410`},
        ],
      },
      {
        id: 'move-byoffset',
        name: '移动鼠标到指定位置2',
        config: [
          { paramsName: 'details', paramsValue: `x:340;y:410`},
        ],
      },
      {
        id: 'move-toelement',
        name: '移动鼠标到指定元素中间',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//canvas)[1]`},
          { paramsName: 'state', paramsValue: `today`},
          { paramsName: 'value', paramsValue: `55`},
          { paramsName: 'details', paramsValue: `x:-12;y:0`},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      }
    ],
  },
  {
    name: '文件目录操作',
    id: '10',
    children: [
      {
        id: 'get-file',
        name: '获取本地目录文件，指定文件目录',
        config: [
          { paramsName: 'localpath', paramsValue: "C:/Users/user06/Dowloads"},
          { paramsName: 'details', paramsValue: "key:文件路径丨文件名称丨文件大小;keys:fileName"},
        ],
      },
      {
        id: 'get-files',
        name: '获取本地目录文件，默认当前工作目录',
        config: [
          { paramsName: 'catalogue', paramsValue: `user.home`},
          { paramsName: 'localpath', paramsValue: "/Downloads"},
          { paramsName: 'details', paramsValue: "key:文件路径丨文件名称丨文件大小;keys:fileName"},
        ],
      },
      {
        id: 'delete-file',
        name: '删除本地文件或目录，指定文件目录',
        config: [
          { paramsName: 'localpath', paramsValue: `D:/King/Eclipse/Ankki.Dmp.Web.Test/Plug-in/AutoIT.xml`},
          { paramsName: 'delete', paramsValue: `true`},
        ],
      },
      {
        id: 'delete-files',
        name: '删除本地文件或目录，默认当前工作目录',
        config: [
          { paramsName: 'catalogue', paramsValue: `user.home`},
          { paramsName: 'localpath', paramsValue: "/Downloads/${manualBackup}"},
          { paramsName: 'delete', paramsValue: `true`},
        ],
      },
    ],
  },
  {
    name: '服务器操作',
    id: '11',
    children: [
      {
        id: 'exe-shell',
        name: '连接Linux执行shell命令',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'shell', paramsValue: "rm -rf /home/audit/license/*.lic"}
        ],
      },
      {
        id: 'free-sftp',
        name: '上传本地文件到服务器，指定文件目录',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'localpath', paramsValue: `D:/Jenkins/workspace/Ankki.Web.UI.Automation.Test/TestData/PCAP/`},
          { paramsName: 'filetype', paramsValue: `多个文件`},
          { paramsName: 'filetype', paramsValue: `单个文件`},
          { paramsName: 'value', paramsValue: "sqldbx_10.2.205.2_1972.pcap"},
          { paramsName: 'remotepath', paramsValue: "/sql"},
          { paramsName: 'delete', paramsValue: `false`}
        ],
      },
      {
        id: 'free-sftps',
        name: '上传本地文件到服务器，默认当前工作目录',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'catalogue', paramsValue: "user.dir"},
          { paramsName: 'localpath', paramsValue: `/TestData/PCAP/`},
          { paramsName: 'filetype', paramsValue: `多个文件`},
          { paramsName: 'filetype', paramsValue: `单个文件`},
          { paramsName: 'value', paramsValue: "sqldbx_10.2.205.2_1972.pcap"},
          { paramsName: 'remotepath', paramsValue: "/sql"},
          { paramsName: 'delete', paramsValue: `false`}
        ],
      },
    ],
  },
  {
    name: '数据库操作',
    id: '12',
    children: [
      {
        id: 'db-insertw',
        name: '数据库插入',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'datatype', paramsValue: `Oracle`},
          { paramsName: 'dataenviron', paramsValue: "测试环境"},
          { paramsName: 'port', paramsValue: `1522`},
          { paramsName: 'database', paramsValue: `ORCL`},
          { paramsName: 'sql', paramsValue: `INSERT INTO "TEST"."JDBC" VALUES (1, '小王', 5/3,5/3,sysdate)`},
        ],
      },
      {
        id: 'db-deletew',
        name: '数据库删除',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'datatype', paramsValue: `Oracle`},
          { paramsName: 'dataenviron', paramsValue: "测试环境"},
          { paramsName: 'port', paramsValue: `1522`},
          { paramsName: 'database', paramsValue: `ORCL`},
          { paramsName: 'sql', paramsValue: `DELETE FROM "TEST"."JDBC" WHERE "id"=1`},
        ],
      },
      {
        id: 'db-updatew',
        name: '数据库更新',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'datatype', paramsValue: `Oracle`},
          { paramsName: 'dataenviron', paramsValue: "测试环境"},
          { paramsName: 'port', paramsValue: `1522`},
          { paramsName: 'database', paramsValue: `mysql`},
          { paramsName: 'sql', paramsValue: `UPDATE "TEST"."JDBC" SET "name"='小李' WHERE "id"=2`},
        ],
      },
      {
        id: 'db-queryw',
        name: '数据库查询',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'datatype', paramsValue: `Oracle`},
          { paramsName: 'dataenviron', paramsValue: "测试环境"},
          { paramsName: 'port', paramsValue: `1522`},
          { paramsName: 'database', paramsValue: `mysql`},
          { paramsName: 'sql', paramsValue: `SELECT * FROM "TEST"."JDBC"`},
        ],
      },
      {
        id: 'db-queryws',
        name: '数据库查询，获取结果设置变量',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'datatype', paramsValue: `Oracle`},
          { paramsName: 'dataenviron', paramsValue: "测试环境"},
          { paramsName: 'port', paramsValue: `1522`},
          { paramsName: 'database', paramsValue: `mysql`},
          { paramsName: 'sql', paramsValue: `select * from plugin;`},
          { paramsName: 'details', paramsValue: `key:Proportion1`},
        ],
      },
      {
        id: 'db-procedurew',
        name: '数据库存储过程',
        config: [
          { paramsName: 'device', paramsValue: `AAS_DBSG`},
          { paramsName: 'datatype', paramsValue: `Oracle`},
          { paramsName: 'dataenviron', paramsValue: "测试环境"},
          { paramsName: 'port', paramsValue: `1522`},
          { paramsName: 'database', paramsValue: `ORCL`},
          { paramsName: 'sql', paramsValue: '{call JDBC_TEST(?,?,?,?)}'},
        ],
      },
    ],
  },
  {
    name: '滚动操作',
    id: '13',
    children: [
      {
        id: 'scroll-element',
        name: '滚动到指定元素',
        config: [
          { paramsName: 'locator', paramsValue: `xpath=(//div[@class='body-content'])[1]`},
          { paramsName: 'expect', paramsValue: "文件"},
          { paramsName: 'skip', paramsValue: `false（默认false，可跳过locator和expect，跳过后会标记为成功）`}
        ],
      },
    ],
  },
]
```

## Maven下载依赖太慢？

- 问题分析：
  - https://developer.aliyun.com/mvn/guide
- 解决方案：
  - 打开 maven 的配置文件【D:\Program\Maven\conf\settings.xml】
  - 在<mirrors></mirrors>标签中添加 mirror 子节点，如下:

```xml
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <mirrorOf>central</mirrorOf>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    </mirror>

    <mirror>
      <id>alimaven-public</id>
      <name>aliyun maven public</name>
      <mirrorOf>*</mirrorOf>
      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>

    <mirror>
      <id>aliyun-jcenter</id>
      <name>aliyun jcenter</name>
      <mirrorOf>*</mirrorOf>
      <url>https://maven.aliyun.com/repository/jcenter</url>
    </mirror>

    <mirror>
      <id>alimaven-central</id>
      <name>aliyun maven central</name>
      <mirrorOf>central</mirrorOf>
      <url>https://maven.aliyun.com/repository/central</url>
    </mirror>
  </mirrors>
```

## Jenkins构建记录如何清理？

- 问题分析：
  - https://developer.aliyun.com/article/1309251
  - https://blog.csdn.net/qq_39813400/article/details/128118472

- 解决方案：
  - 进入Jenkins【系统管理-脚本命令行】，执行下面命令：
  
    ```bash
    item = Jenkins.instance.getItemByFullName("Sakura.Api.Automation.Deploy")
    item.builds.each() { build ->
      build.delete()
    }
    item.updateNextBuildNumber(1)
    ```

## Docker无法启动？

- 报错信息：
  - msg="[graphdriver] prior storage driver overlay2 failed: overlay2: the backing xfs filesysteem is formatted without d_type support, which leads to incorrect behavior. Reformat the filesystem with ftype=1 to enable d_type support. Backing filesystems without d_type support are not supported."

- 问题分析：
  - https://juejin.cn/post/7321779275698356233
  - https://blog.csdn.net/carefree2005/article/details/137637605

- 解决方案：

  ```bash
  # 查看磁盘使用信息
  df -h
  # 查看分区信息，ftype=0 表示不支持d_type，需要重新格式化分区为ftype=1
  xfs_info /dev/mapper/centos-home
  # 先备份 /data 目录，注意磁盘使用空间，等待备份完成
  rsync -avxHAX --delete --devices --specials /data/ /data1
  # 查看系统挂载信息
  lsblk
  # 查看 /data 占用
  lsof /data
  # 停止 1Panel 服务
  1pctl stop
  # 取消 /data 挂载
  umount /data
  # 格式化 /dev/mapper/centos-home 分区为 xfs 格式，并设置ftype=1
  mkfs.xfs -f -n ftype=1 /dev/mapper/centos-home
  # 重新挂载 /data 目录
  mount /dev/mapper/centos-home /data
  # 恢复 /data 目录，等待恢复完成
  rsync -avxHAX --delete --devices --specials /data1/ /data
  # 删除journal，解决Runnergo下mongo无法启动问题
  rm -rf /data/RunnerGo/runnergo/mongo/data/journal/*
  # 重启 1Panel 服务
  1pctl restart
  # 重启 Docker 服务
  systemctl restart docker
  # 查看 Docker 服务是否正常，方可删除 /data1 目录
  rm -rf /data1
  ```

## UI自动化测试结果未同步？

- 问题分析：
  - 上传测试结果地址未更新导致

- 解决方案：
  - 账号：root
  - 密码：3edc$RFV
  - 进入后台服务器，执行下面命令：
  
  ```bash
  # 编辑【common.properties】配置文件
  vi /data/sakura/Sakura.Web.UI.Automation.Test/test/src/main/java/common.properties
  # 修改【SysScene_UploadResult_API】和【TestReport_UploadResult_API】中的IP为你的IP地址
  SysScene_UploadResult_API=http://172.19.5.227:8084/system/automation/uploadResults
  TestReport_UploadResult_API=http://172.19.5.227:8084/test/testReport/uploadResults
  ```

  ![alt text](image-12.png)
  