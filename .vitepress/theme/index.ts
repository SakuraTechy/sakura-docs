import { h, nextTick, onMounted, watch } from 'vue'
import { type Theme } from 'vitepress'
import HomeSponsors from './components/HomeSponsors.vue';
import DefaultTheme from 'vitepress/theme'
import AsideSponsors from './components/AsideSponsors.vue'
import VueMasteryBanner from './components/VueMasteryBanner.vue'
import TranslationStatus from 'vitepress-translation-helper/ui/TranslationStatus.vue'
import './styles/vars.css'
import './styles/playground-links.css'
import VueSchoolLink from './components/VueSchoolLink.vue'
import VueMasteryLogoLink from './components/VueMasteryLogoLink.vue'
import status from '../translation-status.json'
import ZoomImg from './components/ZoomImg.vue'
import HomePreview from './components/HomePreview.vue'
import mediumZoom from 'medium-zoom'
import { useRoute } from 'vitepress'
import MyLayout from './MyLayout.vue';
// import VideoGlass from './components/Video/VideoGlass.vue'

const i18nLabels = {
  zh: '该翻译已同步到了 ${date} 的版本，其对应的 commit hash 是 <code>${hash}</code>。',
}

const theme: Theme = {
  ...DefaultTheme,
  Layout() {
    // return h(DefaultTheme.Layout, null, {
    //   // 'home-features-after': () => h(HomePreview),
    //   // 'home-features-after': () => h(HomeSponsors),
    //   // 'aside-ads-before': () => h(AsideSponsors),
    //   // 'layout-top': () => h(VueMasteryBanner),
    //   // 'doc-before': () => h(TranslationStatus, { status, i18nLabels }),
    // })
    return h(MyLayout, null, {})
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('[data-zoomable]', { background: '#ffffff'})
    }
    onMounted(() => initZoom())
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
    
  },
  enhanceApp({ app, router, siteData }) {
    app.component('ZoomImg', ZoomImg)
    // app.component('VideoGlass', VideoGlass)
    // app.component('VueSchoolLink', VueSchoolLink)
    // app.component('VueMasteryLogoLink', VueMasteryLogoLink)
  },
}

export default theme
