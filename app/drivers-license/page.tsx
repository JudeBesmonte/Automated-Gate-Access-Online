import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { NavUser } from '@/components/nav-user';
import { NavNotify } from '@/components/nav-notify';
import { DriversLicenseScan } from "@/features/drivers-license"

export const metadata = {
  title: "Driver's License Scanner",
  description: "Scan and extract information from LTO Philippines driver's licenses",
}

export default async function DriversLicensePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">Driver's License</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <NavNotify />
            <NavUser />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-8 p-8">
          {/* Page specific content */} 
          <DriversLicenseScan />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
