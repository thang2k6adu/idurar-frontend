import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

// Xử lý import động
export default {
  plugins: [
    dynamicImportVars({
    //   // Chỉ áp dụng cho file trong src/components
    //   include: "src/components/**",
    //   // Bỏ qua file trong src/utils
    //   exclude: "src/utils/**",
    //   // Cảnh báo nếu như không phân tích được dynamic import
    //   warnOnError: true,
    }),
  ],
};
