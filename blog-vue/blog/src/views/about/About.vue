<template>
  <div>
    <!-- 顶部banner -->
    <div class="about-banner banner">
      <h1 class="banner-title">个人简历</h1>
    </div>

    <!-- 简历内容 -->
    <v-card class="blog-container resume-container">
      <!-- 两列布局 -->
      <div class="resume-layout">
        <!-- 左侧列：个人基本信息 -->
        <div class="left-column">
          <!-- 头像 -->
          <div class="avatar-wrapper">
            <v-avatar size="150" class="my-avatar">
              <img
                class="author-avatar"
                :src="require('@/assets/img/me.jpg')"
                style="object-fit: cover; width: 100%; height: 100%;"
              />
            </v-avatar>
            <div class="name-title">
              <h2>Mayond</h2>
              <p>后端Java开发/测试开发</p>
            </div>
          </div>

          <!-- 联系方式 -->
          <div class="info-section">
            <h2 class="section-title">联系方式</h2>
            <ul class="info-list">
              <li>
                <v-icon small color="#49b1f5">mdi-phone</v-icon> 电话:
                17364563687
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-wechat</v-icon> 微信:
                Auroral_Blog
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-qqchat</v-icon> QQ: 123****456
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-email</v-icon> E-mail:
                auroral@example.com
              </li>
            </ul>
          </div>

          <v-divider class="my-divider"></v-divider>

          <!-- 个人信息 -->
          <div class="info-section">
            <h2 class="section-title">个人信息</h2>
            <ul class="info-list">
              <li>
                <v-icon small color="#49b1f5">mdi-account</v-icon> 男 / 2003
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-school</v-icon> 本科 /
                浙江某知名大学
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-star</v-icon> 专业排名: 前5%
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-web</v-icon> 技术博客:
                <a href="https://blog.csdn.net/Nico114514535" target="_blank"
                  >https://blog.csdn.net/Nico114514535</a
                >
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-github</v-icon> Github:
                <a href="http://github.com/xzy03" target="_blank"
                  >http://github.com/xzy03</a
                >
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-code-tags</v-icon> 期望职位:
                后端Java开发/测试开发工程师
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-cash</v-icon> 期望薪资:
                税前月薪 10k-15k，特别喜欢的公司可例外
              </li>
              <li>
                <v-icon small color="#49b1f5">mdi-map-marker</v-icon> 期望城市:
                杭州
              </li>
            </ul>
          </div>

          <v-divider class="my-divider"></v-divider>

          <!-- 校园经历 -->
          <div class="info-section">
            <h2 class="section-title">校园经历</h2>
            <div class="campus-experience">
              <div class="experience-item">
                <div class="experience-title">
                  <v-icon color="#49b1f5">mdi-account-group</v-icon>
                  <strong>院志愿者协会副会长</strong>
                </div>
                <div class="experience-time">2023年9月-2024年6月</div>
                 <div class="experience-brief">负责志愿活动的整体策划与组织，主动与校内外合作单位、参与同学沟通协调，完成志愿者招募与分工安排，统筹工时统计与发放，保障活动顺利进行。</div>
              </div>
              <div class="experience-item">
                <div class="experience-title">
                  <v-icon color="#49b1f5">mdi-tennis</v-icon>
                  <strong>印象工大文案部副部长</strong>
                </div>
                <div class="experience-time">2023年9月-2024年6月</div>
                 <div class="experience-brief">负责与作者就内容方向与表达进行沟通，修改润色宣传文案，提升传播效果，并协调发布流程。多篇文章在“印象工大”公众号平台阅读量破千。
                 </div>
              </div>
<!--              <div class="experience-item">-->
<!--                <div class="experience-title">-->
<!--                  <v-icon color="#49b1f5">mdi-account-tie</v-icon>-->
<!--                  <strong>校园网络中心技术组组长</strong>-->
<!--                </div>-->
<!--                <div class="experience-time">2018年9月-2019年9月</div>-->
<!--                &lt;!&ndash; <div class="experience-brief">负责收集和解决学生生活问题，推动校园设施改善</div> &ndash;&gt;-->
<!--              </div>-->
            </div>
          </div>

          <v-divider class="my-divider"></v-divider>

          <!-- 获奖经历 -->
          <div class="info-section">
            <h2 class="section-title">获奖荣誉</h2>
            <ul class="award-list">
              <li>
                <v-icon small color="gold">mdi-medal</v-icon>
                <span>第十五届中国大学生服务外包创新创业大赛全国赛三等奖</span>
              </li>
              <li>
                <v-icon small color="gold">mdi-medal</v-icon>
                <span>十五届全国大学生数学竞赛二等奖</span>
              </li>
              <li>
                <v-icon small color="gold">mdi-medal</v-icon>
                <span>十六届全国大学生数学竞赛三等奖</span>
              </li>
              <li>
                <v-icon small color="silver">mdi-medal</v-icon>
                <span>浙江省高等数学竞赛一等奖</span>
              </li>
              <li>
                <v-icon small color="silver">mdi-medal</v-icon>
                <span>2023-2024院优秀团干</span>
              </li>
              <li>
                <v-icon small color="silver">mdi-medal</v-icon>
                <span>2022-2023院优秀团员</span>
              </li>
              <li>
                <v-icon small color="silver">mdi-medal</v-icon>
                <span>2023 2024校单项学习三等奖</span>
              </li>
              <li>
                <v-icon small color="silver">mdi-medal</v-icon>
                <span>2023 校社会实践奖学金</span>
              </li>
              <li>
                <v-icon small color="silver">mdi-medal</v-icon>
                <span>计算机软件著作一项</span>
              </li>
<!--              <li>-->
<!--                <v-icon small color="brown">mdi-medal</v-icon>-->
<!--                <span>全国大学生前端开发大赛三等奖</span>-->
<!--              </li>-->
            </ul>
          </div>

          <v-divider class="my-divider"></v-divider>

          <!-- 技能清单 -->
          <div class="info-section">
            <h2 class="section-title">个人优势</h2>
            <div class="skills-container">
              <ul class="skills-list">
                <li>
                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>
                  熟悉Java等编程语言，了解JavaScript，C++，C#等；
                </li>
                <li>
                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>
                  较丰富的项目经验，担任过不同角色，参与开发或主导了Java后端程序和Vue的前端，熟悉springboot的框架和Mybatis；
                </li>
                <li>
                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>
                  熟悉主流的数据库MySQL、OpenGauss，对Redis有一定的了解
                </li>
                <li>
                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>
                  熟悉如何使用git工具管理代码与合作，有过大项目的开发经验
                </li>
                <li>
                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>
                  有较好的自学能力和团队协作能力；
                </li>
<!--                <li>-->
<!--                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>-->
<!--                  关系型数据库： MySQL/PostgreSQL-->
<!--                </li>-->
<!--                <li>-->
<!--                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>-->
<!--                  NOSQL： MongoDB/Redis-->
<!--                </li>-->
<!--                <li>-->
<!--                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon>-->
<!--                  虚拟化： Docker/Kubernetes-->
<!--                </li>-->
<!--                <li>-->
<!--                  <v-icon small color="#49b1f5">mdi-circle-small</v-icon> 系统：-->
<!--                  Linux/MacOS/Windows-->
<!--                </li>-->
              </ul>
            </div>
          </div>

          <v-divider class="my-divider"></v-divider>

          <!-- 证书 -->
          <div class="info-section">
            <h2 class="section-title">证书</h2>
            <div class="certificate-list">
              <div class="certificate-item">
                <v-icon small color="#49b1f5">mdi-certificate</v-icon>
                <span>英语六级</span>
              </div>

<!--              <div class="certificate-item">-->
<!--                <v-icon small color="#49b1f5">mdi-certificate</v-icon>-->
<!--                <span>软件设计师中级</span>-->
<!--              </div>-->
<!--              <div class="certificate-item">-->
<!--                <v-icon small color="#49b1f5">mdi-certificate</v-icon>-->
<!--                <span>前端开发工程师认证</span>-->
<!--              </div>-->

<!--              <div class="certificate-item">-->
<!--                <v-icon small color="#49b1f5">mdi-certificate</v-icon>-->
<!--                <span>计算机二级</span>-->
<!--              </div>-->
<!--              <div class="certificate-item">-->
<!--                <v-icon small color="#49b1f5">mdi-certificate</v-icon>-->
<!--                <span>AWS云计算认证</span>-->
<!--              </div>-->
<!--              <div class="certificate-item">-->
<!--                <v-icon small color="#49b1f5">mdi-certificate</v-icon>-->
<!--                <span>计算机三级</span>-->
<!--              </div>-->

              <div class="certificate-item">
                <v-icon small color="#49b1f5">mdi-certificate</v-icon>
                <span>软件著作权（一项）</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧列：工作经历和项目 -->
        <div class="right-column">
          <!-- 开源项目经历 -->
          <div class="info-section">
            <div class="project-title-container">
              <div class="project-title-line"></div>
              <h2 class="project-title">项目经历</h2>
              <div class="project-title-line"></div>
            </div>
            <!-- 项目一 -->
            <div class="project-card">
              <div class="project-header">
                <h3>大学生合租和与房源管理系统</h3>
                <div class="project-role">
                  <span class="date-tag">2024.11 - 2025.01</span>
                </div>
                <a
                  href="https://github.com/xzy03/JavaEE"
                  target="_blank"
                  class="project-link"
                >
                  <v-icon small>mdi-github</v-icon> GitHub
                </a>
              </div>
              <div class="project-content">
                <ul class="project-points">
                  <li>
                    <strong>项目角色：</strong>
                    整体架构和负责后端开发
                  </li>
                  <li>
                    <strong>项目描述：</strong>
                    该系统基于 Spring Boot 和 MyBatis Plus 搭建分层架构，以 JWT 实现登录权限控制。系统具备身份认证（人工审核）、合同签订功能。大学生能查看合租租客信息、预约看房；房东可认证房产证，管理房源。此外，借助图床实现房源图片的动态保存，让房源展示更直观，打造安全、便捷、高效的合租与房源管理平台。
                  </li>
<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        构建完整用户体系，实现多样化登录体验（账号密码/手机验证码）和基于阿里云OSS的个人信息管理-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发商品与分类管理模块，支持多级树形分类结构、批量导入导出和智能库存关联机制-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        设计购物车和订单管理系统，实现实时价格计算和多种支付方式集成-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        实现基于用户行为的个性化推荐系统，提升用户购物体验和转化率-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发数据可视化模块，为管理员提供销售趋势、用户行为和库存状态等多维度分析-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
                </ul>
              </div>
              <div class="tech-stack">
<!--                <span class="tech-tag">Vue 3</span>-->
                <span class="tech-tag">Spring Boot</span>
<!--                <span class="tech-tag">Element Plus</span>-->
                <span class="tech-tag">JWT</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">MyBatis Plus</span>
                <span class="tech-tag">Redis</span>
              </div>
            </div>

            <!-- 项目二 -->
            <div class="project-card">
              <div class="project-header">
                <h3>ChatMindAI-AIGC</h3>
                <div class="project-role">
                  <span class="date-tag">2024.10 - 至今</span>
                </div>
                <a
                  href="https://x.chatmindai.net/explore"
                  target="_blank"
                  class="project-link"
                >
                  <v-icon small>mdi-web</v-icon> ChatMindAI
                </a>
              </div>
              <div class="project-content">
                <ul class="project-points">
                  <li>
                    <strong>项目角色：</strong>
                    后端重构
                  </li>
                  <li>
                    <strong>项目描述：</strong>
                    基于主流AI框架（如GPT-4、Claude）进行多模型集成与微调，构建领域专用工具链，支持用户通过RESTful API调用角色化AI服务。采用微服务化改造，集成服务注册发现（Nacos）。
                  </li>

<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        设计并实现基于 JWT 和 Redis 的权限认证体系，支持 Token-->
<!--                        自动续期和失效机制，提高系统安全性-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发完整文章管理模块，实现文章的添加、修改、删除、分页查询和文章分类等全面功能-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        集成阿里云 OSS-->
<!--                        实现安全高效的文件上传与存储，支持图片等多种格式文件处理-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        基于 Pinia-->
<!--                        构建前端状态管理方案，实现持久化状态管理，优化组件通信和数据流转效率-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        采用 Controller-Service-Mapper-->
<!--                        分层架构设计后端系统，使用 ThreadLocal 实现资源管理，MD5-->
<!--                        加密用户密码保证安全性-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
                </ul>
              </div>
              <div class="tech-stack">
                <span class="tech-tag">Spring Boot</span>
                <span class="tech-tag">Vue3</span>
                <span class="tech-tag">Redis</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">MyBatis</span>
                <span class="tech-tag">JWT</span>
<!--                <span class="tech-tag">阿里云OSS</span>-->
              </div>
            </div>

            <!-- 项目三 -->
            <div class="project-card">
              <div class="project-header">
                <h3>AI+赋能笔记软件</h3>
                <div class="project-role">
                  <span class="date-tag">2024.12 - 2025.04</span>
                </div>
                <a
                  href="https://github.com/BearKingF/blinko_ai"
                  target="_blank"
                  class="project-link"
                >
                  <v-icon small>mdi-github</v-icon> GitHub
                </a>
              </div>
              <div class="project-content">
                <ul class="project-points">
                  <li>
                    <strong>项目角色：</strong>
                    AI功能的实现和后端开发
                  </li>
                  <li>
                    <strong>项目描述：</strong
                    >使用AI工具提升了笔记软件的辅助功能，仿照谷歌的learn about实现学习助手功能，支持多模态文件，对于回答形式多样，包括各种图表、有交互组件、思考题，还支持将某篇笔记转化成思维导图，引入艾宾浩斯曲线智能安排复习方案。主要用到的技术框架是React Native、Next.js 、Next.js API Routes + tRPC。
                  </li>
<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        使用 Rust 开发高性能文件处理核心，通过 WebAssembly-->
<!--                        与前端交互，实现 10 秒内处理 5000+ 文件的高效性能-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        设计并实现多样化的文件处理策略，包括重命名、格式转换、批量压缩和内容提取等功能-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发操作回退保护机制和实时预览功能，实现撤销/重做功能，提高用户操作安全性和便捷性-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        通过 Tauri 和 Electron 实现跨平台打包部署，覆盖-->
<!--                        Windows、macOS 和 Linux-->
<!--                        系统，并提供网页版本实现无需安装的即时使用-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        采用虚拟化表格技术优化内存使用，确保在处理大量文件时保持流畅体验，并实现条件过滤和批处理选项等高级功能-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
                </ul>
              </div>
              <div class="tech-stack">
                <span class="tech-tag">React Native</span>
                <span class="tech-tag">TypeScript</span>
<!--                <span class="tech-tag">Element Plus</span>-->
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">tRPC</span>
                <span class="tech-tag">跨平台</span>
              </div>
            </div>

            <!-- 项目四 -->
            <div class="project-card">
              <div class="project-header">
                <h3>校园预约进校系统</h3>
                <div class="project-role">
                  <span class="date-tag">2024.03 - 2024.07</span>
                </div>
                <a
                  href="https://github.com/xzy03/CampusQRcode"
                  target="_blank"
                  class="project-link"
                >
                  <v-icon small>mdi-github</v-icon> GitHub
                </a>
              </div>
              <div class="project-content">
                <ul class="project-points">
                  <li>
                    <strong>项目角色：</strong>整体架构
                  </li>
                  <li>
                    <strong>项目描述：</strong
                    >本系统为基于 Java Web 开发的校园预约进校系统。校外人员可通过社会公众进校预约通道的二维码登记提交申请，系统自动审核，审核通过后生成进校通行码。系统涵盖手机端和后台管理端。手机端供用户申请二维码、查看预约记录与预约二维码；后台管理端则方便学校各部门管理员查询和审核预约信息，提升校园人员进出管理的效率与安全性。采用MVC的架构进行开发。
                  </li>

<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        设计并实现实时数据可视化模块，包括时间追踪和工作效率分析，为用户提供直观的工作状态反馈-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发专业的任务管理和番茄工作法计时器，帮助用户优化工作流程和提升效率-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        构建跨进程安全机制，解决系统监控与应用隔离问题，确保数据隐私安全-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        实现多语言本地化支持（中英日韩等）和主题切换功能，提供全球化和个性化的用户体验-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
                </ul>
              </div>
              <div class="tech-stack">
                <span class="tech-tag">JavaWeb</span>
                <span class="tech-tag">MVC</span>
<!--                <span class="tech-tag">数据可视化</span>-->
              </div>
            </div>

            <!-- 项目五 -->
            <div class="project-card">
              <div class="project-header">
                <h3>井盖隐患智能识别</h3>
                <div class="project-role">
                  <span class="date-tag">2023.12 - 2024.04</span>
                </div>
<!--                <a-->
<!--                  href="https://github.com/Auroral/browser-extension"-->
<!--                  target="_blank"-->
<!--                  class="project-link"-->
<!--                >-->
<!--                  <v-icon small>mdi-github</v-icon> GitHub-->
<!--                </a>-->
              </div>
              <div class="project-content">
                <ul class="project-points">
                  <li>
                    <strong>项目角色：</strong
                    >前端的调整以及模型的微调
                  </li>
                  <li>
                    <strong>项目描述：</strong
                    >本项目运用 AI 技术攻克传统难题，采用 YOLOv9 算法，搭配图像预处理手段，精准识别井盖隐患状态。经优化，审核管理人员工作效率、质量大幅提升，以低成本、高效能的方式，为城市道路安全筑牢防线。主要技术框架是Vue。
                  </li>

<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        基于 TensorFlow.js 构建 AI-->
<!--                        智能分析系统，实现网页内容自动识别与分类，并通过用户行为持续优化准确度-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发极速内容检索功能，集成模糊匹配搜索引擎和快捷键唤醒系统，提供即时响应的搜索体验-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        实现智能资源管理机制，持续监控浏览器资源占用，优化页面加载速度和响应性能-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        设计会话管理系统，支持工作状态的保存、编辑与恢复，优化多任务工作流程，提升用户生产力-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
                </ul>
              </div>
              <div class="tech-stack">
                <span class="tech-tag">Vue</span>
                <span class="tech-tag">yolov9</span>
<!--                <span class="tech-tag">Chrome Extension</span>-->
              </div>
            </div>

            <!-- 项目六 -->
<!--            <div class="project-card">-->
<!--              <div class="project-header">-->
<!--                <h3>智能聊天应用</h3>-->
<!--                <div class="project-role">-->
<!--                  <span class="date-tag">2021.10 - 2021.11</span>-->
<!--                </div>-->
<!--                <a-->
<!--                  href="https://github.com/Auroral/smart-chat"-->
<!--                  target="_blank"-->
<!--                  class="project-link"-->
<!--                >-->
<!--                  <v-icon small>mdi-github</v-icon> GitHub-->
<!--                </a>-->
<!--              </div>-->
<!--              <div class="project-content">-->
<!--                <ul class="project-points">-->
<!--                  <li>-->
<!--                    <strong>项目描述：</strong-->
<!--                    >功能齐全的在线聊天应用，集成大语言模型与文明聊天环境维护，提供安全、智能、个性化的聊天体验。-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <strong>技术栈：</strong>HTML5、CSS3、JavaScript、Java-->
<!--                    (Spring Boot)、MySQL、ChatGPT API、WebSocket、Nginx-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        设计完善的用户注册与登录系统，实现严格的注册信息校验、动态美化界面和密码错误尝试限制-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        基于 WebSocket-->
<!--                        构建实时通信架构，支持公聊与私聊分离、表情包发送和多格式聊天记录导出(TXT、CSV、Excel)-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发文明聊天维护系统，实现敏感词动态屏蔽、提示或替换功能，支持多种文件格式的上传、显示与下载-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        集成多种大语言模型，提供智能辅助聊天和自动回复功能-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        实现管理员管理模块，支持动态维护屏蔽词库、查看管理用户信息和聊天记录-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--              <div class="tech-stack">-->
<!--                <span class="tech-tag">Spring Boot</span>-->
<!--                <span class="tech-tag">JavaScript</span>-->
<!--                <span class="tech-tag">MySQL</span>-->
<!--                <span class="tech-tag">大语言模型</span>-->
<!--                <span class="tech-tag">WebSocket</span>-->
<!--              </div>-->
<!--            </div>-->

            <!-- 项目七 -->
<!--            <div class="project-card">-->
<!--              <div class="project-header">-->
<!--                <h3>健身管理系统</h3>-->
<!--                <div class="project-role">-->
<!--                  <span class="date-tag">2021.09 - 2021.10</span>-->
<!--                </div>-->
<!--                <a-->
<!--                  href="https://github.com/Auroral/fitness-system"-->
<!--                  target="_blank"-->
<!--                  class="project-link"-->
<!--                >-->
<!--                  <v-icon small>mdi-github</v-icon> GitHub-->
<!--                </a>-->
<!--              </div>-->
<!--              <div class="project-content">-->
<!--                <ul class="project-points">-->
<!--                  <li>-->
<!--                    <strong>项目描述：</strong-->
<!--                    >全功能健身管理系统，采用三端分离架构（用户端、管理员端、教练端），提供完整的健身房信息化运营支持，包括用户管理、课程预约、健身计划制定与数据分析等功能。-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <strong>技术栈：</strong>C#、SQL-->
<!--                    Server、IrisSkin4组件库、ADO.NET、Windows Forms-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <strong>功能实现：</strong>-->
<!--                    <ul>-->
<!--                      <li>-->
<!--                        设计三端分离架构，实现用户端、管理员端和教练端各自独立功能模块，满足不同角色的使用需求-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        开发会员管理、课程预约、健身计划制定与跟踪等核心业务模块，实现预约系统和健身数据记录功能-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        使用IrisSkin4组件库设计美观易用的UI界面，提升用户体验和系统易用性-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        构建数据分析与可视化功能，支持会员活跃度、课程热度等多维度数据展示和分析-->
<!--                      </li>-->
<!--                      <li>-->
<!--                        设计高效的数据库结构，包括用户信息表、课程信息表、预约信息表等，实现复杂数据查询和管理操作-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--              <div class="tech-stack">-->
<!--                <span class="tech-tag">C#</span>-->
<!--                <span class="tech-tag">SQL Server</span>-->
<!--                <span class="tech-tag">Windows Forms</span>-->
<!--                <span class="tech-tag">IrisSkin4</span>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </v-card>

    <!-- 添加空白空间，防止内容被看板娘遮挡 -->
    <div class="kanban-spacing"></div>
  </div>
</template>

<script>
export default {
  created() {
    // 可以在这里获取简历数据，如果需要从后端获取
  },
  data: function() {
    return {
      // 这里可以添加简历数据
    };
  },
  methods: {
    // 如果需要从后端获取数据的方法
  }
};
</script>

<style scoped>
.about-banner {
  background: url("@/assets/img/6.jpg") center center / cover
    no-repeat;
  background-color: #49b1f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  position: relative;
}

.banner-title {
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.resume-container {
  padding: 30px;
  margin-top: -50px;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}

/* 两列布局 */
.resume-layout {
  display: flex;
  gap: 30px;
}

.left-column {
  flex: 0 0 30%;
  border-right: 1px solid #eee;
  padding-right: 20px;
}

.right-column {
  flex: 0 0 70%;
  padding-left: 10px;
}

.avatar-wrapper {
  text-align: center;
  padding: 20px 0;
}

.my-avatar {
  border: 3px solid #49b1f5;
  box-shadow: 0 4px 10px rgba(73, 177, 245, 0.3);
  overflow: hidden;
}

.author-avatar {
  transition: all 0.8s;
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
}

.author-avatar:hover {
  transform: rotate(360deg);
}

.name-title {
  margin-top: 15px;
}

.name-title h2 {
  font-size: 24px;
  margin-bottom: 5px;
  color: #333;
}

.name-title p {
  color: #666;
  font-size: 16px;
}

.info-section {
  margin: 25px 0;
}

.section-title {
  color: #49b1f5;
  font-size: 22px;
  margin-bottom: 20px;
  position: relative;
  padding-left: 15px;
  border-left: 4px solid #49b1f5;
}

.info-list {
  list-style: none;
  padding-left: 5px;
}

.info-list li {
  margin-bottom: 12px;
  display: inline-flex;
  flex-wrap: wrap;       /* ✅ 允许内容换行 */
  align-items: center;
}

.info-list li i {
  margin-right: 10px;
  color: #49b1f5;
  min-width: 24px;
}

.info-list a {
  color: #49b1f5;
  text-decoration: none;
}

.info-list a:hover {
  text-decoration: underline;
}

.experience-item {
  margin-bottom: 25px;
}

.experience-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.experience-header i {
  margin-right: 10px;
}

.experience-header h4 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.experience-date {
  color: #777;
  font-size: 14px;
  margin-left: 10px;
  font-style: italic;
}

.experience-points {
  list-style: none;
  padding-left: 5px;
  margin-top: 8px;
}

.experience-points li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

.experience-points li strong {
  color: #333;
  font-weight: 600;
}

.about-me {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 20px;
  text-align: justify;
}

/* 技能评分样式 */
.skill-list {
  padding-left: 5px;
}

.skill-item {
  margin-bottom: 15px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.skill-name {
  font-weight: 500;
  color: #333;
}

.skill-percent {
  color: #666;
  font-size: 14px;
}

.skill-bar {
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background-color: #49b1f5;
  border-radius: 5px;
  transition: width 0.8s ease-in-out;
}

/* 获奖经历样式 */
.awards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.award-category {
  margin-bottom: 10px;
}

.category-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px dashed #eee;
}

.award-list {
  list-style: none;
  padding-left: 5px;
}

.award-list li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 15px;
  color: #333;
}

.award-list li i {
  margin-right: 10px;
  min-width: 20px;
}

/* 证书样式 */
.certificate-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.certificate-item {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.certificate-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.certificate-item i {
  margin-right: 8px;
}

/* 项目卡片样式 */
.project-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-left: 4px solid #49b1f5;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #eaeaea;
}

.project-header h3 {
  font-size: 20px;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: left;
}

.project-role {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  flex: 2;
  margin-bottom: 0;
}

.project-link {
  color: #49b1f5;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.project-link i {
  margin-right: 5px;
}

.role-tag {
  background-color: #49b1f5;
  color: white;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  display: none;
}

.date-tag {
  color: #666;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

.project-points {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
}

.project-points li {
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

.project-points li strong {
  color: #333;
  font-weight: 600;
}

.project-points li ul {
  list-style: none;
  padding-left: 20px;
  margin-top: 5px;
}

.project-points li ul li {
  position: relative;
  padding-left: 15px;
  margin-bottom: 6px;
  font-size: 13px;
}

.project-points li ul li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #49b1f5;
  font-weight: bold;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px dashed #eaeaea;
}

.tech-tag {
  background-color: #e8f4ff;
  color: #49b1f5;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.my-divider {
  margin: 20px 0;
}

/* 底部空间，避免看板娘遮挡内容 */
.kanban-spacing {
  height: 150px;
  width: 100%;
}

/* 响应式布局 */
@media (max-width: 992px) {
  .resume-layout {
    flex-direction: column;
  }

  .left-column {
    flex: 1;
    border-right: none;
    border-bottom: 1px solid #eee;
    padding-right: 0;
    padding-bottom: 20px;
  }

  .right-column {
    flex: 1;
    padding-left: 0;
    padding-top: 20px;
  }

  .resume-container {
    padding: 20px;
    max-width: 95%;
  }

  .kanban-spacing {
    height: 200px;
  }

  .certificate-list {
    flex-direction: column;
  }

  .certificate-item {
    width: 100%;
  }
}

/* 技能清单样式 */
.skills-container {
  padding-left: 5px;
}

.skills-intro {
  margin-bottom: 15px;
  color: #555;
  font-size: 15px;
}

.skills-list {
  list-style: none;
  padding-left: 0;
}

.skills-list li {
  margin-bottom: 12px;
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: flex-start;
  line-height: 1.5;
}

.skills-list li i {
  margin-right: 8px;
  margin-top: 3px;
}

.experience-brief {
  font-size: 14px;
  color: #555;
  margin-top: 5px;
  margin-left: 34px;
}

.experience-title {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.experience-title i {
  margin-right: 10px;
}

.experience-title strong {
  font-size: 16px;
  color: #333;
}

.experience-time {
  color: #777;
  font-size: 14px;
  margin-left: 34px;
  margin-bottom: 5px;
}

.experience-brief {
  font-size: 14px;
  color: #555;
  margin-left: 34px;
  margin-bottom: 15px;
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 这是关键，保持图片比例 */
}

/* 项目标题样式 */
.project-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
}

.project-title {
  color: #49b1f5;
  font-size: 26px;
  font-weight: bold;
  margin: 0 15px;
  padding: 0 10px;
  position: relative;
  z-index: 1;
  text-shadow: 1px 1px 2px rgba(73, 177, 245, 0.2);
}

.project-title-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #49b1f5, transparent);
}

.project-title:before {
  content: "";
  position: absolute;
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
  background-color: #f8fcff;
  border-radius: 4px;
  z-index: -1;
}
</style>
