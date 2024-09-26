<template>
  <div id="app-bar">
    <div id="app-title">
      vue-cli-electron-template
    </div>
    <div id="app-action">
      <div class="app-action-button" @click='edit'>
        编辑
      </div>
      <div class="app-action-button" @click='minimize'>
        <SvgIcon name="hidden" />
      </div>
      <div class="app-action-button" @click='maximize'>
        <SvgIcon name="fullsize" />
      </div>
      <div
        class="app-action-button button-red"
        @click='close'
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
</template>

<script setup>
import SvgIcon from './components/SvgIcon.vue'
import { onMounted } from 'vue'
const minimize = () => {
  window.$gnb.$minimize()
}
const maximize = () => {
  window.$gnb.$maximize()
}
const close = () => {
  window.$gnb.$close()
}
const edit = () => {
  const documet = window.$gnb.$insert()
  console.log('🚀 ~ edit ~ documet:', documet)
}
onMounted(() => {
  const script =
    document.createElement('script')
  script.src = './render/main.ts'
  script.type = 'module'
  script.onload = () => {
    console.log('第三方库加载成功')
    // 可以在这里调用第三方库提供的方法
  }
  script.onerror = () => {
    console.error('第三方库加载失败')
  }

  // 将script标签添加到head或body中
  document.head.appendChild(script)
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
}

#app-action {
  padding: 0;
  font-size: 12px;
  display: flex;
  -webkit-app-region: no-drag;
  text-align: center;
}
</style>
