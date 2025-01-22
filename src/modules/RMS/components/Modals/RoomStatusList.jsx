import React, { useState } from "react";
import { Button, Checkbox, Collapse, Segmented } from "antd";
import { faker } from "@faker-js/faker";

const generateFloors = (numFloors, roomsPerFloor) => {
  return Array.from({ length: numFloors }, (_, floorIndex) => ({
    floor: `Tầng ${floorIndex + 1}`,
    rooms: Array.from({ length: roomsPerFloor }, () => ({
      roomId: faker.string.uuid(),
      roomName: `Phòng ${faker.number.int({ min: 100, max: 999 })}`,
    })),
  }));
};

export const RoomStatusList = () => {
  const [floors, setFloors] = useState(generateFloors(3, 5));
  
  const [segment, setSegment] = useState('Sạch');
  const [checkAll, setCheckAll] = useState(false);

  const [checkedState, setCheckedState] = useState(
    floors.reduce((acc, floor) => {
      acc[floor.floor] = {
        checked: false,
        rooms: floor.rooms.reduce((roomAcc, room) => {
          roomAcc[room.roomId] = false;
          return roomAcc;
        }, {}),
      };
      return acc;
    }, {})
  );

   const handleFloorCheckboxChange = (floorName) => {
    const newCheckedState = { ...checkedState };
    const floorRooms = newCheckedState[floorName].rooms;
    const newChecked = !newCheckedState[floorName].checked;

    // Update the floor checkbox and all room checkboxes on that floor
    newCheckedState[floorName].checked = newChecked;
    for (let room in floorRooms) {
      floorRooms[room] = newChecked;
    }

    // Update the check all checkbox if all floors are checked
    const allFloorsChecked = Object.values(newCheckedState).every(floor => floor.checked);
    setCheckAll(allFloorsChecked);

    setCheckedState(newCheckedState);
  };

  const handleRoomCheckboxChange = (floorName, roomId) => {
    const newCheckedState = { ...checkedState };
    newCheckedState[floorName].rooms[roomId] = !newCheckedState[floorName].rooms[roomId];

    // Update floor checkbox based on individual rooms' state
    const allChecked = Object.values(newCheckedState[floorName].rooms).every((isChecked) => isChecked);
    newCheckedState[floorName].checked = allChecked;

    setCheckedState(newCheckedState);
  };

  const handleCheckAllChange = () => {
    const newCheckedState = { ...checkedState };
    const newCheckAll = !checkAll;

    Object.keys(newCheckedState).forEach(floor => {
      newCheckedState[floor].checked = newCheckAll;
      Object.keys(newCheckedState[floor].rooms).forEach(room => {
        newCheckedState[floor].rooms[room] = newCheckAll;
      });
    });

    setCheckedState(newCheckedState);
    setCheckAll(newCheckAll);
  };

  return (
    <div className=" h-screen flex justify-start items-start">
      <div className="w-80 p-2 rounded-lg shadow-lg">
      <Segmented
          options={['Sạch', 'Chưa dọn']}
          value={segment}
          onChange={(val) => setSegment(val)}
          className="mb-4 font-semibold"
        />
        <div>
        <Checkbox
          checked={checkAll}
          onChange={handleCheckAllChange}
          className="mb-4"
        >
          Chọn tất cả
        </Checkbox>
        </div>
        <Collapse className="!bg-white">
          {floors.map((floor, index) => (
            <Collapse.Panel
            className="bg-white"
              header={
                <div className="flex items-center">
                  <Checkbox
                    checked={checkedState[floor.floor].checked}
                    onChange={() => handleFloorCheckboxChange(floor.floor)}
                  >
                    {floor.floor}
                  </Checkbox>
                </div>
              }
              key={index}
            >
              <div className="ml-4">
                {floor.rooms.map((room) => (
                  <div key={room.roomId} className="mb-2">
                    <Checkbox
                      checked={checkedState[floor.floor].rooms[room.roomId]}
                      onChange={() =>
                        handleRoomCheckboxChange(floor.floor, room.roomId)
                      }
                    >
                      {room.roomName}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};
