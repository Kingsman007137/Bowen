'use client';

/**
 * 画布容器组件
 * 基于 React Flow 实现无限画布功能
 */

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  OnConnectStart,
  OnConnectEnd,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CardNode from './CardNode';
import type { CardNodeData } from './CardNode';

// 定义节点类型
const nodeTypes = {
  card: CardNode,
};

interface CanvasContainerProps {
  onAddCardRequest?: () => void;
}

export default function CanvasContainer({
  onAddCardRequest,
}: CanvasContainerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // 处理连线
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // 创建新卡片
  const createCard = useCallback(
    (position?: { x: number; y: number }) => {
      const newNode: Node = {
        id: `card-${Date.now()}`,
        type: 'card',
        position: position || {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        data: {
          content: '',
          colorKey: 'blue',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        } as CardNodeData,
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  // 双击画布创建卡片
  const onPaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!reactFlowInstance) return;

      // 获取画布坐标
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      createCard(position);
    },
    [reactFlowInstance, createCard]
  );

  // 导出创建卡片函数供父组件使用
  const handleAddCard = useCallback(() => {
    if (!reactFlowInstance) {
      createCard();
      return;
    }

    // 在画布中心创建卡片
    const viewport = reactFlowInstance.getViewport();
    const position = {
      x: -viewport.x + window.innerWidth / 2 / viewport.zoom - 200,
      y: -viewport.y + window.innerHeight / 2 / viewport.zoom - 100,
    };

    createCard(position);
  }, [reactFlowInstance, createCard]);

  // 将创建卡片函数传递给父组件
  if (onAddCardRequest && reactFlowInstance) {
    (window as any).__createCard = handleAddCard;
  }

  return (
    <div className="w-full h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onPaneDoubleClick={onPaneDoubleClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        proOptions={{ hideAttribution: true }}
        minZoom={0.25}
        maxZoom={2}
      >
        <Background
          gap={20}
          size={1.5}
          color="var(--border-color)"
          variant={BackgroundVariant.Dots}
        />
        <Controls
          showZoom
          showFitView
          showInteractive={false}
          position="bottom-left"
        />
        <MiniMap
          nodeColor="var(--gradient-blue-start)"
          maskColor="rgba(0, 0, 0, 0.1)"
          className="!bg-white/70 dark:!bg-white/10 backdrop-blur-md !border !border-border-color !rounded-lg !shadow-lg"
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
}


