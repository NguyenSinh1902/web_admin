import React, { useState, useEffect } from "react";
import {
    PlusOutlined,
    SaveOutlined,
    StopOutlined,
    ArrowLeftOutlined,
    UnorderedListOutlined,
    SearchOutlined,
    PrinterOutlined,
    ControlOutlined,
    EditOutlined,
    CheckOutlined,
    UploadOutlined,
    CheckSquareOutlined,
    FormOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { Collapse, Modal, Tabs, Button, Input, Segmented, Tooltip, Space, Select, Table } from "antd";
import InputField from "../../common/InputField";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import ServiceForm from "./ServiceForm";
import ModalComp from "../../common/ModalComp";

const ImportGoodsForm = () => {
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStartDate(new Date());
        }, 24 * 60 * 60 * 1000); // Cập nhật mỗi 24 giờ

        return () => clearInterval(intervalId); // Xóa interval khi component bị unmount
    }, []);

    const [alignValue, setAlignValue] = React.useState("center");

    const [isShowImportGoods, setIsShowImportGoods] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]); // State quản lý dữ liệu
    const [isInputMode, setIsInputMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");

    const onChange = (key) => {};

    const TabContent = ({ children }) => {
        return (
            <div
                className="bg-white p-4 border border-gray-300 flex flex-col items-center justify-center"
                style={{ minHeight: "450px" }}
            >
                {children}
            </div>
        );
    };

    const handleAddItem = () => {
        if (searchValue && quantity && unit) {
            const newItem = {
                key: data.length + 1,
                codeOrName: searchValue,
                quantity,
                unit,
            };
            setData([...data, newItem]); // Cập nhật state với dữ liệu mới
            setSearchValue("");
            setQuantity("");
            setUnit("");
        } else {
            alert("Vui lòng nhập đủ thông tin!");
        }
    };

    const columns = [
        {
            title: "Mã hoặc Tên Hàng Hóa",
            dataIndex: "codeOrName",
            key: "codeOrName",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            key: "unit",
        },
    ];

    const tabContent =
        data.length === 0 ? (
            <TabContent>
                <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm từ file Excel</h2>
                <p className="mb-2">
                    Xử lý dữ liệu (Tải về File mẫu:{" "}
                    <a href="#" className="text-blue-500 underline">
                        Excel File
                    </a>
                    )
                </p>
                <Button className="flex items-center mt-3 bg-green-500 text-white px-5 py-5">
                    <UploadOutlined className="mr-2" />
                    Chọn file dữ liệu
                </Button>
            </TabContent>
        ) : (
            <Table columns={columns} dataSource={data} bordered pagination={false} />
        );

    const items = [
        {
            key: "1",
            label: "",
            children: tabContent,
        },
    ];

    const [isModalOpenAddNew, setIsModalOpenAddNew] = useState(false);
    const showModalAddNew = () => {
        setIsModalOpenAddNew(true);
    };
    const handleOkAddNew = () => {
        setIsModalOpenAddNew(false);
    };
    const handleCancelAddNew = () => {
        setIsModalOpenAddNew(false);
    };

    const [checkedItems, setCheckedItems] = useState({
        all: false,
        services: false,
        food: false,
        drink: false,
        inStock: false,
        inBusiness: false,
    });

    const navigate = useNavigate();

    const handleInventoryClick = () => {
        navigate("/rms/import-goods");
    };

    const handleChange = (value) => {};

    //#region  Print biên bản
    const [HtmlPrint, setHtmlPrint] = useState([]);

    const PrintMinutes = (e) => {
        setHtmlPrint([]);

        let DataPrint = generatePrintTemplate();

        setHtmlPrint(DataPrint);
        //#region Khởi tạo form in
        const iframe = document.createElement("iframe");
        iframe.name = "printf";
        iframe.id = "printf";
        iframe.height = 0;
        iframe.width = 0;
        document.body.appendChild(iframe);
        var newWin = window.frames["printf"];
        newWin.document.write(`<body onload="window.print()">${DataPrint}</body>`);
        newWin.document.close();
    };

    const PrintExportInvoice = (e) => {
        setHtmlPrint([]);

        let DataPrint = generatePrintExportInvoice();

        setHtmlPrint(DataPrint);
        //#region Khởi tạo form in
        const iframe = document.createElement("iframe");
        iframe.name = "printf";
        iframe.id = "printf";
        iframe.height = 0;
        iframe.width = 0;
        document.body.appendChild(iframe);
        var newWin = window.frames["printf"];
        newWin.document.write(`<body onload="window.print()">${DataPrint}</body>`);
        newWin.document.close();
    };

    const generatePrintTemplate = () => {
        const newdate = new Date();
        return `
    <div class="bill" style="width: 95%; height: 90%; page-break-before: always; page-break-after: always;padding:20px;margin: 0 auto; padding: 20px; border: 1px solid #000;">
        <div style="display:flex;">
        <div style="flex-basis: 20%">
        <img width="200px" height="80px" src="https://erp.cak-solution.com/assets/img/cak-logo.png"/></div>
        
        <div style="text-align: center; margin-bottom: 20px;flex-basis: 80%">
            <p style="margin: 0; font-size: 14px;">CÔNG TY GIẢI PHÁP PHẦN MỀM CÔNG NGHỆ CAK-SOLUTION</p>
            <p style="margin: 0; font-size: 14px;">542/12/5, NGUYỄN ẢNH THỦ, P. HIỆP THÀNH, , QUẬN 12, TP. HỒ CHÍ MINH</p>
            <h1 style="margin: 0; font-size: 20px;">PHIẾU NHẬP KHO</h1>
            <p style="margin: 0; font-size: 14px;">NGÀY 07 THÁNG 05 NĂM 2024</p>
            <p style="margin: 0; font-size: 14px;">Số: PN41</p>
        </div>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;">- Họ và tên người giao:</p>
            <p style="margin: 5px 0;">- Theo ................. số ............. ngày ...... tháng ...... năm .......... của ...............</p>
            <p style="margin: 5px 0;">- Nhập tại kho: K02 - Kho thành phẩm địa điểm:</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th rowspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">STT</th>
                    <th rowspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">TÊN, NHÃN HIỆU, QUY CÁCH, PHẨM CHẤT VẬT TƯ, DỤNG CỤ, SẢN PHẨM, HÀNG HÓA</th>
                    <th rowspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">MÃ SỐ</th>
                    <th rowspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">ĐVT</th>
                    <th colspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">SỐ LƯỢNG</th>
                    <th rowspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">ĐƠN GIÁ</th>
                    <th rowspan="2" style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">THÀNH TIỀN</th>
                </tr>
                <tr>
                    <th style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">THEO C.TỪ</th>
                    <th style="border: 1px solid #000; padding: 5px; text-align: center; background-color: #f2f2f2;">THỰC NHẬP</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">1</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Súp bào ngư</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5SU001</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Bát</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">12,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">12,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">114,999.42</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">1,379.993</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">2</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Súp hải sản</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5SU002</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Bát</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">15,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">15,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">103,503.40</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">1,552.551</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">3</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Lẩu riêu cua bắp bò 4 người</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5CO001</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Set</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">13,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">13,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">345,025.33</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">4,485.067</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">4</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Combo thịt bò nướng 6 người</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5CO002</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Set</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">13,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">13,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">609,509.00</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">7,923.617</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Hải sản xào măng tây</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5ML001</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Đĩa</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">15,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">15,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">259,903.87</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">3,898.558</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">6</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Cua Cà Mau sốt me hành</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5ML002</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Kg</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">10,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">10,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">690,014.00</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">6,900.140</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">7</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Ghẹ Phú Quốc rang muối ớt</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">5ML003</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">Kg</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">10,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">10,000</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">690,014.00</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">6,900.140</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7" style="border: 1px solid #000; padding: 5px; text-align: center;">CỘNG:</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">33.500.000</td>
                </tr>
            </tfoot>
        </table>
        <div style="margin-top: 20px;">
            <p style="margin: 5px 0;">- Tổng cộng số tiền (Viết bằng chữ): Ba mươi ba triệu, năm trăm nghìn đồng chẵn</p>
            <p style="margin: 5px 0;">- Số chứng từ gốc kèm theo: 0</p>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <div style="text-align: center;">
                <p style="margin: 5px 0;">NGƯỜI LẬP PHIẾU</p>
                <p style="margin: 5px 0;">(Ký, họ tên)</p>
            </div>
            <div style="text-align: center;">
                <p style="margin: 5px 0;">NGƯỜI GIAO HÀNG</p>
                <p style="margin: 5px 0;">(Ký, họ tên)</p>
            </div>
            <div style="text-align: center;">
                <p style="margin: 5px 0;">THỦ KHO</p>
                <p style="margin: 5px 0;">(Ký, họ tên)</p>
            </div>
            <div style="text-align: center;">
                <p style="margin: 5px 0;">KẾ TOÁN TRƯỞNG</p>
                <p style="margin: 5px 0;">(Hoặc bộ phận có nhu cầu nhập)</p>
                <p style="margin: 5px 0;">(Ký, họ tên)</p>
            </div>
        </div>
    </div>
		`;
    };

    const generatePrintExportInvoice = () => {
        const newdate = new Date();
        return `
    <div class="bill" style="width: 95%; height: 90%; page-break-before: always; page-break-after: always;padding:20px;margin: 0 auto; padding: 20px; border: 1px solid #000;">
      <div style="display:flex;">
        <div style="flex-basis: 20%">
        <img width="200px" height="80px" src="https://erp.cak-solution.com/assets/img/cak-logo.png"/></div>
        
        <div style="text-align: center; margin-bottom: 20px;flex-basis: 80%">
            <p style="margin: 0; font-size: 14px;">CÔNG TY GIẢI PHÁP PHẦN MỀM CÔNG NGHỆ CAK-SOLUTION</p>
            <p style="margin: 0; font-size: 14px;">542/12/5, NGUYỄN ẢNH THỦ, P. HIỆP THÀNH, , QUẬN 12, TP. HỒ CHÍ MINH</p>
             <h1 style="margin: 0; font-size: 20px;">PHIẾU XUẤT KHO</h1>
            <p style="margin: 4px 0;">Số phiếu: PX001</p>
            <p style="margin: 4px 0;">Ngày lập phiếu: 19/11/2024</p>
        </div>
        </div>

    <!-- Information Section -->
    <div style="margin-bottom: 20px; font-size: 14px;">
      <p style="margin-bottom: 8px;"><strong>Kho xuất:</strong> Kho thành phẩm</p>
      <p style="margin-bottom: 8px;"><strong>Người nhận hàng:</strong> Nguyễn Văn A</p>
      <p style="margin-bottom: 8px;"><strong>Đơn vị nhận hàng:</strong> Phòng Kinh Doanh</p>
      <p style="margin-bottom: 8px;"><strong>Lý do xuất kho:</strong> Xuất bán hàng</p>
    </div>

    <!-- Table Section -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">STT</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">Tên hàng hóa</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">Mã hàng</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">ĐVT</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">Số lượng</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">Đơn giá</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f8f9fa;">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Sản phẩm A</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">SP001</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">Cái</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">10</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">100,000</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">1,000,000</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">2</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Sản phẩm B</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">SP002</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">Thùng</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">5</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">200,000</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">1,000,000</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;" colspan="6"><strong>Tổng cộng</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">2,000,000</td>
        </tr>
      </tfoot>
    </table>

    <!-- Footer Section -->
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <div style="text-align: center; font-size: 14px;">
        <p><strong>Người lập phiếu</strong></p>
        <p>(Ký và ghi rõ họ tên)</p>
      </div>
      <div style="text-align: center; font-size: 14px;">
        <p><strong>Thủ kho</strong></p>
        <p>(Ký và ghi rõ họ tên)</p>
      </div>
      <div style="text-align: center; font-size: 14px;">
        <p><strong>Người nhận hàng</strong></p>
        <p>(Ký và ghi rõ họ tên)</p>
      </div>
    </div>
    </div>
		`;
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 w-full shadow-lg p-2">
                <div className="header-form flex  gap-4">
                    <div className="flex gap-5 mt-1 items-center">
                        <Button onClick={handleInventoryClick}>
                            <i>
                                <ArrowLeftOutlined />
                            </i>
                        </Button>
                        <h2 className="text-lg">Nhập hàng</h2>
                    </div>
                    {/* Tìm kiếm */}
                    <div className="flex gap-2 items-center justify-between grow">
                        <div className="">
                            <Input
                                size="middle"
                                prefix={<SearchOutlined style={{ color: "#777777" }} />}
                                placeholder="Tìm hàng hóa theo mã hoặc tên"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                suffix={
                                    <>
                                        <Tooltip title="Chọn nhóm hàng" placement="top">
                                            <Button
                                                style={{
                                                    color: "#777777",
                                                    border: "none",
                                                }}
                                                onClick={() => setIsModalVisible(true)} // Hàm xử lý sự kiện cho UnorderedListOutlined
                                            >
                                                <UnorderedListOutlined style={{ fontSize: "12px" }} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Thêm hàng hóa mới" placement="top">
                                            <Button
                                                style={{
                                                    color: "#777777",
                                                    border: "none",
                                                }}
                                                onClick={showModalAddNew} // Hàm xử lý sự kiện cho PlusOutlined
                                            >
                                                <PlusOutlined style={{ fontSize: "12px" }} />
                                            </Button>
                                        </Tooltip>
                                    </>
                                }
                                onClick={(e) => e.stopPropagation()} // Ngăn ngừa sự kiện click trên input
                            />

                            <Modal
                                open={isModalOpenAddNew}
                                onOk={handleOkAddNew}
                                onCancel={handleCancelAddNew}
                                width={1000}
                                footer={null}
                                className="custom-modal"
                                title={<h2 className="text-xl font-semibold">Thêm hàng hóa</h2>}
                            >
                                <ServiceForm />
                            </Modal>

                            <Modal
                                title="Thêm hàng hóa từ nhóm hàng"
                                visible={isModalVisible}
                                onCancel={() => setIsModalVisible(false)}
                                footer={null}
                                width={400}
                            >
                                <Space wrap>
                                    <Select
                                        defaultValue="--Lựa chọn--"
                                        style={{
                                            width: 300,
                                            color: "gray",
                                            marginTop: "20px",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Lựa chọn", label: "--Lựa chọn--" },
                                            { value: "Dịch vụ", label: "Dịch vụ" },
                                            { value: "Đồ ăn", label: "Đồ ăn" },
                                            { value: "Đồ uống", label: "Đồ uống" },
                                        ]}
                                    />
                                </Space>
                                <div className="flex justify-end mt-10">
                                    <Button type="primary" className="mr-2" icon={<CheckSquareOutlined />}>
                                        Xong
                                    </Button>
                                    <Button
                                        className="bg-gray-300"
                                        icon={<StopOutlined />}
                                        onClick={() => setIsModalVisible(false)}
                                    >
                                        Bỏ qua
                                    </Button>
                                </div>
                            </Modal>
                        </div>
                        <div className="gap-2 flex ">
                            <Tooltip title="Chế độ nhập">
                                <Button className="p-2" onClick={() => setIsInputMode(!isInputMode)}>
                                    <FormOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Thiết lập in">
                                <Button className="p-2" onClick={() => PrintMinutes()}>
                                    <PrinterOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Mặc định tự động điền Tiền trả nhà cung cấp" placement="bottomRight">
                                <Button className="p-2" onClick={() => PrintExportInvoice()}>
                                    <EyeOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Danh sách các phím tắt">
                                <Button className="p-2">
                                    <ControlOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                {/* Add dữ liệu */}
                {isInputMode && (
                    <div className="flex justify-center -ml-44 gap-2 mt-4">
                        <Input
                            placeholder="Số lượng"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ width: "78px" }}
                        />
                        <Select
                            placeholder="Đơn vị"
                            value={unit}
                            onChange={(value) => setUnit(value)}
                            style={{ width: "80px" }}
                            options={[
                                { value: "Kg", label: "Kg" },
                                { value: "Cái", label: "Cái" },
                                { value: "Hộp", label: "Hộp" },
                            ]}
                        />
                        <Button type="primary" onClick={handleAddItem}>
                            Thêm
                        </Button>
                    </div>
                )}

                <div className="tab-group">
                    <Segmented
                        defaultValue="center"
                        style={{ marginBottom: 8 }}
                        onChange={(value) => setAlignValue(value)}
                    />
                    <Tabs
                        className=" p-2"
                        // tabBarGutter={16}
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                        indicator={{ size: (origin) => origin - 20, align: alignValue }}
                    ></Tabs>
                </div>
            </div>

            <div className="bg-white w-full md:w-1/3 shadow-lg p-4 mr-8">
                <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Dương Quá</div>
                        <div className="">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date ? date.toDate() : new Date())}
                                format="HH:mm, DD/MM/YYYY"
                                showTime={{ format: "HH:mm" }}
                                className=" font-semibold text-center input-book"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <InputField className="w-full" placeholder="Tìm nhà cung cấp" />
                        <PlusOutlined onClick={() => setIsShowImportGoods(true)} />
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm">
                        <label className="">Mã phiếu nhập</label>
                        <InputField className="" name="Mã phiếu tự động" placeholder="Mã phiếu tự động" />
                    </div>
                    <div className="form-group flex items-center justify-between gap-4 text-sm">
                        <label className="font-semibold">Trạng thái</label>
                        <div>Phiếu tạm</div>
                    </div>
                    <div className="form-group flex items-center justify-between gap-4 text-sm">
                        <label className="font-semibold">Tổng tiền hàng</label>
                        <div>0</div>
                    </div>
                    <div className="form-group flex items-center justify-between gap-4 text-sm">
                        <label className="font-semibold">Giảm giá</label>
                        <div>0</div>
                    </div>
                    <div className="form-group flex items-center justify-between gap-4 text-sm">
                        <label className="font-semibold">Chi phí nhập hàng</label>
                        <div>0</div>
                    </div>
                    <div className="form-group flex items-center justify-between gap-4 text-sm">
                        <label className="font-semibold">Cần trả nhà cung cấp</label>
                        <div>0</div>
                    </div>
                    <div>
                        <InputField prefix={<EditOutlined />} placeholder="Ghi chú" />
                    </div>
                    <div className="btn-group flex gap-10 justify-center">
                        <Button className="bg-blue-500 text-white  rounded-t-md  hover:bg-blue-600">
                            <SaveOutlined className="mr-2" />
                            Lưu tạm
                        </Button>
                        <Button className="bg-green-500 text-white  rounded-md">
                            <CheckOutlined className="mr-2" />
                            Hoàn thành
                        </Button>
                    </div>
                    <ModalComp
                        isOpen={isShowImportGoods}
                        onClose={() => setIsShowImportGoods(false)}
                        width={900}
                        title="Thêm nhà cung cấp"
                    >
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4 mb-2 p-4">
                            <InputField className="col-span-1 " label="Mã nhà cung cấp" name="FullName" />
                            <InputField className="col-span-1 " label="Email" name="Note" />
                            <InputField className="col-span-1 " label="Tên nhà cung cấp" name="FullName" />
                            <InputField className="col-span-1 " label="Công ty" name="Note" />
                            <InputField className="col-span-1 " label="Điện thoại" name="Phone" />
                            <InputField className="col-span-1 " label="Mã số thuế" name="Note" />
                            <InputField className="col-span-1 " label="Địa chỉ" name="Address" />
                            <InputField className="col-span-1 " label="Nhóm NCC" name="Note" />
                            <InputField
                                className="col-span-1 "
                                label="Khu vực"
                                name="Area"
                                placeholder="Chọn Tỉnh/TP - Quận/Huyện"
                            />
                            <InputField className="col-span-1 " label="Ghi chú" name="Note" />
                            <InputField
                                className="col-span-1 "
                                label="Phường xã"
                                name="Ward"
                                placeholder="Chọn Phường/Xã"
                            />
                        </div>
                    </ModalComp>
                </div>
            </div>
        </div>
    );
};

export default ImportGoodsForm;
