import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SidebarData } from "@/constants/sidebarContents";
import { Link, useLocation } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div>
      <AppSidebar />
      <SidebarInset className="hidden md:block">
        <header className="flex h-18 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-10" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
      </SidebarInset>
    </div>
  );
}

function AppSidebar(props: React.ComponentProps<typeof SidebarRoot>) {
  const [openSection, setOpenSection] = React.useState<string | null>(
    "Platform"
  );
  return (
    <SidebarRoot
      collapsible="icon"
      {...props}
      className="fixed top-16 h-[calc(100vh-60px)]"
    >
      <SidebarContent className="bg-[var(--background)] space-y-0">
        {SidebarData.sections.map((section) => (
          <NavSection
            key={section.title}
            section={section}
            isOpen={openSection === section.title}
            onOpenChange={(isOpen) =>
              setOpenSection(isOpen ? section.title : null)
            }
          />
        ))}
      </SidebarContent>
      <SidebarRail />
    </SidebarRoot>
  );
}

const isRouteActive = (url: string, pathname: string) => {
  if (url === pathname) return true;
  if (url !== "/" && pathname.startsWith(url)) {
    const remainingPath = pathname.slice(url.length);
    return remainingPath === "" || remainingPath.startsWith("/");
  }
  return false;
};

function NavSection({
  section,
  isOpen,
  onOpenChange,
}: {
  section: {
    title: string;
    isHeading: boolean;
    icon?: LucideIcon;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      isCollapsible?: boolean;
      items?: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
      }[];
    }[];
  };
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const { state } = useSidebar();
  const location = useLocation();

  React.useEffect(() => {
    if (!isOpen) {
      setOpenItem(null);
    }
  }, [isOpen]);

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <SidebarGroup className="py-0">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="text-[var(--text)] font-semibold text-sm uppercase tracking-wide cursor-pointer flex items-center gap-2 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:justify-center">
                {section.icon && (
                  <section.icon className="size-4 text-[var(--text)]" />
                )}
                <span className="group-data-[collapsible=icon]:hidden">
                  {section.title}
                </span>
                <ChevronRight
                  className={`ml-auto chevron-transition ${
                    isOpen ? "rotate-90" : ""
                  } group-data-[collapsible=icon]:hidden text-[var(--text)]`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            hidden={state !== "collapsed"}
          >
            {section.title}
          </TooltipContent>
        </Tooltip>
        <CollapsibleContent className="transition-all duration-300 ease-in-out">
          <SidebarMenu className="space-y-0.5">
            {section.items.map((item) =>
              item.isCollapsible && item.items ? (
                <Collapsible
                  key={item.title}
                  asChild
                  open={openItem === item.title}
                  onOpenChange={(isOpen) => {
                    setOpenItem(isOpen ? item.title : null);
                  }}
                  className="group/collapsible text-[var(--text)] transition-all duration-300 ease-in-out"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`text-[var(--text)] transition-all duration-300 ease-in-out ${
                          item.isActive === false
                            ? "cursor-not-allowed opacity-60"
                            : isRouteActive(item.url, location.pathname)
                            ? "bg-[var(--brand-color)] hover:bg-[var(--brand-color)] focus:bg-[var(--brand-color)] active:bg-[var(--brand-color)] text-white"
                            : ""
                        }`}
                        disabled={item.isActive === false}
                      >
                        {item.icon && (
                          <item.icon
                            className={`size-4 ${
                              isRouteActive(item.url, location.pathname)
                                ? "text-white"
                                : "text-[var(--text)]"
                            }`}
                          />
                        )}
                        <span
                          className={`text-[var(--text)] ${
                            isRouteActive(item.url, location.pathname)
                              ? "text-white"
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                        <ChevronRight
                          className={`ml-auto transition-transform duration-200 ${
                            openItem === item.title ? "rotate-90" : ""
                          } text-[var(--text)] ${
                            isRouteActive(item.url, location.pathname)
                              ? "text-white"
                              : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="transition-all duration-300 ease-in-out">
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="text-[var(--text)]"
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={`${
                                subItem.isActive === false
                                  ? "cursor-not-allowed opacity-60"
                                  : isRouteActive(
                                      subItem.url,
                                      location.pathname
                                    )
                                  ? "bg-[var(--brand-color)] hover:bg-[var(--brand-color)] focus:bg-[var(--brand-color)] active:bg-[var(--brand-color)] text-white"
                                  : ""
                              }`}
                            >
                              {subItem.isActive === false ? (
                                <span>
                                  {subItem.icon && (
                                    <subItem.icon className="size-4 text-[var(--text)] transition-all duration-300 ease-in-out" />
                                  )}
                                  <span className="text-[var(--text)]">
                                    {subItem.title}
                                  </span>
                                </span>
                              ) : (
                                <Link to={subItem.url}>
                                  {subItem.icon && (
                                    <subItem.icon
                                      className={`size-4 ${
                                        isRouteActive(
                                          subItem.url,
                                          location.pathname
                                        )
                                          ? "!text-white"
                                          : "!text-[var(--text)]"
                                      }`}
                                    />
                                  )}
                                  <span
                                    className={`text-[var(--text)] ${
                                      isRouteActive(
                                        subItem.url,
                                        location.pathname
                                      )
                                        ? "text-white"
                                        : ""
                                    }`}
                                  >
                                    {subItem.title}
                                  </span>
                                </Link>
                              )}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    className={`text-[var(--text)] transition-all duration-300 ease-in-out ${
                      item.isActive === false
                        ? "cursor-not-allowed opacity-60"
                        : isRouteActive(item.url, location.pathname)
                        ? "bg-[var(--brand-color)] hover:bg-[var(--brand-color)] focus:bg-[var(--brand-color)] active:bg-[var(--brand-color)] text-white"
                        : ""
                    }`}
                    disabled={item.isActive === false}
                  >
                    {item.isActive === false ? (
                      <span>
                        {item.icon && (
                          <item.icon className="size-4 text-[var(--text)]" />
                        )}
                        <span className="text-[var(--text)]">{item.title}</span>
                      </span>
                    ) : (
                      <Link to={item.url}>
                        {item.icon && (
                          <item.icon
                            className={`size-4 ${
                              isRouteActive(item.url, location.pathname)
                                ? "text-white"
                                : "text-[var(--text)]"
                            }`}
                          />
                        )}
                        <span
                          className={`text-[var(--text)] ${
                            isRouteActive(item.url, location.pathname)
                              ? "text-white"
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
