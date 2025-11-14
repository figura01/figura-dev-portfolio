import AdminMainNav from "./main-nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-row wrapper">
        {/* Nav Admin */}
        <div className="flex px-6">
          <AdminMainNav />
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  );
}
