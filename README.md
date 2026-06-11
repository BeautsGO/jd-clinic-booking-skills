# jd-clinic-booking-skills

> 韩国热门皮肤科/医美医院独立预约技能合集

## 收录医院

| 医院 | 技能名 | 位置 |
|------|--------|------|
| 🏥 JD皮肤科 | `jd-booking` | 首尔江南 |
| 🏥 明洞丹雅皮肤科 (DAN-A) | `dana-booking` | 首尔明洞 |
| 🏥 鹿美人皮肤科 (Lumiin) | `deer-booking` | 首尔江南 |
| 🏥 济州岛with医院 | `jeju-with-booking` | 济州岛 |
| 🏥 Barog医院（江南店） | `barog-booking` | 首尔江南 |
| 🏥 梅宗德医院 (maisondeM) | `maejongdeok-booking` | 首尔瑞草 |
| 🏥 reberry医院 明洞店 | `reberry-booking` | 首尔明洞 |
| 🏥 明洞优美皮肤科 (UMI) | `umi-booking` | 首尔明洞 |

## 项目结构

```
jd-clinic-booking-skills/
├── shared/                    ← 共享核心代码（所有医院通用）
│   ├── api/skill.js           ← 主入口逻辑
│   ├── api/browser/open-url.js
│   ├── core/preprocessor.js   ← 意图检测+表单解析
│   ├── core/renderer.js       ← 模板渲染引擎
│   ├── templates/booking.tpl
│   └── i18n/
├── hospitals/                 ← 医院配置数据
│   ├── jd/                    ← 每家医院独立配置
│   ├── dana/
│   └── ...
├── scripts/
│   └── generate-all.js        ← 一键生成所有技能
├── publish/                   ← 生成的独立技能（可直接发布）
│   ├── jd/
│   ├── dana/
│   └── ...
└── README.md
```

## 生成技能

```bash
node scripts/generate-all.js
```

## 发布到 ClawHub

```bash
cd publish/{slug} && claw skill publish
```
