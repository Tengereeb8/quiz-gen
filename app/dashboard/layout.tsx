import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#e4e4e7]">
      <SidebarProvider className=" flex justify-center relative top-16">
        <SidebarTrigger />
        <AppSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </div>
  );
}
