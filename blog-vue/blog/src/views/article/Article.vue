<template>
  <div>
    <!-- 封面图 -->
    <div class="banner" :style="articleCover">
      <div class="article-info-container">
        <!-- 文章标题 -->
        <div class="article-title">{{ article.articleTitle }}</div>
        <!-- 文章概括 -->
        <div class="article-info">
          <div class="first-line">
            <!-- 发表时间 -->
            <span>
              <i class="iconfont iconrili" />
              发表于 {{ article.createTime | date }}
            </span>
            <span class="separator">|</span>
            <!-- 更新时间 -->
            <span>
              <i class="iconfont icongengxinshijian" />
              更新于
              <template v-if="article.updateTime">
                {{ article.updateTime | date }}
              </template>
              <template v-else>
                {{ article.createTime | date }}
              </template>
            </span>
            <span class="separator">|</span>
            <!-- 文章分类 -->
            <span class="article-category">
              <i class="iconfont iconfenlei1" />
              <router-link :to="'/categories/' + article.categoryId">
                {{ article.categoryName }}
              </router-link>
            </span>
          </div>
          <div class="second-line">
            <!-- 字数统计 -->
            <span>
              <i class="iconfont iconzishu" />
              字数统计: {{ wordNum | num }}
            </span>
            <span class="separator">|</span>
            <!-- 阅读时长 -->
            <span>
              <i class="iconfont iconshijian" />
              阅读时长: {{ readTime }}
            </span>
          </div>
          <div class="third-line">
            <span class="separator">|</span>
            <!-- 阅读量 -->
            <span>
              <i class="iconfont iconliulan" /> 阅读量: {{ article.viewsCount }}
            </span>
            <span class="separator">|</span>
            <!-- 评论量 -->
            <span>
              <i class="iconfont iconpinglunzu1" />评论数:
              <template v-if="count">{{ count }}</template>
              <template v-else>0</template>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <v-row class="article-container">
      <!-- 侧边功能 -->
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div style="position: sticky;top: 20px;">
          <v-card class="right-container toc-card">
            <!-- 侧边标题 -->
            <div class="toc-tabs">
              <div
                  class="tab-item"
                  :class="{ active: activeTab === 'toc' }"
                  @click="activeTab = 'toc'"
              >
                文章目录
              </div>
              <div
                  class="tab-item"
                  :class="{ active: activeTab === 'overview' }"
                  @click="activeTab = 'overview'"
              >
                站点概览
              </div>
            </div>

            <!-- 选择文章目录 -->
            <div v-show="activeTab === 'toc'" class="toc-content">
              <div class="catalog-list">
                <template>
                  <div class="catalog-list">
                    <TocItem
                        v-for="(item, index) in processedTocItems"
                        :key="index"
                        :item="item"
                        :currentIndex="currentIndex"
                        :isExpanded="isExpanded"
                        :handleTocItemClick="handleTocItemClick"
                        :scrollToHeading="scrollToHeading"
                    />
                  </div>
                </template>
              </div>
            </div>

            <!-- 选择站点概览内容 -->
            <div v-show="activeTab === 'overview'" class="site-overview">
              <!-- 基本信息 -->
              <div class="site-author">
                <img
                    class="author-avatar"
                    :src="$store.state.blogInfo.avatar || '../../assets/img/Robot.png'"
                    alt="作者头像"
                />
                <div class="author-name">
                  {{ $store.state.blogInfo.nickname || "Xiao Xiang" }}
                </div>
                <div class="author-description">
                  {{ $store.state.blogInfo.intro || "程序，搞起来很轻松的，就是头冷" }}
                </div>
              </div>
              <!-- 博客状态 -->
              <div class="site-state">
                <div class="site-state-item">
                  <router-link to="/archives">
                    <div class="state-num">
                      {{ $store.state.blogInfo.articleCount || "41" }}
                    </div>
                    <div class="state-name">日志</div>
                  </router-link>
                </div>
                <div class="site-state-item">
                  <router-link to="/categories">
                    <div class="state-num">
                      {{ $store.state.blogInfo.categoryCount || "10" }}
                    </div>
                    <div class="state-name">分类</div>
                  </router-link>
                </div>
                <div class="site-state-item">
                  <router-link to="/tags">
                    <div class="state-num">
                      {{ $store.state.blogInfo.tagCount || "22" }}
                    </div>
                    <div class="state-name">标签</div>
                  </router-link>
                </div>
              </div>
              <!-- 社交链接和版权信息 -->
              <div class="site-social">
                <a
                    href="https://github.com/xzy03"
                    target="_blank"
                    class="social-item"
                >
                  <i class="iconfont icongithub"></i> GitHub
                </a>
                <a href="mailto:17364563687@163.com" class="social-item">
                  <i class="mdi mdi-email"></i> E-Mail
                </a>
                <a
                    href="https://weibo.com/u/7808692733"
                    target="_blank"
                    class="social-item"
                >
                  <i class="iconfont iconweibo"></i> 微博
                </a>
                <a
                    href="https://www.zhihu.com/people/7-37-11-70"
                    target="_blank"
                    class="social-item"
                >
                  <i class="mdi mdi-earth"></i> 知乎
                </a>
                <a
                    href="https://gitee.com/Not_Found_404_114514"
                    target="_blank"
                    class="social-item"
                >
                  <i class="iconfont icongitee-fill-round"></i> Gitee
                </a>
                <a
                    href="https://music.163.com/#/my/m/music/playlist?id=7663433696"
                    target="_blank"
                    class="social-item"
                >
                  <i class="mdi mdi-music"></i> 网易云
                </a>
              </div>

              <div class="site-cc">
                <!-- CC许可证 -->
                <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                    class="license-icon"
                >
                  <img
                      src="https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png"
                      alt="CC BY-NC-SA 4.0"
                  />
                </a>
                <!-- RSS订阅图标 -->
                <a
                    href="/api/rss"
                    target="_blank"
                    class="rss-icon"
                    title="RSS订阅"
                >
                  <img
                      src="@/assets/img/rss.png"
                      alt="RSS Feed"
                      style="height: 31px;"
                  />
                </a>
              </div>

              <div class="site-friends">
                <router-link to="/links">
                  <div class="friends-title">
                    <a href="javascript:;" class="friends-link-title">
                      <i class="mdi mdi-link-variant"></i> 友情链接
                    </a>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- 添加回到顶部彩带 -->
            <back-to-top inSidebar/>
          </v-card>
          <!-- 最新文章 -->
          <v-card class="right-container" style="margin-top:20px">
            <div class="right-title">
              <i class="iconfont icongengxinshijian" style="font-size:16.8px"/>
              <span style="margin-left:10px">最新文章</span>
            </div>
            <div class="article-list">
              <div
                  class="article-item"
                  v-for="item of articleLatestList"
                  :key="item.id"
              >
                <router-link :to="'/articles/' + item.id" class="content-cover">
                  <img :src="item.articleCover"/>
                </router-link>
                <div class="content">
                  <div class="content-title">
                    <router-link :to="'/articles/' + item.id">
                      {{ item.articleTitle }}
                    </router-link>
                  </div>
                  <div class="content-time">{{ item.createTime | date }}</div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
      <!-- 文章内容 -->
      <v-col md="9" cols="12">
        <v-card class="article-wrapper">
          <!-- 使用 ByteMD Viewer 组件替换原来的文章内容渲染 -->
          <article ref="article" class="article-content">
            <div class="markdown-body">
              <Viewer 
                :value="article.articleContent || ''" 
                :plugins="plugins" 
              />
              <!-- <p>{{ article.articleContent }} </p> -->
            </div>
          </article>
          <!-- 文章结束标记 -->
          <div class="passage-end-tag">
            <div>
              --------------- 💖 🌞 本 文 结 束 😚 感 谢 您 的 阅 读 🌞 💖
              ---------------
            </div>
          </div>

          <!-- 打赏支持区域 -->
          <div class="reward-support">
            <div class="reward-title">Buy me a cup of milkshake ☕</div>
            <div class="reward-button">
              <button class="pay-btn" @click="toggleReward">打赏</button>
            </div>
            <div class="reward-qrcode" v-show="showReward">
              <div class="qrcode-item">
                <img src="../../assets/img/mywechatpay.png" alt="微信支付" />
                <div class="state-name">微信</div>
              </div>
              <div class="qrcode-item">
                <img src="../../assets/img/myalipay.jpg" alt="支付宝" />
                <div class="state-name">支付宝</div>
              </div>
            </div>
          </div>

          <!-- 版权声明 -->
          <div class="aritcle-copyright">
            <div>
              <span>本文作者：</span>
              <a href="https://your-domain.com" target="_blank"> Mayond</a>
            </div>
            <div>
              <span>本文链接：</span>
              <a :href="articleHref" target="_blank">{{ articleHref }} </a>
            </div>
            <div>
              <span>版权声明：</span>本博客所有文章除特别声明外，均采用
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                CC BY-NC-SA 4.0
              </a>
              许可协议。转载请注明文章出处。
            </div>
          </div>

          <!-- 文章标签和操作按钮 -->
          <div class="article-tags">
            <div class="tag-container">
              <router-link
                v-for="item of article.tagDTOList"
                :key="item.id"
                :to="'/tags/' + item.id"
                class="tag-item"
              >
                <i class="iconfont iconbiaoqian"></i> {{ item.tagName }}
              </router-link>
            </div>

            <!-- 点赞和分享按钮 -->
            <div class="article-actions">
              <!-- 点赞按钮 -->
              <a :class="isLike" @click="like">
                <v-icon size="16" color="#fff">mdi-thumb-up</v-icon>
                <span>点赞</span>
                <span v-show="article.likeCount > 0" class="like-count">{{
                  article.likeCount
                }}</span>
              </a>

              <!-- 分享按钮 -->
              <div class="share-container">
                <button class="share-trigger" @click="toggleShare">
                  <i class="iconfont iconfenxiang"></i>
                  <span>分享</span>
                </button>

                <div class="share-dropdown" v-show="showShare">
                  <!-- 国内平台 -->
                  <div class="share-section">
                    <h3 class="share-title">国内平台</h3>
                    <div class="share-platforms">
                      <a
                        :href="
                          'https://service.weibo.com/share/share.php?url=' +
                            encodeURIComponent(articleHref) +
                            '&title=' +
                            encodeURIComponent(article.articleTitle)
                        "
                        target="_blank"
                        class="share-item weibo"
                        title="分享到微博"
                      >
                        <div class="icon-wrapper">
                          <img src="../../assets/img/weibo.png" alt="微博" />
                        </div>
                        <span class="platform-name">微博</span>
                      </a>
                      <a
                        href="javascript:;"
                        @click="shareToWechat"
                        class="share-item wechat"
                        title="分享到微信"
                      >
                        <div class="icon-wrapper">
                          <img src="../../assets/img/wexin.png" alt="微信" />
                        </div>
                        <span class="platform-name">微信</span>
                      </a>
                      <a
                        href="javascript:;"
                        @click="shareToQQ"
                        class="share-item qq"
                        title="分享到QQ"
                      >
                        <div class="icon-wrapper">
                          <img src="../../assets/img/qq.png" alt="QQ" />
                        </div>
                        <span class="platform-name">QQ</span>
                      </a>
                      <a
                        href="javascript:;"
                        @click="shareToRedbook"
                        class="share-item redbook"
                        title="分享到小红书"
                      >
                        <div class="icon-wrapper">
                          <img
                            src="../../assets/img/redbook.png"
                            alt="小红书"
                          />
                        </div>
                        <span class="platform-name">小红书</span>
                      </a>
                    </div>
                  </div>

                  <!-- 国际平台 -->
                  <div class="share-section">
                    <h3 class="share-title">国际平台</h3>
                    <div class="share-platforms">
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                            encodeURIComponent(articleHref) +
                            '&text=' +
                            encodeURIComponent(article.articleTitle)
                        "
                        target="_blank"
                        class="share-item twitter"
                        title="分享到Twitter"
                      >
                        <div class="icon-wrapper">
                          <img
                            src="../../assets/img/twitter.png"
                            alt="Twitter"
                          />
                        </div>
                        <span class="platform-name">Twitter</span>
                      </a>
                      <a
                        :href="
                          'https://www.facebook.com/sharer/sharer.php?u=' +
                            encodeURIComponent(articleHref)
                        "
                        target="_blank"
                        class="share-item facebook"
                        title="分享到Facebook"
                      >
                        <div class="icon-wrapper">
                          <img
                            src="../../assets/img/facebook.png"
                            alt="Facebook"
                          />
                        </div>
                        <span class="platform-name">Facebook</span>
                      </a>
                      <a
                        :href="
                          'https://www.linkedin.com/sharing/share-offsite/?url=' +
                            encodeURIComponent(articleHref)
                        "
                        target="_blank"
                        class="share-item linkedin"
                        title="分享到LinkedIn"
                      >
                        <div class="icon-wrapper">
                          <img
                            src="../../assets/img/linkedin.png"
                            alt="LinkedIn"
                          />
                        </div>
                        <span class="platform-name">LinkedIn</span>
                      </a>
                      <a
                        :href="
                          'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' +
                            encodeURIComponent(articleHref) +
                            '&title=' +
                            encodeURIComponent(article.articleTitle)
                        "
                        target="_blank"
                        class="share-item tumblr"
                        title="分享到Tumblr"
                      >
                        <div class="icon-wrapper">
                          <img src="../../assets/img/tumblr.png" alt="Tumblr" />
                        </div>
                        <span class="platform-name">Tumblr</span>
                      </a>
                    </div>
                  </div>

                  <!-- 更多平台 -->
                  <div class="share-section">
                    <h3 class="share-title">更多平台</h3>
                    <div class="share-platforms">
                      <a
                        :href="
                          'https://reddit.com/submit?url=' +
                            encodeURIComponent(articleHref) +
                            '&title=' +
                            encodeURIComponent(article.articleTitle)
                        "
                        target="_blank"
                        class="share-item reddit"
                        title="分享到Reddit"
                      >
                        <div class="icon-wrapper">
                          <img src="../../assets/img/reddit.png" alt="Reddit" />
                        </div>
                        <span class="platform-name">Reddit</span>
                      </a>
                      <a
                        :href="
                          'https://pinterest.com/pin/create/button/?url=' +
                            encodeURIComponent(articleHref) +
                            '&description=' +
                            encodeURIComponent(article.articleTitle)
                        "
                        target="_blank"
                        class="share-item pinterest"
                        title="分享到Pinterest"
                      >
                        <div class="icon-wrapper">
                          <img
                            src="../../assets/img/pinterest.png"
                            alt="Pinterest"
                          />
                        </div>
                        <span class="platform-name">Pinterest</span>
                      </a>
                      <a
                        :href="
                          'mailto:?subject=' +
                            encodeURIComponent(article.articleTitle) +
                            '&body=' +
                            encodeURIComponent(
                              article.articleTitle + '\n\n' + articleHref
                            )
                        "
                        class="share-item email"
                        title="通过Email分享"
                      >
                        <div class="icon-wrapper">
                          <img src="../../assets/img/email.png" alt="邮件" />
                        </div>
                        <span class="platform-name">邮件</span>
                      </a>
                      <a
                        href="javascript:;"
                        @click="copyLink"
                        class="share-item copy"
                        title="复制链接"
                      >
                        <div class="icon-wrapper">
                          <i class="iconfont iconfuzhi"></i>
                        </div>
                        <span class="platform-name">复制链接</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pagination-post">
            <!-- 上一篇 -->
            <div
              :class="isFull(article.lastArticle.id)"
              v-if="article.lastArticle.id"
            >
              <router-link :to="'/articles/' + article.lastArticle.id">
                <img
                  class="post-cover"
                  :src="article.lastArticle.articleCover"
                />
                <div class="post-info">
                  <div class="label">上一篇</div>
                  <div class="post-title">
                    {{ article.lastArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
            <!-- 下一篇 -->
            <div
              :class="isFull(article.nextArticle.id)"
              v-if="article.nextArticle.id"
            >
              <router-link :to="'/articles/' + article.nextArticle.id">
                <img
                  class="post-cover"
                  :src="article.nextArticle.articleCover"
                />
                <div class="post-info" style="text-align: right">
                  <div class="label">下一篇</div>
                  <div class="post-title">
                    {{ article.nextArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 推荐文章 -->
          <div
            class="recommend-container"
            v-if="article.articleRecommendList.length"
          >
            <div class="recommend-title">
              <v-icon size="20" color="#4c4948">mdi-thumb-up</v-icon> 相关推荐
            </div>
            <div class="recommend-list">
              <div
                class="recommend-item"
                v-for="item of article.articleRecommendList"
                :key="item.id"
              >
                <router-link :to="'/articles/' + item.id">
                  <img class="recommend-cover" :src="item.articleCover" />
                  <div class="recommend-info">
                    <div class="recommend-date">
                      <i class="iconfont iconrili" />
                      {{ item.createTime | date }}
                    </div>
                    <div>{{ item.articleTitle }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
          <hr />
          <!-- 评论 -->
          <comment
            :commentList="commentList"
            :count="count"
            @reloadComment="listComment"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- 添加这个 dialog 组件在模板中 -->
    <v-dialog v-model="showWechatDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">微信分享</v-card-title>
        <v-card-text>
          <div class="wechat-share-dialog">
            <p>请使用微信扫一扫以下二维码</p>
            <div id="qrcode-container" class="qrcode-container"></div>
            <p class="wechat-share-tip">或复制链接到微信分享</p>
            <div class="wechat-share-link">{{ articleHref }}</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showWechatDialog = false"
            >关闭</v-btn
          >
          <v-btn color="primary" text @click="copyArticleLink">复制链接</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 添加QQ分享对话框 -->
    <v-dialog v-model="showQQDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">QQ分享</v-card-title>
        <v-card-text>
          <div class="qq-share-dialog">
            <p>请使用手机QQ扫描以下二维码</p>
            <div id="qq-qrcode-container" class="qrcode-container"></div>
            <p class="qq-share-tip">手机QQ扫描二维码，点击右上角···按钮分享到QQ好友或QQ空间</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showQQDialog = false">关闭</v-btn>
          <v-btn color="primary" text @click="copyQQShareLink">复制链接</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 添加小红书分享提示对话框 -->
    <v-dialog v-model="showRedbookDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">分享到小红书</v-card-title>
        <v-card-text>
          <div class="redbook-share-dialog">
            <p>小红书不支持直接分享链接，请按照以下步骤操作：</p>
            <ol class="redbook-steps">
              <li>复制文章链接</li>
              <li>打开小红书APP</li>
              <li>点击底部"+"号创建笔记</li>
              <li>在笔记中粘贴链接并添加您的推荐语</li>
              <li>点击发布完成分享</li>
            </ol>
            <div class="redbook-share-link-container">
              <div class="redbook-share-link">{{ articleHref }}</div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showRedbookDialog = false">关闭</v-btn>
          <v-btn color="primary" text @click="copyArticleLink">复制链接</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 在模板末尾添加 -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { Viewer } from '@bytemd/vue'
import 'bytemd/dist/index.css'
import mermaid from '@bytemd/plugin-mermaid'
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import 'katex/dist/katex.css'

// 导入亮色和深色主题
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
// 导入深色主题，但默认不应用
// import 'highlight.js/styles/github-dark.css'

import Comment from "../../components/Comment"
import BackToTop from "../../components/BackToTop"
import TocItem from "@/components/TocItem.vue";

export default {
  name: 'Article',
  components: {
    Viewer,
    Comment,
    BackToTop,
    TocItem,
  },
  mounted() {
    this.fetchArticle();
    this.listComment();
    this.listNewestArticles();

    // 如果 store 中没有博客信息，则主动获取
    if (!this.$store.state.blogInfo || !this.$store.state.blogInfo.articleCount) {
      this.getBlogInfo();
    }

    // 启动计时器
    this.timer = setInterval(this.runTime, 1000);
    
    // 初始化 mermaid (参考 admin 配置)
    if (typeof mermaidAPI !== 'undefined') {
      mermaidAPI.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'sans-serif',
        themeVariables: {
          primaryColor: '#7C84B8',
          primaryTextColor: '#333',
          primaryBorderColor: '#7C84B8',
          lineColor: '#333',
          secondaryColor: '#EDF2F7',
          tertiaryColor: '#f0f5ff'
        },
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          curve: 'basis'
        }
      });
    }
    
    // 添加代码块复制按钮的初始化
    this.$nextTick(() => {
      this.initCodeCopyButtons();
    });
    
    // 监听 Markdown 主题切换事件
    this.$root.$on('markdown-theme-changed', this.switchMarkdownTheme);
    
    // 初始化检查当前主题
    this.$nextTick(() => {
      this.checkAndApplyTheme();
    });
    
    // 初始化检查当前主题并适配 Mermaid
    this.$nextTick(() => {
      this.checkAndApplyMermaidTheme();
    });
    
    // 监听主题变化事件
    this.$root.$on('theme-changed', this.checkAndApplyMermaidTheme);
  },
  beforeDestroy() {
    // 添加判断，避免 clipboard 为 null 时调用 destroy
    if (this.clipboard) {
      this.clipboard.destroy();
    }
    
    // tocbot 可能也需要同样的检查
    if (typeof tocbot !== 'undefined') {
      tocbot.destroy();
    }

    // 清除计时器
    if (this.timer) {
      clearInterval(this.timer);
    }

    // 清理 observer
    if (this.observer) {
      this.observer.disconnect()
    }

    // 清理滚动事件监听
    window.removeEventListener('scroll', this.handleScroll)
    
    // 移除事件监听
    this.$root.$off('markdown-theme-changed', this.switchMarkdownTheme);
    this.$root.$off('theme-changed', this.checkAndApplyMermaidTheme);
  },
  data: function() {
    return {
      // 配置 ByteMD 编辑器使用的插件及其样式
      plugins: [
        // Mermaid 图表支持
        mermaid({
          theme: 'default' // 使用默认主题
        }),
        // 代码高亮插件
        highlight({
          theme: 'github-dark', // 使用 GitHub 深色主题
          ignore: ['mermaid'] // 忽略 mermaid 代码块的高亮（由 mermaid 插件处理）
        }),
        // GitHub 风格的 Markdown 扩展（GFM）
        gfm({
          style: {
            dark: true // 启用深色主题样式
          }
        }),
        // Frontmatter 支持（用于处理文章元信息）
        frontmatter(),
        // Emoji 表情支持
        gemoji(),
        // 数学公式支持
        math({
          katexOptions: { throwOnError: false } // 不在 KaTeX 解析错误时抛出异常
        }),
        // 图片缩放支持
        mediumZoom()
      ],
      // 存储文章中的图片列表
      imgList: [],
      // 文章对象，包含文章相关信息
      article: {
        // 下一篇文章信息
        nextArticle: {
          id: 0,
          articleCover: ""
        },
        // 上一篇文章信息
        lastArticle: {
          id: 0,
          articleCover: ""
        },
        // 推荐文章列表
        articleRecommendList: []
      },
      // 最新文章列表
      articleLatestList: [],
      // 评论列表
      commentList: [],
      // 评论数量
      count: 0,
      // 文章字数统计
      wordNum: "",
      // 阅读时间估算
      readTime: "",
      // 当前文章分享链接
      articleHref: this.generateShareUrl(),
      // 剪贴板对象（用于复制操作）
      clipboard: null,
      // 是否显示打赏区域
      showReward: false,
      // 是否显示分享菜单
      showShare: false,
      // 是否显示微信分享对话框
      showWechatDialog: false,
      // 是否显示QQ分享对话框
      showQQDialog: false,
      // 当前激活的标签页（用于目录等）
      activeTab: "toc",
      // 运行时间字符串
      time: "",
      // 定时器引用
      timer: null,
      // 目录项列表
      tocItems: [],
      // 当前激活的目录项索引
      currentIndex: null,
      // 存储展开的目录项
      expandedItems: new Set(), // 存储展开的目录项
      // 通知提示框状态
      snackbar: false,
      // 通知提示框文字
      snackbarText: '',
      // 通知提示框颜色
      snackbarColor: 'success',
      // 是否显示小红书分享对话框
      showRedbookDialog: false,
    };
  },
  methods: {

    listComment() {
      // 获取当前路由路径，例如 "/articles/123"
      const path = this.$route.path;

      // 用斜杠 / 分割路径，得到一个数组，例如 ["", "articles", "123"]
      const arr = path.split("/");

      // 获取数组最后一个元素作为文章 ID，例如 "123"
      const articleId = arr[arr.length - 1];

      // 使用 axios 向后端请求评论数据
      this.axios
          .get("/api/comments", {
            // 将当前页码（1）和文章 ID 作为参数传递
            params: { current: 1, articleId: articleId }
          })
          .then(({ data }) => {
            // 请求成功后，将评论列表保存到组件的响应式属性 commentList
            this.commentList = data.data.recordList;
            // 同时保存评论总数，用于分页等功能
            this.count = data.data.count;
          });
    },

    listNewestArticles() {
      this.axios.get("/api/articles/newest").then(({ data }) => {
        this.articleLatestList = data.data;
      });
    },

    like() {
      // 判断用户是否登录，未登录则弹出登录框
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }

      // 创建请求参数并发送点赞请求
      let param = new URLSearchParams();
      param.append("articleId", this.article.id);

      this.axios.post("/api/articles/like", param).then(({ data }) => {
        if (data.flag) {
          // 判断当前文章是否已点赞
          if (this.$store.state.articleLikeSet.indexOf(this.article.id) != -1) {
            // 如果已点赞，则减少点赞数
            this.$set(this.article, "likeCount", this.article.likeCount - 1);
          } else {
            // 如果未点赞，则增加点赞数
            this.$set(this.article, "likeCount", this.article.likeCount + 1);
          }

          // 更新 Vuex 中的点赞状态
          this.$store.commit("articleLike", this.article.id);
        }
      });
    },
    previewImg(img) {
      this.$imagePreview({
        images: this.imgList,
        index: this.imgList.indexOf(img)
      });
    },
    deleteHTMLTag(content) {
      return content
        .replace(/<\/?[^>]*>/g, "")
        .replace(/[|]*\n/, "")
        .replace(/&npsp;/gi, "");
    },

    toggleReward() {
      this.showReward = !this.showReward;
      if (this.showReward) {
        this.showShare = false;
      }
    },
    toggleShare() {
      this.showShare = !this.showShare;
      
      // 如果显示分享菜单，确保它适配当前主题
      if (this.showShare) {
        this.$nextTick(() => {
          const isDarkMode = document.body.classList.contains('theme-dark') || 
                            document.documentElement.getAttribute('data-theme') === 'dark';
          
          const shareDropdown = document.querySelector('.share-dropdown');
          if (shareDropdown) {
            if (isDarkMode) {
              shareDropdown.style.backgroundColor = '#1e1e1e';
              shareDropdown.style.borderColor = '#444444';
              
              // 设置分享项背景
              const shareItems = shareDropdown.querySelectorAll('.share-item');
              shareItems.forEach(item => {
                item.style.backgroundColor = '#333333';
              });
              
              // 设置标题颜色
              const shareTitles = shareDropdown.querySelectorAll('.share-title');
              shareTitles.forEach(title => {
                title.style.color = '#e0e0e0';
                title.style.borderBottomColor = '#444444';
              });
              
              // 设置平台名称颜色
              const platformNames = shareDropdown.querySelectorAll('.platform-name');
              platformNames.forEach(name => {
                name.style.color = '#d4d4d4';
              });
            }
          }
        });
      }
    },
    shareToWechat() {
      this.showWechatDialog = true;

      // 使用 $nextTick 确保 DOM 已更新
      this.$nextTick(() => {
        try {
          if (typeof QRCode !== "undefined") {
            // 如果已有旧的二维码实例，先清空容器
            const qrcodeContainer = document.getElementById("qrcode-container");
            if (qrcodeContainer) {
              qrcodeContainer.innerHTML = "";

              new QRCode(qrcodeContainer, {
                text: this.articleHref,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
              });
            }
          }
        } catch (e) {
          console.error("生成二维码失败", e);
          const qrcodeContainer = document.getElementById("qrcode-container");
          if (qrcodeContainer) {
            qrcodeContainer.innerHTML = `<div class="qrcode-fallback">
              <p>无法生成二维码，请复制链接分享</p>
            </div>`;
          }
        }
      });
    },
    copyLink() {
      const el = document.createElement("textarea");
      el.value = this.articleHref;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$toast({ type: "success", message: "链接已复制到剪贴板" });
    },
    addBookmark() {
      this.$toast({ type: "info", message: "按CTRL+D 键将本页加入书签" });
    },
    runTime() {
      var timeold = new Date().getTime() - new Date("March 26,2025").getTime();
      var msPerDay = 24 * 60 * 60 * 1000;
      var daysold = Math.floor(timeold / msPerDay);
      var str = "";
      var day = new Date();
      str += daysold + "天";
      str += day.getHours() + "时";
      str += day.getMinutes() + "分";
      str += day.getSeconds() + "秒";
      this.time = str;
    },
    async getBlogInfo() {
      try {
        console.log('开始获取博客信息...');
        const response = await this.axios.get("/api/");
        console.log('获取到的响应：', response);
        
        if (response.data.flag) {
          this.$store.commit("checkBlogInfo", response.data.data);
        } else {
          this.$message.error(response.data.message || "获取博客信息失败");
        }
      } catch (error) {
        console.error("获取博客信息接口错误：", {
          message: error.message,
          response: error.response,
          request: error.request,
          config: error.config
        });
        
        const errorMessage = error.response?.data?.message 
          || error.message 
          || '获取博客信息失败';
        this.$message.error(errorMessage);
      }
    },
    generateToc() {
      const content = this.article.articleContent
      if (!content) return

      // 先识别内容中的代码块，将它们标记出来
      const codeBlockRegex = /```[a-z]*\n[\s\S]*?\n```|`[^`]+`/g
      const contentWithoutCodeBlocks = content.replace(codeBlockRegex, match => {
        // 将代码块替换为占位符
        return '_CODE_BLOCK_PLACEHOLDER_'.repeat(match.split('\n').length)
      })

      // 现在只处理非代码块区域的标题
      const headingRegex = /^(#{1,4})\s+(.+)$/gm // 只匹配h1-h4
      const headings = []
      let index = 0
      let match

      while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
        // 检查这一行是否在代码块占位符中
        if (!match[0].includes('_CODE_BLOCK_PLACEHOLDER_')) {
          const level = match[1].length
          const text = match[2].trim()
          const id = `heading-${index}-${this.slugify(text)}`
          
          headings.push({ 
            level,
            text,
            id,
            index: index++,
            children: []
          })
        }
      }

      this.tocItems = headings
      
      this.$nextTick(() => {
        this.addHeadingIds()
        this.initHeadingObserver()
      })
    },

    addHeadingIds() {
      // 等待 Markdown 内容渲染完成
      setTimeout(() => {
        // 只选择内容区域的标题元素（不包括代码块内的文本）
        const headings = document.querySelectorAll('.markdown-body > h1, .markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6')
        
        headings.forEach((heading, index) => {
          const text = heading.textContent.trim()
          // 使用与 generateToc 相同的 ID 生成方式
          const id = `heading-${index}-${this.slugify(text)}`
          heading.id = id
          console.log(`设置标题ID: ${id}, 文本: ${text}, 级别: ${heading.tagName}`)
        })
      }, 500) // 给予一定延时确保内容已渲染
    },

    initHeadingObserver() {
      if (this.observer) {
        this.observer.disconnect()
      }

      // 同样，只观察真正的标题元素
      const headings = document.querySelectorAll('.markdown-body > h1, .markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6')
      
      this.observer = new IntersectionObserver(
        (entries) => {
          // 如果正在进行点击跳转，则不处理滚动观察
          if (this.isScrolling) return

          // 获取所有标题的位置信息
          const allHeadings = Array.from(headings).map(heading => ({
            element: heading,
            rect: heading.getBoundingClientRect(),
            // 计算标题中心点到视口顶部的距离
            distanceFromTop: heading.getBoundingClientRect().top
          }))

          // 找到第一个在视口内的标题（位置为正且最接近顶部的）
          const visibleHeading = allHeadings
            .filter(h => h.distanceFromTop > 0) // 允许标题稍微超出顶部
            .sort((a, b) => Math.abs(a.distanceFromTop) - Math.abs(b.distanceFromTop))[0]

          if (visibleHeading) {
            const index = this.tocItems.findIndex(item => 
              item.id === visibleHeading.element.id
            )
            if (index !== -1 && this.currentIndex !== index) {
              this.currentIndex = index
              console.log('当前标题:', visibleHeading.element.textContent.trim(), '序号:', index)
            }
          }
        },
        {
          root: null,
          rootMargin: '-10% 0px -70% 0px',
          threshold: [0, 0.1, 0.5, 1]
        }
      )

      // 观察所有标题
      headings.forEach(heading => {
        this.observer.observe(heading)
      })

      // 添加滚动事件监听，确保能捕获所有滚动变化
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    },

    handleScroll() {
      if (this.isScrolling) return
      
      const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6')
      
      // 获取所有标题的位置信息
      const allHeadings = Array.from(headings).map(heading => ({
        element: heading,
        rect: heading.getBoundingClientRect(),
        distanceFromTop: heading.getBoundingClientRect().top
      }))

      // 找到第一个在视口内的标题
      const visibleHeading = allHeadings
        .filter(h => h.distanceFromTop > -50)
        .sort((a, b) => Math.abs(a.distanceFromTop) - Math.abs(b.distanceFromTop))[0]

      if (visibleHeading) {
        const index = this.tocItems.findIndex(item => 
          item.id === visibleHeading.element.id
        )
        if (index !== -1 && this.currentIndex !== index) {
          this.currentIndex = index
        }
      }
    },

    scrollToHeading(id) {
      console.log('尝试跳转到:', id)
      const element = document.getElementById(id)
      if (element) {
        // 设置跳转标志
        this.isScrolling = true
        
        // 立即更新当前激活的目录项
        const index = this.tocItems.findIndex(item => item.id === id)
        if (index !== -1) {
          this.currentIndex = index
        }

        // 滚动到目标位置
        const offset = 100
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
        
        // 延迟重置滚动标志，确保滚动完成后再恢复观察
        setTimeout(() => {
          this.isScrolling = false
        }, 500) // 增加延时以确保滚动完成
      }
    },

    slugify(text) {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5 -]/g, '') // 保留中文字符
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    },

    isExpanded(item) {
      // 检查当前项是否展开
      if (!item.hasChildren) return false
      
      // 如果当前激活的是其子项或子项的子项，则展开
      const isChildActive = (children) => {
        return children.some(child => {
          if (this.currentIndex === child.index) return true
          if (child.children && child.children.length) {
            return isChildActive(child.children)
          }
          return false
        })
      }
      
      return isChildActive(item.children) || this.expandedItems.has(item.id)
    },

    handleTocItemClick(item) {
      if (item.hasChildren) {
        // 切换展开状态
        if (this.expandedItems.has(item.id)) {
          this.expandedItems.delete(item.id)
        } else {
          this.expandedItems.add(item.id)
        }
      }
      // 滚动到对应位置
      this.scrollToHeading(item.id)
    },
    
    // 初始化代码块复制按钮
    initCodeCopyButtons() {
      // 在文章内容渲染完成后查找所有代码块
      setTimeout(() => {
        const codeBlocks = document.querySelectorAll('.markdown-body pre');
        if (!codeBlocks.length) return;
        
        codeBlocks.forEach(block => {
          // 如果已经添加了复制按钮，则跳过
          if (block.querySelector('.code-copy-btn')) return;
          
          // 创建复制按钮
          const copyButton = document.createElement('button');
          copyButton.className = 'code-copy-btn';
          copyButton.innerHTML = '<i class="iconfont iconfuzhi"></i>';
          copyButton.title = '复制代码';
          
          // 添加按钮到代码块
          block.style.position = 'relative';
          block.appendChild(copyButton);
          
          // 添加点击事件
          copyButton.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            this.copyToClipboard(code, copyButton);
          });
        });
      }, 1000); // 给予足够的时间让内容渲染完成
    },
    
    // 复制文本到剪贴板
    copyToClipboard(text, button) {
      // 使用 navigator.clipboard API (现代浏览器)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
          .then(() => {
            this.showCopySuccess(button);
          })
          .catch(err => {
            console.error('复制失败:', err);
            this.fallbackCopy(text, button);
          });
      } else {
        // 降级处理
        this.fallbackCopy(text, button);
      }
    },
    
    // 降级复制方法 (用于不支持 Clipboard API 的浏览器)
    fallbackCopy(text, button) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.showCopySuccess(button);
        } else {
          console.error('复制命令执行失败');
        }
      } catch (err) {
        console.error('复制过程中出错:', err);
      }
      
      document.body.removeChild(textarea);
    },
    
    // 显示复制成功的反馈
    showCopySuccess(button) {
      // 更改按钮内容为绿色对号图标
      const originalText = button.innerHTML;
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      button.classList.add('copied');
      
      // 创建一个临时提示元素
      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = '代码已复制到剪贴板';
      document.body.appendChild(toast);
      
      // 显示提示
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      // 两秒后移除提示
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300); // 等待淡出动画完成
      }, 2000);
      
      // 恢复按钮原状
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
      }, 2000);
    },
    
    // 在文章内容变化时重新初始化复制按钮
    handleArticleContentChange() {
      this.$nextTick(() => {
        this.initCodeCopyButtons();
      });
    },
    
    // 计算文章字数（排除代码块、HTML标签等）
    calculateWordCount(content) {
      if (!content) return 0;
      
      let text = content;
      
      // 去除Markdown语法标记，但保留内容
      
      // 去除标题标记
      text = text.replace(/^(#{1,6})\s+(.*?)$/gm, '$2');
      
      // 去除列表标记
      text = text.replace(/^(\*|\-|\+|\d+\.)\s+/gm, '');
      
      // 去除链接语法，保留链接文本
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      
      // 去除图片语法
      text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');
      
      // 去除强调语法
      text = text.replace(/(\*\*|__)(.*?)\1/g, '$2'); // 粗体
      text = text.replace(/(\*|_)(.*?)\1/g, '$2');    // 斜体
      
      // 去除引用符号
      text = text.replace(/^>\s+/gm, '');
      
      // 去除HTML标签
      text = text.replace(/<[^>]*>/g, '');
      
      // 标记数字格式（如日期、版本号等），使它们在后续处理中保持完整
      // 匹配如：2022-12-21、1.0.0、192.168.1.1 等格式
      let markedText = text;
      
      // 先标记包含连字符、点、斜杠的数字格式（日期、IP、版本号等）
      const numericFormats = markedText.match(/\d+([-.\/]\d+)+/g) || [];
      numericFormats.forEach((format, index) => {
        // 用特殊标记替换，确保它们在后续处理中作为整体
        markedText = markedText.replace(format, `__NUM_FORMAT_${index}__`);
      });
      
      // 去除常规标点符号（保留上面标记的数字格式）
      // 中文标点：！？。，、；：""''（）【】《》…—～
      // 英文标点：,.!?;:'"()[]{}<>/-_=+`~@#$%^&*|\\
      const punctuationRegex = /[！？。，、；：""''（）【】《》…—～,.!?;:'"()[]{}<>\/\-_=+`~@#$%^&*|\\]/g;
      markedText = markedText.replace(punctuationRegex, ' ');
      
      // 恢复之前标记的数字格式
      numericFormats.forEach((format, index) => {
        markedText = markedText.replace(`__NUM_FORMAT_${index}__`, format);
      });
      
      // 将多个空白字符压缩为单个空格
      markedText = markedText.replace(/\s+/g, ' ').trim();
      
      // 计算中文字符数（每个汉字算一个字）
      const chineseMatches = markedText.match(/[\u4e00-\u9fa5]/g);
      const chineseCount = chineseMatches ? chineseMatches.length : 0;
      
      // 计算英文单词数（每个单词算一个字）
      const englishMatches = markedText.match(/[a-zA-Z]+/g);
      const englishCount = englishMatches ? englishMatches.length : 0;
      
      // 计算数字格式（含连字符等的完整数字串算一个）
      const dateMatches = markedText.match(/\d+([-.\/]\d+)+/g);
      const dateCount = dateMatches ? dateMatches.length : 0;
      
      // 计算单独的数字（不含连字符等的纯数字）
      const pureNumberMatches = markedText.match(/\b\d+\b/g);
      const pureNumberCount = pureNumberMatches ? pureNumberMatches.length : 0;
      
      // 计算公式数（每个公式算一个字）
      const inlineLatexMatches = content.match(/\$[^\$]+\$/g);
      const blockLatexMatches = content.match(/\$\$[^\$]+\$\$/g);
      const inlineLatexCount = inlineLatexMatches ? inlineLatexMatches.length : 0;
      const blockLatexCount = blockLatexMatches ? blockLatexMatches.length : 0;
      
      // 计算代码块数（每个代码块作为整体计数）
      const codeBlockMatches = content.match(/```[\s\S]*?```/g);
      const codeBlockCount = codeBlockMatches ? codeBlockMatches.length : 0;
      
      // 计算内联代码数
      const inlineCodeMatches = content.match(/`[^`]+`/g);
      const inlineCodeCount = inlineCodeMatches ? inlineCodeMatches.length : 0;
      
      console.log('字数统计详情：', {
        中文字符: chineseCount,
        英文单词: englishCount,
        数字格式: dateCount,
        普通数字: pureNumberCount,
        行内公式: inlineLatexCount,
        块级公式: blockLatexCount,
        代码块: codeBlockCount,
        内联代码: inlineCodeCount
      });
      
      // 总字数：中文字符 + 英文单词 + 数字格式 + 普通数字 + 公式 + 代码
      const totalCount = chineseCount + englishCount + dateCount + pureNumberCount + 
                         inlineLatexCount + blockLatexCount + 
                         codeBlockCount + inlineCodeCount;
      
      return totalCount;
    },
    
    // 计算阅读时间（按照每分钟阅读400字计算）
    calculateReadTime(wordCount) {
      if (!wordCount) return '小于1分钟';
      
      const minutes = Math.ceil(wordCount / 400);
      return minutes <= 1 ? '1分钟' : `${minutes}分钟`;
    },
    
    // 修改 fetchArticle 方法，添加字数统计和阅读时间计算
    async fetchArticle() {
      try {
        console.log('开始获取文章...');
        const { data } = await this.axios.get("/api" + this.$route.path);
        console.log('获取到的文章数据:', data);
        
        if (data.flag && data.data) {
          document.title = data.data.articleTitle;
          this.article = data.data;
          
          // 计算字数和阅读时间
          this.wordNum = this.calculateWordCount(this.article.articleContent);
          this.readTime = this.calculateReadTime(this.wordNum);
          
          // 在文章内容加载完成后，生成目录和添加代码复制按钮
          this.$nextTick(() => {
            this.generateToc();
            this.initCodeCopyButtons();
          });
          
          // 文章加载后更新分享链接
          this.$nextTick(() => {
            this.updateShareUrl();
          });
        } else {
          console.error('获取文章失败:', data.msg);
          this.$toast.error('获取文章失败');
        }
      } catch (error) {
        console.error('获取文章失败:', error);
        this.$toast.error('获取文章失败');
      }
    },
    
    // 切换 Markdown 主题
    switchMarkdownTheme(isDark) {
      // 根据是否为深色模式选择合适的 Markdown 样式
      const markdownContainer = document.querySelector('.markdown-body');
      if (markdownContainer) {
        if (isDark) {
          markdownContainer.classList.add('dark-theme');
        } else {
          markdownContainer.classList.remove('dark-theme');
        }
      }
      
      // 如果使用代码高亮插件，也需要切换其主题
      const codeBlocks = document.querySelectorAll('pre code');
      if (codeBlocks.length && window.hljs) {
        codeBlocks.forEach(block => {
          window.hljs.highlightBlock(block);
        });
      }
    },
    
    // 初始化检查当前主题
    checkAndApplyTheme() {
      const isDark = document.body.classList.contains('theme-dark') || 
                    document.documentElement.getAttribute('data-theme') === 'dark';
      
      // 更新 ByteMD 主题
      const viewerElement = this.$el.querySelector('.markdown-body');
      if (viewerElement) {
        if (isDark) {
          viewerElement.classList.add('bytemd-dark');
          // 强制设置标题颜色
          const headers = viewerElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headers.forEach(header => {
            header.style.setProperty('color', '#ffffff', 'important');
          });
        } else {
          viewerElement.classList.remove('bytemd-dark');
        }
      }
    },
    
    // 检查并应用 Mermaid 主题
    checkAndApplyMermaidTheme() {
      const isDark = document.body.classList.contains('theme-dark') || 
                    document.documentElement.getAttribute('data-theme') === 'dark';
      
      // 查找所有 Mermaid 图表
      const mermaidDivs = document.querySelectorAll('.bytemd-mermaid');
      
      if (mermaidDivs.length && window.mermaid) {
        // 配置 Mermaid
        window.mermaid.initialize({
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          startOnLoad: true,
          themeVariables: isDark ? {
            // 深色主题变量 - 使用与文章背景一致的色值
            primaryColor: '#1e1e1e',
            primaryTextColor: '#ffffff', // 调整为白色
            primaryBorderColor: '#444444',
            lineColor: '#ffffff', // 调整为白色
            secondaryColor: '#1e1e1e',
            tertiaryColor: '#1e1e1e',
            noteTextColor: '#ffffff', // 调整为白色
            noteBkgColor: '#2c2c2c',
            notesBorderColor: '#444444',
            edgeLabelBackground: '#2c2c2c',
            // 序列图特定颜色
            actorBkg: '#2c2c2c',
            actorBorder: '#444444',
            actorTextColor: '#ffffff', // 调整为白色
            actorLineColor: '#ffffff', // 调整为白色
            // 类图特定颜色
            classText: '#ffffff', // 调整为白色
            // 流程图特定颜色
            fillType0: '#2c2c2c',
            fillType1: '#2c2c2c',
            fillType2: '#2c2c2c',
            fillType3: '#2c2c2c',
            fillType4: '#2c2c2c',
            fillType5: '#2c2c2c',
            fillType6: '#2c2c2c',
            fillType7: '#2c2c2c'
          } : {
            // 浅色主题变量 (原来的配置)
            primaryColor: '#7C84B8',
            primaryTextColor: '#333',
            primaryBorderColor: '#7C84B8',
            lineColor: '#333',
            secondaryColor: '#EDF2F7',
            tertiaryColor: '#f0f5ff'
          }
        });
        
        // 重新渲染所有图表
        mermaidDivs.forEach((div, index) => {
          try {
            // 获取图表定义
            const content = div.getAttribute('data-content') || '';
            if (content) {
              // 清空现有内容
              div.innerHTML = '';
              // 重新生成图表ID
              const id = `mermaid-${Date.now()}-${index}`;
              div.id = id;
              // 重新渲染
              window.mermaid.render(id, content, (svgCode) => {
                div.innerHTML = svgCode;
              });
            }
          } catch (error) {
            console.error('Mermaid rendering error:', error);
          }
        });
      }
    },

    // 生成分享链接
    generateShareUrl() {
      const baseUrl = window.location.href;
      const userId = this.$store.state.userInfo ? this.$store.state.userInfo.id : '';
      const userNickname = this.$store.state.userInfo ? this.$store.state.userInfo.nickname : 'anonymous';
      
      // 判断用户具体设备类型
      let deviceType = 'PC';
      const ua = navigator.userAgent;
      
      if (/iPhone/i.test(ua)) {
        deviceType = 'iPhone';
      } else if (/iPad/i.test(ua)) {
        deviceType = 'iPad';
      } else if (/Android/i.test(ua)) {
        if (/Mobile/i.test(ua)) {
          deviceType = 'Android';
        } else {
          deviceType = 'AndroidTablet';
        }
      } else if (/Windows Phone/i.test(ua)) {
        deviceType = 'WindowsPhone';
      } else if (/Mac/i.test(ua)) {
        deviceType = 'Mac';
      } else if (/Windows/i.test(ua)) {
        deviceType = 'Windows';
      } else if (/Linux/i.test(ua)) {
        deviceType = 'Linux';
      }
      
      // 构建类似CSDN的分享链接
      const shareParams = new URLSearchParams();
      shareParams.append('fromshare', 'blogdetail');
      shareParams.append('sharetype', 'blogdetail');
      shareParams.append('sharerId', userId);
      shareParams.append('sharerefer', deviceType);
      shareParams.append('sharesource', userNickname);
      shareParams.append('sharefrom', 'from_link');
      
      // 检查URL是否已有参数
      if (baseUrl.includes('?')) {
        return `${baseUrl}&${shareParams.toString()}`;
      } else {
        return `${baseUrl}?${shareParams.toString()}`;
      }
    },
    
    // 在生命周期或其他适当位置更新 articleHref
    updateShareUrl() {
      this.articleHref = this.generateShareUrl();
    },

    // 在 methods 中添加或修改生成QQ分享链接的方法
    generateQQShareUrl() {
      // 获取基础信息
      const title = encodeURIComponent(this.article.articleTitle || '分享一篇好文章');
      
      // 重要修改：不直接使用articleHref，而是构建一个有效的外部可访问的URL
      // 在实际生产环境中，使用您的实际域名替换localhost
      const currentUrl = window.location.href;
      const urlWithoutProtocol = currentUrl.replace(/^https?:\/\/localhost(:\d+)?/, 'http://your-actual-domain.com');
      const url = encodeURIComponent(urlWithoutProtocol);
      
      const desc = encodeURIComponent(this.article.articleDesc || '');
      const summary = encodeURIComponent(this.article.summary || this.article.articleTitle || '');
      const pic = encodeURIComponent(this.article.articleCover || '');
      const site = encodeURIComponent(this.$store.state.blogInfo.websiteName || '博客分享');
      
      // 使用QQ的官方分享URL格式
      return `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${site}&summary=${summary}&pics=${pic}&desc=${desc}`;
    },

    // 修改分享到QQ的方法
    shareToQQ() {
      // 显示QQ分享弹窗
      this.showQQDialog = true;
      
      // 使用nextTick确保DOM已更新后再生成QR码
      this.$nextTick(() => {
        this.generateQQQRCode();
      });
    },

    // 添加一个生成QQ二维码的方法
    generateQQQRCode() {
      const container = document.getElementById('qq-qrcode-container');
      if (!container) {
        console.error('QQ二维码容器不存在');
        return;
      }
      
      // 清空容器
      container.innerHTML = '';
      
      try {
        // 确保 QRCode 已经引入
        if (typeof QRCode === 'undefined') {
          console.error('QRCode 库未加载');
          // 如果没有加载QRCode，可以尝试动态加载
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.0/build/qrcode.min.js';
          script.onload = () => this.generateQQQRCode();
          document.head.appendChild(script);
          return;
        }
        
        // 生成QQ分享的URL
        const shareUrl = this.generateQQShareUrl();
        console.log('生成QQ分享二维码URL:', shareUrl);
        
        // 生成二维码
        new QRCode(container, {
          text: shareUrl,
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      } catch (error) {
        console.error('生成QQ二维码失败:', error);
        container.innerHTML = '<p style="color:red">生成二维码失败，请尝试直接复制链接</p>';
      }
    },

    // 添加复制QQ分享链接的方法
    copyQQShareLink() {
      const shareUrl = this.generateQQShareUrl();
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          this.snackbarText = 'QQ分享链接已复制到剪贴板';
          this.snackbarColor = 'success';
          this.snackbar = true;
        })
        .catch((err) => {
          console.error('复制失败:', err);
          this.snackbarText = '复制失败';
          this.snackbarColor = 'error';
          this.snackbar = true;
        });
    },

    // 添加分享到小红书的方法
    shareToRedbook() {
      // 显示提示对话框
      this.showRedbookDialog = true;
    },

    // 生成Facebook分享链接
    generateFacebookShareUrl() {
      const url = encodeURIComponent(this.articleHref);
      const title = encodeURIComponent(this.article.articleTitle || '');
      const description = encodeURIComponent(this.article.summary || '');
      const image = encodeURIComponent(this.article.articleCover || '');
      
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}&description=${description}&picture=${image}`;
    },

    // 添加复制文章链接的方法
    copyArticleLink() {
      const link = this.articleHref;
      navigator.clipboard.writeText(link)
        .then(() => {
          this.snackbarText = '文章链接已复制到剪贴板';
          this.snackbarColor = 'success';
          this.snackbar = true;
        })
        .catch((err) => {
          console.error('复制失败:', err);
          this.snackbarText = '复制失败';
          this.snackbarColor = 'error';
          this.snackbar = true;
        });
    },

    // 添加分享到小红书的具体实现
    shareToRedbookApp() {
      // 检测是否为移动设备
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // 尝试打开小红书APP
        window.location.href = 'xhsdiscover://';
        
        // 设置超时，如果APP没打开，显示提示
        setTimeout(() => {
          this.showRedbookDialog = true;
        }, 2000);
      } else {
        // 在PC上直接显示提示
        this.showRedbookDialog = true;
      }
    }
  },
  computed: {
    articleCover() {
      return (
        "background: url(" +
        this.article.articleCover +
        ") center center / cover no-repeat"
      );
    },
    isLike() {
      var articleLikeSet = this.$store.state.articleLikeSet;
      return articleLikeSet.indexOf(this.article.id) != -1
        ? "like-btn-active"
        : "like-btn";
    },
    isFull() {
      return function(id) {
        return id ? "post full" : "post";
      };
    },
    processedTocItems() {
      // 构建树形结构
      const buildTree = (items) => {
        const result = []
        const map = {}
        
        // 首先创建所有节点的映射
        items.forEach(item => {
          map[item.id] = {
            ...item,
            children: [],
            hasChildren: false
          }
        })
        
        // 构建树形结构
        items.forEach(item => {
          const node = map[item.id]
          if (item.level === 1) {
            // 一级标题直接加入结果数组
            result.push(node)
          } else {
            // 找到当前节点的父节点
            const parentLevel = item.level - 1
            let parent = null
            
            // 从当前项往前查找最近的上级标题
            for (let i = items.indexOf(item) - 1; i >= 0; i--) {
              if (items[i].level < item.level) {
                parent = map[items[i].id]
                break
              }
            }
            
            if (parent) {
              parent.children.push(node)
              parent.hasChildren = true
            } else {
              // 如果没有找到父节点，就放在顶层
              result.push(node)
            }
          }
        })
        
        return result
      }

      return buildTree(this.tocItems)
    }
  },
  watch: {
    'article.articleContent': function() {
      this.$nextTick(() => {
        this.initCodeCopyButtons();
      });
    },
    // 监听主题变化
    '$vuetify.theme.dark': {
      handler(isDark) {
        this.checkAndApplyTheme();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.banner:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

/* 文章结束标记样式 */
.passage-end-tag {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin: 15px 0 25px;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.passage-end-tag div {
  font-weight: 500;
  letter-spacing: 1px;
}

/* 打赏区域 */
.reward-support {
  margin: 30px 0;
  text-align: center;
}

.reward-title {
  font-size: 18px;
  margin-bottom: 15px;
}

.reward-button {
  margin-bottom: 15px;
}

.pay-btn {
  background-color: #ff4b2b;
  color: white;
  padding: 8px 30px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 6px rgba(255, 75, 43, 0.4);
}

.pay-btn:hover {
  background-color: #ff6347;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 75, 43, 0.5);
}

.reward-qrcode {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.qrcode-item {
  margin: 0 20px;
}

.qrcode-item img {
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: all 0.3s;
}

.qrcode-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.qrcode-item p {
  margin-top: 8px;
  color: #666;
}

/* 社交平台图标样式 - 使用PNG图标 */
.platform {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  transition: all 0.3s;
  margin: 3px;
  background-color: white;
  overflow: hidden;
}

.platform:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.platform img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* 文章标签 */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  justify-content: space-between;
  align-items: center;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  margin: 5px 10px 5px 0;
  padding: 5px 12px;
  background-color: #f6f6f6;
  border-radius: 15px;
  color: #666;
  font-size: 13px;
  transition: all 0.3s;
}

.tag-item:hover {
  background-color: #49b1f5;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(73, 177, 245, 0.2);
}

.tag-item i {
  margin-right: 3px;
  font-size: 14px;
}

/* 点赞和分享区域 */
.article-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 点赞按钮 */
.like-btn,
.like-btn-active {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 36px;
  padding: 0 15px;
  border-radius: 18px;
  text-align: center;
  font-size: 14px;
  transition: all 0.3s;
  cursor: pointer;
}

.like-btn {
  background: #969696;
  color: #fff !important;
}

.like-btn-active {
  background: #ec7259;
  color: #fff !important;
}

.like-btn:hover,
.like-btn-active:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.like-count {
  margin-left: 5px;
  font-weight: bold;
}

/* 分享容器 */
.share-container {
  position: relative;
}

/* 分享触发按钮 */
.share-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 36px;
  padding: 0 15px;
  border: none;
  border-radius: 18px;
  background: #49b1f5;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.share-trigger:hover {
  background: #3aa0e4;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(73, 177, 245, 0.2);
}

.share-trigger i {
  margin-right: 5px;
  font-size: 16px;
}

/* 分享下拉菜单 */
.share-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  width: 320px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 100;
  animation: fadeIn 0.3s ease-out;
  overflow: hidden;
  padding: 0 0 15px;
}

.share-dropdown:before {
  content: "";
  position: absolute;
  top: -8px;
  right: 20px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}

/* 分享区块 */
.share-section {
  padding: 0 15px;
  margin-bottom: 10px;
}

.share-title {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin: 15px 0 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.share-title:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, #49b1f5, #8fc5e3);
}

/* 平台列表 */
.share-platforms {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* 分享平台项目 */
.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
  border-radius: 10px;
  transition: all 0.3s;
  text-decoration: none;
  color: #666;
}

.share-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-3px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 5px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.icon-wrapper img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.icon-wrapper i {
  font-size: 20px;
  color: #666;
}

.platform-name {
  font-size: 12px;
  margin-top: 5px;
}

/* 平台特定样式 */
.weibo .icon-wrapper {
  background-color: #ffeaea;
}
.wechat .icon-wrapper {
  background-color: #e6ffed;
}
.qq .icon-wrapper {
  background-color: #fff1f0;
}
.twitter .icon-wrapper {
  background-color: #e6f7ff;
}
.facebook .icon-wrapper {
  background-color: #e6f4ff;
}
.linkedin .icon-wrapper {
  background-color: #e6f7ff;
}
.tumblr .icon-wrapper {
  background-color: #f0e6ff;
}
.reddit .icon-wrapper {
  background-color: #fff7e6;
}
.pinterest .icon-wrapper {
  background-color: #fff1f0;
}
.email .icon-wrapper {
  background-color: #f5f5f5;
}
.copy .icon-wrapper {
  background-color: #f5f5f5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .share-dropdown {
    width: 280px;
  }

  .share-platforms {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .share-dropdown {
    width: 260px;
    right: -15px;
  }
}

@media (min-width: 760px) {
  .banner {
    color: #eee !important;
  }
  .article-info span {
    font-size: 95%;
    background-color: transparent !important; /* 强制使用透明背景 */
  }
  .article-info-container {
    position: absolute;
    bottom: 6.25rem;
    padding: 0 8%;
    width: 100%;
    text-align: center;
    background-color: transparent !important; /* 强制使用透明背景 */
  }
  .second-line,
  .third-line {
    display: inline;
  }
  .article-title {
    font-size: 35px;
    margin: 20px 0 8px;
    background-color: transparent !important; /* 强制使用透明背景 */
  }
  .pagination-post {
    display: flex;
  }
  .post {
    width: 50%;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(33.333% - 6px);
    height: 200px;
    background: #000;
    vertical-align: bottom;
  }
}
@media (max-width: 759px) {
  .banner {
    color: #eee !important;
    height: 360px;
  }
  .article-info span {
    font-size: 90%;
  }
  .separator:first-child {
    display: none;
  }
  .blog-container {
    margin: 322px 5px 0 5px;
  }
  .article-info-container {
    position: absolute;
    bottom: 1.3rem;
    padding: 0 5%;
    width: 100%;
    color: #eee;
    text-align: left;
  }
  .article-title {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
  .post {
    width: 100%;
  }
  .pagination-post {
    display: block;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(100% - 4px);
    height: 150px;
    margin: 2px;
    background: #000;
    vertical-align: bottom;
  }
}
.article-content {
  padding: 20px;
}
.article-operation {
  display: flex;
  align-items: center;
}
.article-category a {
  color: #fff !important;
  background-color: transparent !important;
}
.tag-container a {
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0;
  padding: 0 0.75rem;
  width: fit-content;
  border: 1px solid #49b1f5;
  border-radius: 1rem;
  color: #49b1f5 !important;
  font-size: 12px;
  line-height: 2;
}
.tag-container a:hover {
  color: #fff !important;
  background: #49b1f5;
  transition: all 0.5s;
}
.aritcle-copyright {
  position: relative;
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 0.875rem;
  line-height: 2;
  padding: 0.625rem 1rem;
  border: 1px solid #eee;
}
.aritcle-copyright span {
  color: #49b1f5;
  font-weight: bold;
}
.aritcle-copyright a {
  text-decoration: underline !important;
  color: #99a9bf !important;
}
.aritcle-copyright:before {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: #49b1f5;
  content: "";
}
.aritcle-copyright:after {
  position: absolute;
  top: 0.95rem;
  right: 0.95rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5em;
  background: #fff;
  content: "";
}
.pagination-post {
  margin-top: 40px;
  overflow: hidden;
  width: 100%;
  background: #000;
}
.post {
  position: relative;
  height: 150px;
  overflow: hidden;
}
.post-info {
  position: absolute;
  top: 50%;
  padding: 20px 40px;
  width: 100%;
  transform: translate(0, -50%);
  line-height: 2;
  font-size: 14px;
}
.post-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}
.post a {
  position: relative;
  display: block;
  overflow: hidden;
  height: 150px;
}
.post:hover .post-cover {
  opacity: 0.8;
  transform: scale(1.1);
}
.label {
  font-size: 90%;
  color: #eee;
}
.post-title {
  font-weight: 500;
  color: #fff;
}
hr {
  position: relative;
  margin: 40px auto;
  border: 2px dashed #d2ebfd;
  width: calc(100% - 4px);
}
.full {
  width: 100% !important;
}
.right-container {
  padding: 20px 24px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}
.right-title {
  display: flex;
  align-items: center;
  line-height: 2;
  font-size: 16.8px;
  margin-bottom: 6px;
}
.right-title i {
  font-weight: bold;
}
.recommend-container {
  margin-top: 40px;
}
.recommend-title {
  font-size: 20px;
  line-height: 2;
  font-weight: bold;
  margin-bottom: 5px;
}
.recommend-cover {
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}
.recommend-info {
  line-height: 2;
  color: #fff;
  position: absolute;
  top: 50%;
  padding: 0 20px;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
  font-size: 14px;
}
.recommend-date {
  font-size: 90%;
}
.recommend-item:hover .recommend-cover {
  opacity: 0.8;
  transform: scale(1.1);
}
.article-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
}
.article-item:first-child {
  padding-top: 0;
}
.article-item:last-child {
  padding-bottom: 0;
}
.article-item:not(:last-child) {
  border-bottom: 1px dashed #f5f5f5;
}
.article-item img {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
  object-fit: cover;
}
.article-item img:hover {
  transform: scale(1.1);
}
.content {
  flex: 1;
  padding-left: 10px;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.content-cover {
  width: 58.8px;
  height: 58.8px;
  overflow: hidden;
}
.content-title a {
  transition: all 0.2s;
  font-size: 95%;
}
.content-title a:hover {
  color: #2ba1d1;
}
.content-time {
  color: #858585;
  font-size: 85%;
  line-height: 2;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .article-tags {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-actions {
    margin-top: 15px;
    align-self: flex-end;
  }
}

/* 微信分享对话框 */
.wechat-share-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.qrcode-container {
  margin: 20px 0;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.wechat-share-tip {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.wechat-share-link {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #f2f2f2;
  border-radius: 5px;
  font-size: 13px;
  color: #333;
  word-break: break-all;
  max-width: 100%;
  text-align: center;
}

.qrcode-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-link {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #f2f2f2;
  border-radius: 5px;
  font-size: 13px;
  color: #333;
  word-break: break-all;
  max-width: 100%;
}

#toc {
  flex: 1;
  min-height: 100px;
  overflow-y: auto;
  margin: 0;
  padding: 0 0 10px 0;
}

/* 标签页样式 - 亮色主题 */
.toc-tabs {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.tab-item {
  padding: 8px 15px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-item.active {
  color: #ff7e79;
}

.tab-item.active:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff7e79;
}

/* 站点概览样式 - 亮色主题 */
.site-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.site-author {
  text-align: center;
  margin-bottom: 20px;
}

.author-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  object-fit: cover;
}

.author-avatar:hover {
  transform: rotate(360deg);
  transition: transform 1s ease;
}

.author-name {
  font-size: 18px;
  font-weight: 500;
  margin: 15px 0 5px;
  color: #333;
}

.author-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.site-state {
  display: flex;
  margin: 10px 0 20px;
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.site-state-item {
  flex: 1;
  text-align: center;
  padding: 0 10px;
}

.site-state-item:not(:last-child) {
  border-right: 1px solid #eee;
}

.state-num {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.state-name {
  font-size: 13px;
  color: #999;
}

.site-social {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
}

.social-item {
  width: 50%;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  color: #555;
  transition: color 0.3s;
}

.social-item:hover {
  color: #ff7e79;
}

.social-item i {
  margin-right: 5px;
  font-size: 16px;
}

.site-cc {
  margin: 15px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;  /* 增加图标之间的间距 */
  padding: 10px;  /* 添加内边距 */
}

.site-cc a {
  display: inline-block;
  transition: transform 0.3s ease;
}

.site-cc a:hover {
  transform: translateY(-2px);
}

.site-cc img {
  vertical-align: middle;
  height: 31px;  /* 统一图标高度 */
  object-fit: contain;
}

.site-friends {
  width: 100%;
  margin-top: 15px;
  text-align: center;
}

.friends-title {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.friends-title i {
  margin-right: 5px;
}

.friends-links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.friend-link {
  margin: 5px 0;
  padding: 5px 10px;
  color: #555;
  transition: color 0.3s;
}

.friend-link:hover {
  color: #ff7e79;
}

.emoji {
  margin: 0 3px;
}

/* 修改 toc-card 样式，确保高度一致 */
.toc-card {
  padding: 20px 24px 0 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 确保目录内容区域固定高度，避免切换时高度变化 */
#toc,
.site-overview {
  flex: 1;
  min-height: 300px;
  overflow-y: auto;
  padding: 0 0 10px 0;
}

/* 适配深色模式 - 当有深色模式类时启用 */
.theme-dark .toc-tabs {
  border-bottom: 1px solid #444;
}

.theme-dark .tab-item {
  color: #b1b1b3;
}

.theme-dark .author-name {
  color: #ddd;
}

.theme-dark .author-description {
  color: #999;
}

.theme-dark .site-state {
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
}

.theme-dark .site-state-item:not(:last-child) {
  border-right: 1px solid #444;
}

.theme-dark .state-num {
  color: #ddd;
}

.theme-dark .social-item {
  color: #b1b1b3;
}

.theme-dark .friends-title {
  border-bottom: 1px solid #444;
  color: #b1b1b3;
}

.theme-dark .friend-link {
  color: #b1b1b3;
}

.theme-dark .author-avatar {
  border: 2px solid rgba(255, 255, 255, 0.2);
}

/* 网站资讯样式 */
.site-website-info {
  width: 100%;
  margin: 15px 0;
  padding: 15px 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.website-info-title {
  margin-bottom: 10px;
  font-weight: 500;
  color: #666;
}

.website-info-title i {
  margin-right: 5px;
}

.website-info-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

/* 公告样式 */
.site-announcement {
  width: 100%;
  margin: 15px 0;
  padding: 15px 10px;
}

.announcement-title {
  margin-bottom: 10px;
  font-weight: 500;
  color: #666;
}

.announcement-title i {
  margin-right: 5px;
  color: #f00;
  animation: big 0.8s linear infinite;
}

.announcement-content {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

/* 收藏按钮样式 */
.collection-btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  margin: 15px 0;
  width: 100%;
  transition-duration: 1s;
  transition-property: color;
}

.collection-btn:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: "";
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
}

.collection-btn:hover:before {
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transform: scaleX(1);
}

/* 站点状态项目链接样式 */
.site-state-item a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.site-state-item:hover .state-num {
  color: #ff7e79;
}

@keyframes big {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.mermaid {
  margin: 1.5em 0;
  overflow: auto;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  min-height: 50px; /* 确保有最小高度 */
}

/* 深色模式下的 Mermaid 图表样式 */
.theme-dark .mermaid {
  background: #282c34;
  color: #abb2bf;
}

.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 5px 0;
}

.markdown-body .task-list-item {
  list-style-type: none;
}

.markdown-body .task-list-item-checkbox {
  margin-right: 8px;
}

.markdown-body .footnotes {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}


/* 深色模式下的样式 */
.theme-dark .math-block {
  background-color: #282c34;
  color: #abb2bf;
}

/* ByteMD 查看器的自定义样式 */
.article-content {
  padding: 20px;
}

.markdown-body {
  font-size: 16px;
  line-height: 1.8;
}

/* 使用兼容性更好的深度选择器语法 */
.article-content >>> .markdown-body,
.article-content ::v-deep .markdown-body,
.article-content ::v-deep(.markdown-body) {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  background-color: #ffffff !important;
  color: #333333 !important;
}

/* 参考 admin 中的代码块样式 */
.article-content >>> .markdown-body pre,
.article-content ::v-deep .markdown-body pre,
.article-content ::v-deep(.markdown-body pre) {
  background-color: #f6f8fa !important;
  border: 1px solid #e1e4e8 !important;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
}

.article-content >>> .markdown-body code,
.article-content ::v-deep .markdown-body code,
.article-content ::v-deep(.markdown-body code) {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f6f8fa !important;
  color: #24292e !important;
}

/* 确保代码块内的代码没有额外背景色 */
.article-content >>> .markdown-body pre code,
.article-content ::v-deep .markdown-body pre code,
.article-content ::v-deep(.markdown-body pre code) {
  background-color: transparent !important;
  padding: 0;
  border-radius: 0;
}

.article-content >>> .markdown-body img,
.article-content ::v-deep .markdown-body img,
.article-content ::v-deep(.markdown-body img) {
  max-width: 100%;
  height: auto;
}

/* 自定义 ByteMD 查看器样式 */
.article-content >>> .bytemd,
.article-content ::v-deep .bytemd,
.article-content ::v-deep(.bytemd) {
  height: auto !important;
  border: none;
}

.article-content >>> .bytemd-preview,
.article-content ::v-deep .bytemd-preview,
.article-content ::v-deep(.bytemd-preview) {
  padding: 20px;
  background: transparent;
  background-color: #ffffff !important;
  color: #333333 !important;
}

/* 标题颜色 */
.article-content >>> .markdown-body h1,
.article-content >>> .markdown-body h2,
.article-content >>> .markdown-body h3,
.article-content >>> .markdown-body h4,
.article-content >>> .markdown-body h5,
.article-content >>> .markdown-body h6,
.article-content ::v-deep .markdown-body h1,
.article-content ::v-deep .markdown-body h2,
.article-content ::v-deep .markdown-body h3,
.article-content ::v-deep .markdown-body h4,
.article-content ::v-deep .markdown-body h5,
.article-content ::v-deep .markdown-body h6 {
  color: #49b1f5 !important;
  border-bottom-color: #eaecef !important;
}

/* 链接颜色 */
.article-content >>> .markdown-body a,
.article-content ::v-deep .markdown-body a {
  color: #0366d6 !important;
}

/* 表格样式 */
.article-content >>> .markdown-body table,
.article-content ::v-deep .markdown-body table {
  border-color: #dfe2e5 !important;
}

.article-content >>> .markdown-body table tr,
.article-content ::v-deep .markdown-body table tr {
  background-color: #ffffff !important;
  border-top-color: #dfe2e5 !important;
}

.article-content >>> .markdown-body table tr:nth-child(2n),
.article-content ::v-deep .markdown-body table tr:nth-child(2n) {
  background-color: #f6f8fa !important;
}

.article-content >>> .markdown-body table th,
.article-content >>> .markdown-body table td,
.article-content ::v-deep .markdown-body table th,
.article-content ::v-deep .markdown-body table td {
  border-color: #dfe2e5 !important;
}

/* 引用样式 */
.article-content >>> .markdown-body blockquote,
.article-content ::v-deep .markdown-body blockquote {
  color: #6a737d !important;
  border-left-color: #dfe2e5 !important;
}

/* Mermaid 图表样式 */
.article-content >>> .mermaid,
.article-content ::v-deep .mermaid {
  margin: 1.5em 0;
  text-align: center;
  background: white;
  border-radius: 5px;
  padding: 15px;
  min-height: 50px;
  overflow: visible;
}

.article-content >>> .mermaid-chart,
.article-content ::v-deep .mermaid-chart {
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 图片缩放样式 */
.article-content >>> .medium-zoom-image,
.article-content ::v-deep .medium-zoom-image {
  cursor: zoom-in;
}

.article-content >>> .medium-zoom-overlay,
.article-content ::v-deep .medium-zoom-overlay {
  background: #fff !important;
}

/* 数学公式样式 */
.article-content >>> .katex-display,
.article-content ::v-deep .katex-display {
  overflow-x: auto;
  overflow-y: hidden;
}

.no-toc {
  padding: 20px;
  text-align: center;
  color: #999;
}

.loading-content {
  text-align: center;
  padding: 20px;
  color: #999;
}

/* 添加目录相关样式 */
.toc-content {
  position: relative;
  padding: 0 10px;
  max-height: 70vh;
  overflow-y: auto;
}

.catalog-list {
  padding-left: 0;
  list-style: none;
  border-left: 2px solid #ebedef;
}

.catalog-list ul {
  padding-left: 16px;
  list-style: none;
}

.catalog-list li {
  margin: 4px 0;
  position: relative;
}

.toc-link {
  position: relative;
  display: block;
  padding: 6px 8px 6px 12px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  margin-left: -2px;
}

.toc-link:hover {
  color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
}

.toc-link.active {
  color: #4CAF50 !important;
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 3px solid #4CAF50;
  font-weight: 500;
}

.toc-h1 { 
  font-size: 15px; 
  font-weight: 600; 
}
.toc-h2 { 
  padding-left: 12px;
}
.toc-h3 { 
  padding-left: 24px;
  font-size: 13px;
}
.toc-h4 { 
  padding-left: 36px;
  font-size: 13px;
}
.toc-h5 { 
  padding-left: 48px;
  font-size: 12px;
}
.toc-h6 { 
  padding-left: 60px;
  font-size: 12px;
}

.toc-link {
  transition: all 0.3s ease;
}

.toc-link.active {
  animation: highlight 0.3s ease-in-out;
}

@keyframes highlight {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(76, 175, 80, 0.2);
  }
  100% {
    background-color: rgba(76, 175, 80, 0.1);
  }
}

/* 滚动条美化 */
.toc-content::-webkit-scrollbar {
  width: 4px;
}

.toc-content::-webkit-scrollbar-track {
  background: transparent;
}

.toc-content::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 2px;
}

.toc-content::-webkit-scrollbar-thumb:hover {
  background-color: #4CAF50;
}

.toc-content {
  padding: 10px 0;
}

.toc-item {
  padding: 6px 10px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s;
  position: relative;
}

.toc-arrow {
  display: inline-block;
  margin-right: 6px;
  font-size: 12px;
  transition: transform 0.3s;
}

.toc-children {
  margin-top: 4px;
}

/* 不同级别的缩进 */
.toc-level-1 { 
  padding-left: 10px; 
  font-weight: bold; 
}
.toc-level-2 { 
  padding-left: 24px; 
}
.toc-level-3 { 
  padding-left: 38px; 
}
.toc-level-4 { 
  padding-left: 52px; 
}

/* 激活状态 */
.toc-item.active {
  color: #fff;
  background-color: #1baea0;
  border-radius: 4px;
}

.toc-item:hover {
  background-color: rgba(27, 174, 160, 0.1);
}

/* 展开状态的样式 */
.toc-item.expanded > .toc-arrow {
  transform: rotate(0deg);
}

.toc-item:not(.expanded) > .toc-arrow {
  transform: rotate(-90deg);
}

.toc-children {
  overflow: hidden;
  transition: all 0.3s;
}

/* 添加新的样式 */
.toc-item-wrapper {
  margin: 2px 0;
}

.toc-children {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.toc-children.expanded {
  max-height: 1000px; /* 或者更大的值，确保能显示所有内容 */
}

.toc-arrow {
  display: inline-block;
  width: 16px;
  text-align: center;
  transition: transform 0.3s;
}

.toc-item.expanded > .toc-arrow {
  transform: rotate(0);
}

.toc-item:not(.expanded) > .toc-arrow {
  transform: rotate(-90deg);
}

/* 调整缩进 */
.toc-level-1 { padding-left: 10px; }
.toc-level-2 { padding-left: 24px; }
.toc-level-3 { padding-left: 38px; }
.toc-level-4 { padding-left: 52px; }

/* 修改代码块样式 */
:deep(.markdown-body pre) {
  background-color: #1e1e1e !important;
  margin: 0;
  padding: 0;
}

:deep(.markdown-body pre code) {
  display: block;
  overflow-x: auto;
  padding: 16px;
  color: #fff;
  background: #1e1e1e;
  font-family: Consolas, Monaco, monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* 添加类型标记样式 */
:deep(.markdown-body pre) {
  position: relative;
}

:deep(.markdown-body pre::before) {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  text-align: right;
  font-size: 0.75em;
  padding: 5px 10px;
  background: #323232;
  border-radius: 0 3px 0 4px;
}

/* 代码高亮颜色 */
:deep(.hljs-keyword) { color: #569cd6; }
:deep(.hljs-string) { color: #ce9178; }
:deep(.hljs-comment) { color: #6a9955; }
:deep(.hljs-function) { color: #dcdcaa; }
:deep(.hljs-number) { color: #b5cea8; }
:deep(.hljs-operator) { color: #d4d4d4; }
:deep(.hljs-class) { color: #4ec9b0; }
:deep(.hljs-built_in) { color: #4ec9b0; }
:deep(.hljs-property) { color: #9cdcfe; }
:deep(.hljs-variable) { color: #9cdcfe; }

/* 代码复制按钮样式 */
.article-content >>> .code-copy-btn,
.article-content ::v-deep .code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.06);
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
}

.article-content >>> pre:hover .code-copy-btn,
.article-content ::v-deep pre:hover .code-copy-btn {
  opacity: 1;
}

.article-content >>> .code-copy-btn:hover,
.article-content ::v-deep .code-copy-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

.article-content >>> .code-copy-btn.copied,
.article-content ::v-deep .code-copy-btn.copied {
  background-color: #67c23a;
  color: white;
}

/* 确保SVG图标正确显示 */
.article-content >>> .code-copy-btn.copied svg,
.article-content ::v-deep .code-copy-btn.copied svg {
  stroke: white;
}

/* 确保代码块有足够的右侧边距容纳按钮 */
.article-content >>> pre,
.article-content ::v-deep pre {
  padding-right: 45px !important;
}

/* 自定义提示样式 */
.copy-toast {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 9999;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
}

.copy-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 在文件末尾添加深色模式样式 */
/* 分享区域深色模式样式 */
:root[data-theme='dark'] .v-dialog,
body.theme-dark .v-dialog {
  background-color: #2c2c2c !important;
  color: #e0e0e0 !important;
}

:root[data-theme='dark'] .share-title,
body.theme-dark .share-title {
  color: #e0e0e0 !important;
}

:root[data-theme='dark'] .share-list-item,
body.theme-dark .share-list-item {
  background-color: #383838 !important;
}

:root[data-theme='dark'] .share-list-item:hover,
body.theme-dark .share-list-item:hover {
  background-color: #4a4a4a !important;
}

:root[data-theme='dark'] .share-icon-name,
body.theme-dark .share-icon-name {
  color: #d4d4d4 !important;
}

:root[data-theme='dark'] .share-platform-title,
body.theme-dark .share-platform-title {
  color: #ffffff !important;
  border-bottom-color: #444444 !important;
}

:root[data-theme='dark'] .v-card,
body.theme-dark .v-card {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 按钮深色模式 */
:root[data-theme='dark'] .theme-button,
body.theme-dark .theme-button {
  background-color: #383838 !important;
  color: #e0e0e0 !important;
}

:root[data-theme='dark'] .theme-button:hover,
body.theme-dark .theme-button:hover {
  background-color: #4a4a4a !important;
}

/* 复制提示框深色模式 */
:root[data-theme='dark'] .copy-toast,
body.theme-dark .copy-toast {
  background-color: rgba(50, 50, 50, 0.9) !important;
  color: #ffffff !important;
}

/* 添加以下代码到您的分享面板组件样式中 */
/* 深色模式样式 */
:root[data-theme='dark'] .国内平台,
:root[data-theme='dark'] .国际平台,
:root[data-theme='dark'] .更多平台,
body.theme-dark .国内平台,
body.theme-dark .国际平台,
body.theme-dark .更多平台 {
  color: #e0e0e0 !important;
  border-bottom-color: #444444 !important;
}

:root[data-theme='dark'] .微博,
:root[data-theme='dark'] .微信,
:root[data-theme='dark'] .QQ,
:root[data-theme='dark'] .小红书,
:root[data-theme='dark'] .Twitter,
:root[data-theme='dark'] .Facebook,
:root[data-theme='dark'] .LinkedIn,
:root[data-theme='dark'] .Tumblr,
:root[data-theme='dark'] .Reddit,
:root[data-theme='dark'] .Pinterest,
:root[data-theme='dark'] .邮件,
:root[data-theme='dark'] .复制链接,
body.theme-dark .微博,
body.theme-dark .微信,
body.theme-dark .QQ,
body.theme-dark .小红书,
body.theme-dark .Twitter,
body.theme-dark .Facebook,
body.theme-dark .LinkedIn,
body.theme-dark .Tumblr,
body.theme-dark .Reddit,
body.theme-dark .Pinterest,
body.theme-dark .邮件,
body.theme-dark .复制链接 {
  color: #d4d4d4 !important;
}

/* 针对整个分享面板的样式 */
:root[data-theme='dark'] .share-panel,
body.theme-dark .share-panel {
  background-color: #2c2c2c !important;
  color: #e0e0e0 !important;
  border-color: #444444 !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
}

/* 在文件末尾添加 */

/* 确保深色模式下的 Markdown 内容样式覆盖 */
:deep(.theme-dark .article-container .markdown-body),
:deep([data-theme='dark'] .article-container .markdown-body) {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 代码高亮 - 针对特定主题进行覆盖 */
:deep(.theme-dark .hljs),
:deep([data-theme='dark'] .hljs) {
  background-color: #2c2c2c !important;
}

:deep(.theme-dark .hljs-keyword),
:deep([data-theme='dark'] .hljs-keyword) {
  color: #ff79c6 !important;
}

:deep(.theme-dark .hljs-string),
:deep([data-theme='dark'] .hljs-string) {
  color: #f1fa8c !important;
}

:deep(.theme-dark .hljs-comment),
:deep([data-theme='dark'] .hljs-comment) {
  color: #6272a4 !important;
}

:deep(.theme-dark .hljs-function),
:deep([data-theme='dark'] .hljs-function) {
  color: #50fa7b !important;
}

:deep(.theme-dark .hljs-number),
:deep([data-theme='dark'] .hljs-number) {
  color: #bd93f9 !important;
}

:deep(.theme-dark .hljs-title),
:deep([data-theme='dark'] .hljs-title) {
  color: #50fa7b !important;
}

:deep(.theme-dark .hljs-params),
:deep([data-theme='dark'] .hljs-params) {
  color: #ffb86c !important;
}

:deep(.theme-dark .hljs-built_in),
:deep([data-theme='dark'] .hljs-built_in) {
  color: #8be9fd !important;
}

/* 上一篇/下一篇导航 */
:deep(.theme-dark .pagination-post),
:deep([data-theme='dark'] .pagination-post) {
  background-color: #1e1e1e !important;
}

:deep(.theme-dark .pagination-post > div),
:deep([data-theme='dark'] .pagination-post > div) {
  background-color: #2c2c2c !important;
}


:deep(.theme-dark .post-info),
:deep([data-theme='dark'] .post-info) {
  background-color: rgba(0, 0, 0, 0.6) !important;
}

:deep(.theme-dark .post-title),
:deep([data-theme='dark'] .post-title) {
  color: #e0e0e0 !important;
}

:deep(.theme-dark .label),
:deep([data-theme='dark'] .label) {
  color: #b0b0b0 !important;
}

/* 深色模式覆盖样式 */
body.theme-dark .markdown-body,
[data-theme='dark'] .markdown-body {
  color-scheme: dark !important;
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
}

/* 分享下拉菜单深色模式 */
body.theme-dark .share-dropdown,
[data-theme='dark'] .share-dropdown {
  background-color: #1e1e1e !important;
  border-color: #444444 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

body.theme-dark .share-title,
[data-theme='dark'] .share-title {
  color: #e0e0e0 !important;
  border-bottom-color: #444444 !important;
}

body.theme-dark .share-item,
[data-theme='dark'] .share-item {
  background-color: #333333 !important;
}

body.theme-dark .platform-name,
[data-theme='dark'] .platform-name {
  color: #d4d4d4 !important;
}

/* 微信分享对话框深色模式 */
body.theme-dark .wechat-share-dialog,
[data-theme='dark'] .wechat-share-dialog {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

body.theme-dark .wechat-share-link,
[data-theme='dark'] .wechat-share-link {
  background-color: #333333 !important;
  color: #d4d4d4 !important;
  border-color: #444444 !important;
}

/* 确保 Vuetify 对话框在深色模式下正确显示 */
body.theme-dark .v-dialog,
[data-theme='dark'] .v-dialog {
  background-color: #1e1e1e !important;
}

/* 深色模式覆盖样式 */
body.theme-dark .markdown-body,
[data-theme='dark'] .markdown-body {
  color-scheme: dark !important;
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
}

/* 标题 */
body.theme-dark .markdown-body h1,
body.theme-dark .markdown-body h2,
body.theme-dark .markdown-body h3,
body.theme-dark .markdown-body h4,
body.theme-dark .markdown-body h5,
body.theme-dark .markdown-body h6,
[data-theme='dark'] .markdown-body h1,
[data-theme='dark'] .markdown-body h2,
[data-theme='dark'] .markdown-body h3,
[data-theme='dark'] .markdown-body h4,
[data-theme='dark'] .markdown-body h5,
[data-theme='dark'] .markdown-body h6 {
  color: #e6edf3 !important;
  border-bottom-color: #30363d !important;
}

/* 代码高亮 - VS Code Dark+ 风格 */
body.theme-dark .hljs,
[data-theme='dark'] .hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #d4d4d4 !important;
  background: #1e1e1e !important;
}

body.theme-dark .hljs-keyword,
body.theme-dark .hljs-literal,
body.theme-dark .hljs-symbol,
body.theme-dark .hljs-name,
[data-theme='dark'] .hljs-keyword,
[data-theme='dark'] .hljs-literal,
[data-theme='dark'] .hljs-symbol,
[data-theme='dark'] .hljs-name {
  color: #569cd6 !important;
}

body.theme-dark .hljs-string,
[data-theme='dark'] .hljs-string {
  color: #ce9178 !important;
}

body.theme-dark .hljs-comment,
[data-theme='dark'] .hljs-comment {
  color: #6a9955 !important;
  font-style: italic !important;
}

body.theme-dark .hljs-function,
[data-theme='dark'] .hljs-function {
  color: #dcdcaa !important;
}

body.theme-dark .hljs-built_in,
[data-theme='dark'] .hljs-built_in {
  color: #4ec9b0 !important;
}

body.theme-dark .hljs-number,
[data-theme='dark'] .hljs-number {
  color: #b5cea8 !important;
}

body.theme-dark .hljs-attr,
[data-theme='dark'] .hljs-attr {
  color: #9cdcfe !important;
}

body.theme-dark .hljs-title,
[data-theme='dark'] .hljs-title {
  color: #dcdcaa !important;
}

/* 其他元素 */
body.theme-dark .markdown-body blockquote,
[data-theme='dark'] .markdown-body blockquote {
  color: #8b949e !important;
  border-left-color: #30363d !important;
  background-color: #161b22 !important;
}

body.theme-dark .markdown-body pre,
[data-theme='dark'] .markdown-body pre {
  background-color: #161b22 !important;
  border-color: #30363d !important;
}

body.theme-dark .markdown-body code,
[data-theme='dark'] .markdown-body code {
  background-color: rgba(110, 118, 129, 0.4) !important;
  color: #c9d1d9 !important;
}

body.theme-dark .markdown-body a,
[data-theme='dark'] .markdown-body a {
  color: #58a6ff !important;
}

/* 表格样式 */
body.theme-dark .markdown-body table tr,
[data-theme='dark'] .markdown-body table tr {
  background-color: #0d1117 !important;
  border-color: #30363d !important;
}

body.theme-dark .markdown-body table tr:nth-child(2n),
[data-theme='dark'] .markdown-body table tr:nth-child(2n) {
  background-color: #161b22 !important;
}

body.theme-dark .markdown-body table th,
body.theme-dark .markdown-body table td,
[data-theme='dark'] .markdown-body table th,
[data-theme='dark'] .markdown-body table td {
  border-color: #30363d !important;
}

/* 确保深色模式下的统一背景色 */
body.theme-dark .article-wrapper,
body.theme-dark .article-container,
body.theme-dark .markdown-body,
[data-theme='dark'] .article-wrapper,
[data-theme='dark'] .article-container,
[data-theme='dark'] .markdown-body {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 确保 ByteMD 区域与周围容器颜色一致 */
body.theme-dark .bytemd,
body.theme-dark .bytemd-preview,
body.theme-dark .bytemd-body,
[data-theme='dark'] .bytemd,
[data-theme='dark'] .bytemd-preview,
[data-theme='dark'] .bytemd-body {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 强制覆盖任何其他可能的样式 */
body.theme-dark [class*="article"],
body.theme-dark [class*="bytemd"],
[data-theme='dark'] [class*="article"],
[data-theme='dark'] [class*="bytemd"] {
  background-color: #1e1e1e !important;
}

/* Mermaid 图表特殊处理 */
body.theme-dark .bytemd-mermaid,
[data-theme='dark'] .bytemd-mermaid {
  background-color: #1e1e1e !important;
}

body.theme-dark .bytemd-mermaid .actor,
[data-theme='dark'] .bytemd-mermaid .actor {
  fill: #2c2c2c !important;
  stroke: #555555 !important;
}

body.theme-dark .bytemd-mermaid text.actor,
[data-theme='dark'] .bytemd-mermaid text.actor {
  fill: #e0e0e0 !important;
  stroke: none !important;
}

body.theme-dark .bytemd-mermaid .messageLine0,
body.theme-dark .bytemd-mermaid .messageLine1,
[data-theme='dark'] .bytemd-mermaid .messageLine0,
[data-theme='dark'] .bytemd-mermaid .messageLine1 {
  stroke: #aaaaaa !important;
}

/* 确保 v-card 容器也保持一致的背景色 */
body.theme-dark .v-card,
[data-theme='dark'] .v-card {
  background-color: #1e1e1e !important;
}

/* 图表中的矩形使用稍深的颜色以区分 */
body.theme-dark .bytemd-mermaid rect,
[data-theme='dark'] .bytemd-mermaid rect {
  fill: #2c2c2c !important;
}

/* 图表中的文本保持浅色 */
body.theme-dark .bytemd-mermaid text,
[data-theme='dark'] .bytemd-mermaid text {
  fill: #e0e0e0 !important;
}

/* 确保深色模式下也保持透明 */
body.theme-dark .article-info-container,
[data-theme='dark'] .article-info-container,
.theme--dark .article-info-container {
  background-color: transparent !important;
}
/* 确保深色模式下也保持透明 */
body.theme-dark .article-info,
[data-theme='dark'] .article-info,
.theme--dark .article-info {
  background-color: transparent !important;
}

/* 确保深色模式下也保持透明 */
body.theme-dark .article-category,
[data-theme='dark'] .article-category,
.theme--dark .article-category {
  background-color: transparent !important;
}


body.theme-dark .article-title,
[data-theme='dark'] .article-title,
.theme--dark .article-title {
  background-color: transparent !important;
}

/* 在组件的 <style> 部分添加以下样式，参考SearchModel.vue的修复方法 */

/* 修复对话框样式 - 更精确地控制遮罩层 */
.theme--dark.v-application .v-dialog__overlay,
[data-theme='dark'] .v-dialog__overlay,
body.theme-dark .v-dialog__overlay {
  background-color: transparent !important;
}

/* 修复对话框内容区域，确保它不会有全屏黑色背景 */
.theme--dark.v-application .v-dialog__content,
[data-theme='dark'] .v-dialog__content,
body.theme-dark .v-dialog__content {
  background-color: transparent !important;
  box-shadow: none !important;
}

/* 修改遮罩层的颜色和透明度 */
.theme--dark.v-overlay .v-overlay__scrim,
[data-theme='dark'] .v-overlay .v-overlay__scrim,
body.theme-dark .v-overlay .v-overlay__scrim {
  background-color: rgba(0, 0, 0, 0.5) !important; /* 降低透明度 */
}

/* 在深色模式下，让v-dialog组件本身是透明的 */
.theme--dark .v-dialog,
[data-theme='dark'] .v-dialog,
body.theme-dark .v-dialog {
  background-color: transparent !important;
  box-shadow: none !important;
}

/* 微信分享对话框特定样式 */
.theme--dark .wechat-share-dialog,
[data-theme='dark'] .wechat-share-dialog,
body.theme-dark .wechat-share-dialog {
  background-color: #1e1e1e !important;
  color: #ffffff !important;
}

/* 确保微信分享卡片在深色模式下有正确的背景色 */
.theme--dark .v-card,
[data-theme='dark'] .v-card,
body.theme-dark .v-card {
  background-color: #1e1e1e !important;
  color: #ffffff !important;
}

/* 确保微信分享链接文本在深色模式下可读 */
.theme--dark .wechat-share-link,
[data-theme='dark'] .wechat-share-link,
body.theme-dark .wechat-share-link {
  background-color: #333 !important;
  color: #ddd !important;
  border: 1px solid #444;
}

/* 确保二维码容器在深色模式下有适当的背景 */
.theme--dark .qrcode-container,
[data-theme='dark'] .qrcode-container,
body.theme-dark .qrcode-container {
  background-color: #fff !important; /* 保持白色以保证二维码清晰可见 */
  padding: 10px;
  border-radius: 4px;
}

/* 确保卡片标题在深色模式下有正确的颜色 */
.theme--dark .v-card__title,
[data-theme='dark'] .v-card__title,
body.theme-dark .v-card__title {
  color: #ffffff !important;
}

/* 确保按钮在深色模式下有正确的样式 */
.theme--dark .v-btn.primary,
[data-theme='dark'] .v-btn.primary,
body.theme-dark .v-btn.primary {
  background-color: #2196F3 !important;
  color: #ffffff !important;
}

.theme--dark .v-btn.text,
[data-theme='dark'] .v-btn.text,
body.theme-dark .v-btn.text {
  color: #2196F3 !important;
}

.qq-share-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.qrcode-container {
  margin: 20px 0;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.qq-share-tip {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.qq-share-link {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #f2f2f2;
  border-radius: 5px;
  font-size: 13px;
  color: #333;
  word-break: break-all;
  max-width: 100%;
  text-align: center;
}

.qrcode-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qq-share-link {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #f2f2f2;
  border-radius: 5px;
  font-size: 13px;
  color: #333;
  word-break: break-all;
  max-width: 100%;
}

#toc {
  flex: 1;
  min-height: 100px;
  overflow-y: auto;
  margin: 0;
  padding: 0 0 10px 0;
}

/* 标签页样式 - 亮色主题 */
.toc-tabs {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.tab-item {
  padding: 8px 15px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-item.active {
  color: #ff7e79;
}

.tab-item.active:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff7e79;
}

/* 站点概览样式 - 亮色主题 */
.site-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.site-author {
  text-align: center;
  margin-bottom: 20px;
}

.author-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  object-fit: cover;
}

.author-avatar:hover {
  transform: rotate(360deg);
  transition: transform 1s ease;
}

.author-name {
  font-size: 18px;
  font-weight: 500;
  margin: 15px 0 5px;
  color: #333;
}

.author-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.site-state {
  display: flex;
  margin: 10px 0 20px;
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.site-state-item {
  flex: 1;
  text-align: center;
  padding: 0 10px;
}

.site-state-item:not(:last-child) {
  border-right: 1px solid #eee;
}

.state-num {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.state-name {
  font-size: 13px;
  color: #999;
}

.site-social {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
}

.social-item {
  width: 50%;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  color: #555;
  transition: color 0.3s;
}

.social-item:hover {
  color: #ff7e79;
}

.social-item i {
  margin-right: 5px;
  font-size: 16px;
}

.site-cc {
  margin: 15px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;  /* 增加图标之间的间距 */
  padding: 10px;  /* 添加内边距 */
}

.site-cc a {
  display: inline-block;
  transition: transform 0.3s ease;
}

.site-cc a:hover {
  transform: translateY(-2px);
}

.site-cc img {
  vertical-align: middle;
  height: 31px;  /* 统一图标高度 */
  object-fit: contain;
}

.site-friends {
  width: 100%;
  margin-top: 15px;
  text-align: center;
}

.friends-title {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.friends-title i {
  margin-right: 5px;
}

.friends-links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.friend-link {
  margin: 5px 0;
  padding: 5px 10px;
  color: #555;
  transition: color 0.3s;
}

.friend-link:hover {
  color: #ff7e79;
}

.emoji {
  margin: 0 3px;
}

/* 修改 toc-card 样式，确保高度一致 */
.toc-card {
  padding: 20px 24px 0 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 确保目录内容区域固定高度，避免切换时高度变化 */
#toc,
.site-overview {
  flex: 1;
  min-height: 300px;
  overflow-y: auto;
  padding: 0 0 10px 0;
}

/* 适配深色模式 - 当有深色模式类时启用 */
.theme-dark .toc-tabs {
  border-bottom: 1px solid #444;
}

.theme-dark .tab-item {
  color: #b1b1b3;
}

.theme-dark .author-name {
  color: #ddd;
}

.theme-dark .author-description {
  color: #999;
}

.theme-dark .site-state {
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
}

.theme-dark .site-state-item:not(:last-child) {
  border-right: 1px solid #444;
}

.theme-dark .state-num {
  color: #ddd;
}

.theme-dark .social-item {
  color: #b1b1b3;
}

.theme-dark .friends-title {
  border-bottom: 1px solid #444;
  color: #b1b1b3;
}

.theme-dark .friend-link {
  color: #b1b1b3;
}

.theme-dark .author-avatar {
  border: 2px solid rgba(255, 255, 255, 0.2);
}

/* 网站资讯样式 */
.site-website-info {
  width: 100%;
  margin: 15px 0;
  padding: 15px 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.website-info-title {
  margin-bottom: 10px;
  font-weight: 500;
  color: #666;
}

.website-info-title i {
  margin-right: 5px;
}

.website-info-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

/* 公告样式 */
.site-announcement {
  width: 100%;
  margin: 15px 0;
  padding: 15px 10px;
}

.announcement-title {
  margin-bottom: 10px;
  font-weight: 500;
  color: #666;
}

.announcement-title i {
  margin-right: 5px;
  color: #f00;
  animation: big 0.8s linear infinite;
}

.announcement-content {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

/* 收藏按钮样式 */
.collection-btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  margin: 15px 0;
  width: 100%;
  transition-duration: 1s;
  transition-property: color;
}

.collection-btn:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: "";
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
}

.collection-btn:hover:before {
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transform: scaleX(1);
}

/* 站点状态项目链接样式 */
.site-state-item a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.site-state-item:hover .state-num {
  color: #ff7e79;
}

@keyframes big {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.mermaid {
  margin: 1.5em 0;
  overflow: auto;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  min-height: 50px; /* 确保有最小高度 */
}

/* 深色模式下的 Mermaid 图表样式 */
.theme-dark .mermaid {
  background: #282c34;
  color: #abb2bf;
}

.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 5px 0;
}

.markdown-body .task-list-item {
  list-style-type: none;
}

.markdown-body .task-list-item-checkbox {
  margin-right: 8px;
}

.markdown-body .footnotes {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}


/* 深色模式下的样式 */
.theme-dark .math-block {
  background-color: #282c34;
  color: #abb2bf;
}

/* ByteMD 查看器的自定义样式 */
.article-content {
  padding: 20px;
}

.markdown-body {
  font-size: 16px;
  line-height: 1.8;
}

/* 使用兼容性更好的深度选择器语法 */
.article-content >>> .markdown-body,
.article-content ::v-deep .markdown-body,
.article-content ::v-deep(.markdown-body) {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  background-color: #ffffff !important;
  color: #333333 !important;
}

/* 参考 admin 中的代码块样式 */
.article-content >>> .markdown-body pre,
.article-content ::v-deep .markdown-body pre,
.article-content ::v-deep(.markdown-body pre) {
  background-color: #f6f8fa !important;
  border: 1px solid #e1e4e8 !important;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
}

.article-content >>> .markdown-body code,
.article-content ::v-deep .markdown-body code,
.article-content ::v-deep(.markdown-body code) {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f6f8fa !important;
  color: #24292e !important;
}

/* 确保代码块内的代码没有额外背景色 */
.article-content >>> .markdown-body pre code,
.article-content ::v-deep .markdown-body pre code,
.article-content ::v-deep(.markdown-body pre code) {
  background-color: transparent !important;
  padding: 0;
  border-radius: 0;
}

.article-content >>> .markdown-body img,
.article-content ::v-deep .markdown-body img,
.article-content ::v-deep(.markdown-body img) {
  max-width: 100%;
  height: auto;
}

/* 自定义 ByteMD 查看器样式 */
.article-content >>> .bytemd,
.article-content ::v-deep .bytemd,
.article-content ::v-deep(.bytemd) {
  height: auto !important;
  border: none;
}

.article-content >>> .bytemd-preview,
.article-content ::v-deep .bytemd-preview,
.article-content ::v-deep(.bytemd-preview) {
  padding: 20px;
  background: transparent;
  background-color: #ffffff !important;
  color: #333333 !important;
}

/* 标题颜色 */
.article-content >>> .markdown-body h1,
.article-content >>> .markdown-body h2,
.article-content >>> .markdown-body h3,
.article-content >>> .markdown-body h4,
.article-content >>> .markdown-body h5,
.article-content >>> .markdown-body h6,
.article-content ::v-deep .markdown-body h1,
.article-content ::v-deep .markdown-body h2,
.article-content ::v-deep .markdown-body h3,
.article-content ::v-deep .markdown-body h4,
.article-content ::v-deep .markdown-body h5,
.article-content ::v-deep .markdown-body h6 {
  color: #49b1f5 !important;
  border-bottom-color: #eaecef !important;
}

/* 链接颜色 */
.article-content >>> .markdown-body a,
.article-content ::v-deep .markdown-body a {
  color: #0366d6 !important;
}

/* 表格样式 */
.article-content >>> .markdown-body table,
.article-content ::v-deep .markdown-body table {
  border-color: #dfe2e5 !important;
}

.article-content >>> .markdown-body table tr,
.article-content ::v-deep .markdown-body table tr {
  background-color: #ffffff !important;
  border-top-color: #dfe2e5 !important;
}

.article-content >>> .markdown-body table tr:nth-child(2n),
.article-content ::v-deep .markdown-body table tr:nth-child(2n) {
  background-color: #f6f8fa !important;
}

.article-content >>> .markdown-body table th,
.article-content >>> .markdown-body table td,
.article-content ::v-deep .markdown-body table th,
.article-content ::v-deep .markdown-body table td {
  border-color: #dfe2e5 !important;
}

/* 引用样式 */
.article-content >>> .markdown-body blockquote,
.article-content ::v-deep .markdown-body blockquote {
  color: #6a737d !important;
  border-left-color: #dfe2e5 !important;
}

/* Mermaid 图表样式 */
.article-content >>> .mermaid,
.article-content ::v-deep .mermaid {
  margin: 1.5em 0;
  text-align: center;
  background: white;
  border-radius: 5px;
  padding: 15px;
  min-height: 50px;
  overflow: visible;
}

.article-content >>> .mermaid-chart,
.article-content ::v-deep .mermaid-chart {
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 图片缩放样式 */
.article-content >>> .medium-zoom-image,
.article-content ::v-deep .medium-zoom-image {
  cursor: zoom-in;
}

.article-content >>> .medium-zoom-overlay,
.article-content ::v-deep .medium-zoom-overlay {
  background: #fff !important;
}

/* 数学公式样式 */
.article-content >>> .katex-display,
.article-content ::v-deep .katex-display {
  overflow-x: auto;
  overflow-y: hidden;
}

.no-toc {
  padding: 20px;
  text-align: center;
  color: #999;
}

.loading-content {
  text-align: center;
  padding: 20px;
  color: #999;
}

/* 添加目录相关样式 */
.toc-content {
  position: relative;
  padding: 0 10px;
  max-height: 70vh;
  overflow-y: auto;
}

.catalog-list {
  padding-left: 0;
  list-style: none;
  border-left: 2px solid #ebedef;
}

.catalog-list ul {
  padding-left: 16px;
  list-style: none;
}

.catalog-list li {
  margin: 4px 0;
  position: relative;
}

.toc-link {
  position: relative;
  display: block;
  padding: 6px 8px 6px 12px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  margin-left: -2px;
}

.toc-link:hover {
  color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
}

.toc-link.active {
  color: #4CAF50 !important;
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 3px solid #4CAF50;
  font-weight: 500;
}

.toc-h1 { 
  font-size: 15px; 
  font-weight: 600; 
}
.toc-h2 { 
  padding-left: 12px;
}
.toc-h3 { 
  padding-left: 24px;
  font-size: 13px;
}
.toc-h4 { 
  padding-left: 36px;
  font-size: 13px;
}
.toc-h5 { 
  padding-left: 48px;
  font-size: 12px;
}
.toc-h6 { 
  padding-left: 60px;
  font-size: 12px;
}

.toc-link {
  transition: all 0.3s ease;
}

.toc-link.active {
  animation: highlight 0.3s ease-in-out;
}

@keyframes highlight {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(76, 175, 80, 0.2);
  }
  100% {
    background-color: rgba(76, 175, 80, 0.1);
  }
}

/* 滚动条美化 */
.toc-content::-webkit-scrollbar {
  width: 4px;
}

.toc-content::-webkit-scrollbar-track {
  background: transparent;
}

.toc-content::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 2px;
}

.toc-content::-webkit-scrollbar-thumb:hover {
  background-color: #4CAF50;
}

.toc-content {
  padding: 10px 0;
}

.toc-item {
  padding: 6px 10px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s;
  position: relative;
}

.toc-arrow {
  display: inline-block;
  margin-right: 6px;
  font-size: 12px;
  transition: transform 0.3s;
}

.toc-children {
  margin-top: 4px;
}

/* 不同级别的缩进 */
.toc-level-1 { 
  padding-left: 10px; 
  font-weight: bold; 
}
.toc-level-2 { 
  padding-left: 24px; 
}
.toc-level-3 { 
  padding-left: 38px; 
}
.toc-level-4 { 
  padding-left: 52px; 
}

/* 激活状态 */
.toc-item.active {
  color: #fff;
  background-color: #1baea0;
  border-radius: 4px;
}

.toc-item:hover {
  background-color: rgba(27, 174, 160, 0.1);
}

/* 展开状态的样式 */
.toc-item.expanded > .toc-arrow {
  transform: rotate(0deg);
}

.toc-item:not(.expanded) > .toc-arrow {
  transform: rotate(-90deg);
}

.toc-children {
  overflow: hidden;
  transition: all 0.3s;
}

/* 添加新的样式 */
.toc-item-wrapper {
  margin: 2px 0;
}

.toc-children {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.toc-children.expanded {
  max-height: 1000px; /* 或者更大的值，确保能显示所有内容 */
}

.toc-arrow {
  display: inline-block;
  width: 16px;
  text-align: center;
  transition: transform 0.3s;
}

.toc-item.expanded > .toc-arrow {
  transform: rotate(0);
}

.toc-item:not(.expanded) > .toc-arrow {
  transform: rotate(-90deg);
}

/* 调整缩进 */
.toc-level-1 { padding-left: 10px; }
.toc-level-2 { padding-left: 24px; }
.toc-level-3 { padding-left: 38px; }
.toc-level-4 { padding-left: 52px; }

/* 修改代码块样式 */
:deep(.markdown-body pre) {
  background-color: #1e1e1e !important;
  margin: 0;
  padding: 0;
}

:deep(.markdown-body pre code) {
  display: block;
  overflow-x: auto;
  padding: 16px;
  color: #fff;
  background: #1e1e1e;
  font-family: Consolas, Monaco, monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* 添加类型标记样式 */
:deep(.markdown-body pre) {
  position: relative;
}

:deep(.markdown-body pre::before) {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  text-align: right;
  font-size: 0.75em;
  padding: 5px 10px;
  background: #323232;
  border-radius: 0 3px 0 4px;
}

/* 代码高亮颜色 */
:deep(.hljs-keyword) { color: #569cd6; }
:deep(.hljs-string) { color: #ce9178; }
:deep(.hljs-comment) { color: #6a9955; }
:deep(.hljs-function) { color: #dcdcaa; }
:deep(.hljs-number) { color: #b5cea8; }
:deep(.hljs-operator) { color: #d4d4d4; }
:deep(.hljs-class) { color: #4ec9b0; }
:deep(.hljs-built_in) { color: #4ec9b0; }
:deep(.hljs-property) { color: #9cdcfe; }
:deep(.hljs-variable) { color: #9cdcfe; }

/* 代码复制按钮样式 */
.article-content >>> .code-copy-btn,
.article-content ::v-deep .code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.06);
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
}

.article-content >>> pre:hover .code-copy-btn,
.article-content ::v-deep pre:hover .code-copy-btn {
  opacity: 1;
}

.article-content >>> .code-copy-btn:hover,
.article-content ::v-deep .code-copy-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

.article-content >>> .code-copy-btn.copied,
.article-content ::v-deep .code-copy-btn.copied {
  background-color: #67c23a;
  color: white;
}

/* 确保SVG图标正确显示 */
.article-content >>> .code-copy-btn.copied svg,
.article-content ::v-deep .code-copy-btn.copied svg {
  stroke: white;
}

/* 确保代码块有足够的右侧边距容纳按钮 */
.article-content >>> pre,
.article-content ::v-deep pre {
  padding-right: 45px !important;
}

/* 自定义提示样式 */
.copy-toast {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 9999;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
}

.copy-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 在文件末尾添加深色模式样式 */
/* 分享区域深色模式样式 */
:root[data-theme='dark'] .v-dialog,
body.theme-dark .v-dialog {
  background-color: #2c2c2c !important;
  color: #e0e0e0 !important;
}

:root[data-theme='dark'] .share-title,
body.theme-dark .share-title {
  color: #e0e0e0 !important;
}

:root[data-theme='dark'] .share-list-item,
body.theme-dark .share-list-item {
  background-color: #383838 !important;
}

:root[data-theme='dark'] .share-list-item:hover,
body.theme-dark .share-list-item:hover {
  background-color: #4a4a4a !important;
}

:root[data-theme='dark'] .share-icon-name,
body.theme-dark .share-icon-name {
  color: #d4d4d4 !important;
}

:root[data-theme='dark'] .share-platform-title,
body.theme-dark .share-platform-title {
  color: #ffffff !important;
  border-bottom-color: #444444 !important;
}

:root[data-theme='dark'] .v-card,
body.theme-dark .v-card {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 按钮深色模式 */
:root[data-theme='dark'] .theme-button,
body.theme-dark .theme-button {
  background-color: #383838 !important;
  color: #e0e0e0 !important;
}

:root[data-theme='dark'] .theme-button:hover,
body.theme-dark .theme-button:hover {
  background-color: #4a4a4a !important;
}

/* 复制提示框深色模式 */
:root[data-theme='dark'] .copy-toast,
body.theme-dark .copy-toast {
  background-color: rgba(50, 50, 50, 0.9) !important;
  color: #ffffff !important;
}

/* 添加以下代码到您的分享面板组件样式中 */
/* 深色模式样式 */
:root[data-theme='dark'] .国内平台,
:root[data-theme='dark'] .国际平台,
:root[data-theme='dark'] .更多平台,
body.theme-dark .国内平台,
body.theme-dark .国际平台,
body.theme-dark .更多平台 {
  color: #e0e0e0 !important;
  border-bottom-color: #444444 !important;
}

:root[data-theme='dark'] .微博,
:root[data-theme='dark'] .微信,
:root[data-theme='dark'] .QQ,
:root[data-theme='dark'] .小红书,
:root[data-theme='dark'] .Twitter,
:root[data-theme='dark'] .Facebook,
:root[data-theme='dark'] .LinkedIn,
:root[data-theme='dark'] .Tumblr,
:root[data-theme='dark'] .Reddit,
:root[data-theme='dark'] .Pinterest,
:root[data-theme='dark'] .邮件,
:root[data-theme='dark'] .复制链接,
body.theme-dark .微博,
body.theme-dark .微信,
body.theme-dark .QQ,
body.theme-dark .小红书,
body.theme-dark .Twitter,
body.theme-dark .Facebook,
body.theme-dark .LinkedIn,
body.theme-dark .Tumblr,
body.theme-dark .Reddit,
body.theme-dark .Pinterest,
body.theme-dark .邮件,
body.theme-dark .复制链接 {
  color: #d4d4d4 !important;
}

/* 针对整个分享面板的样式 */
:root[data-theme='dark'] .share-panel,
body.theme-dark .share-panel {
  background-color: #2c2c2c !important;
  color: #e0e0e0 !important;
  border-color: #444444 !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
}

/* 在文件末尾添加 */

/* 确保深色模式下的 Markdown 内容样式覆盖 */
:deep(.theme-dark .article-container .markdown-body),
:deep([data-theme='dark'] .article-container .markdown-body) {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 代码高亮 - 针对特定主题进行覆盖 */
:deep(.theme-dark .hljs),
:deep([data-theme='dark'] .hljs) {
  background-color: #2c2c2c !important;
}

:deep(.theme-dark .hljs-keyword),
:deep([data-theme='dark'] .hljs-keyword) {
  color: #ff79c6 !important;
}

:deep(.theme-dark .hljs-string),
:deep([data-theme='dark'] .hljs-string) {
  color: #f1fa8c !important;
}

:deep(.theme-dark .hljs-comment),
:deep([data-theme='dark'] .hljs-comment) {
  color: #6272a4 !important;
}

:deep(.theme-dark .hljs-function),
:deep([data-theme='dark'] .hljs-function) {
  color: #50fa7b !important;
}

:deep(.theme-dark .hljs-number),
:deep([data-theme='dark'] .hljs-number) {
  color: #bd93f9 !important;
}

:deep(.theme-dark .hljs-title),
:deep([data-theme='dark'] .hljs-title) {
  color: #50fa7b !important;
}

:deep(.theme-dark .hljs-params),
:deep([data-theme='dark'] .hljs-params) {
  color: #ffb86c !important;
}

:deep(.theme-dark .hljs-built_in),
:deep([data-theme='dark'] .hljs-built_in) {
  color: #8be9fd !important;
}

/* 上一篇/下一篇导航 */
:deep(.theme-dark .pagination-post),
:deep([data-theme='dark'] .pagination-post) {
  background-color: #1e1e1e !important;
}

:deep(.theme-dark .pagination-post > div),
:deep([data-theme='dark'] .pagination-post > div) {
  background-color: #2c2c2c !important;
}


:deep(.theme-dark .post-info),
:deep([data-theme='dark'] .post-info) {
  background-color: rgba(0, 0, 0, 0.6) !important;
}

:deep(.theme-dark .post-title),
:deep([data-theme='dark'] .post-title) {
  color: #e0e0e0 !important;
}

:deep(.theme-dark .label),
:deep([data-theme='dark'] .label) {
  color: #b0b0b0 !important;
}

/* 深色模式覆盖样式 */
body.theme-dark .markdown-body,
[data-theme='dark'] .markdown-body {
  color-scheme: dark !important;
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
}

/* 分享下拉菜单深色模式 */
body.theme-dark .share-dropdown,
[data-theme='dark'] .share-dropdown {
  background-color: #1e1e1e !important;
  border-color: #444444 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

body.theme-dark .share-title,
[data-theme='dark'] .share-title {
  color: #e0e0e0 !important;
  border-bottom-color: #444444 !important;
}

body.theme-dark .share-item,
[data-theme='dark'] .share-item {
  background-color: #333333 !important;
}

body.theme-dark .platform-name,
[data-theme='dark'] .platform-name {
  color: #d4d4d4 !important;
}

/* 微信分享对话框深色模式 */
body.theme-dark .wechat-share-dialog,
[data-theme='dark'] .wechat-share-dialog {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

body.theme-dark .wechat-share-link,
[data-theme='dark'] .wechat-share-link {
  background-color: #333333 !important;
  color: #d4d4d4 !important;
  border-color: #444444 !important;
}

/* 确保 Vuetify 对话框在深色模式下正确显示 */
body.theme-dark .v-dialog,
[data-theme='dark'] .v-dialog {
  background-color: #1e1e1e !important;
}

/* 深色模式覆盖样式 */
body.theme-dark .markdown-body,
[data-theme='dark'] .markdown-body {
  color-scheme: dark !important;
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
}

/* 标题 */
body.theme-dark .markdown-body h1,
body.theme-dark .markdown-body h2,
body.theme-dark .markdown-body h3,
body.theme-dark .markdown-body h4,
body.theme-dark .markdown-body h5,
body.theme-dark .markdown-body h6,
[data-theme='dark'] .markdown-body h1,
[data-theme='dark'] .markdown-body h2,
[data-theme='dark'] .markdown-body h3,
[data-theme='dark'] .markdown-body h4,
[data-theme='dark'] .markdown-body h5,
[data-theme='dark'] .markdown-body h6 {
  color: #e6edf3 !important;
  border-bottom-color: #30363d !important;
}

/* 代码高亮 - VS Code Dark+ 风格 */
body.theme-dark .hljs,
[data-theme='dark'] .hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #d4d4d4 !important;
  background: #1e1e1e !important;
}

body.theme-dark .hljs-keyword,
body.theme-dark .hljs-literal,
body.theme-dark .hljs-symbol,
body.theme-dark .hljs-name,
[data-theme='dark'] .hljs-keyword,
[data-theme='dark'] .hljs-literal,
[data-theme='dark'] .hljs-symbol,
[data-theme='dark'] .hljs-name {
  color: #569cd6 !important;
}

body.theme-dark .hljs-string,
[data-theme='dark'] .hljs-string {
  color: #ce9178 !important;
}

body.theme-dark .hljs-comment,
[data-theme='dark'] .hljs-comment {
  color: #6a9955 !important;
  font-style: italic !important;
}

body.theme-dark .hljs-function,
[data-theme='dark'] .hljs-function {
  color: #dcdcaa !important;
}

body.theme-dark .hljs-built_in,
[data-theme='dark'] .hljs-built_in {
  color: #4ec9b0 !important;
}

body.theme-dark .hljs-number,
[data-theme='dark'] .hljs-number {
  color: #b5cea8 !important;
}

body.theme-dark .hljs-attr,
[data-theme='dark'] .hljs-attr {
  color: #9cdcfe !important;
}

body.theme-dark .hljs-title,
[data-theme='dark'] .hljs-title {
  color: #dcdcaa !important;
}

/* 其他元素 */
body.theme-dark .markdown-body blockquote,
[data-theme='dark'] .markdown-body blockquote {
  color: #8b949e !important;
  border-left-color: #30363d !important;
  background-color: #161b22 !important;
}

body.theme-dark .markdown-body pre,
[data-theme='dark'] .markdown-body pre {
  background-color: #161b22 !important;
  border-color: #30363d !important;
}

body.theme-dark .markdown-body code,
[data-theme='dark'] .markdown-body code {
  background-color: rgba(110, 118, 129, 0.4) !important;
  color: #c9d1d9 !important;
}

body.theme-dark .markdown-body a,
[data-theme='dark'] .markdown-body a {
  color: #58a6ff !important;
}

/* 表格样式 */
body.theme-dark .markdown-body table tr,
[data-theme='dark'] .markdown-body table tr {
  background-color: #0d1117 !important;
  border-color: #30363d !important;
}

body.theme-dark .markdown-body table tr:nth-child(2n),
[data-theme='dark'] .markdown-body table tr:nth-child(2n) {
  background-color: #161b22 !important;
}

body.theme-dark .markdown-body table th,
body.theme-dark .markdown-body table td,
[data-theme='dark'] .markdown-body table th,
[data-theme='dark'] .markdown-body table td {
  border-color: #30363d !important;
}

/* 确保深色模式下的统一背景色 */
body.theme-dark .article-wrapper,
body.theme-dark .article-container,
body.theme-dark .markdown-body,
[data-theme='dark'] .article-wrapper,
[data-theme='dark'] .article-container,
[data-theme='dark'] .markdown-body {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 确保 ByteMD 区域与周围容器颜色一致 */
body.theme-dark .bytemd,
body.theme-dark .bytemd-preview,
body.theme-dark .bytemd-body,
[data-theme='dark'] .bytemd,
[data-theme='dark'] .bytemd-preview,
[data-theme='dark'] .bytemd-body {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* 强制覆盖任何其他可能的样式 */
body.theme-dark [class*="article"],
body.theme-dark [class*="bytemd"],
[data-theme='dark'] [class*="article"],
[data-theme='dark'] [class*="bytemd"] {
  background-color: #1e1e1e !important;
}

/* Mermaid 图表特殊处理 */
body.theme-dark .bytemd-mermaid,
[data-theme='dark'] .bytemd-mermaid {
  background-color: #1e1e1e !important;
}

body.theme-dark .bytemd-mermaid .actor,
[data-theme='dark'] .bytemd-mermaid .actor {
  fill: #2c2c2c !important;
  stroke: #555555 !important;
}

body.theme-dark .bytemd-mermaid text.actor,
[data-theme='dark'] .bytemd-mermaid text.actor {
  fill: #e0e0e0 !important;
  stroke: none !important;
}

body.theme-dark .bytemd-mermaid .messageLine0,
body.theme-dark .bytemd-mermaid .messageLine1,
[data-theme='dark'] .bytemd-mermaid .messageLine0,
[data-theme='dark'] .bytemd-mermaid .messageLine1 {
  stroke: #aaaaaa !important;
}

/* 确保 v-card 容器也保持一致的背景色 */
body.theme-dark .v-card,
[data-theme='dark'] .v-card {
  background-color: #1e1e1e !important;
}

/* 图表中的矩形使用稍深的颜色以区分 */
body.theme-dark .bytemd-mermaid rect,
[data-theme='dark'] .bytemd-mermaid rect {
  fill: #2c2c2c !important;
}

/* 图表中的文本保持浅色 */
body.theme-dark .bytemd-mermaid text,
[data-theme='dark'] .bytemd-mermaid text {
  fill: #e0e0e0 !important;
}

/* 确保深色模式下也保持透明 */
body.theme-dark .article-info-container,
[data-theme='dark'] .article-info-container,
.theme--dark .article-info-container {
  background-color: transparent !important;
}
/* 确保深色模式下也保持透明 */
body.theme-dark .article-info,
[data-theme='dark'] .article-info,
.theme--dark .article-info {
  background-color: transparent !important;
}

/* 确保深色模式下也保持透明 */
body.theme-dark .article-category,
[data-theme='dark'] .article-category,
.theme--dark .article-category {
  background-color: transparent !important;
}


body.theme-dark .article-title,
[data-theme='dark'] .article-title,
.theme--dark .article-title {
  background-color: transparent !important;
}

/* 小红书分享对话框样式 */
.redbook-share-dialog {
  padding: 15px 0;
}

.redbook-steps {
  padding-left: 20px;
  margin: 15px 0;
  line-height: 1.6;
}

.redbook-share-link-container {
  margin: 15px 0;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
}

.redbook-share-link {
  word-break: break-all;
  font-size: 14px;
  color: #333;
  font-family: monospace;
}

/* 深色模式下的样式 */
.theme--dark .redbook-share-link-container,
[data-theme='dark'] .redbook-share-link-container,
body.theme-dark .redbook-share-link-container {
  background-color: #333;
}

.theme--dark .redbook-share-link,
[data-theme='dark'] .redbook-share-link,
body.theme-dark .redbook-share-link {
  color: #ddd;
}

/* 深色模式下分享项的样式调整 */
.theme--dark .share-item:hover,
[data-theme='dark'] .share-item:hover,
body.theme-dark .share-item:hover {
  background-color: #333;
}

.theme--dark .icon-wrapper,
[data-theme='dark'] .icon-wrapper,
body.theme-dark .icon-wrapper {
  background-color: #333;
}

.theme--dark .share-item,
[data-theme='dark'] .share-item,
body.theme-dark .share-item {
  color: #ccc;
}
</style>