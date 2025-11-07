'use client';

/**
 * 画布容器组件
 * 基于 React Flow 实现无限画布功能
 */

import { useCallback, useState, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  NodeChange,
  EdgeChange,
  ReactFlowInstance,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CardNode from './CardNode';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import type { ToastType } from '@/components/UI/Toast';
import MiniMapPanel from './MiniMapPanel';
import ZoomControls from './ZoomControls';

// 定义节点类型
const nodeTypes: NodeTypes = {
  card: CardNode,
};

interface CanvasContainerProps {
  notebookId: string;
  onShowToast: (message: string, type: ToastType) => void;
  onRegisterFitView?: (fitView: () => void) => void;
}

export default function CanvasContainer({
  notebookId,
  onShowToast,
  onRegisterFitView,
}: CanvasContainerProps) {
  const {
    cards,
    connections,
    updateCard,
    deleteCard,
    addConnection,
    deleteConnection,
  } = useCanvasStore();

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [showMiniMap, setShowMiniMap] = useState(false);

  // 注册 fitView 函数供外部调用
  useEffect(() => {
    if (reactFlowInstance && onRegisterFitView) {
      onRegisterFitView(() => {
        reactFlowInstance.fitView({ duration: 200, padding: 0.2, maxZoom: 0.8 });
      });
    }
  }, [reactFlowInstance, onRegisterFitView]);

  // 初始加载时自动适应视图（仅首次）
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    if (reactFlowInstance && cards.length > 0 && !hasInitialized) {
      // 延迟一下确保节点已经渲染
      setTimeout(() => {
        reactFlowInstance.fitView({ duration: 500, padding: 0.2, maxZoom: 0.8 });
        setHasInitialized(true);
      }, 100);
    }
  }, [reactFlowInstance, cards.length, hasInitialized]);

  // 将 cards 转换为 React Flow nodes
  const nodes: Node[] = useMemo(() => {
    return cards.map((card) => ({
      id: card.id,
      type: 'card',
      position: card.position,
      data: {
        card,
        onEdit: () => {
          // 编辑卡片逻辑将在 CardNode 中处理
        },
        onDelete: () => {
          deleteCard(card.id);
          onShowToast('卡片已删除', 'success');
        },
      },
    }));
  }, [cards, deleteCard, onShowToast]);

  // 将 connections 转换为 React Flow edges
  const edges: Edge[] = useMemo(() => {
    return connections.map((conn) => ({
      id: conn.id,
      source: conn.source,
      target: conn.target,
      sourceHandle: conn.sourceHandle, // 保存起始连接点
      targetHandle: conn.targetHandle, // 保存目标连接点
      type: 'smoothstep', // smoothstep 类型会自动避开节点
      animated: false,
      style: {
        stroke: '#137fec',
        strokeWidth: 2,
      },
      markerEnd: {
        type: 'arrowclosed' as const,
        color: '#137fec',
      },
      // 设置z-index确保连线在卡片下方
      zIndex: -1,
    }));
  }, [connections]);

  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(edges);

  // 同步 nodes 和 edges
  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes, setLocalNodes]);

  useEffect(() => {
    setLocalEdges(edges);
  }, [edges, setLocalEdges]);

  // 处理节点变化（主要是位置变化）
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);

      // 更新卡片位置
      changes.forEach((change) => {
        if (change.type === 'position' && change.position && !change.dragging) {
          updateCard(change.id, { position: change.position });
        }
      });
    },
    [onNodesChange, updateCard]
  );

  // 处理连线
  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target && params.source !== params.target) {
        addConnection({
          notebookId,
          source: params.source,
          target: params.target,
          sourceHandle: params.sourceHandle || undefined, // 保存连接点信息
          targetHandle: params.targetHandle || undefined,
        });
        onShowToast('连线已创建', 'success');
      }
    },
    [notebookId, addConnection, onShowToast]
  );

  // 处理边删除
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);

      changes.forEach((change) => {
        if (change.type === 'remove') {
          deleteConnection(change.id);
        }
      });
    },
    [onEdgesChange, deleteConnection]
  );

  // 禁用双击画布创建卡片
  // const onDoubleClick = useCallback(
  //   (event: React.MouseEvent) => {
  //     // 已禁用，只能通过工具栏按钮创建卡片
  //   },
  //   []
  // );

  // 统一交互模式：
  // - 卡片上：拖动卡片、连线
  // - 画布空白处/卡片外：拖动画布（按住左键）
  // - 滚轮：缩放
  const nodesDraggable = true; // 允许拖动卡片
  const nodesConnectable = true; // 允许连线
  const elementsSelectable = true; // 允许选择
  const panOnDrag = true; // 在任何空白区域都可以拖动画布（左键）

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        nodesDraggable={nodesDraggable}
        nodesConnectable={nodesConnectable}
        elementsSelectable={elementsSelectable}
        panOnDrag={panOnDrag}
        panOnScroll={false}
        zoomOnScroll={true} // 滚轮缩放
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        proOptions={{ hideAttribution: true }}
        minZoom={0.25}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        fitViewOptions={{ padding: 0.2, maxZoom: 0.8 }}
      >
        {/* 仅保留 React Flow 的背景网格，移除 CSS 的静态网格 */}
        <Background
          gap={40}
          size={1}
          color="currentColor"
          className="text-gray-300/40 dark:text-gray-600/50"
          variant={BackgroundVariant.Lines}
        />
        {/* 小地图面板 - 必须在 ReactFlow 内部 */}
        <MiniMapPanel isOpen={showMiniMap} onToggle={() => setShowMiniMap(!showMiniMap)} />
        {/* 缩放控制 - 必须在 ReactFlow 内部 */}
        <ZoomControls showMiniMap={showMiniMap} onToggleMiniMap={() => setShowMiniMap(!showMiniMap)} />
      </ReactFlow>
    </div>
  );
}


