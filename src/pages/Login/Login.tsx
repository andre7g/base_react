import React, { useState } from 'react';
import './Login.css'; // Importa el archivo de estilos
import { useLoginActions } from '../../hooks/login/useLoginActions';
import { Navigate } from 'react-router-dom';
// import { useCustomSelector } from '../../hooks/redux';

const Login = () => {
  const { loginAction } = useLoginActions();
  // const auth = useCustomSelector((state) => state.auth);
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false); // Estado para la redirección

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await loginAction(username, password);
      if(res?.status){
        setRedirectToHome(true);
      }
    } catch (error) {
      console.log(error) // Manejar el error aquí
    }
  };

  if (redirectToHome) {
    return <Navigate to="/home" />; // Redirige al usuario al home si redirectToHome es true
  }



  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
