# JD皮肤科预约技能 (jd-booking)

> 韩国首尔江南区 JD皮肤科（JD Clinic）独立预约助手

## 功能

| 功能 | 说明 |
|------|------|
| 📖 预约指南 | 查看 JD皮肤科 的详细预约流程（iOS/Android/微信/网页） |
| 🔗 打开链接 | 打开医院 BeautsGO 详情页 |
| ⚡ 帮我预约 | 收集信息 → 自动提交预约 API |
| 💬 咨询客服 | 打开在线客服对话页面 |
| 💰 查价格 | 查询项目价格（API 优先 → 打开价格表页） |
| 📲 下载APP | BeautsGO App 下载链接 |

## 使用方式

作为 AI 技能加载后，用户可以说：

- 「JD皮肤科怎么预约」— 查看预约指南
- 「帮我预约」— 开始预约流程
- 「2人，3月26日下午」— 填写预约信息
- 「查价格」— 查看项目价格
- 「Onda 价格」— 查询具体项目价格
- 「咨询客服」— 打开在线客服
- 「打开链接」— 打开医院详情页
- 「下载APP」— 获取下载链接

## 项目结构

```
jd-booking/
├── api/
│   ├── skill.js              ← 主入口
│   └── browser/
│       └── open-url.js       ← 安全打开浏览器
├── core/
│   ├── preprocessor.js       ← 意图识别 & 表单解析
│   ├── renderer.js           ← 模板渲染引擎
│   └── service.js            ← 服务编排
├── data/
│   └── hospital.json         ← JD皮肤科 数据
├── i18n/
│   ├── zh.json               ← 中文文案
│   └── en.json               ← 英文文案
├── templates/
│   └── booking.tpl           ← 预约指南模板
├── skills/                   ← 子技能目录（预留）
├── skill.json                ← ClawHub 技能元数据
├── package.json
└── README.md
```

## 与 beautsgo-booking 的区别

| 维度 | beautsgo-booking | jd-booking |
|------|-----------------|------------|
| 覆盖医院 | 1300+ 家 | 仅 JD皮肤科 1家 |
| 医院匹配 | 5 维模糊匹配 | 无需匹配，直连 |
| 代码量 | 970 行 | ~350 行 |
| 复杂度 | 高 | 低（精简专用） |
| 预处理器 | 大量 stop words | 只做意图检测 |
