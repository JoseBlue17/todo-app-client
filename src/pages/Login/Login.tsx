import { useLogin } from './useLogin';

export default function Login() {
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

  return (
    <form
      className="max-w-sm mx-auto mt-10 p-4 border rounded bg-white shadow"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block mb-1">Email:</label>
        <input
          className="w-full border px-2 py-1 rounded"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contraseña:</label>
        <input
          className="w-full border px-2 py-1 rounded"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
