import React, { useEffect, useState } from "react";

const StaffSelector = ({ data, onSelect }) => {
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedStaffId(data[0].id);
      onSelect(data[0]);
    }
  }, [data]);

  const handleSelect = (staff) => {
    setSelectedStaffId(staff.id);
    onSelect(staff);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((staff) => (
        <div
          key={staff.id}
          onClick={() => handleSelect(staff)}
          className={`cursor-pointer p-4 rounded-2xl shadow-md border-2 transition 
            ${selectedStaffId === staff.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"} 
            hover:shadow-lg`}
        >
          <h3 className="text-lg font-semibold">{staff.user.fullName}</h3>
          <p className="text-sm text-gray-600">SĐT: {staff.user.phoneNumber}</p>
          <p className="text-sm text-gray-600">Doanh số: {staff.totalSales.toLocaleString()} đ</p>
          <p className="text-sm text-yellow-500">⭐ {staff.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default StaffSelector;
