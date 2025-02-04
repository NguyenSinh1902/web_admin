import { Route } from "react-router-dom";
import { lazy } from "react";
import { LazyRouter } from "./LazyRouter";

// Lazy-loaded components
const Officer = lazy(() => import("../components/HRM/Staff/Officer"));
const ProductManager = lazy(() => import("../components/Ongvang/MasterData/ProductManager/ProductManager"));
const WalletManagement = lazy(() => import("../components/Ongvang/Wallet/WalletManagement"));
const PostOffice = lazy(() => import("../components/HRM/Staff/PostOffice"));
const Department = lazy(() => import("../components/HRM/Staff/Department"));
const PositionManagement = lazy(() => import("../components/HRM/Staff/PositionManagement"));
const AccountSetting = lazy(() => import("../components/Ongvang/Account/AccountSetting"));
const VoucherManagement = lazy(() => import("../components/Ongvang/MasterData/Voucher/VoucherManagement"));
const CreateService = lazy(() => import("../components/Ongvang/MasterData/Service/CreateService"));
const CreateRank = lazy(() => import("../components/Ongvang/MasterData/RankPoint/CreateRank"));
const CustomerRankReport = lazy(() => import("../components/Ongvang/Report/CustomerRankReport"));
const ManagerProfileOfficer = lazy(() => import("../components/Ongvang/Account/ManagerProfileOfficer"));
const ProductGroup = lazy(() => import("../components/WMS/Masterdata/ProductGroup"));
const CustomerOVG = lazy(() => import("../components/Ongvang/Customer/CustomerOVG"));
const RevenueOfficerReport = lazy(() => import("../components/Ongvang/Report/RevenueOfficerReport"));
const QuantityBookingReport = lazy(() => import("../components/Ongvang/Report/QuantityBookingReport"));
const OfficerRankReport = lazy(() => import("../components/Ongvang/Report/OfficerRankReport"));
const HomeOVG = lazy(() => import("../components/Ongvang/HomeOVG"));
const BookingService_V2 = lazy(() => import("../components/Ongvang/Booking/BookingService_V2"));
const RevenueCustomerReport = lazy(() => import("../components/Ongvang/Report/RevenueCustomerReport"));
const Department_Team = lazy(() => import("../components/HRM/Staff/Deparment_Team"));

// Export mảng các <Route>
export const OngVangRoutes = () => {
    return (
        <>
            <Route path="/ovg/home" element={LazyRouter(HomeOVG)} key="ovg-home" />
            {/* // KHÁCH HÀNG */}
            <Route path="/ovg/customer/khach-hàng" element={LazyRouter(CustomerOVG)} key="ovg-customer" />
            {/* // DANH MỤC */}
            {/* MASTER DATA */}
            <Route
                path="/ovg/master-data/quan-ly-san-pham"
                element={LazyRouter(ProductManager)}
                key="product-manager"
            />
            <Route path="/ovg/master-data/danh-muc-san-pham" element={LazyRouter(ProductGroup)} key="product-group" />
            <Route path="/ovg/master-data/tao-dich-vu" element={LazyRouter(CreateService)} key="create-service" />
            <Route
                path="/ovg/master-data/thiet-lap-giam-gia"
                element={LazyRouter(VoucherManagement)}
                key="voucher-management"
            />
            <Route path="/ovg/master-data/thiet-lap-xep-hang-diem" element={LazyRouter(CreateRank)} key="create-rank" />
            {/* // BOOKING */}
            <Route
                path="/ovg/booking/booking-service"
                element={LazyRouter(BookingService_V2)}
                key="booking-service-v2"
            />
            <Route
                path="/ovg/booking/booking-service/mobile"
                element={LazyRouter(BookingService_V2)}
                key="booking-service-mobile"
            />
            {/* // VÍ TIỀN */}
            <Route
                path="/ovg/wallet/wallet-management"
                element={LazyRouter(WalletManagement)}
                key="wallet-management"
            />
            {/* // HỆ THỐNG */}
            <Route path="/ovg/system/chi-nhanh" element={LazyRouter(PostOffice)} key="post-office" />
            <Route path="/ovg/system/phong-ban" element={LazyRouter(Department)} key="department" />
            <Route path="/ovg/system/department-team" element={LazyRouter(Department_Team)} key="department-team" />
            <Route
                path="/ovg/system/quan-ly-chuc-vu"
                element={LazyRouter(PositionManagement)}
                key="position-management"
            />
            {/* // NHÂN VIÊN */}
            <Route path="/ovg/nhan-vien/thong-tin-nhan-vien" element={LazyRouter(Officer)} key="officer" />
            <Route
                path="/ovg/nhan-vien/ho-so-nhan-vien"
                element={LazyRouter(ManagerProfileOfficer)}
                key="manager-profile"
            />
            <Route
                path="/ovg/nhan-vien/tai-khoan-nhan-vien"
                element={LazyRouter(AccountSetting)}
                key="account-setting"
            />
            {/* // REPORT */}
            <Route
                path="/ovg/report/xep-hang-nhan-vien"
                element={LazyRouter(CreateService)}
                key="report-rank-service"
            />
            <Route
                path="/ovg/report/xep-hang-khach-hang"
                element={LazyRouter(CustomerRankReport)}
                key="report-customer-rank"
            />
            <Route
                path="/ovg/report/bao-cao-doanh-thu-theo-nhan-vien"
                element={LazyRouter(RevenueOfficerReport)}
                key="revenue-officer"
            />
            <Route
                path="/ovg/report/bao-cao-doanh-thu-khach-hang"
                element={LazyRouter(RevenueCustomerReport)}
                key="revenue-customer"
            />
            <Route
                path="/ovg/report/bao-cao-so-luong-booking-theo-ngay"
                element={LazyRouter(QuantityBookingReport)}
                key="quantity-booking"
            />
            <Route
                path="/ovg/report/bao-cao-xep-hang-sao-nhan-vien"
                element={LazyRouter(OfficerRankReport)}
                key="officer-rank-report"
            />
        </>
    );
};