import { Outlet } from 'react-router-dom';
import { Header } from '../../HeaderTop';
import { Footer } from '../../Footer';

export function NotLogLayout() {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
