import { HeaderLeftSide } from '../../HeaderLeftSide';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../Footer';

export function LogLayout() {
  return (
    <div className="flex flex-col overflow-auto">
      <HeaderLeftSide />
      <Outlet />
      <Footer />
    </div>
  );
}
