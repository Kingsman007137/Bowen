'use client';

/**
 * Tiptap 富文本编辑器组件
 * 用于卡片内容编辑，支持图片、引用、列表等功能
 */

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { useEffect, useRef } from 'react';
import { 
  ImagePlus, 
  Quote, 
  List, 
  ListOrdered, 
  Bold, 
  Italic, 
  Strikethrough
} from 'lucide-react';

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  placeholder?: string;
}

export default function TiptapEditor({
  content = '',
  onChange,
  editable = true,
  placeholder = '开始输入...',
}: TiptapEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'w-full rounded-lg my-2',
        },
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor prose prose-sm dark:prose-invert max-w-none focus:outline-none h-full p-6 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-100',
      },
    },
  });

  // 同步外部内容更新
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 检查文件大小 (限制为 2MB)
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      alert('图片大小不能超过 2MB');
      return;
    }

    // 转换为 base64 并插入
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      editor.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);

    // 重置 input
    e.target.value = '';
  };

  const handleImageButtonClick = () => {
    imageInputRef.current?.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      {/* 工具栏 */}
      {editable && (
        <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-300/30 dark:border-gray-600/30 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-t-lg">
          {/* 图片上传 */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={handleImageButtonClick}
            className="p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
            title="插入图片"
            type="button"
          >
            <ImagePlus className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>

          <div className="w-px h-6 bg-gray-400/50 dark:bg-gray-500/50 mx-1" />

          {/* 引用 */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
              editor.isActive('blockquote') ? 'bg-white/30 dark:bg-black/30' : ''
            }`}
            title="引用块"
            type="button"
          >
            <Quote className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>

          <div className="w-px h-6 bg-gray-400/50 dark:bg-gray-500/50 mx-1" />

          {/* 点序号（无序列表） */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
              editor.isActive('bulletList') ? 'bg-white/30 dark:bg-black/30' : ''
            }`}
            title="点序号列表"
            type="button"
          >
            <List className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>

          {/* 数字序号（有序列表） */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
              editor.isActive('orderedList') ? 'bg-white/30 dark:bg-black/30' : ''
            }`}
            title="数字序号列表"
            type="button"
          >
            <ListOrdered className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>

          <div className="w-px h-6 bg-gray-400/50 dark:bg-gray-500/50 mx-1" />

          {/* 文本格式 */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
              editor.isActive('bold') ? 'bg-white/30 dark:bg-black/30' : ''
            }`}
            title="粗体"
            type="button"
          >
            <Bold className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
              editor.isActive('italic') ? 'bg-white/30 dark:bg-black/30' : ''
            }`}
            title="斜体"
            type="button"
          >
            <Italic className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
              editor.isActive('strike') ? 'bg-white/30 dark:bg-black/30' : ''
            }`}
            title="删除线"
            type="button"
          >
            <Strikethrough className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>

        </div>
      )}

      {/* 编辑器内容 */}
      <div className="flex-1 overflow-hidden">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}

