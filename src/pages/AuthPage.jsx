import React from 'react';

const AuthPage = () => {
    return (
    <div style={{maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8}}>
      <h2>Đăng nhập</h2>
      <input type="text" placeholder="Tên đăng nhập" style={{width: '100%', marginBottom: 12, padding: 8}} />
      <input type="password" placeholder="Mật khẩu" style={{width: '100%', marginBottom: 12, padding: 8}} />
      <button style={{width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4}}>Đăng nhập</button>
        </div>
    );
};

export default AuthPage;