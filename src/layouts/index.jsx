import { ArrowUp, Search } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";
import Header from "./Header";
import UserDropdown from "./UserDropdown";

function AppLayout(props) {
  const { children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSidebar = (condition) => {
    setSidebarOpen(condition);
  };

  const backTop = () => {
    window.scroll({ behavior: "smooth", top: 0 });
  };
  return (
    <div className="min-h-screen text-dark bg-[#f8f8f8]">
      <Header onSidebar={onSidebar} sidebarOpen={sidebarOpen} />

      {/* Main column */}
      <div className="flex flex-col lg:pl-64">
        {/* Search header */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars4Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <UserDropdown />
            </div>
          </div>
        </div>
        <main className="flex-1">
          <div className="p-3">{children}</div>
        </main>
      </div>

      <button
        type="button"
        onClick={() => {
          backTop();
        }}
        className="fixed bottom-16 right-4 inline-block rounded-full border border-white bg-primary p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-lg focus:bg-rose-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-800 active:shadow-lg lg:bottom-5"
        id="btn-back-to-top"
      >
        <ArrowUp />
      </button>
    </div>
  );
}
export default AppLayout;

// ** PropTypes
AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
