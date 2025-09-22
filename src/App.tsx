import 'animate.css'
import '@ant-design/v5-patch-for-react-19';
import { Card, Form, Select, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { useState } from 'react';
import { CopyOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface GeneratedData {
  id: number;
  [key: string]: any;
}

const App = () => {
  const [form] = Form.useForm();
  const [generatedData, setGeneratedData] = useState<GeneratedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState<string>('');
  const [count, setCount] = useState<number>(5);

  const generateUserData = (count: number): GeneratedData[] => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `user${i + 1}@${domains[Math.floor(Math.random() * domains.length)]}`,
      age: Math.floor(Math.random() * 50) + 18,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${Math.floor(Math.random() * 9999) + 1} Main St, City ${i + 1}`,
      isActive: Math.random() > 0.5
    }));
  };

  const generateProductData = (count: number): GeneratedData[] => {
    const products = ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones', 'Camera', 'Keyboard', 'Mouse', 'Monitor', 'Speaker'];
    const brands = ['Apple', 'Samsung', 'Sony', 'Microsoft', 'Google', 'HP', 'Dell', 'Asus', 'Lenovo', 'LG'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `${brands[Math.floor(Math.random() * brands.length)]} ${products[Math.floor(Math.random() * products.length)]}`,
      price: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
      category: products[Math.floor(Math.random() * products.length)].toLowerCase(),
      inStock: Math.random() > 0.3,
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      description: `High-quality ${products[Math.floor(Math.random() * products.length)].toLowerCase()} with excellent features and performance.`,
      sku: `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }));
  };

  const generatePaymentData = (count: number): GeneratedData[] => {
    const methods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash'];
    const statuses = ['Completed', 'Pending', 'Failed', 'Refunded'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      amount: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
      method: methods[Math.floor(Math.random() * methods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      transactionId: `TXN-${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currency: 'USD',
      description: `Payment for order #${Math.floor(Math.random() * 10000) + 1000}`
    }));
  };

  const generateEmployeeData = (count: number): GeneratedData[] => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
    const positions = ['Manager', 'Developer', 'Analyst', 'Coordinator', 'Specialist', 'Director'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      employeeId: `EMP-${(1000 + i).toString()}`,
      firstName: ['John', 'Jane', 'Michael', 'Sarah', 'David'][Math.floor(Math.random() * 5)],
      lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)],
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      salary: Math.floor(Math.random() * 100000) + 40000,
      hireDate: new Date(Date.now() - Math.random() * 365 * 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isFullTime: Math.random() > 0.2
    }));
  };

  const generateData = () => {
    setLoading(true);
    
    setTimeout(() => {
      let data: GeneratedData[] = [];
      
      switch (dataType) {
        case 'users':
          data = generateUserData(count);
          break;
        case 'products':
          data = generateProductData(count);
          break;
        case 'payments':
          data = generatePaymentData(count);
          break;
        case 'employees':
          data = generateEmployeeData(count);
          break;
        default:
          data = [];
      }
      
      setGeneratedData(data);
      setLoading(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedData, null, 2));
  };

  const downloadJson = () => {
    const dataStr = JSON.stringify(generatedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataType || 'data'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='bg-gray-100 min-h-screen py-8'>
      <div className="w-9/12 mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className='text-4xl font-bold text-gray-800 animate__animated animate__fadeInDown'>
            Dummy Data Generator
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Generate realistic dummy JSON data for testing and development purposes. 
            Choose from various data types and customize the number of records to generate.
          </p>
        </div>

        <Card className="animate__animated animate__fadeInUp">
          <Form form={form} layout="vertical" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item label="Data Type" name="dataType">
                <Select 
                  size='large' 
                  placeholder="Choose Data Type"
                  value={dataType}
                  onChange={setDataType}
                >
                  <Select.Option value="users">👤 Users</Select.Option>
                  <Select.Option value="products">📦 Products</Select.Option>
                  <Select.Option value="payments">💳 Payments</Select.Option>
                  <Select.Option value="employees">👔 Employees</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Number of Records" name="count">
                <InputNumber
                  size="large"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(value) => setCount(value || 5)}
                  placeholder="Enter count"
                  className="w-full"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                size="large" 
                onClick={generateData}
                disabled={!dataType}
                loading={loading}
                icon={<ReloadOutlined />}
                className="w-full md:w-auto"
              >
                Generate Data
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {generatedData.length > 0 && (
          <Card 
            title={`Generated ${dataType} Data (${generatedData.length} records)`}
            className="animate__animated animate__fadeInUp"
            extra={
              <div className="space-x-2">
                <Button 
                  icon={<CopyOutlined />} 
                  onClick={copyToClipboard}
                  size="small"
                >
                  Copy
                </Button>
                <Button 
                  icon={<DownloadOutlined />} 
                  onClick={downloadJson}
                  size="small"
                  type="primary"
                >
                  Download
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text type="secondary">
                  Click copy to copy to clipboard or download as JSON file
                </Text>
              </div>
              
              <Divider />
              
              <TextArea
                value={JSON.stringify(generatedData, null, 2)}
                rows={15}
                readOnly
                className="font-mono text-sm"
                style={{ resize: 'vertical' }}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App