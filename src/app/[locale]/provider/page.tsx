import ProviderSidebar from "@/components/Organisms/Sidebar/ProviderSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ProviderHomepage = () => {
  return (
    <SidebarProvider>
      <ProviderSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};

export default ProviderHomepage;
