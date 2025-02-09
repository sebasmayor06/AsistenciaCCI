import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const users = [
  { username: 'admin', password: '123456' },
  { username: 'user', password: '123456' }
];

export default function Login() {
    const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validandoDatos = (values) => {
    const { username, password } = values; // Capturamos los valores del formulario

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setError(false);
      setUserName(userName);
      if (user.username === 'admin') {
        navigate('/Admin'); // Redirige a /Admin si el usuario es admin
      } else {
        navigate('/ConfirmarAsist'); // Redirige a /ConfirmarAsist si es otro usuario
      }
    } else {
      setError(true);
      setErrorMessage('Usuario o contraseña incorrecta');
    }
  };

  return (
    <div className='bg-[#1d1d1d] w-screen min-h-screen flex justify-center items-center flex-col'>
        <div className='w-80 h-80 bg-white rounded flex flex-col justify-center items-center'>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={validandoDatos} // onFinish ya pasa los valores correctamente
        autoComplete="off"
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
        {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    </div>
  );
}
