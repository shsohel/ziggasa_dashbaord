import React from "react";

const ListLoader = ({ rowLength, hidden = false }) => {
  const rows = Array(rowLength).fill(2);
  // const cols = Array(colLength).fill(2);

  return (
    <div className="mx-auto w-full p-4 shadow">
      <div className=" animate-pulse space-x-4">
        <div className=" space-y-3 py-1">
          {rows.map((i, index) => (
            <div key={index} className=" h-3  rounded bg-mute"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLoader;
