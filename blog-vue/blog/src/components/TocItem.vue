<template>
  <div class="toc-item-wrapper">
    <div
        class="toc-item"
        :class="[
        `toc-level-${item.level}`,
        {
          active: currentIndex === item.index,
          'has-children': item.hasChildren,
          expanded: isExpanded(item)
        }
      ]"
        @click="handleClick"
    >
      <span class="toc-arrow" v-if="item.hasChildren">
        {{ isExpanded(item) ? '▼' : '▶' }}
      </span>
      {{ item.text }}
    </div>

    <!-- 如果有子项，递归渲染 -->
    <div
        v-if="item.hasChildren"
        class="toc-children"
        :class="{ expanded: isExpanded(item) }"
    >
      <TocItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :currentIndex="currentIndex"
          :isExpanded="isExpanded"
          :handleTocItemClick="handleTocItemClick"
          :scrollToHeading="scrollToHeading"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TocItem',
  props: {
    item: Object,
    currentIndex: Number,
    isExpanded: Function,
    handleTocItemClick: Function,
    scrollToHeading: Function
  },
  methods: {
    handleClick() {
      if (this.item.hasChildren) {
        this.handleTocItemClick(this.item);
      } else {
        this.scrollToHeading(this.item.id);
      }
    }
  }
};
</script>