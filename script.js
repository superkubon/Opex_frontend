const form = document.getElementById('login-form');
const errorEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  sessionStorage.removeItem('tb_token');
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Reset lỗi
  errorEl.textContent = '';
  errorEl.style.color = 'black';

  try {
    const res = await fetch('https://iot.vinergy.vn/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Login result:", data);
      sessionStorage.setItem('tb_token', data.token);
      errorEl.style.color = 'green';
      errorEl.textContent = '✅ Đăng nhập thành công. Đang chuyển hướng...';

      setTimeout(() => {
        window.location.href = 'https://iot.vinergy.vn/home';
      }, 1500); // chờ 1.5 giây trước khi chuyển
    } else {
      errorEl.style.color = 'red';
      errorEl.textContent = data.message || '❌ Sai email hoặc mật khẩu. Vui lòng thử lại!';
    }
  } catch (err) {
    errorEl.style.color = 'red';
    errorEl.textContent = '⚠️ Không thể kết nối đến máy chủ.';
  }
});
