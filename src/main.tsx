import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { HappyProvider } from '@ant-design/happy-work-theme';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#32b785',
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <HappyProvider>
          <App />
        </HappyProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
