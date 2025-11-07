'use client';

/**
 * 渐变色选择器组件
 * 用于切换卡片渐变色系
 */

import { CARD_GRADIENT_COLORS, type CardGradientColorKey, type ThemeMode } from '@/lib/constants';

interface ColorPickerProps {
  selectedColor: CardGradientColorKey;
  onColorChange: (color: CardGradientColorKey) => void;
  mode?: ThemeMode;
}

export default function ColorPicker({
  selectedColor,
  onColorChange,
  mode = 'light',
}: ColorPickerProps) {
  const colors = CARD_GRADIENT_COLORS[mode];
  const colorKeys = Object.keys(colors) as CardGradientColorKey[];

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


