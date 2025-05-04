import { SideMenu } from "@/components/layout/SideMenu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-dvh flex">
      <SideMenu />
      <div className="flex-1">{children}</div>
    </div>
  );
}
