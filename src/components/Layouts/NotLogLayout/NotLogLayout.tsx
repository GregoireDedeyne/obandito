import { Outlet } from 'react-router-dom';
import { Header } from '../../HeaderTop';
import { Footer } from '../../Footer';

export function NotLogLayout() {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <div className='bg-slate-900'> 
      <div className='container mx-auto'> 
      <Footer />
      </div>
      </div>
    </div>
  );
}
