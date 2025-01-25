// SalarySpreadsheet.js
import React, { useState } from 'react';
import { Layout, Row, Col, Input, Select, Checkbox, Button, Table, Collapse, Tabs, Descriptions, Space, Modal, Card } from 'antd';
import { PlusOutlined, FileExcelOutlined, RedoOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import SalaryCreateForm from '../../components/Officer/SalaryCreateForm';

const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Content, Sider } = Layout;

const SalarySpreadsheet = () => {
  const [selectedBranch, setSelectedBranch] = useState('Chi nhánh trung tâm');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [statusFilters, setStatusFilters] = useState(['Đang tạo', 'Tạm tính', 'Đã chốt lương']);
  const [expandedRowKey, setExpandedRowKey] = useState(null); // For toggling the row expansion

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kỳ hạn trả',
      dataIndex: 'payPeriod',
      key: 'payPeriod',
    },
    {
      title: 'Kỳ làm việc',
      dataIndex: 'workPeriod',
      key: 'workPeriod',
    },
    {
      title: 'Tổng lương',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      align: 'right',
    },
    {
      title: 'Đã trả nhân viên',
      dataIndex: 'paidToEmployee',
      key: 'paidToEmployee',
      align: 'right',
    },
    {
      title: 'Còn cần trả',
      dataIndex: 'remainingPayment',
      key: 'remainingPayment',
      align: 'right',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      code: 'BL000001',
      name: 'Bảng lương tháng 10/2024',
      payPeriod: 'Hàng tháng',
      workPeriod: '01/10/2024 - 31/10/2024',
      totalSalary: 0,
      paidToEmployee: 0,
      remainingPayment: 0,
      status: 'Tạm tính',
    },
  ];

  const data1 = [
    {
      key: '1',
      code: 'BL000001',
      name: 'Test',
      payPeriod: 0,
      workPeriod: 0,
      totalSalary: 0
    },
  ];

  const columns1 = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Tổng lương',
      dataIndex: 'payPeriod',
      key: 'payPeriod',
      align: 'center',
    },
    {
      title: 'Đã trả NV',
      dataIndex: 'workPeriod',
      key: 'workPeriod',
      align: 'center',
    },
    {
      title: 'Còn cần trả',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      align: 'center',
    }
  ];

  const data2 = [];

  const columns2 = [
    {
      title: 'Mã phiếu',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Thời gian',
      dataIndex: 'payPeriod',
      key: 'payPeriod',
      align: 'center',
    },
    {
      title: 'Người tạo',
      dataIndex: 'workPeriod',
      key: 'workPeriod',
      align: 'center',
    },
    {
      title: 'Phương thức',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      align: 'center',
    },
    {
      title: 'Tiền chi',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      align: 'center',
    }
  ];

  // Toggle row expansion when clicking on a row
  const onRowClick = (record) => {
    setExpandedRowKey(expandedRowKey === record.key ? null : record.key);
  };

  // Render expanded row content
  const expandedRowRender = (record) => (
    <Collapse defaultActiveKey={['1']} style={{ background: '#f6ffed', border: '1px solid #b7eb8f', marginTop: '16px' }}>
      <Panel header="Thông tin chi tiết" key="1">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin" key="1">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Mã">{record.code}</Descriptions.Item>
              <Descriptions.Item label="Tên">{record.name}</Descriptions.Item>
              <Descriptions.Item label="Kỳ hạn trả">{record.payPeriod}</Descriptions.Item>
              <Descriptions.Item label="Kỳ làm việc">{record.workPeriod}</Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">26/10/2024 21:41:52</Descriptions.Item>
              <Descriptions.Item label="Người tạo">minh nhật</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{record.status}</Descriptions.Item>
              <Descriptions.Item label="Chi nhánh">{selectedBranch}</Descriptions.Item>
              <Descriptions.Item label="Phạm vi áp dụng">Tất cả nhân viên</Descriptions.Item>
              <Descriptions.Item label="Tổng số nhân viên">2</Descriptions.Item>
              <Descriptions.Item label="Tổng lương">{record.totalSalary}</Descriptions.Item>
              <Descriptions.Item label="Đã trả nhân viên">{record.paidToEmployee}</Descriptions.Item>
              <Descriptions.Item label="Còn cần trả">{record.remainingPayment}</Descriptions.Item>
            </Descriptions>
            <Space style={{ marginTop: '16px' }}>
              <Button icon={<RedoOutlined />}>Tải lại dữ liệu</Button>
              <Button icon={<FileExcelOutlined />}>Xuất file</Button>
              <Button type="primary" icon={<EyeOutlined />}>Xem bảng lương</Button>
              <Button danger icon={<DeleteOutlined />}>Hủy bỏ</Button>
            </Space>
          </TabPane>
          <TabPane tab="Phiếu lương" key="2">
            <Table
              columns={columns1}
              dataSource={data1}
              bordered
              pagination={false}
              rowSelection={{
                type: 'checkbox',
              }}
            />
          </TabPane>
          <TabPane tab="Lịch sử thanh toán" key="3">
            <Table
              columns={columns2}
              dataSource={data2}
              bordered
              pagination={false}
              rowSelection={{
                type: 'checkbox',
              }}
            />
          </TabPane>
        </Tabs>
      </Panel>
    </Collapse>
  );


  const Sidebar = () => (
    <Sider theme="light" width={300} style={{ padding: '10px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="">Chi nhánh</label>
        <Select
          style={{ width: '100%' }}
          value={selectedBranch}
          onChange={(value) => setSelectedBranch(value)}
        >
          <Option value="Chi nhánh trung tâm">Chi nhánh trung tâm</Option>
        </Select>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="">Kỳ hạn trả lương</label>
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn kỳ hạn trả lương"
          value={selectedPeriod}
          onChange={(value) => setSelectedPeriod(value)}
        >
          <Option value="Hàng tháng">Hàng tháng</Option>
          <Option value="Hàng quý">Hàng quý</Option>
        </Select>
      </div>
      <div>
        <label htmlFor="">Kỳ hạn trả lương</label>
        <Checkbox.Group
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          value={statusFilters}
          onChange={(checkedValues) => setStatusFilters(checkedValues)}
        >
          <Checkbox className='mt-3' value="Đang tạo">Đang tạo</Checkbox>
          <Checkbox className='mt-3' value="Tạm tính">Tạm tính</Checkbox>
          <Checkbox className='mt-3' value="Đã chốt lương">Đã chốt lương</Checkbox>
          <Checkbox className='mt-3' value="Đã hủy">Đã hủy</Checkbox>
        </Checkbox.Group>

      </div>
    </Sider>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const MainContent = () => (
    <Layout style={{ padding: "0 5px", minHeight: "100vh" }}>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Card style={{ overflow: "hidden" }}>
          <Row justify="space-between" style={{ marginBottom: '16px' }}>
            <Search placeholder="Theo mã, tên bảng lương" style={{ width: '40%' }} />
            <div>
              <Button onClick={showModal} type="primary" icon={<PlusOutlined />} style={{ marginRight: '8px' }}>
                Bảng tính lương
              </Button>
              <Button icon={<FileExcelOutlined />}>Xuất file</Button>
            </div>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 15 }}
            bordered
            rowSelection={{
              type: 'checkbox',
            }}
            onRow={(record) => ({
              onClick: () => onRowClick(record),
            })}
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => true,
              expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
              onExpand: (expanded, record) => setExpandedRowKey(expanded ? record.key : null),
            }}
          />
        </Card>
      </Content>
    </Layout>
  );


  return (
    <Layout style={{ height: "100vh" }}>
      <div className="font-bold text-xl">Bảng tính lương</div>
      <Layout className="mt-2">
        <Sidebar />
        <MainContent />
        <Modal
          title="Thêm bảng tính lương"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          destroyOnClose
        >
          <SalaryCreateForm onClose={handleCancel} />
        </Modal>
      </Layout>
    </Layout>
  );
};

export default SalarySpreadsheet;
