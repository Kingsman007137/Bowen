/**
 * 全局常量配置
 * 包含渐变色系、默认参数等
 */

import type { GradientKey } from '@/types';

/**
 * 笔记本封面渐变色配置
 * 用于笔记架页面的笔记卡片封面
 */
export const NOTEBOOK_GRADIENTS: Record<GradientKey, { from: string; to: string; name: string }> = {
  blue: { from: '#4E8CEB', to: '#64C7FF', name: '海雾蓝' },
  purple: { from: '#8B5CF6', to: '#A855F7', name: '紫罗兰' },
  pink: { from: '#EC4899', to: '#F472B6', name: '粉红' },
  orange: { from: '#F59E0B', to: '#FB923C', name: '橙色' },
  green: { from: '#10B981', to: '#34D399', name: '翠绿' },
  teal: { from: '#14B8A6', to: '#2DD4BF', name: '青色' },
  cyan: { from: '#06B6D4', to: '#22D3EE', name: '天蓝' },
  indigo: { from: '#6366F1', to: '#818CF8', name: '靛蓝' },
  rose: { from: '#F43F5E', to: '#FB7185', name: '玫红' },
  amber: { from: '#F59E0B', to: '#FCD34D', name: '琥珀' },
} as const;

/**
 * 获取随机渐变色键
 */
export function getRandomGradientKey(): GradientKey {
  const keys = Object.keys(NOTEBOOK_GRADIENTS) as GradientKey[];
  return keys[Math.floor(Math.random() * keys.length)];
}

/**
 * 生成渐变CSS字符串
 */
export function getGradientStyle(gradientKey: GradientKey): string {
  const gradient = NOTEBOOK_GRADIENTS[gradientKey];
  return `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`;
}

/**
 * 画布卡片渐变色系定义
 * 每个色系包含起始色和结束色
 */
export const CARD_GRADIENT_COLORS = {
  // 亮色系渐变
  light: {
    blue: {
      start: '#4E8CEB',
      end: '#64C7FF',
      name: '海雾蓝',
    },
    pink: {
      start: '#F6D2FF',
      end: '#FFE3D8',
      name: '柔粉金',
    },
    mint: {
      start: '#8EEFC4',
      end: '#56D9A0',
      name: '薄荷绿',
    },
  },
  // 暗色系渐变
  dark: {
    blue: {
      start: '#3B6BEC',
      end: '#4AC6FF',
      name: '海雾蓝-暗',
    },
    pink: {
      start: '#E8C0FF',
      end: '#FFD1C4',
      name: '柔粉金-暗',
    },
    mint: {
      start: '#6DD9AE',
      end: '#40C894',
      name: '薄荷绿-暗',
    },
  },
} as const;

/**
 * 卡片默认配置
 */
export const CARD_DEFAULTS = {
  // 默认宽度
  width: 400,
  // 默认最小高度
  minHeight: 200,
  // 默认内边距
  padding: 16,
  // 默认圆角
  borderRadius: 16,
  // 默认背景模糊度
  backdropBlur: 16,
  // 默认阴影
  shadow: {
    light: '0 6px 20px rgba(0, 0, 0, 0.04)',
    dark: '0 8px 32px rgba(0, 0, 0, 0.20)',
  },
  // 默认透明度
  opacity: {
    light: 0.7,
    dark: 0.1,
  },
} as const;

/**
 * 画布配置
 */
export const CANVAS_DEFAULTS = {
  // 默认缩放比例
  defaultZoom: 1,
  // 最小缩放比例
  minZoom: 0.25,
  // 最大缩放比例
  maxZoom: 2,
  // 缩放步进
  zoomStep: 0.1,
} as const;

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark';

/**
 * 画布卡片渐变色系类型
 */
export type CardGradientColorKey = 'blue' | 'pink' | 'mint';

/**
 * 获取指定主题和色系的渐变色
 */
export function getCardGradientColor(
  mode: ThemeMode,
  colorKey: CardGradientColorKey
) {
  return CARD_GRADIENT_COLORS[mode][colorKey];
}

/**
 * 生成画布卡片渐变背景 CSS 字符串
 */
export function generateCardGradientStyle(
  mode: ThemeMode,
  colorKey: CardGradientColorKey
): string {
  const color = getCardGradientColor(mode, colorKey);
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}

/**
 * 主题颜色配置
 */
export const THEME_COLORS = {
  primary: '#137fec',
  backgroundLight: '#F5F5F7',
  backgroundDark: '#101922',
} as const;


