import { CreateAccountForm } from '../CreateAccountForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SubscribePage() {
  return (
    <div className="bg-white h-[40rem]">
      <ToastContainer />
      <CreateAccountForm />
    </div>
  );
}
