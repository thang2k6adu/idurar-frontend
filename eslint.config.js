import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    // Khai báo các tùy chọn liên quan tới ngôn ngữ để ESlint hiểu và phân tích
    // Giống khai báo: mã nguồn của bạn có những cú pháp gì, dùng module kiểu gì( import hay require)
    languageOptions: {
      ecmaVersion: 2020,
      // Để eslint hiểu biến toàn cục của browser (window,document), và của node (process)
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Khai báo trong đây các rule phức tạp bên ngoài
    // Cho Eslint biết rule nào sẽ được sử dụng
    // Trong rules ta sẽ bật tắt được nó
    // Đây là phương pháp modular, dễ dàng mở rộng và kiểm tra được nhiều theo tùy framework
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Kiểm tra hook dùng sai chỗ (ví dụ trong if, loop)
      ...reactHooks.configs.recommended.rules,
      // Kiểm tra biến không sử dụng
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      semi: false,
      // Kiểm tra chỉ export component, không dùng kiểu viết tắt arrow function
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
