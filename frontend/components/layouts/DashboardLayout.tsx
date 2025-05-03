"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  SearchIcon,
  SettingsIcon,
  MessageSquareIcon,
  StarIcon,
  BookmarkIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import ChatInterface from "@/components/ChatInterface";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const isNotChatPage = pathname !== "/";

  // Navigation items with icons
  const navItems = [
    {
      title: "Chat",
      href: "/",
      icon: <MessageSquareIcon className="h-4 w-4" />,
    },

    {
      title: "Library",
      href: "/library",
      icon: <BookOpenIcon className="h-4 w-4" />,
    },
    {
      title: "Saved",
      href: "/saved",
      icon: <BookmarkIcon className="h-4 w-4" />,
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar navItems={navItems} pathname={pathname} />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background z-10 fixed top-0 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 my-3" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {navItems.find((item) => item.href === pathname)?.title ||
                      "Dashboard"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex mt-16 h-[calc(100vh-4rem)]">
            <div className={`${isNotChatPage ? "flex-1" : "w-full"}`}>
              <ScrollArea className="h-full">{children}</ScrollArea>
            </div>
            {/* {isNotChatPage && (
              <div className="w-96 border-l">
                <div className="h-full">
                  <ChatInterface />
                </div>
              </div>
            )} */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

interface AppSidebarProps {
  navItems: Array<{
    title: string;
    href: string;
    icon: React.ReactNode;
  }>;
  pathname: string;
}

function AppSidebar({ navItems, pathname }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6 flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <SidebarHeaderTitle />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                >
                  <Link href={item.href} className="flex w-full items-center">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

// Component to conditionally render the title based on sidebar state
function SidebarHeaderTitle() {
  const { open } = useSidebar();

  if (!open) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <h1 className="text-xl font-light">Intellectus</h1>
    </div>
  );
}
