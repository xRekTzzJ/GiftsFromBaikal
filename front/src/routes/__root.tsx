import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppSidebar, Footer, Header } from "../components";

const RootLayout = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="flex flex-col flex-1 min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </SidebarInset>
    <TanStackRouterDevtools />
  </SidebarProvider>
);

export const Route = createRootRoute({ component: RootLayout });
