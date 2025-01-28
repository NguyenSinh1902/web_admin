import React from 'react';
import { Layout, Menu, Row, Col, Card } from 'antd';
import ReactApexChart from 'react-apexcharts';

const { Sider, Content, Header } = Layout;

const Dashboard = () => {
  // Example ApexCharts data
  const pieData = {
    series: [44, 55, 41],
    options: {
      labels: ['Category A', 'Category B', 'Category C'],
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  const barData = {
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30, 40, 50],
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
    },
  };

  return (
    <Layout>
      <Sider theme="light" className="h-screen">
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          items={[
            { key: '1', label: 'Dashboard' },
            { key: '2', label: 'Settings' },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm">
          <Row>
            <Col span={8}>
              <div className="text-lg font-semibold">Dashboard</div>
            </Col>
          </Row>
        </Header>
        <Content className="p-6">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card title="Pie Chart">
                <ReactApexChart
                  options={pieData.options}
                  series={pieData.series}
                  type="donut"
                />
              </Card>
            </Col>
            <Col span={18}>
              <Card title="Bar Chart">
                <ReactApexChart
                  options={barData.options}
                  series={barData.series}
                  type="bar"
                  height={350}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
