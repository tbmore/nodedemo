### 通过应用生成器工具 express-generator 可以快速创建一个应用的骨架。

### 你可以通过 npx （包含在 Node.js 8.2.0 及更高版本中）命令来运行 Express 应用程序生成器。
> npx express-generator

### 对于较老的 Node 版本，请通过 npm 将 Express 应用程序生成器安装到全局环境中并执行即可。
> npm install -g express-generator
> express


### 启动视图引擎，并指定模板文件文件类型：jade
>  app.set('view engine', 'jade');

### 启动视图引擎，并指定模板文件文件类型：ejs
> app.set('view engine', 'ejs')

### 指定模板类型指定为html
> app.engine('html', require('ejs').renderFile)
### 启动视图引擎
> app.set('view engine', 'html')



git clone https://git.sinacloud.com/nodedemo
#输入您的安全邮箱和密码。
cd nodedemo
编辑代码并部署代码

#添加本地的文件改动
git add .
#添加本地修改的备注信息
git commit -m 'Init my first app'
#将改动推送到远程仓库
git push origin master