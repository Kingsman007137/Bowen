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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CardNode from './CardNode';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import type { ToastType } from '@/components/UI/Toast';
import MiniMapPanel from './MiniMapPanel';
import ZoomControls from './ZoomControls';

// 定义节点类型
const nodeTypes = {
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
    mode,
    addCard,
    updateCard,
    deleteCard,
    addConnection,
    deleteConnection,
    startConnecting,
    finishConnecting,
    cancelConnecting,
    connectingFromCard,
  } = useCanvasStore();

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [showMiniMap, setShowMiniMap] = useState(false);

  // 注册 fitView 函数供外部调用
  useEffect(() => {
    if (reactFlowInstance && onRegisterFitView) {
      onRegisterFitView(() => {
        reactFlowInstance.fitView({ duration: 200, padding: 0.2 });
      });
    }
  }, [reactFlowInstance, onRegisterFitView]);

  // 将 cards 转换为 React Flow nodes
  const nodes: Node[] = useMemo(() => {
    return cards.map((card) => ({
      id: card.id,
      type: 'card',
      position: card.position,
      data: {
        card,
        onEdit: (id: string) => {
          // 编辑卡片逻辑将在 CardNode 中处理
        },
        onDelete: (id: string) => {
          deleteCard(id);
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
      type: 'smoothstep',
      animated: false,
      style: {
        stroke: '#137fec',
        strokeWidth: 2,
      },
      markerEnd: {
        type: 'arrowclosed' as const,
        color: '#137fec',
      },
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

  // 双击画布创建卡片
  const onDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!reactFlowInstance || mode !== 'select') return;

      // 获取画布坐标
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addCard({
        notebookId,
        position,
        title: '新卡片',
        content: '',
      });

      onShowToast('卡片已创建', 'success');
    },
    [reactFlowInstance, mode, notebookId, addCard, onShowToast]
  );

  // 处理节点点击（连线模式）
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (mode === 'connect') {
        if (!connectingFromCard) {
          // 开始连线
          startConnecting(node.id);
        } else if (connectingFromCard !== node.id) {
          // 完成连线
          finishConnecting(node.id);
          onShowToast('连线已创建', 'success');
        }
      }
    },
    [mode, connectingFromCard, startConnecting, finishConnecting, onShowToast]
  );

  // 点击画布取消连线
  const onPaneClick = useCallback(() => {
    if (mode === 'connect' && connectingFromCard) {
      cancelConnecting();
    }
  }, [mode, connectingFromCard, cancelConnecting]);

  // 根据模式设置交互性
  const nodesDraggable = mode === 'select';
  const nodesConnectable = mode === 'connect';
  const elementsSelectable = mode === 'select';
  const panOnDrag = mode === 'pan' ? [0, 1, 2] : false; // 拖动模式：左键、中键、右键都可以拖动

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDoubleClick={onDoubleClick}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        nodesDraggable={nodesDraggable}
        nodesConnectable={nodesConnectable}
        elementsSelectable={elementsSelectable}
        panOnDrag={panOnDrag}
        panOnScroll={mode === 'pan'}
        zoomOnScroll={mode !== 'pan'}
        zoomOnPinch
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
        minZoom={0.25}
        maxZoom={2}
        fitView
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

      {/* 连线模式提示 */}
      {mode === 'connect' && connectingFromCard && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary text-white rounded-lg shadow-lg z-50 animate-fade-in">
          <span className="material-symbols-rounded inline-block mr-2 align-middle text-base">
            link
          </span>
          <span className="align-middle text-sm">点击目标卡片完成连线</span>
        </div>
      )}
    </div>
  );
}


