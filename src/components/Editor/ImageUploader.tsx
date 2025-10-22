'use client';

/**
 * 图片上传组件
 * 支持 base64 编码存储
 */

import { useRef, ChangeEvent } from 'react';

interface ImageUploaderProps {
  onImageSelect?: (base64: string) => void;
  maxSizeMB?: number;
}

export default function ImageUploader({
  onImageSelect,
  maxSizeMB = 2,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 检查文件大小
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      alert(`图片大小不能超过 ${maxSizeMB}MB`);
      return;
    }

    // 转换为 base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onImageSelect?.(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="px-3 py-1.5 text-sm rounded-lg glass-card hover:scale-105 transition-transform"
        type="button"
      >
        上传图片
      </button>
    </div>
  );
}


