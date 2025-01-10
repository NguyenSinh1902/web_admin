import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise"; // "ag-grid-enterprise": "^31.0.2",
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Input } from "antd";
import I18n from "../Language";
const { Search } = Input;
/*
David Note: please instal this package: npm install react-table-hoc-fixed-columns --save
*/
const DataTableAgGridComp = ({
    data = () => {},
    columns = () => {},
    SelectData = () => {},
    DataEditingStopped = [],
    IsDeleteRow = false, // xóa các dọng được chọn
    SelectAllrow = () => {},
    paginationPageSize = 20,
    rowHeight = "650",
    title = I18n.t("TMS.Danh sách"),
    IsFilter = "",
    editable = false, // cho phép chỉnh sửa dữ liệu ở mỗi row
    pagination = true,
    loading = false, // Loading khi call API
    showTitle = true,
    rowSelection = "multiple", //Chọn nhiều dòng hay một dòng -- single
    suppressMenu = false,
}) => {
    useEffect(() => {}, []);
    const gridRef = useRef();
    const [SelectRow, setSelectRow] = React.useState([]);
    // Sự kiện check box
    const onSelectionChanged = () => {
        const selectedRows = gridRef.current.getSelectedRows();
        // Bạn có thể xử lý dữ liệu được chọn ở đây
        SelectData(selectedRows);
        setSelectRow(selectedRows);
    };
    const onCellEditingStopped = (params) => {
        if (params.newValue !== params.oldValue) {
            DataEditingStopped(params.data);
        }
    };

    const onGridReady = (params) => {
        gridRef.current = params.api;
        gridRef.columnApi = params.columnApi;
        if (loading) {
            gridRef.current.showLoadingOverlay();
        }
    };

    useEffect(() => {
        if (gridRef.current) {
            if (loading) {
                gridRef.current.showLoadingOverlay();
            } else {
                gridRef.current.hideOverlay();
            }
        }
    }, [loading]);

    const defaultColDef = useMemo(() => {
        return {
            editable: editable,
            suppressMenu: suppressMenu, // Ẩn menu khi hover vào tiêu đề cột
        };
    }, []);
    const exactMatchFilter = (cellValue, filterText) => {
        let a = cellValue.toString().toLowerCase() === filterText.toLowerCase();
        return a;
    };
    const onQuickFilterChanged = useCallback(() => {
        const filterText = document.getElementById("quickFilter").value.toLowerCase();
        if (gridRef.current) {
            gridRef.current.setQuickFilter(filterText, { column: exactMatchFilter });
        }
    }, []);

    // filter tab
    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.setQuickFilter(IsFilter, { column: exactMatchFilter }); //search trong table dữ liệu theo cột StatusNameOk
        }
    }, [IsFilter]);

    // delete row
    useEffect(() => {
        if (gridRef.current && IsDeleteRow) {
            gridRef.current.getSelectedRows().forEach((node) => {
                const deletedRow = node;
                gridRef.current.applyTransaction({ remove: [deletedRow] });
            });

            SelectAllrow(gridRef.current.getRenderedNodes()); // trả về các dòng còn lại
        }
    }, [IsDeleteRow]);

    const rowSelections = useMemo(() => {
        return {
            mode: rowSelection,
        };
    }, []);

    const loadingTemplate = `
    <div class="custom-loading-overlay flex flex-col items-center justify-center gap-4">
        <div class="spinner"></div>
        <span>Đang tải dữ liệu...</span>
    </div>
`;

    // const height = paginationPageSize * 43 + 100;
    return (
        <div className="w-full md:col-span-2 rounded-md h-full flex flex-col gap-2">
            {showTitle && (
                <div className="w-full flex flex-col md:flex-row  items-center justify-between">
                    <div className=" flex items-center justify-start md:justify-center text-slate-600 w-full md:w-auto">
                        <i className="fa-solid fa-list px-2 hidden md:block"></i>
                        <div className="uppercase">
                            {title} ({data.length})
                        </div>
                        {SelectRow.length > 0 ? ` - Đã chọn ${SelectRow.length} dòng` : ""}
                    </div>
                    <div className="w-full md:w-[250px]">
                        <div className="relative flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder={I18n.t("System.Search") + "..."}
                                onInput={onQuickFilterChanged}
                                id="quickFilter"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div
                style={{
                    width: "100%",
                    height: `100%`,
                }}
            >
                <AgGridReact
                    style={`
                        .ag-watermark {
                        display: none !important;
                        }
                    `}
                    gridOptions={{
                        suppressNoRowsOverlay: true,
                        rowSelection: rowSelection,
                        onSelectionChanged: onSelectionChanged,
                        stopEditingWhenCellsLoseFocus: true, // Dừng chỉnh sửa khi ô mất focus
                    }}
                    className={`ag-theme-quartz w-full rounded-none `}
                    onGridReady={onGridReady} // Get data của danh sách API trả về
                    autoSizeColumns
                    columnDefs={columns}
                    rowData={data}
                    defaultColDef={defaultColDef}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={[5, 10, 20, 50, 100, 200, 500, 1000]}
                    suppressRowClickSelection={true} //click đúng ô mới check vào checkbox
                    suppressContextMenu={false} // bỏ chuột phải
                    enableRangeSelection={true} // bỏ coppy mặc định của check box
                    //autoSizeStrategy={autoSizeStrategy}
                    onCellEditingStopped={onCellEditingStopped} // Thêm sự kiện
                    overlayLoadingTemplate={loadingTemplate} // Sử dụng template tùy chỉnh loading
                />
            </div>
        </div>
    );
};

export const DataTableAgGrid = React.memo(DataTableAgGridComp);
