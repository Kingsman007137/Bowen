/**
 * 全局常量配置
 * 包含渐变色系、默认参数等
 */

/**
 * 渐变色系定义
 * 每个色系包含起始色和结束色
 */
export const GRADIENT_COLORS = {
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
 * 渐变色系类型
 */
export type GradientColorKey = 'blue' | 'pink' | 'mint';

/**
 * 获取指定主题和色系的渐变色
 */
export function getGradientColor(
  mode: ThemeMode,
  colorKey: GradientColorKey
) {
  return GRADIENT_COLORS[mode][colorKey];
}

/**
 * 生成渐变背景 CSS 字符串
 */
export function generateGradientStyle(
  mode: ThemeMode,
  colorKey: GradientColorKey
): string {
  const color = getGradientColor(mode, colorKey);
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}


