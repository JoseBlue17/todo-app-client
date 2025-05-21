import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica real de autenticación
    if (email && password) {
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
      </div>
      <div>
        <label>Contraseña:</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
