# Fish Blog - 一个前后端分离的博客系统模板

这是一个基于Spring Boot + Vue.js的前后端分离博客系统模板，您可以基于此模板快速构建自己的个人博客系统。

## 项目结构

```
FishBlog
├── blog-springboot    // 博客后端 (Spring Boot)
├── blog-vue           // 博客前端
│   ├── admin          // 后台管理系统 (Vue.js + Element UI)
│   └── blog           // 前台展示页面 (Vue.js)
└── blog-mysql8.sql    // 数据库文件
```

## 技术栈

### 后端

- Spring Boot
- Spring Security
- Spring Data JPA
- MyBatis Plus
- Redis
- RabbitMQ
- MySQL
- Elasticsearch
- Swagger

### 前端

- Vue.js
- Element UI
- Axios
- Vuex
- Vue Router

## 功能特性

- 🎨 美观的响应式界面设计
- 📝 Markdown文章编辑器
- 🔍 全文搜索功能
- 🖼 文章封面图上传
- 🏷️ 标签、分类管理
- 📊 站点访问统计
- 🔐 角色权限管理
- 💬 留言与评论功能
- 🔧 多种登录方式（账号、QQ、微博、GitHub）

## 快速开始

### 1. 数据库配置

1. 创建MySQL数据库: `blog`
2. 导入数据库文件: `blog-mysql8.sql`

### 2. 后端配置

1. 进入`blog-springboot`目录
2. 编辑`src/main/resources/application-dev.yml`文件，配置以下信息:
   - 数据库连接信息
   - Redis连接信息
   - RabbitMQ连接信息
   - 邮箱配置
   - 第三方登录配置(QQ、微博、GitHub等)
   - 阿里云OSS配置(如需使用)
   - Elasticsearch配置(如需使用)

示例:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/blog?serverTimezone=GMT%2B8&allowMultiQueries=true
    username: your_username
    password: your_password
    
  redis:
    host: localhost
    port: 6379
    password: your_redis_password
    
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
```

3. 运行Spring Boot应用:
```bash
mvn spring-boot:run
```

### 3. 前端配置

#### 后台管理系统

1. 进入`blog-vue/admin`目录
2. 安装依赖:
```bash
npm install
```
3. 在`src/config/config.js`中配置腾讯验证码应用ID(如需使用)
4. 运行开发服务器:
```bash
npm run serve
```
5. 打包生产环境:
```bash
npm run build
```

#### 前台页面

1. 进入`blog-vue/blog`目录
2. 安装依赖:
```bash
npm install
```
3. 运行开发服务器:
```bash
npm run serve
```
4. 打包生产环境:
```bash
npm run build
```

## 默认账户

- 用户名: admin
- 密码: 123456

## 注意事项

- 请确保您已修改所有默认密码和API密钥
- 生产环境部署时请使用`application-prod.yml`配置文件
- 建议启用HTTPS以保护您的数据
- 定期备份您的数据库

## 自定义

您可以根据自己的需要对模板进行自定义，包括但不限于:

- 修改页面主题和样式
- 添加新的功能模块
- 集成其他第三方服务
- 优化性能和安全性

## 许可证

本项目使用MIT许可证 - 详见[LICENSE](LICENSE)文件





