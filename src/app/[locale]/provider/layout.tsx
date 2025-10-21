import "@/styles/globals.css";
import ProviderSidebar from "@/components/Organisms/Sidebar/ProviderSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProviderFooter from "@/components/layout/ProviderFooter";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <SidebarProvider>
      <ProviderSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        <ProviderFooter />
      </main>
    </SidebarProvider>
  );
}
