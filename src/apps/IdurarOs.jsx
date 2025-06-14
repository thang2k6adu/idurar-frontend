import { ErpApp } from './ErpApp';
import { Form, Button, Input, Checkbox, Layout, Row, Col, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '~/style/images/idurar-crm-erp.svg';

const DefaultApp = () => (
  // Triển khai đa ngôn ngữ
  // Cung cấp context cho toàn bộ ứng dụng, xử lý state tập trung
  // Tích hợp Redux
  // Lazy load
  <ErpApp />
);

export default function IdurarOs() {
  // Triển khai đăng nhập đăng kí

  const { isLoggedIn } = false;
  const { Content } = Layout;
  const { Title, Text } = Typography;

  if (!isLoggedIn) {
    return (
      <Layout>
        <Row>
          <Col
            xs={{ span: 0, order: 2 }}
            sm={{ span: 0, order: 2 }}
            md={{ span: 11, order: 1 }}
            lg={{ span: 12, order: 1 }}
            style={{
              minHeight: '100vh',
            }}
          >
            <Content
              style={{
                padding: '150px 30px 30px',
                width: '100%',
                maxWidth: '450px',
                margin: '0 auto',
              }}
              className="sideContent"
            >
              <div style={{ width: '100%' }}>
                <img
                  src={logo}
                  alt="IDURAR ERP CRM"
                  style={{ margin: '0 0 40px', display: 'block' }}
                  height={63}
                  width={220}
                />

                <Title level={1} style={{fontSize: 28}}>ERP CRM</Title>
                <Text>
                  Accounting / Invoicing / Quote App <br /> base on Node.js React.js Ant Design
                </Text>
              </div>
            </Content>
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 13, order: 2 }}
            lg={{ span: 12, order: 2 }}
            style={{
              minHeight: '100vh',
            }}
          >
            <Content
              style={{
                padding: '100px 30px 30px',
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    margin: '0px auto 20px',
                    display: 'block',
                  }}
                  height={63}
                  width={220}
                />
                <div className="space10" />
              </Col>
              <Title level={1}>Sign In</Title>
              <Divider />
              <div className="site-layout-content">
                <Form
                  layout="vertical"
                  name="normal_login"
                  className="login-form"
                  // initialValues={{
                  //     remember: true,
                  // }}
                  // onFinish={onFinish}
                >
                  <div>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true }, { type: 'email' }]}
                    >
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="admin@demo.com"
                        type="email"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                      <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder={'admin123'}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                      <a
                        className="login-form-forgot"
                        href="/forgetpassword"
                        style={{ marginLeft: '0px' }}
                      >
                        Forgot password
                      </a>
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      size="large"
                    >
                      Log In
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}
