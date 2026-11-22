# Đưa I2P lên Internet và cài như ứng dụng

## Tổng quan

I2P có một lõi xử lý dùng chung cho website/PWA và app Android. Khi website được host bằng HTTPS, người dùng có thể mở cùng một địa chỉ trên điện thoại hoặc máy tính, sau đó cài nó như một ứng dụng. Ảnh vẫn được xử lý trên thiết bị; máy chủ chỉ phân phối tệp giao diện tĩnh.

- **Máy tính Windows/macOS/Linux:** mở website bằng Chrome/Edge (hoặc trình duyệt tương thích) và chọn biểu tượng Install/Cài đặt trang web thành ứng dụng.
- **Android:** mở website bằng Chrome → menu ⋮ → Install app/Cài đặt ứng dụng hoặc Add to Home screen. Muốn app APK độc lập, dùng workflow Build I2P Android APK trong tab Actions.
- **iPhone/iPad:** mở website bằng Safari → Share/Chia sẻ → Add to Home Screen/Thêm vào Màn hình chính. iOS không cài APK; PWA là cách cài của dự án này.

## Xuất bản công khai bằng GitHub Pages (miễn phí)

1. Tạo một repository GitHub mới tên `I2P` và đặt repository ở chế độ **Public** nếu muốn dùng GitHub Pages miễn phí với repository công khai.
2. Tải toàn bộ nội dung thư mục dự án I2P lên repository (giữ nguyên `.github/workflows/` và `www/`). Đặt nhánh mặc định là `main`.
3. Trong repository, mở **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
4. Vào **Actions**, chạy workflow **Deploy I2P public website** hoặc push một commit thay đổi trong `www/` lên nhánh `main`.
5. Khi workflow chạy thành công, mở **Settings → Pages** hoặc kết quả deployment để lấy URL. URL thường có dạng `https://TEN-TAI-KHOAN.github.io/I2P/`. Đây chỉ là mẫu địa chỉ; URL thật phụ thuộc tên tài khoản GitHub của chủ repository.
6. Mở URL bằng HTTPS trên điện thoại và máy tính. Cài đặt ứng dụng theo hướng dẫn ở trên. Sau lần tải đầu tiên, service worker lưu bộ giao diện cốt lõi để có thể mở lại khi ngoại tuyến.

### Cập nhật website

Mỗi lần cập nhật mã giao diện trong `www/` và push lên nhánh `main`, GitHub Actions tự deploy phiên bản mới. Cache của service worker sẽ được nâng phiên bản để người dùng nhận tài nguyên mới.

## Tạo APK Android

1. Push dự án lên GitHub.
2. Mở **Actions → Build I2P Android APK → Run workflow**.
3. Chờ workflow hoàn tất, mở lần chạy mới nhất và tải artifact `I2P-debug-apk`.
4. Giải nén artifact để lấy `app-debug.apk`; cho phép cài ứng dụng từ nguồn này khi Android hỏi.

APK debug phù hợp để thử nghiệm và cài nội bộ. Muốn phát hành rộng rãi như bản sản phẩm ổn định, nên ký APK/AAB bằng release keystore do chủ dự án quản lý; không chia sẻ keystore hoặc mật khẩu ký.

## Quyền riêng tư

Website chỉ phân phối HTML/CSS/JavaScript và ảnh logo. Ảnh được đọc và xử lý cục bộ trong trình duyệt/WebView, không gửi tới máy chủ I2P. Nhà cung cấp hosting vẫn có thể ghi log truy cập kỹ thuật theo chính sách của họ.

## Thông tin tác giả

I2P — Image to PDF · Version 1.0.1

Developed by Long Bùi
© 2026 Long Bùi. All rights reserved.
