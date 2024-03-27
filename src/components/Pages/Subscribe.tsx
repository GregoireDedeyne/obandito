import { CreateAccountForm } from '../CreateAccountForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SubscribePage() {
  return (
    <div className="bg-white h-full">
      <ToastContainer />
      <CreateAccountForm />
    </div>
  );
}
