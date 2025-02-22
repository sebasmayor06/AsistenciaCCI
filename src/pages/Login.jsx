import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const users = [
  { username: 'admin', password: '123456' },
  { username: 'user', password: '123456' }
];

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, error, rol } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [error2, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   setLogin(false);
  // }, [userName, password]);

  // const validandoDatos = () => {
  
  //   if (user) {
  //     setError(false);
  //     setUserName(userName);
  //     if (user.username === 'admin') {
  //       navigate('/Admin'); // Redirige a /Admin si el usuario es admin
  //       setLogin(true);
  //     } else {
  //       navigate('/User'); // Redirige a /ConfirmarAsist si es otro usuario
  //     }
  //   } else {
  //     setLogin(false);
  //     setError(true);
  //     setErrorMessage('Usuario o contraseña incorrecta');
  //   }
  // };

  const handleLogin = async () => {
     const response = await dispatch(loginUser({ username, password }));
    
    if (response.type === 'authSlice/loginUser/fulfilled') {
      // Si el rol es admin, redirigir al admin
      if (response.payload.rol === 'admin') {
        navigate('/admin');  // Redirige a la ruta de Admin
      } else if (response.payload.rol === 'servidor') {
        navigate('/user');  // Redirige a la ruta de User
      }
    } else {
      // Si hubo un error, mostrar mensaje
      setError(true);
      setErrorMessage('Usuario o contraseña incorrecta');
    }
  };

  return (
    <div className='bg-[#1d1d1d] w-screen min-h-screen flex justify-center items-center flex-col'>
        <div className='w-28 rounded-full h-28 flex justify-center items-center bg-slate-50 mb-6'>
             <img src="../../img/logo.png" alt="logo" className='w-22 h-12 mb-2' />
        </div>
        <div className='w-80 h-80 bg-white rounded flex flex-col justify-center items-center'>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin} // onFinish ya pasa los valores correctamente
            autoComplete="off"
            className='p-14 sm:p-0' 
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Por favor, ingrese su usuario!' }]}
            >
              <Input onChange={(e) => setUserName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Por favor, ingrese su contraseña!' }]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>


            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        {error2 && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    </div>
  );
}
