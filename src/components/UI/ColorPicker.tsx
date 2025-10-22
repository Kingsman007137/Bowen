'use client';

/**
 * 渐变色选择器组件
 * 用于切换卡片渐变色系
 */

import { GRADIENT_COLORS, type GradientColorKey, type ThemeMode } from '@/lib/constants';

interface ColorPickerProps {
  selectedColor: GradientColorKey;
  onColorChange: (color: GradientColorKey) => void;
  mode?: ThemeMode;
}

export default function ColorPicker({
  selectedColor,
  onColorChange,
  mode = 'light',
}: ColorPickerProps) {
  const colors = GRADIENT_COLORS[mode];
  const colorKeys = Object.keys(colors) as GradientColorKey[];

  return (
    <div className="flex gap-2 p-2">
      {colorKeys.map((key) => {
        const color = colors[key];
        const isSelected = selectedColor === key;

        return (
          <button
            key={key}
            onClick={() => onColorChange(key)}
            className={`
              w-8 h-8 rounded-full transition-all
              ${isSelected ? 'ring-2 ring-offset-2 ring-foreground scale-110' : 'hover:scale-105'}
            `}
            style={{
              background: `linear-gradient(135deg, ${color.start}, ${color.end})`,
            }}
            title={color.name}
            type="button"
          />
        );
      })}
    </div>
  );
}


