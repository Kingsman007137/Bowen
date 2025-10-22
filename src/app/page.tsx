'use client';

/**
 * 主页面 - 画布视图
 * 这是整个应用的入口页面,展示无限画布和卡片系统
 */

import { useRef } from 'react';
import CanvasContainer from '@/components/Canvas/CanvasContainer';
import Navbar from '@/components/UI/Navbar';

export default function Home() {
  // 处理新建卡片按钮点击
  const handleAddCard = () => {
    // 调用画布容器的创建卡片函数
    if (typeof window !== 'undefined' && (window as any).__createCard) {
      (window as any).__createCard();
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 导航栏 */}
      <Navbar onAddCard={handleAddCard} />

      {/* 画布容器 - 留出导航栏高度 */}
      <div className="pt-16 w-full h-full">
        <CanvasContainer onAddCardRequest={handleAddCard} />
      </div>
    </main>
  );
}
