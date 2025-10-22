"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut, Edit} from "lucide-react";
import {
  ActiveProfessionals,
  AppInstallation,
  // BoxCubeIcon,
  // CalenderIcon,
  GridIcon,
  HorizontaLDots,
  MembershipRegisteration,
  // PageIcon,
  // PieChartIcon,
  // PlugInIcon,
  PostTasks,
  Professional,
  RequestCallback,
  SuspendedProfessionals,
  // TableIcon,
  TopProfessionals,
  // UserCircleIcon,
  WaitingProfessional,
} from "../icons/index";
// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; icon?: React.ReactNode; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "overview", path: "/", pro: false }],
  },
   {
    name: "Professionals",
    icon: <Professional />,
    subItems: [{ name: "Waiting Professionals", icon:<WaitingProfessional />, path: "/waiting-professionals", pro: false },
      {name:"Active Professionals", icon:<ActiveProfessionals />, path:"/active-professionals",pro:false},
      {name:"Suspended Professionals", icon:<SuspendedProfessionals/>, path:"/suspended-professionals",pro:false},
      {name:"Membership Registeration", icon:<MembershipRegisteration/>, path:"/membership-registration", pro:false}
    ],
  },
  //  {
  //   name: "Professionals",
  //   icon: <Professional />,
  //   subItems: [{ name: "", path: "/form-elements", pro: false }],
  // },
  {
    icon: <PostTasks />,
    name: "Post a Task",
    path: "/tasks",
    subItems: [{ name: "Post a Task", path: "/tasks", pro: false }],
  },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "User Profile",
  //   path: "/profile",
  // },

 
  {
    name: "RequestCallBack",
    icon: <RequestCallback />,
    subItems: [{ name: "RequestCallBack1", path: "/callback1", pro: false }],
  },
  {
    name: "App Installation",
    icon: <AppInstallation />,
    subItems: [
      { name: "App Install", path: "/install", pro: false },
      // { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  {
    name: "Top Professionals",
    icon: <TopProfessionals />,
    subItems: [
      { name: "Top users", path: "/users", pro: false },
      // { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       { name: "Line Chart", path: "/line-chart", pro: false },
//       { name: "Bar Chart", path: "/bar-chart", pro: false },
//     ],
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       { name: "Alerts", path: "/alerts", pro: false },
//       { name: "Avatar", path: "/avatars", pro: false },
//       { name: "Badge", path: "/badge", pro: false },
//       { name: "Buttons", path: "/buttons", pro: false },
//       { name: "Images", path: "/images", pro: false },
//       { name: "Videos", path: "/videos", pro: false },
//     ],
//   },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//     ],
//   },
// ];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { user, logout, isUserLoggingOut } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when sidebar collapses
  useEffect(() => {
    if (!isExpanded && !isHovered && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isExpanded, isHovered]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        if (isExpanded || isHovered || isMobileOpen) {
          inputRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, isHovered, isMobileOpen]);

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-1">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-base font-medium transition-all rounded-lg
                ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "bg-brand-500 text-white dark:bg-brand-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
            >
              {/* Chevron on the LEFT */}
              {(isExpanded || isHovered || isMobileOpen) && (
                <Image
                  src="/images/dropdownicon.svg"
                  alt="dropdown"
                  width={24}
                  height={24}
                  className={`transition-transform dark:brightness-0 dark:invert duration-200 flex-shrink-0 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-90 brightness-0 invert"
                      : "rotate-0"
                  }`}
                />
              )}
              
              <span className="flex-shrink-0">
                {nav.icon}
              </span>
              
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="flex-1 text-left">{nav.name}</span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-base font-medium transition-all rounded-lg
                  ${
                    isActive(nav.path)
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                  ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
              >
                <span className="flex-shrink-0">
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="flex-1 text-left">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-0.5 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name} onClick={()=>{
                    if(isMobileOpen){
                      toggleMobileSidebar();
                    }
                  }}>
                    <Link
                      href={subItem.path}
                      className={`flex items-center gap-2.5 px-3 py-2 text-base rounded-lg transition-all
                        ${
                          isActive(subItem.path)
                            ? "bg-brand-500 text-white dark:bg-brand-600 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    >
                      <span className="flex-shrink-0">
                        {subItem.icon}
                      </span>
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span className="px-1.5 py-0.5 text-xs font-medium bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 rounded">
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span className="px-1.5 py-0.5 text-xs font-medium bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 rounded">
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : [];
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed flex flex-col mt-16 lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-500 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => !isExpanded && setIsHovered(false)}
    >
      {/* Logo and Toggle Button Section */}
      <div className="py-8 px-5 flex items-center justify-between gap-2">
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <div className="dark:hidden flex items-center justify-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
                <h3 className={`border-l-2  pl-2`}>App </h3>
              </div>
              <div className=" hidden dark:flex items-center justify-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <h3 className=" border-l-2  pl-2 text-white">App </h3>
              </div>
            </>
          ) : (
            <Image
              src="/images/defaultlogo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
        
        {/* Toggle Button - Always visible on desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded || isHovered || isMobileOpen ? (
           <Image 
              src="/images/dashboardchanger.svg"
              alt="Logo"
              width={24}
              height={24}
            />
          ) : (
            // <svg
            //   width="20"
            //   height="20"
            //   viewBox="0 0 20 20"
            //   fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
            // >
            //   <path
            //     d="M5 5L10 10L5 15"
            //     stroke="currentColor"
            //     strokeWidth="2"
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //   />
            //   <path
            //     d="M12 5L17 10L12 15"
            //     stroke="currentColor"
            //     strokeWidth="2"
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //   />
            // </svg>
            <Image 
              src="/images/dashboardchanger.svg"
              alt="Logo"
              width={24}
              height={24}
            />
          )}
        </button>
      </div>

      {/* Search Bar / Search Icon */}
      {(isExpanded || isHovered || isMobileOpen) ? (
        <div className="px-5 mb-6">
          <form>
            <div className="relative">
              <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="px-5 mb-6 flex justify-center">
          <button
            className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Search"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      )}

      {/* Scrollable Menu Area */}
      <div className="flex-1 flex flex-col overflow-hidden px-5">
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "General"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(navItems, "main")}
              </div>
            </div>
          </nav>
        </div>

        {/* User Profile Section - Sticky to Bottom - ALWAYS VISIBLE */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 pb-6">
          {(isExpanded || isHovered || isMobileOpen) ? (
            <>
              {/* Edit Profile Button - Expanded */}
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 mb-4 text-white bg-brand-500 hover:bg-brand-600 rounded-lg font-medium text-sm transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Link>

              {/* Switch Mode - Expanded */}
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Switch Mode
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => theme === "dark" && toggleTheme()}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === "light"
                        ? "bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                    aria-label="Light mode"
                  >
                    <Sun className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => theme === "light" && toggleTheme()}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                    aria-label="Dark mode"
                  >
                    <Moon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* User Info & Logout - Expanded */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="overflow-hidden rounded-full h-10 w-10">
                    <Image
                      width={40}
                      height={40}
                      src={user?.Photo || "/images/defaultphoto.jpg"}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    {user?.Fullname || "User"}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  disabled={isUserLoggingOut}
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Collapsed View - Icon Only Buttons */}
              <div className="flex flex-col items-center gap-4">
                {/* Edit Profile Icon */}
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-10 h-10 text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors"
                  aria-label="Edit Profile"
                >
                  <Edit className="w-5 h-5" />
                </Link>

                {/* Theme Toggle Icon */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === "light" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {/* User Avatar Icon */}
                <div className="overflow-hidden rounded-full h-10 w-10 cursor-pointer">
                  <Image
                    width={40}
                    height={40}
                    src={user?.Photo || "/images/defaultphoto.jpg"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Logout Icon */}
                <button
                  onClick={() => logout()}
                  disabled={isUserLoggingOut}
                  className="flex items-center justify-center w-10 h-10 text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
