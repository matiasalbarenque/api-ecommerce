import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { router } from './router.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d99f0b', // '#32b785',
          borderRadius: 5,
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <HappyProvider>
          <Provider store={Store}>
            <RouterProvider router={router} />
          </Provider>
        </HappyProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
