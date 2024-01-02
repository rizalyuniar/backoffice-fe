import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './assets/css/sb-admin-2.css'
import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Cashier/Dashboard'
import Order from './Pages/Tenant/Order'
import axios from 'axios'


function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const router = useNavigate();

  useEffect(() => {
    // Muat token dari local storage atau sumber lainnya
    const tokenLocalStorage = localStorage.getItem('token');
    const refreshTokenLocalStorage = localStorage.getItem('refresh_token');

    if (tokenLocalStorage) {
      setAccessToken(tokenLocalStorage);
    }

    if (refreshTokenLocalStorage) {
      setRefreshToken(refreshTokenLocalStorage);
    }
  }, []);

  useEffect(() => {
    // Setup interval untuk memperbarui token setiap 1 jam
    const refreshInterval = setInterval(async () => {
      try {
        const newAccessToken = await handleRefreshToken();
        console.log('Token diperbarui:', newAccessToken);
      } catch (error) {
        console.error('Gagal memperbarui token', error);
        // Redirect ke halaman login jika pembaruan token gagal
        router('/login');
      }
    }, 3600000); // 1 jam dalam milidetik

    // Membersihkan interval saat komponen dibongkar
    return () => clearInterval(refreshInterval);
  }, [refreshToken, router]);

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/auth/refresh-token`,
        { refresh_token: refreshToken }
        // Tambahkan header atau konfigurasi lainnya sesuai kebutuhan
      );

      const newAccessToken = response.data.access_token;
      setAccessToken(newAccessToken);

      localStorage.setItem('accessToken', newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error('Gagal me-refresh token', error);
      throw error;
    }
  };

  const handleApiRequest = async (url, method = 'get', data = null) => {
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token kedaluwarsa, coba refresh token dan ulangi permintaan
        try {
          const newAccessToken = await handleRefreshToken();
          return await handleApiRequest(url, method, data);
        } catch (refreshError) {
          // Gagal me-refresh token, arahkan ke halaman login
          console.error('Gagal me-refresh token', refreshError);
          router('/login');
        }
      } else {
        console.error('Gagal melakukan permintaan API', error);
        throw error;
      }
    }
  };

  return (
    // <Routes>
    //   <Route path="/login" element={<Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />} />
    //   <Route path="/" element={<Dashboard />} />
    //   <Route path="/order" element={<Order />} />
    // </Routes>
    <Routes>
      <Route path="/login" element={<Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />} />
      <Route path="/" element={<Dashboard handleApiRequest={handleApiRequest} />} />
      <Route path="/order" element={<Order handleApiRequest={handleApiRequest} />} />
    </Routes>
  )
}

export default App
