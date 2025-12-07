<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene === 0">
        <el-button type="primary" size="default" icon="Plus" @click="addSpu">
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="SPU名称"
            prop="spuName"
            width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="280px" align="center">
            <!-- row:即为已有的SPU对象 -->
            <template v-slot="{ row }">
              <el-button
                type="primary"
                color="orange"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSpu"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu"
              ></el-button>
              <el-button
                type="primary"
                color="skyblue"
                size="small"
                icon="View"
                title="查看SKU列表"
                @click=""
              ></el-button>
              <el-popconfirm
                :title="`确定删除 ${row.spuName} ?`"
                width="200px"
                @confirm=""
              >
                <template #reference>
                  <el-button
                    type="primary"
                    color="red"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="changePageNo"
          @size-change="sizeChange"
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :size="size"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
        />
      </div>
      <SpuForm v-show="scene === 1" @changeScene="changeScene"></SpuForm>
      <!-- 自定义事件 -->
      <SkuForm v-show="scene === 2" @changeScene="changeScene"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Spu">
// 引入子组件
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
import { ref, watch } from 'vue'
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu'
import {
  type Records,
  type HasSpuResponseData,
  type SpuData,
  type SkuInfoData,
  type SkuData,
} from '@/api/product/spu/type'
// 引入分类的仓库
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
// 场景的数据
let scene = ref<number>(0) // 0 显示已有SPU 1 添加或者修改SPU 2 添加SKU
// 当前页码
let pageNo = ref<number>(1)
// 每页展示数据的条数
let pageSize = ref<number>(3)
// 分页器大小
const size = ref('default')
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有的SPU的数据
let records = ref<Records>([])

// 监听三级分裂ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
// 此方法执行可以获取某一个三级分类下的全部已有的SPU
const getHasSpu = async (pager = 1) => {
  // 修改当前的页码
  pageNo.value = pager
  const result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
const changePageNo = () => {
  // 当前页面发生变化的时候再次发请求获取对应已有品牌数据展示
  getHasSpu()
}

// 当下拉菜单变化的时候会触发此方法
// pagination 会将下拉菜单中选中数据返回
const sizeChange = () => {
  // 当前页显示数量变化的时候，当前页面归1
  pageNo.value = 1
  getHasSpu()
}

// 添加新的SPU按钮回调
const addSpu = () => {
  // 切换为场景1：添加与修改已有SPU结构->SpuForm
  scene.value = 1
}
// 修改SPU
const updateSpu = () => {
  scene.value = 1
}
// 子组件SpuForm绑定自定义事件：目前是让子组件通知父组件切换场景为 0
const changeScene = (obj: any) => {
  // 子组件SpuForm点击取消变为场景 0
  scene.value = obj.flag
  if (obj.params === 'add') {
    // 添加跳转第一页
    getHasSpu()
  } else {
    // 更新留在当前页码
    getHasSpu(pageNo.value)
  }
}
</script>

<style></style>
