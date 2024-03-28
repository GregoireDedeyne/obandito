import { LoginForm } from '../LoginForm';
import { ToastContainer } from 'react-toastify';

export function LoginPage() {
  return (
    <div className="bg-white h-full">
      <div className="mx-auto container justify-items-center	content-center	">
        <ToastContainer />
        <LoginForm />
      </div>
    </div>
  );
}
