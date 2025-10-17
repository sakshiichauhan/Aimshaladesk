import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import SidebarLayout from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-col w-screen h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden bg-[var(--layout)]">
          <aside className="flex-none">
            <SidebarLayout/>
          </aside>
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
