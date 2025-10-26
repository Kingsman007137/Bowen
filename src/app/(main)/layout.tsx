/**
 * 主应用布局
 * 包含侧边栏
 */

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {children}
    </div>
  );
}




