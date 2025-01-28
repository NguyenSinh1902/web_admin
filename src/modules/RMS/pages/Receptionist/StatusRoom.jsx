import React from "react";

export const StatusRoom = ({type, tags, onStatusChange }) => {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {tags.map((status) => (
        <span
          key={status.tag}
          className={`rounded-full space-x-2 cursor-pointer py-1 px-4 border  ${
            status.isActive
              ? `bg-${status.color}-500 text-white  border-${status.color}-500`
              : `bg-${status.color}-50 text-${status.color}-500 border-${status.color}-50`
          }`}
          onClick={() => onStatusChange(status.tag)}
        >
          <span className="text-sm font-medium">
            {status.tag} ({status?.total || 0})
          </span>
        </span>
      ))}
    </div>
  );
};
