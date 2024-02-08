import React, { useState } from 'react';

const HorizontalTab = (props) => {
  const { defaultTabs } = props;
  const [tabs, setTabs] = useState(defaultTabs);

  const handleTableControl = (t) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === t.id) {
        tab['isActive'] = true;
      } else {
        tab['isActive'] = false;
      }
      return tab;
    });
    setTabs(updatedTabs);
  };
  return (
    <div>
      <div className="overflow-hidden overflow-x-auto border-b border-gray-200">
        <ul className="-mb-px flex   text-center text-sm font-medium text-gray-500">
          {tabs.map((tab) => {
            return (
              <li key={tab.id} className="me-2">
                <button
                  className={`group inline-flex items-center justify-center rounded-t-lg border-b-2  p-4  ${
                    tab.isActive
                      ? 'border-b-2 border-blue-600  text-blue-600'
                      : 'hover:border-gray-300 hover:text-gray-600 border-transparent'
                  }  `}
                  onClick={() => {
                    handleTableControl(tab);
                  }}
                >
                  {tab.icon}
                  {tab.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="my-2 min-h-[200px] rounded border p-4">
        {tabs.map((tab, tabIdx) => (
          <div hidden={!tab.isActive} key={tabIdx}>
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalTab;
