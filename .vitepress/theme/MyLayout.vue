<template>
    <Layout>
      <template #doc-footer-before>
        <ClientOnly>
          <Copyright v-if="(frontmatter?.aside ?? true) && (frontmatter?.showArticleMetadata ?? true) && !(frontmatter.authorLink)" :key="md5(page.relativePath)" />
        </ClientOnly>
      </template>
      <template #doc-after>
        <Comment v-if="(theme.commentConfig?.showComment ?? true) && (frontmatter?.showComment ?? true)" :commentConfig="theme.commentConfig" :key="md5(page.relativePath)" />
        <!-- <Comment :key="num" /> -->
      </template>
      <template #layout-bottom>
        <Footer v-if="!hasSidebar && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" />
      </template>
    </Layout>
  </template>
  
  <script lang="ts" setup>
import { watch, ref, computed } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import md5 from 'blueimp-md5';
import Copyright from './components/layout/Copyright.vue';
import Comment from './components/layout/Comment.vue';
// import Footer from './components/layout/Footer.vue';
import { useRoute } from 'vitepress'

const { Layout } = DefaultTheme;
const { page, theme, frontmatter } = useData();
const hasSidebar = computed(() => {
  return (
    frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
  )
});
const route = useRoute()
const num = ref(0)

watch(
  () => route.path,
  () => {
    num.value++
  }
)
</script>
  
  <style scoped></style>