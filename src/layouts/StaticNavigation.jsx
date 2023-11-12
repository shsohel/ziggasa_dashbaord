import UserDropdown from "./UserDropdown";
import { Search } from "lucide-react";
// import Logo from "../customs/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import InputBox from "../utils/custom/InputBox";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const StaticNavigation = (props) => {
  const { mainNavigation } = props;
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white  lg:pb-4">
        <div className="flex h-14 items-center bg-white  px-6">
          {/* <Logo /> */}
          Logo
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
          {/* User account dropdown */}
          <UserDropdown />
          {/* Sidebar Search */}
          <div className="mt-5 px-3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 rounded-sm shadow-sm">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                aria-hidden="true"
              >
                <Search
                  className="mr-3 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <InputBox
                type="text"
                name="search"
                value={""}
                onChange={() => {}}
                id="search"
                placeholder="Search"
              />
            </div>
          </div>
          {/* Navigation */}
          <nav className="mt-6 px-3">
            {mainNavigation.map((nav, index) => (
              <div key={index} className="space-y-1">
                <h3
                  className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  id="desktop-teams-headline"
                >
                  {nav.title}
                </h3>
                <div>
                  {nav.navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "bg-primary text-white"
                          : "hover:border-primary text-gray-700 hover:border-r hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center rounded px-2 py-2 text-sm font-medium",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          pathname === item.href
                            ? "bg-primary text-white"
                            : "text-primary group-hover:text-gray-500",
                          "mr-3 h-6 w-6 flex-shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default StaticNavigation;
