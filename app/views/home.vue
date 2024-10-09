<template>
  <div class="page-container">
    <div id="app-bar">
      <div id="app-title">app</div>
      <div id="app-action">
        <div
          class="app-action-button"
          @click="edit"
          v-show="showTools"
        >
          操作
        </div>
        <div
          class="app-action-button"
          @click="minimize"
        >
          <SvgIcon name="hidden" />
        </div>
        <div
          class="app-action-button"
          @click="maximize"
        >
          <SvgIcon name="fullsize" />
        </div>
        <div
          class="app-action-button button-red"
          @click="close"
        >
          <SvgIcon name="exit" />
        </div>
      </div>
    </div>

    <div class="container content">
      <tab-group
        class="tab-group"
        new-tab-button="true"
      ></tab-group>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { onMounted, ref } from 'vue'
import { apiTest } from '@/api'
import { setTabGroup } from '../../render/main.ts'
const showTools = ref(true)
const minimize = () => {
  window.$gnb.$minimize()
}
const maximize = () => {
  window.$gnb.$maximize()
}
const close = () => {
  window.$gnb.$close()
}
const edit = async () => {
  const res = await apiTest({
    pageNum: 1,
    pageSize: 10
  })
  const data = res.data.data.records
  window.$gnb.$dialog(JSON.stringify(data))
}
// vue实例对象

onMounted(() => {
  window.$gnb.$showTools((data) => {
    console.log('🚀 ~ window.$gnb.$showTools ~ data:', data)
    // showTools.value = false
    if(data.url&& data.url ==='https://etax.ningbo.chinatax.gov.cn:8443/'){
      showTools.value = true
    }else{
      showTools.value = false
    }
  })
  setTabGroup()
})
</script>

<style scoped>
input {
  outline: none;
}

a {
  outline: none;
  text-decoration: none;
  -webkit-user-drag: none;
  color: #b2ccd6;
}

img {
  -webkit-user-drag: none;
}

#app-bar {
  background-color: #263238;
  color: #b2ccd6;
  display: flex;
  -webkit-app-region: drag;
  height: 32px;
  justify-content: space-between;
}

#app-title {
  flex: 1;
  padding: 7px 15px;
  font-size: 12px;
  line-height: 18px;
}

#app-action {
  padding: 0;
  font-size: 16px;
  display: flex;
  -webkit-app-region: no-drag;
  text-align: center;
}

.app-action-button {
  padding: 0 8px;
  color: #fff;
  transition: 0.2s ease;
  opacity: 0.7;
  line-height: 32px;
  height: 30px;
}

.app-action-button:hover {
  background-color: #436677;
  opacity: 1;
}

.app-action-button:active {
  background-color: #3a4a52;
}

.button-red:hover {
  background-color: #3a4a52;
}

.button-red:active {
  background-color: #c11818;
}

#routers {
  padding: 80px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2b8059;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  border: 1px solid #f40;
  position: relative;
  z-index: 1;
}

#app-action {
  padding: 0;
  font-size: 12px;
  display: flex;
  -webkit-app-region: no-drag;
  text-align: center;
}
.page-container {
  width: 100%;
  height: 100%;
}
</style>
