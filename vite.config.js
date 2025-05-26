import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Khi chạy vite hoặc vite build, nó sẽ tự tìm tới đây để lấy ra cấu hình của dự án
// Chạy vite hoặc vite dev, mode sẽ là development
// Chạy vite build thì là production
export default ({ mode }) => {
  // process.env là object chứa các biến môi trường
  // loadEnv là hàm load ác biến môi trường từ env (load hết, miễn có .env), nhận vào mode và curren working directory
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // Nếu chạy yarn dev:remote thì dùng VITE_BACKEND_SERVER (test với server remote)
  const proxy_url =
    process.env.VITE_DEV_REMOTE === 'remote'
      ? process.env.VITE_BACKEND_SERVER
      : 'http://localhost:8888/';

  const config = {
    // Bật hỗ trợ react trong vite
    // Giúp biên dịch JSX, tối ưu build React
    // Nếu không khai báo plugin, vite không hiểu TSX/JSX
    plugins: [react()],
    // resolve là cấu hình về đường dẫn
    // base là đường dẫn cơ sở, nếu không có thì sẽ là '/', khi deploy sẽ lấy file từ VD: localhost:5174/index.html
    // alias là các alias đường dẫn, nếu không có thì sẽ là '/'
    // Đây là đường dẫn tuyệt đối, khác ./ tương đối
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // Cấu hình server của Vite
    server: {
      port: 5174,
      proxy: {
        // Các request đầu /api sẽ được chuyển tiếp (proxy) tới server backend khác
        '/api': {
          target: proxy_url,
          // Thay đổi origin của request, nếu không có thì sẽ là localhost:5174/api
          // Nếu có thì sẽ là proxy_url/api
          changeOrigin: true,
          // Cho phép proxy kết nối tới backend dù backend có HTTPS không hợp lệ
          secure: false,
        },
      },
    },
  };
  return defineConfig(config);
};
