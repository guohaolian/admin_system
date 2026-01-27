# 光伏预测运营平台（管理端）

一个基于 Vue 3 + TypeScript + Vite 的后台管理系统与数据大屏示例，包含登录鉴权、动态路由、权限管理、商品管理、以及可视化数据大屏等模块。

## 功能概览

- 登录与鉴权（全局路由守卫）
- 动态路由与权限菜单
- 权限管理（用户 / 角色 / 菜单）
- 商品管理（品牌 / 属性 / SPU / SKU）
- 数据大屏可视化展示
- SVG 图标与 Element Plus 图标全局注册
- Mock 数据支持（开发环境）

## 技术栈

- Vue 3 + TypeScript
- Vite
- Pinia
- Vue Router
- Element Plus
- SCSS
- Vite 插件：SVG 图标、Mock、Vue DevTools

## 目录结构（节选）

```
src/
	api/                # 接口请求与类型定义
	components/         # 通用组件
	directive/          # 自定义指令
	layout/             # 布局
	router/             # 路由与动态路由
	store/              # Pinia 状态管理
	styles/             # 全局样式
	utils/              # 工具方法
	views/              # 业务页面
		login/            # 登录
		acl/              # 权限管理
		product/          # 商品管理
		screen/           # 数据大屏
mock/                 # Mock 数据
```

## 快速开始

1) 安装依赖

```
pnpm install
```

2) 启动开发服务

```
pnpm dev
```

3) 构建生产包

```
pnpm build
```

4) 本地预览

```
pnpm preview
```

## 账号说明（默认）

默认登录示例账号：

- 用户名：admin
- 密码：111111

如需对接真实接口，请替换为后端系统实际账号。

## 环境变量

请在 .env.* 中配置以下变量，用于代理与后端服务地址：

- VITE_APP_BASE_API：接口前缀（默认 /api）
- VITE_SERVE：后端服务地址

相关代理配置见 [vite.config.ts](vite.config.ts)。

## 路由与权限

- 常量路由、动态路由配置见 [src/router/routes.ts](src/router/routes.ts)
- 路由鉴权逻辑见 [src/permisstion.ts](src/permisstion.ts)
- 用户状态与动态路由注入见 [src/store/modules/user.ts](src/store/modules/user.ts)

## 数据大屏

大屏入口：/screen

- 主页面见 [src/views/screen/index.vue](src/views/screen/index.vue)
- 各可视化子组件见 [src/views/screen/components](src/views/screen/components)

## 运行说明

开发环境默认启用 Mock（见 [vite.config.ts](vite.config.ts)），如需对接真实接口，请关闭 Mock 或配置后端地址。

## 许可证

本项目仅用于学习与交流，如需商用请自行评估与补充版权声明。
