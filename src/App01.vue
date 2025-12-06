<template>
  <div>
    <h1>svg测试</h1>
    <!-- svg:图标外层容器节点，内部需要use标签结合使用 -->
    <!-- <svg style="width: 30px;height: 30px;"> -->
    <!-- xlink:href: 引用外部svg文件 属性值务必#icon-图标名字  -->
    <!-- <use xlink:href="#icon-phone" fill="blue"></use> -->
    <!-- </svg> -->
    <svg-icon name="home" color="pink" width="30px" height="30px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
/* import request from '@/utils/request'
import { onMounted } from 'vue';
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  }).then(res => {
    console.log(res);
  })
}); */
/* import { onMounted } from 'vue'
import { reqLogin } from './api/user'
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' }).then((res) => {
    console.log(res)
  })
}) */
</script>

<style scoped lang="scss">
div {
  h1 {
    color: rgb(24, 221, 57);
  }
}
</style>
<!-- <template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="default" :icon="Edit">编辑按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete">禁用按钮</el-button>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const size = ref<ComponentSize>('default')
const disabled = ref(false)
const background = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped></style>
 -->
