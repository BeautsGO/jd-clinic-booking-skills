---
name: jd-clinic-booking-skills
title: JD皮肤科预约 JD Clinic Booking Skills
entry: api/skill.js
version: 1.0.0
tags:
  - JD皮肤科
  - JD Clinic
  - 韩国
  - 皮肤科
  - 首尔
  - 江南
  - 预约
  - 医美
  - booking
description: "JD皮肤科+更多医院独立预约技能合集 — 查看预约指南、一键预约、在线咨询、价格查询。位于首尔江南区新沙洞，以水光针/皮肤管理/玻尿酸闻名。"
---

# JD皮肤科预约助手

根据用户输入，为 JD皮肤科 提供完整的预约服务。支持查看指南、打开页面、提交预约、咨询客服、查询价格。

## 依赖

无外部依赖（纯 Node.js 内置模块）

## 入口

`api/skill.js` 导出 `processQuery(query, lang, context)` 函数

| 参数 | 类型 | 说明 |
|------|------|------|
| query | string | 用户输入 |
| lang | string | 语言代码 zh/en，默认 zh |
| context | object | 多轮对话上下文 |

## 意图流程

### 第1轮：查看预约指南（view）

**输入：** `{ "query": "JD皮肤科怎么预约" }`

**处理：** 调用 `core/service.js` → `renderer.js` 渲染预约指南

**输出：** 包含5大渠道的预约指南 + 后续操作建议

### 第2轮：打开医院页面（open）

**输入：** `{ "query": "打开链接" }`（需 context 中有医院信息）

**执行：** `node api/browser/open-url.js <url>`

**输出：** ✅ 已打开 JD皮肤科 的详情页面

### 第3轮：提交预约（book）

**输入：** `{ "query": "帮我预约" }`（首次）

**输出：** 询问日期、人数、联系方式等信息

**输入：** `{ "query": "2人，3月26日下午，电话19102044571" }`

**处理：** `preprocessor.parseFormInput()` 解析 → `submitBookingApi()` 提交

**输出：** ✅ 预约已提交 + 信息摘要

### 第4轮：咨询客服（consult）

**输入：** `{ "query": "咨询客服" }`

**执行：** `node api/browser/open-url.js <chat_url>`

> `chat_url` = `https://i.beautsgo.com/cn/hospital/jd-clinic-chat`

### 第5轮：查价格（price）

**输入：** `{ "query": "Onda 价格" }`

**处理：** API 查项目价格 → 有数据则展示，无则打开价格表页

> `price_url` = `https://i.beautsgo.com/cn/hospital/jd-clinic-price`

## 数据

- 医院数据：`data/hospital.json`（单条记录）
- 预约模板：`templates/booking.tpl`
- 多语言：`i18n/zh.json` / `i18n/en.json`

## 与 beautsgo-booking 的区别

本技能为单医院专用版，无需医院名匹配/多医院搜索/推荐系统。代码更精简，意图检测更直接聚焦。
