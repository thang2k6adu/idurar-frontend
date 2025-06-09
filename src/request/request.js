import axios from 'axios'
import { API_BASE_URL } from '@/config/serverApiConfig'

function includeToken() {
  axios.defaults.baseURL = API_BASE_URL

  // Mặc định trình duyệt sẽ không đính kèm cookie vào request
  // Đặt withCredentials = true để trình duyệt đính kèm cookie vào request
  // Tuy nhiên việc này dẫn tới vấn đề bảo mật CSRF
  axios.defaults.withCredentials = true
  const auth = storePersist.get('auth')

  // Token để chứng minh người dùng đã đăng nhập và được phép truy cập vào tài nguyên
  // Gắn token vào mỗi request được gửi đi
  // Loại token là Bearer Token:
  if (auth) {
    // Common: dùng cho tất cả các request
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.current.token}`
  }
}

const request = {
  list: async ({ entity, options = {} }) => {
    try {
      includeToken()
      let query = '?'
      for (var key in options) {
        query += key + '=' + options[key] + '&'
      }
      //  Loại kí tự & cuối cùng
      query = query.slice(0, -1)

      const response = await axios.get(entity + '/list' + query)

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnError: false,
      })
    } catch (error) {
        return errorHandler(error)
    }
  },
  listAll: async ({ entity, options = {} }) => {
    try {
    } catch (error) {}
  },
}

export default request
