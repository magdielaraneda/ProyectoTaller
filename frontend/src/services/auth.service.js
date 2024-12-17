import axios from './root.service';
import cookies from 'js-cookie';

function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar JWT:', error);
    return null;
  }
}

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    const { status, data } = response;

    if (status === 200) {
      const decodedToken = decodeJWT(data.data.accessToken);
      if (!decodedToken) {
        throw new Error('No se pudo decodificar el token JWT');
      }
      const { userId, email, roles } = decodedToken;
      const user = { id: userId, email, roles};

      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
      cookies.set('jwt-auth', data.data.accessToken, { path: '/' });

      return user;
    }
  } catch (error) {
    console.error('Error durante el login:', error);
    throw new Error(error.response?.data?.message || 'Error de autenticación');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt-auth');
};

export const test = async () => {
  try {
    const response = await axios.get('/user');
    if (response.status === 200) {
      console.log(response.data.data);
    }
  } catch (error) {
    console.error('Error al probar la autenticación:', error);
  }
};
