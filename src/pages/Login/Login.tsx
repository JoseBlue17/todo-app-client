import { LoginVisual } from './login-visual.tsx';
import { LoginForm } from './login.form.tsx';

export default function Login() {
  return (
    <section className="min-h-screen flex overflow-hidden">
      <LoginVisual />
      <LoginForm />
    </section>
  );
}
