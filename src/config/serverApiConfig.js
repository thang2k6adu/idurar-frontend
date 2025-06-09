// Được sử dụng để lấy các API từ server
export const API_BASE_URL = 
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE == 'remote'
    ? import.meta.env.VITE_BACKEND_SERVER + 'api/'
    : 'http://localhost:8888/api/'
// Được sử dụng để lấy các tài nguyên khác từ server như: ảnh, video, ... /image, /public
export const BASE_URL = 
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
    ? import.meta.env.VITE_BACKEND_SERVER
    : 'http://localhost:8888'