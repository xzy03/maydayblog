let isMathjaxConfig = false;
// 初始化 MathJax 配置
// 该函数用于配置 MathJax 的渲染方式和行为
// 需要在页面加载时调用一次
// 确保 MathJax 库已经加载
// 如果 MathJax 已经配置过，则不再重复配置
// 该函数会设置 MathJax 的配置选项，包括输入输出格式、数学公式的标记等
// 以及禁用处理消息的显示
const initMathjaxConfig = () => {
  if (!window.MathJax) {
    return;
  }
  window.MathJax.Hub.Config({
    showProcessingMessages: false,
    messageStyle: "none",
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
      skipTags: ["script", "noscript", "style", "textarea", "pre"]
    },
    "HTML-CSS": {
      availableFonts: ["STIX", "TeX"],
      showMathMenu: false
    }
  });
  isMathjaxConfig = true;
};

// 渲染公式
// 该函数会在全局 MathJax 对象上设置配置
// 并将指定元素的内容重新渲染为数学公式
const MathQueue = function (elementId) {
  if (!window.MathJax) {
    return;
  }
  window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById(elementId)]);
};

export default {
  isMathjaxConfig,
  initMathjaxConfig,
  MathQueue,
}