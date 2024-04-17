import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { router } from './router.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d99f0b', // '#32b785',
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <HappyProvider>
          <RouterProvider router={router} />
        </HappyProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
