import React, { useState, useEffect } from "react";
import { Button, Layout, Table, Collapse, Checkbox, Radio, Input, Tabs, Popover, Drawer } from "antd";
import {
    CheckSquareOutlined,
    DeleteFilled,
    PlusOutlined,
    MenuOutlined,
    CaretDownOutlined,
    FileDoneOutlined,
    InboxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormatMoney } from "../../utils";
import { faker } from "@faker-js/faker";

const Inventory = () => {
    const { Panel } = Collapse;
    const { Header, Content, Sider } = Layout;
    const { TabPane } = Tabs;
    const [expandedRowKeysService, setExpandedRowKeysService] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const navigate = useNavigate();

    const handleInventoryClick = () => {
        navigate("/rms/inventory-form");
    };

    //#region Inventory
    const generateData = (numRows) => {
        const data = [];
        for (let i = 0; i < numRows; i++) {
            data.push({
                key: i,
                ProductName: faker.commerce.productName(),
                Time: faker.date.recent().toLocaleString(), // lấy ngày gần đây và định dạng thành chuỗi
                TotalDifference: faker.number.bigInt({ min: 0, max: 1000000 }),
                TotalDeviation: faker.number.bigInt({ min: 0, max: 1000000 }),
                DeviationIncrease: faker.number.int({ min: 0, max: 100 }),
                TotalAdd: faker.number.bigInt({ min: 0, max: 1000000 }),
                DeviationDecrease: faker.number.int({ min: 0, max: 100 }),
                TotalReduction: faker.number.bigInt({ min: 0, max: 1000000 }),
                Status: faker.helpers.arrayElement(["Hoàn thành", "Quá hạn", "Trong tiến trình"]),
            });
        }
        return data;
    };
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "ProductName",
            key: "id",
            render: (text) => <div className="text-left">{text}</div>,
        },
        {
            title: "Thời gian",
            dataIndex: "Time",
            key: "Time",
            render: (text) => <div className="text-left">{text}</div>,
        },
        {
            title: "Tổng chênh lệch",
            dataIndex: "TotalDifference",
            key: "TotalDifference",
            responsive: ["lg"],
            align: "center",
            render: (text) => <p>{FormatMoney(text)}</p>,
        },
        {
            title: "Tổng giá trị lệch",
            dataIndex: "TotalDeviation",
            key: "TotalDeviation",
            responsive: ["lg"],
            align: "center",
            render: (text) => <p>{FormatMoney(text)}</p>,
        },
        {
            title: "SL lệch tăng",
            dataIndex: "DeviationIncrease",
            key: "DeviationIncrease",
            responsive: ["lg"],
            align: "center",
            render: (text) => <p>{FormatMoney(text)}</p>,
        },
        {
            title: "Tổng giá trị tăng",
            dataIndex: "TotalAdd",
            key: "TotalAdd",
            responsive: ["lg"],
            align: "center",
        },
        {
            title: "SL lệch giảm",
            dataIndex: "DeviationDecrease",
            key: "DeviationDecrease",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Tổng giá trị giảm",
            dataIndex: "TotalReduction",
            key: "TotalReduction",
            responsive: ["lg"],
            align: "center",
        },
        {
            title: "Trạng thái",
            dataIndex: "Status",
            key: "Status",
            responsive: ["lg"],
            align: "center",
        },
    ];
    const [dataInventory, setDataInventory] = useState(generateData(10));
    const [dataInventoryTmp, setDataInventoryTmp] = useState(dataInventory);
    const [selectedColumnsInventory, setSelectedColumnsInventory] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(columns);

    // #region xử lý thay đổi trạng thái checkbox
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const handleStatusChange = (checkedValues) => {
        if (checkedValues.length === 0) {
            setDataInventoryTmp(dataInventory); // nếu không có trạng thái nào được chọn, hiển thị tất cả dữ liệu
        } else {
            const filteredData = dataInventory.filter((item) => checkedValues.includes(item.Status));
            setDataInventoryTmp(filteredData);
        }
    };
    //#endregion

    useEffect(() => {
        const savedColumns = JSON.parse(localStorage.getItem("hiddenColumnsInventory"));
        if (savedColumns) {
            setSelectedColumnsInventory(savedColumns);
            filterColumns(savedColumns);
        } else {
            setSelectedColumnsInventory(columns.map((col) => col.key));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("hiddenColumnsInventory", JSON.stringify(selectedColumnsInventory));
        filterColumns(selectedColumnsInventory);
    }, [selectedColumnsInventory]);

    // Lọc các cột hiển thị dựa trên các hộp kiểm đã chọn
    const filterColumns = (selectedKeys) => {
        setVisibleColumns(columns.filter((col) => selectedKeys.includes(col.key)));
    };

    // Xử lý tich chọn ẩn hiện column table
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedColumnsInventory((prev) => (checked ? [...prev, name] : prev.filter((key) => key !== name)));
    };

    // Hiển thị column table
    const contentDropdownRoom = (
        <div className="space-y-2">
            {columns.map((col) => (
                <div key={col.key}>
                    <Checkbox
                        name={col.key}
                        checked={selectedColumnsInventory.includes(col.key)}
                        onChange={handleCheckboxChange}
                    >
                        {col.title}
                    </Checkbox>
                </div>
            ))}
        </div>
    );

    // Cập nhật localStorage và các cột được lọc khi selectedColumns thay đổi
    useEffect(() => {
        localStorage.setItem("hiddenColumnsInventory", JSON.stringify(selectedColumnsInventory));
        filterColumns(selectedColumnsInventory);
    }, [selectedColumnsInventory]);
    //#endregion

    const expandedRowRenderLevelService = (record) => {
        return (
            <div className=" bg-white border-none expanded ">
                <Tabs defaultActiveKey="1" className=" tab-action-room ">
                    <TabPane className="py-4 px-8 shadow-2xl" tab="Thông tin" key="1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                            <div className="flex items-start gap-3 ">
                                <img src={record.imageUrl} alt="Room" className="w-full h-auto rounded-lg" />
                                <div className="flex flex-col gap-2">
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap">
                                    <div className=" flex flex-col gap-3">
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Nhóm hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Giá :</td>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.category}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.hourlyRate}
                                        </td>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <p className=" pb-1 ">Ghi chú: </p>
                                    <p className="font-semibold pb-2 text-red-500"></p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end w-full gap-3">
                            <Button className="bg-green-500 px-3 py-2 font-semibold text-white h-auto flex items-center">
                                <CheckSquareOutlined /> Cập nhật
                            </Button>
                            <Button className="bg-red-500 px-3 py-2 font-semibold text-white h-auto flex items-center">
                                <DeleteFilled /> Xóa
                            </Button>
                        </div>
                    </TabPane>
                    <TabPane tab="Chi tiết" key="2"></TabPane>
                </Tabs>
            </div>
        );
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className="bg-white p- rounded-md shadow-lg h-[calc(100vh-60px)]">
            <Layout className="min-h-screen bg-gray rounded-md shadow-lg">
                {/* Header */}

                <Layout className="bg-gray">
                    {/* Sidebar */}
                    <Sider
                        width={300}
                        theme="light"
                        className="bg-gray p-4 h-[800px] overflow-y-scroll md:block hidden "
                    >
                        {/* Tìm kiếm */}
                        <div className="mb-4 p-4 bg-white rounded-lg shadow">
                            <label className="block text-gray-600 font-medium mb-2">Tìm kiếm</label>
                            <Input placeholder="Theo mã, tên dịch vụ" />
                        </div>

                        {/* Loại hàng */}
                        <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                            {/* Loại dịch vụ */}

                            {/* Trạng thái */}
                            <Panel header="Trạng thái" key="4" className="bg-white rounded-lg shadow mb-4">
                                <Checkbox.Group
                                    onChange={handleStatusChange}
                                    className="flex flex-col gap-2"
                                    options={[
                                        { label: "Hoàn thành", value: "Hoàn thành" },
                                        { label: "Quá hạn", value: "Quá hạn" },
                                        { label: "Trong tiến trình", value: "Trong tiến trình" },
                                    ]}
                                    defaultValue={[]}
                                />
                            </Panel>
                        </Collapse>
                    </Sider>

                    {/* Drawer for mobile */}
                    <Drawer
                        title="Lọc"
                        placement="left"
                        closable={true}
                        onClose={onClose}
                        visible={visible}
                        className="p-4 bg-gray-50"
                        bodyStyle={{ padding: 0 }}
                    >
                        <Sider width={300} theme="light" className="bg-gray p-4 md:hidden block ">
                            {/* Tìm kiếm */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block text-gray-600 font-medium mb-2">Tìm kiếm</label>
                                <Input placeholder="Theo mã, tên dịch vụ" />
                            </div>

                            {/* Loại hàng */}
                            <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                                {/* Loại dịch vụ */}

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="4" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="active">
                                        <Radio value="active" className="block mb-2">
                                            Phiếu tạm
                                        </Radio>
                                        <Radio value="inactive" className="block mb-2">
                                            Đã cân bằng kho
                                        </Radio>
                                        <Radio value="all" className="block">
                                            Đã hủy
                                        </Radio>
                                    </Radio.Group>
                                </Panel>
                            </Collapse>
                        </Sider>
                    </Drawer>

                    {/* Main Content */}
                    <Content className="p-6 bg-white">
                        <div className="flex md:flex-row flex-col justify-between mb-4 gap-3">
                            <div className="flex items-center gap-2">
                                <div className="lg:hidden block p-2">
                                    <Button icon={<MenuOutlined />} onClick={showDrawer} />
                                </div>
                                <h1 className="text-lg font-bold text-gray-700">Phiếu kiểm kho</h1>
                            </div>

                            <div className="flex gap-5 ">
                                <Button type="primary" onClick={handleInventoryClick}>
                                    <PlusOutlined className="ml-2" />
                                    Kiểm kho
                                </Button>

                                <Button type="primary">
                                    <FileDoneOutlined />
                                    <a href="#">Xuất file</a>
                                </Button>

                                <Popover content={contentDropdownRoom} trigger="click" placement="bottomLeft">
                                    <Button type="primary">
                                        <MenuOutlined />
                                        <CaretDownOutlined />
                                    </Button>
                                </Popover>
                            </div>
                        </div>

                        {/* TAB BUTTONS */}

                        {/* MODAL */}
                        <>
                            <div className="overflow-x-auto">
                                <Table
                                    pagination={{ pageSize: 10 }}
                                    columns={visibleColumns}
                                    dataSource={dataInventoryTmp}
                                    expandedRowRender={expandedRowRenderLevelService} // Nếu cần mở rộng hàng
                                    expandedRowKeys={expandedRowKeysService}
                                    expandIcon={() => {
                                        return <></>;
                                    }}
                                    rowSelection={rowSelection}
                                    onRow={(record) => ({
                                        onClick: () => {
                                            const newExpandedRowKeys = expandedRowKeysService.includes(record.key)
                                                ? expandedRowKeysService.filter((key) => key !== record.key)
                                                : [...expandedRowKeysService, record.key];
                                            setExpandedRowKeysService(newExpandedRowKeys);
                                        },
                                    })}
                                    rowClassName={(record) =>
                                        expandedRowKeysService.includes(record.key)
                                            ? "expanded-row bg-[#b8f8ce] font-semibold"
                                            : "normal-row"
                                    }
                                    className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
                                    locale={{
                                        emptyText: (
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <InboxOutlined style={{ fontSize: "50px", color: "#aaa" }} />
                                                <p>Không tìm thấy phiếu kiểm kho nào phù hợp trong tháng này.</p>
                                                <p>
                                                    Nhấn{" "}
                                                    <a href="#" className="text-blue-800">
                                                        vào đây
                                                    </a>{" "}
                                                    để tìm kiếm trên toàn thời gian.
                                                </p>
                                            </div>
                                        ),
                                    }}
                                />
                            </div>
                        </>
                        {/* Table */}
                    </Content>
                </Layout>
            </Layout>
            {/* TOP HEADER */}
        </div>
    );
};

export default Inventory;
