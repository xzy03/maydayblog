<div align="center">
  <img src="Resources/github-header-image.png" alt="FishBlog - 全栈博客系统" width="1000">
</div>


<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=26&duration=3000&pause=1000&color=49B1F5&center=true&vCenter=true&width=600&lines=优雅而功能强大的全栈博客系统;Elegant+%26+Powerful+Full-Stack+Blog+System;简洁的界面，丰富的功能;Clean+Interface%2C+Rich+Features;记录灵感，分享知识的理想选择;Perfect+Choice+for+Sharing+Your+Knowledge;让博客创作成为一种享受;Make+Blogging+a+Pleasure)](https://github.com/your-username/fishblog)

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-Apache%202.0-orange.svg?style=flat-square&logo=apache" alt="License">
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=flat-square&logo=vue.js" alt="Vue">
  </a>
  <a href="https://spring.io/projects/spring-boot">
    <img src="https://img.shields.io/badge/Spring%20Boot-2.x-6DB33F?style=flat-square&logo=spring-boot" alt="Spring Boot">
  </a>
  <a href="https://redis.io/">
    <img src="https://img.shields.io/badge/Redis-6.x-DC382D?style=flat-square&logo=redis" alt="Redis">
  </a>
</p>

<p align="center">
  <a href="https://www.elastic.co/">
    <img src="https://img.shields.io/badge/Elasticsearch-7.x-005571?style=flat-square&logo=elasticsearch" alt="Elasticsearch">
  </a>
  <a href="https://www.rabbitmq.com/">
    <img src="https://img.shields.io/badge/RabbitMQ-3.x-FF6600?style=flat-square&logo=rabbitmq" alt="RabbitMQ">
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API">
    <img src="https://img.shields.io/badge/WebSocket-✓-brightgreen?style=flat-square&logo=socket.io" alt="WebSocket">
  </a>
</p>

<p align="center">
  <a href="https://github.com/your-username/fishblog/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&logo=github" alt="PRs Welcome">
  </a>
  <a href="https://github.com/your-username/fishblog/stargazers">
    <img src="https://img.shields.io/badge/Stars-⭐⭐⭐⭐⭐-yellow?style=flat-square&logo=github" alt="Stars">
  </a>
  <a href="https://github.com/your-username/fishblog/network/members">
    <img src="https://img.shields.io/badge/Forks-🍴-blue?style=flat-square&logo=git-fork" alt="Forks">
  </a>
</p>

</div>
## ✨ 项目简介

**FishBlog** 是一款基于 Spring Boot + Vue.js 的前后端分离博客系统模板，设计优雅、功能齐全。采用 ByteMD 编辑器提供流畅的写作体验，支持 RSS 订阅、邮件提醒、实时聊天室、多种社交平台登录、友情链接管理、看板娘、音乐播放器、自定义鼠标样式等丰富功能。您可以在此基础上进行任意 DIY 定制，快速打造专属于您的个性化博客空间，展示您的创意和知识。

> 💡 完全开源、简单易用、美观大方，随机diy， 让您的博客与众不同！

## 🔨 技术栈

<table>
  <tr>
    <td>
      <strong>🖥️ 后端</strong>
    </td>
    <td>
      <strong>🎨 前端</strong>
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Spring Boot</li>
        <li>Spring Security</li>
        <li>Spring Data JPA</li>
        <li>MyBatis Plus</li>
        <li>Redis</li>
        <li>RabbitMQ</li>
        <li>MySQL</li>
        <li>Elasticsearch</li>
        <li>Swagger</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Vue.js</li>
        <li>Element UI</li>
        <li>Axios</li>
        <li>Vuex</li>
        <li>Vue Router</li>
      </ul>
    </td>
  </tr>
</table>

## 🎯 功能特性

<div align="center">
  <table>
    <tr>
      <td>🎨 美观的响应式界面设计</td>
      <td>📝 Markdown文章编辑器</td>
      <td>🔍 全文搜索功能</td>
    </tr>
    <tr>
      <td>🖼️ 文章封面图上传</td>
      <td>🏷️ 标签、分类管理</td>
      <td>📊 站点访问统计</td>
    </tr>
    <tr>
      <td>🔐 角色权限管理</td>
      <td>💬 留言与评论功能</td>
      <td>🔧 多种登录方式</td>
    </tr>
  </table>
</div>

## 🏗️ 项目结构

```
FishBlog
├── blog-springboot    // 🖥️ 博客后端 (Spring Boot)
├── blog-vue           // 🎨 博客前端
│   ├── admin          // ⚙️ 后台管理系统 (Vue.js + Element UI)
│   └── blog           // 🌐 前台展示页面 (Vue.js)
└── blog-mysql8.sql    // 📦 数据库文件
```

## 🚀 快速开始

### 1️⃣ 数据库配置

<details>
<summary>展开查看详情</summary>

1. 创建MySQL数据库: `blog`
2. 导入数据库文件: `blog-mysql8.sql`

</details>

### 2️⃣ 后端配置

<details>
<summary>展开查看详情</summary>

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

</details>

### 3️⃣ 前端配置

<details>
<summary>展开查看详情</summary>

#### 🔧 后台管理系统

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

#### 🌐 前台页面

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

</details>

## 👤 默认账户

<div align="center">

| 用户名 | 密码 |
|:------:|:------:|
| admin@163.com | 123456 |

</div>

> ⚠️ **安全提示:** 请在部署后立即修改默认密码！

## ⚠️ 注意事项

- ✅ 请确保您已修改所有默认密码和API密钥
- ✅ 生产环境部署时请使用`application-prod.yml`配置文件
- ✅ 建议启用HTTPS以保护您的数据
- ✅ 定期备份您的数据库

## 🔧 自定义

您可以根据自己的需求对模板进行自定义，包括但不限于:

- 🎨 修改页面主题和样式
- ➕ 添加新的功能模块
- 🔌 集成其他第三方服务
- ⚡ 优化性能和安全性

## 🤝 贡献指南

### Fork & DIY

欢迎 Fork 本项目来创建和定制您自己的个人博客！步骤如下：

1. 点击右上角的 "Fork" 按钮
2. 克隆您 Fork 的仓库到本地
3. 按照 [快速开始](#-快速开始) 部署您的博客
4. 根据您的需求进行个性化定制
5. 提交并推送您的更改到您的仓库

> ⚠️ **重要提醒：** 在部署和提交代码前，请确保删除所有个人敏感信息，包括但不限于：邮箱地址、密码、API密钥、个人照片等。

### 提交 Pull Request

我们非常欢迎您为 FishBlog 做出贡献！如果您有任何改进或新功能，请按以下步骤提交 PR：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加了一些很棒的特性'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

#### PR 规范

为了让维护者更好地理解您的贡献，请在 PR 标题和描述中包含以下信息：

- 使用前缀：`[修复]`、`[功能]`、`[优化]`、`[文档]` 等
- 简洁明了地描述您所做的更改
- 提供更改的原因或背景（如适用）

**示例**：
- `[修复] 修复移动端评论列表显示不正确的问题`
- `[功能] 添加暗黑模式主题切换功能`
- `[优化] 提升文章加载性能`

## 📝 Todo 列表

以下是我们计划添加的功能：

- [ ] Markdown 编辑器主题切换
- [ ] 更多 UI 风格和主题美化
- [ ] 用户数据绑定（多平台账号关联）
- [ ] 评论回复邮件通知功能
- [ ] 更多的第三方登录集成
- [ ] 国际化支持

欢迎贡献代码实现上述功能！

## 📜 许可证

本项目使用Apache-2.0许可证 - 详见[LICENSE](LICENSE)文件

---

<div align="center">
  <sub>Built with ❤️ by Yunfeng Yu</sub>
</div>





