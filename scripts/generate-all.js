/**
 * generate-all.js — 批量生成所有医院预约技能
 *
 * 用法: node scripts/generate-all.js
 * 输出: publish/{slug}/ 目录，每个是一个独立可发布的技能
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SHARED = path.join(ROOT, 'shared')
const HOSPITALS = path.join(ROOT, 'hospitals')
const PUBLISH = path.join(ROOT, 'publish')

// ── 医院清单 ─────────────────────────────────────────────────────────────────
const HOSPITALS_CONFIG = [
  {
    slug: 'jd',
    name: 'JD皮肤科',
    shortName: 'JD',
    enName: 'jd clinic',
    alias: 'JD皮肤科',
    description: '韩国首尔江南区人气皮肤科，以水光针/皮肤管理/玻尿酸闻名',
    tags: ['JD皮肤科','JD Clinic','韩国','皮肤科','首尔','江南','水光针','皮肤管理'],
  },
  {
    slug: 'dana',
    name: '明洞丹雅皮肤科',
    shortName: '丹雅',
    enName: 'DAN-A CLINIC',
    alias: '明洞旦娥医院',
    description: '首尔明洞人气皮肤科，提供皮肤管理、激光、注射等医美项目',
    tags: ['明洞丹雅皮肤科','丹雅','DAN-A','明洞','皮肤科','首尔','医美预约'],
  },
  {
    slug: 'deer',
    name: '鹿美人皮肤科',
    shortName: '鹿美人',
    enName: 'Lumiin Dermatology',
    alias: '루미인피부과의원',
    description: '首尔江南区皮肤科，专业皮肤管理、抗衰老、激光治疗',
    tags: ['鹿美人皮肤科','Lumiin','江南','皮肤科','首尔','皮肤管理','抗衰老'],
  },
  {
    slug: 'jeju-with',
    name: '济州岛with医院',
    shortName: 'With',
    enName: 'Jeju Island with hospital',
    alias: '济州岛with医院',
    description: '济州岛综合医院，提供皮肤科、整形、体检等医疗服务',
    tags: ['济州岛with医院','济州岛','济州','皮肤科','医疗旅游','제주','with'],
  },
  {
    slug: 'barog',
    name: 'Barog医院（江南店）',
    shortName: 'Barog',
    enName: 'barogclinic Gangnam',
    alias: 'blg',
    description: '首尔江南区Barog皮肤科，人气注射/激光/皮肤管理',
    tags: ['Barog','barog皮肤科','江南','皮肤科','首尔','注射','激光'],
  },
  {
    slug: 'maejongdeok',
    name: '梅宗德医院',
    shortName: '梅宗德',
    enName: 'maisondeM clinic',
    alias: '梅宗德M皮肤科',
    description: '首尔瑞草区梅宗德医院，M皮肤科，专业皮肤治疗与医美',
    tags: ['梅宗德医院','梅宗德','maisondeM','皮肤科','首尔','瑞草','医美'],
  },
  {
    slug: 'reberry',
    name: 'reberry医院 明洞店',
    shortName: 'reberry',
    enName: 'reberry clinic Myeongdong',
    alias: 'reberry医院 明洞店',
    description: '首尔明洞reberry皮肤科，人气皮肤管理/抗衰/激光项目',
    tags: ['reberry','reberry明洞','明洞','皮肤科','首尔','皮肤管理','抗衰'],
  },
  {
    slug: 'umi',
    name: '明洞优美皮肤科',
    shortName: 'UMI',
    enName: 'umi skin clinic',
    alias: 'umi',
    description: '首尔明洞优美(UMI)皮肤科，专业皮肤护理与医美项目',
    tags: ['明洞优美皮肤科','UMI','优美','明洞','皮肤科','首尔','皮肤管理'],
  },
]

// ── 数据映射（从 beautsgo hospitals.json 提取）──────────────────────────────
const HOSPITAL_DATA = {
  jd:     { id: 250, url: 'https://i.beautsgo.com/cn/hospital/jd-clinic?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/jd-clinic/skill',
            chat_slug: 'jd-clinic',
            zh_cn_address: '首尔市江南区江南大路616，新沙美塔底下二层（新沙洞）',
            en_address: 'B2, Shinsa Meta Building, 616 Gangnam-daero, Gangnam-gu, Seoul (Sinsa-dong)',
            ko_kr_address: '서울시 강남구 강남대로 616 , 신사미타워 지하2층 (신사동）',
            ja_address: 'ソウル特別市江南区江南大路616、新沙美塔地下2階（新沙洞）',
            th_address: '' },
  dana:   { id: 349, url: 'https://i.beautsgo.com/cn/hospital/dan-a-clinic?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/dan-a-clinic/skill',
            chat_slug: 'dan-a-clinic',
            zh_cn_address: '首尔特别市中区明洞7路21 明洞Arnuvo Centum 3楼',
            en_address: '3F, Myeongdong Arnuvo Centum, 21 Myeongdong 7-gil, Jung-gu, Seoul',
            ko_kr_address: '서울특별시 중구 명동7길 21 명동아르누보센텀 3층',
            ja_address: 'ソウル特別市中区明洞7ギル、アルヌーボセンタム3階',
            th_address: 'ชั้น 3, มยองดง อาร์นูโว เซนตัม, 21 มยองดง 7-กิล, เขตจุง, กรุงโซล' },
  deer:   { id: 358, url: 'https://i.beautsgo.com/cn/hospital/lumiin-dermatology?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/lumiin-dermatology/skill',
            chat_slug: 'lumiin-dermatology',
            zh_cn_address: '首尔市江南区宣陵路 324 号 SH 大厦 3 楼',
            en_address: '3F, SH Building, 324 Seolleung-ro, Gangnam-gu, Seoul',
            ko_kr_address: '서울 강남구 선릉로 324 SH타워 3층',
            ja_address: 'ソウル特別市江南区宣陵路324 SHビル 3階',
            th_address: 'ชั้น 3 อาคาร SH, 324 ถนนซอนลึง, เขตคังนัม, โซล' },
  'jeju-with': { id: 406, url: 'https://i.beautsgo.com/cn/hospital/jeju-island-with-hospital?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/jeju-island-with-hospital/skill',
            chat_slug: 'jeju-island-with-hospital',
            zh_cn_address: '济州特别自治道济州市老渊路34with酒店202号',
            en_address: 'Jeju, Nohyeong-ro 34, With Hotel Room 202',
            ko_kr_address: '제주특별자치도 제주시 노연로 34 위드호텔 202호',
            ja_address: '済州特別自治道済州市路淵路202番地',
            th_address: 'ห้อง 202, โรงแรม With Hotel, 34 ถนนโนยอน, เมืองเชจู' },
  barog:  { id: 209, url: 'https://i.beautsgo.com/cn/hospital/barogclinic-gangnam?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/barogclinic-gangnam/skill',
            chat_slug: 'barogclinic-gangnam',
            zh_cn_address: '首尔江南区江南大路410，宇信大厦2~3层',
            en_address: '2F–3F, WooShin Building, 410 Gangnam-daero, Gangnam-gu, Seoul',
            ko_kr_address: '서울 강남구 강남대로 410 2~3층',
            ja_address: 'ソウル江南区江南大路410、ユーシンビル2～3階',
            th_address: '' },
  maejongdeok: { id: 375, url: 'https://i.beautsgo.com/cn/hospital/maisondem-clinic?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/maisondem-clinic/skill',
            chat_slug: 'maisondem-clinic',
            zh_cn_address: '首尔特别市瑞草区江南大道433号3楼、4楼',
            en_address: '3rd and 4th floors, Star Building, 433 Gangnam-daero, Seocho-gu, Seoul',
            ko_kr_address: '서울특별시 서초구 강남대로 433 성우빌딩 3, 4층',
            ja_address: 'ソウル特別市瑞草区江南通り433番地3・4階',
            th_address: '' },
  reberry: { id: 903, url: 'https://i.beautsgo.com/cn/hospital/reberry-clinic-myeongdong?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/reberry-clinic-myeongdong/skill',
            chat_slug: 'reberry-clinic-myeongdong',
            zh_cn_address: '首尔中区明洞10街58，2楼201号、3楼301号',
            en_address: '201, 2nd Floor; 301, 3rd Floor, 58 Myeongdong 10-gil, Jung-gu, Seoul',
            ko_kr_address: '서울 중구 명동 10가 58, 2층 201호, 3층 301호',
            ja_address: 'ソウル特別市中央区明洞10街58、2階201号室、3階301号室',
            th_address: '201 ชั้น 2 และ 301 ชั้น 3 ที่ 58 ถนนมยองดง ซอก 10 ย่านจองกู กรุงโซล' },
  umi:    { id: 1048, url: 'https://i.beautsgo.com/cn/hospital/umi-skin-clinic?from=skill',
            booking_url: 'https://i.beautsgo.com/cn/hospital/umi-skin-clinic/skill',
            chat_slug: 'umi-skin-clinic',
            zh_cn_address: '首尔中区明洞7街13，2楼',
            en_address: '2nd Floor, 13 Myeongdong 7-gil, Jung-gu, Seoul',
            ko_kr_address: '서울 중구 명동 7가 13, 2층',
            ja_address: 'ソウル特別市中央区明洞7街13番地、2階',
            th_address: 'ชั้น 2 ที่ 13 ถนนมยองดง ซอย 7 ในเขตจองกูของกรุงโซล' },
}

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }) }

function readFile(p) { return fs.readFileSync(p, 'utf-8') }
function writeFile(p, c) { fs.writeFileSync(p, c, 'utf-8') }

function generateSkill(hConfig) {
  const { slug, name, shortName, enName, alias, description, tags } = hConfig
  const data = HOSPITAL_DATA[slug]
  if (!data) { console.error(`  ❌ 未找到 ${slug} 的数据`); return }

  const outDir = path.join(PUBLISH, slug)
  console.log(`\n📦 生成: ${name} (${slug})`)
  console.log(`   输出目录: ${outDir}`)

  // 创建目录结构
  ensureDir(path.join(outDir, 'api/browser'))
  ensureDir(path.join(outDir, 'core'))
  ensureDir(path.join(outDir, 'data'))
  ensureDir(path.join(outDir, 'i18n'))
  ensureDir(path.join(outDir, 'templates'))

  // 1. 复制共享代码
  writeFile(path.join(outDir, 'api/skill.js'), readFile(path.join(SHARED, 'api/skill.js')))
  writeFile(path.join(outDir, 'api/browser/open-url.js'), readFile(path.join(SHARED, 'api/browser/open-url.js')))
  writeFile(path.join(outDir, 'core/preprocessor.js'), readFile(path.join(SHARED, 'core/preprocessor.js')))
  writeFile(path.join(outDir, 'core/renderer.js'), readFile(path.join(SHARED, 'core/renderer.js')))
  writeFile(path.join(outDir, 'templates/booking.tpl'), readFile(path.join(SHARED, 'templates/booking.tpl')))

  // 2. 生成 service.js（注入医院数据路径）
  const serviceJs = `const hospital = require('../data/hospital.json')
const { render, loadI18n } = require('./renderer')

async function getBookingGuide(lang = 'zh') {
  return render(hospital, lang)
}

function getHospital() {
  return { ...hospital }
}

module.exports = { getBookingGuide, getHospital }
`
  writeFile(path.join(outDir, 'core/service.js'), serviceJs)

  // 3. 生成 hospital.json
  const hospitalJson = {
    id: data.id,
    name: name,
    alias: alias,
    en_name: enName,
    short_name: shortName,
    pinyin: '',
    pinyin_abbr: '',
    url: data.url,
    booking_url: data.booking_url,
    chat_slug: data.chat_slug,
    zh_cn_address: data.zh_cn_address,
    en_address: data.en_address,
    ko_kr_address: data.ko_kr_address,
    ja_address: data.ja_address,
    th_address: data.th_address,
    search_keywords: `${name}, ${alias}, ${enName}, ${shortName}`,
  }
  writeFile(path.join(outDir, 'data/hospital.json'), JSON.stringify(hospitalJson, null, 2))

  // 4. 生成 i18n 文案
  const zhI18n = {
    keyword_labels: ['中文名', '英文名', '拼音', '首字母'],
    not_found: `请告诉我你的需求，我帮你处理 ${name} 的预约`,
    title: `## 🏥 {name} 预约指南`,
    direct_link: `🔗 点击直达预约页面：{url}`,
    channel_ios: `一、🍎 苹果手机预约（iOS 用户）\n打开 App Store 搜索「BeautsGO」或「彼此美」，下载并安装 BeautsGO APP 📥。\n打开 APP，在顶部搜索栏输入「${name}」或「${enName}」即可找到{name}。\n进入医院页面，查看中韩文地址 📍、营业时间 ⏰、价格表 💰 及优惠活动。\n点击右下角【立即预约】或【咨询一下】，填写人数与时间提交 ✅。`,
    channel_android: `二、🤖 Android 手机预约（安卓用户）\n打开 Google Play 搜索「BeautsGO」或「彼此美」，下载安装 APP 📲。\n打开 APP，在搜索栏输入「${name}」或「${enName}」即可找到{name}。\n查看详细信息：地址、营业时间、价格、优惠活动等。\n点击【立即预约】或【咨询一下】提交 ✅。`,
    channel_wechat_mini: `三、📱 微信小程序预约（无需下载 APP）\n打开微信，搜索「BeautsGO」或「彼此美」小程序。\n进入小程序，搜索栏输入「${name}」搜索{name}。\n查看医院详情：地址、营业时间、价格表、优惠活动。\n点击【立即预约】或【咨询一下】提交预约 ✅。`,
    channel_wechat_oa: `四、🟢 微信公众号预约\n微信搜索【BeautsGO】或【彼此美】，关注公众号「BeautsGO彼此美APP」💬。\n点击左下角菜单【一键预约】，输入「${name}」进入流程 ⚡。\n💡 或在微信搜索 BeautsGOkr 添加好友直接咨询。`,
    channel_web: `五、🌐 网页版预约（电脑端推荐）\n打开浏览器访问 BeautsGO 官网：https://www.beautsgo.com\n在首页搜索框输入「${name}」找到{name}。\n查看医院完整信息：环境照片、医生团队、价格表等。\n点击【预约】按钮填写信息提交 ✅。`,
    tips: `📌 温馨提示：\n• 所有渠道均支持中/英/日/泰等多语言切换\n• 预约成功后会收到短信/APP 通知\n• 如需修改预约，请在「我的预约」中操作或联系客服\n• 客服咨询时间：9:00-18:00（北京时间）\n• 📞 紧急联系：可通过 BeautsGO App 内在线客服获得即时帮助`,
  }
  const enI18n = {
    keyword_labels: ['Chinese name', 'English name', 'Pinyin', 'Initials'],
    not_found: `Please tell me what you need — I'll help you with ${name} booking.`,
    title: `## 🏥 {name} Booking Guide`,
    direct_link: `🔗 Book directly here: {url}`,
    channel_ios: `1. 🍎 iOS Booking\nSearch "BeautsGO" on the App Store, download the app 📥.\nIn the search bar, type "${name}" or "${enName}" to find {name}.\nView address 📍, hours ⏰, price list 💰 and promotions.\nTap [Book Now] or [Consult], fill in your details and submit ✅.`,
    channel_android: `2. 🤖 Android Booking\nSearch "BeautsGO" on Google Play, download the app 📲.\nIn the search bar, type "${name}" or "${enName}" to find {name}.\nView clinic details: address, hours, prices and promotions.\nTap [Book Now] or [Consult] and submit ✅.`,
    channel_wechat_mini: `3. 📱 WeChat Mini-Program (no app download needed)\nOpen WeChat, search for the "BeautsGO" mini-program.\nType "${name}" in the search bar to find {name}.\nView clinic details: address, hours, price list and promotions.\nTap [Book Now] or [Consult] to submit ✅.`,
    channel_wechat_oa: `4. 🟢 WeChat Official Account\nSearch [BeautsGO] in WeChat and follow the official account 💬.\nTap [Book Now] in the menu and enter "${name}" ⚡.\n💡 Alternative: search WeChat ID BeautsGOkr to add our service account.`,
    channel_web: `5. 🌐 Web Booking (desktop)\nVisit the BeautsGO website: https://www.beautsgo.com\nEnter "${name}" in the search bar to find {name}.\nView full clinic info including photos, doctors and prices.\nClick [Book] and submit your details ✅.`,
    tips: `📌 Tips:\n• All channels support Chinese, English, Japanese, Thai and more\n• You will receive SMS/app notification after booking\n• To modify a booking, go to "My Bookings" or contact support\n• Support hours: 9:00–18:00 (UTC+8)\n• 📞 Urgent: use BeautsGO App in-app chat for immediate help`,
  }
  writeFile(path.join(outDir, 'i18n/zh.json'), JSON.stringify(zhI18n, null, 2))
  writeFile(path.join(outDir, 'i18n/en.json'), JSON.stringify(enI18n, null, 2))

  // 5. 生成 skill.json
  const skillJson = {
    name: `${slug}-booking`,
    title: `${name}预约 ${shortName} Booking`,
    version: '1.0.0',
    tags: tags,
    description: `${name} — ${description}。支持查看预约流程、一键预约、在线咨询、价格查询。通过 BeautsGO 平台完成预约。`,
    permissions: {
      network: ['https://api.yestokr.com/api/Appointment/saveFromSkill','https://i.beautsgo.com/*','https://apis.beise.com:50144/*'],
      filesystem: false,
    },
    privacy: {
      data_collected: ['用户提供的手机号（联系方式），仅在用户明确同意后发送至 BeautsGO 预约接口'],
      data_sent_to: [{
        name: 'BeautsGO 预约接口',
        url: 'https://api.yestokr.com/api/Appointment/saveFromSkill',
        purpose: `提交 ${name} 预约申请`,
        when: '仅当用户主动发起「帮我预约」并提供联系方式时',
      }],
      no_data_stored: true,
      no_tracking: true,
    },
    runtime: { requires: { node: '>=16' } },
    entry: 'api/skill.js',
    input: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '用户输入' },
        lang: { type: 'string', description: '语言代码 zh/en', default: 'zh' },
        context: { type: 'object', description: '多轮对话上下文' },
      },
      required: ['query'],
    },
    output: { type: 'string', description: '预约指南/预约提交/价格查询等结果' },
  }
  writeFile(path.join(outDir, 'skill.json'), JSON.stringify(skillJson, null, 2))

  // 6. 生成 SKILL.md
  const skillMd = `---
name: ${slug}-booking
title: ${name}预约 ${shortName} Booking
entry: api/skill.js
version: 1.0.0
tags:
${tags.map(t => `  - ${t}`).join('\n')}
description: "${name} — ${description}"
---

# ${name} 预约助手

根据用户输入，为 ${name} 提供完整的预约服务。支持查看指南、打开页面、提交预约、咨询客服、查询价格。

## 依赖

无外部依赖（纯 Node.js 内置模块）

## 入口

\`api/skill.js\` 导出 \`processQuery(query, lang, context)\` 函数

## 意图流程

- **view** → 查看预约指南
- **open** → 打开医院详情页
- **book** → 收集信息 → 提交预约 API
- **consult** → 打开在线客服
- **price** → 查项目价格 / 打开价格表
- **download** → APP 下载链接

## 数据

- 医院数据：\`data/hospital.json\`
- 预约模板：\`templates/booking.tpl\`
- 多语言：\`i18n/zh.json\` / \`i18n/en.json\`
`
  writeFile(path.join(outDir, 'SKILL.md'), skillMd)

  // 7. 生成 package.json
  const pkg = {
    name: `${slug}-booking`,
    version: '1.0.0',
    title: `${name}预约助手`,
    description: `${name} — ${description}`,
    main: 'api/skill.js',
    scripts: { test: 'echo "Tests coming soon"' },
    dependencies: {},
    devDependencies: {},
  }
  writeFile(path.join(outDir, 'package.json'), JSON.stringify(pkg, null, 2))

  // 8. 生成 .clawignore
  writeFile(path.join(outDir, '.clawignore'), 'node_modules/\n.git/\n.github/\nscripts/\n*.zip\n.DS_Store\n')

  console.log(`   ✅ 生成完成 (${Object.keys(hospitalJson).length} 个字段, ${tags.length} 个标签)`)
}

// ── 主流程 ──────────────────────────────────────────────────────────────────
console.log('🚀 jd-clinic-booking-skills 批量生成器')
console.log(`   共 ${HOSPITALS_CONFIG.length} 家医院\n`)

ensureDir(PUBLISH)
HOSPITALS_CONFIG.forEach(generateSkill)

console.log(`\n🎉 全部生成完毕！输出目录: ${PUBLISH}`)
console.log(`   运行以下命令发布单个技能:`)
console.log(`   cd publish/{slug} && claw skill publish`)
