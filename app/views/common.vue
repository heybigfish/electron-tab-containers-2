<template>
  <div id="app-bar">
    <div id="app-title">选择数据</div>
  </div>
  <div class="iframe-container">
    <el-table
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      border
      stripe
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
      >
      </el-table-column>
    </el-table>
    <div class="mb-4 footer">
      <el-button @click="close"
        >取消</el-button
      >
      <el-button
        type="primary"
        @click="submit"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  ref,
  getCurrentInstance
} from 'vue'
import { ElMessage } from 'element-plus'
export default {
  setup(content) {
    const tableData = ref([])
    const columns = [
      {
        id: 'title',
        label: '标题'
      },
      {
        id: 'uptime',
        label: '时间'
      },
      {
        id: 'source',
        label: '地址'
      }
    ]
    // 组件名称
    const instance = getCurrentInstance()
    const currentValue = ref('')
    // 获取单选的值
    const handleCurrentChange = (val) => {
      console.log(val)
      currentValue.value = val
    }
    const submit = () => {
      if (!currentValue.value) {
        ElMessage.error('请选择数据！')
        return
      }
      window.$cgnb.$selectData(
        JSON.stringify(currentValue.value)
      )
    }
    const getData = () => {
      if (
        !window.$cgnb ||
        !window.$cgnb.$queryData
      ) {
        setTimeout(() => {
          getData()
        }, 1000)
        return
      }
      const { info } =
        window.$cgnb.$queryData()

      tableData.value = JSON.parse(info)
    }

    onMounted(() => {
      console.log('onMounted')
      getData()
      // 这与在模板或计算属性中直接使用 `this` 相似
    })
    onUnmounted(() => {
      console.log('onUnmounted')
      window.$cgnb.$closeChild('destory')
      window.$cgnb.$queryData('destory')
      window.$cgnb.$selectData('', 'destory')
    })

    const close = () => {
      console.log('close')

      window.$cgnb.$closeChild()
    }
    return {
      tableData,
      submit,
      handleCurrentChange,
      columns,
      close
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
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
.footer {
  margin-top: 20px;
  text-align: center;
}
</style>
