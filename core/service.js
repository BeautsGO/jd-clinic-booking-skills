/**
 * JD皮肤科预约技能 — 服务编排层
 *
 * 协调预处理、渲染，作为 api/skill.js 的数据层
 */

const hospital = require('../data/hospital.json')
const { render, loadI18n } = require('./renderer')

/**
 * 获取 JD皮肤科 的预约指南
 * @param {string} lang 语言代码
 * @returns {string} 渲染后的 Markdown 预约指南
 */
async function getBookingGuide(lang = 'zh') {
  return render(hospital, lang)
}

/**
 * 获取医院信息
 * @returns {object} 医院数据
 */
function getHospital() {
  return { ...hospital }
}

module.exports = { getBookingGuide, getHospital }
