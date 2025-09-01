import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { AppSidebar, Footer, Header } from "../components";
import { NotFoundPage } from "../pages";
import { useTheme } from "../store";

const RootLayout = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
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
};

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
