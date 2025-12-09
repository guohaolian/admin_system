<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene === 0">
        <el-button type="primary" size="default" icon="Plus" @click="addSpu">
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="100px" align="center"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="280px" align="center">
            <!-- row:即为已有的SPU对象 -->
            <template v-slot="{ row }">
              <el-button type="primary" color="orange" size="small" icon="Plus" title="添加SKU"
                @click="addSku(row)"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" color="skyblue" size="small" icon="View" title="查看SKU列表"
                @click="getSku(row)"></el-button>
              <el-popconfirm :title="`确定删除 ${row.spuName} ?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="primary" color="red" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changePageNo" @size-change="changeSize" v-model:current-page="pageNo"
          v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :background="true" :size="size"
          layout="prev, pager, next, jumper, ->, sizes, total" :total="total"></el-pagination>
      </div>
      <SpuForm ref="spu" v-show="scene === 1" @changeScene="changeScene"></SpuForm>
      <!-- 自定义事件 -->
      <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene"></SkuForm>
      <!-- dialog对话框：展示已有的SKU数据 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table :data="skuArr" border>
          <el-table-column label="SKU 名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU 价格" prop="price"></el-table-column>
          <el-table-column label="SKU 重量" prop="weight"></el-table-column>
          <el-table-column label="SKU 图片">
            <template v-slot="{ row }">
              <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Spu">
// 引入子组件
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu'

import type {
  Records,
  HasSpuResponseData,
  SpuData,
  SkuInfoData,
  SkuData,
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
let spu = ref<any>()
// 获取子组件实例SkuForm
let sku = ref<any>()
// 存储全部SKU数据
let skuArr = ref<SkuData[]>([])
// 控制 dialog 显示与隐藏
let show = ref<boolean>(false)

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
const changePageNo = (a: number) => {
  // 当前页面发生变化的时候再次发请求获取对应已有品牌数据展示
  getHasSpu(a)
}

// 当下拉菜单变化的时候会触发此方法
// pagination 会将下拉菜单中选中数据返回
const changeSize = () => {
  // 当前页显示数量变化的时候，当前页面归1
  pageNo.value = 1
  getHasSpu()
}

// 添加新的SPU按钮回调
const addSpu = () => {
  // 切换为场景1：添加与修改已有SPU结构->SpuForm
  scene.value = 1
  // 点击添加SPU按钮，调用子组件的方法初始化数据
  spu.value.initAddSpu(categoryStore.c3Id)
}
// 修改SPU
const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 调用子组件实例方法获取完整已有SPU的数据
  spu.value.initHasSpuData(row)
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
// 添加SKU
const addSku = (row: SpuData) => {
  // 切换为场景2
  scene.value = 2
  // 调用子组件的方法初始化添加SKU的数据
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

// 展示 SKU
const getSku = async (row: SpuData) => {
  const result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code === 200) {
    skuArr.value = result.data
    // 显示对话框
    show.value = true
  }
}

// 删除SPU
const deleteSpu = async (row: SpuData) => {
  const result: any = await reqRemoveSpu(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 获取一次已有的SPU
    getHasSpu(records.value.length > 0 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style></style>
