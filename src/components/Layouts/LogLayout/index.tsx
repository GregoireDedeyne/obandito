import { HeaderLeftSide } from '../../HeaderLeftSide';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../Footer';
import { SecondaryButton } from '../../Buttons/SecondaryButton';

export function LogLayout() {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex bg-gray-800">
        <HeaderLeftSide />
        <div className="flex flex-col w-screen pt-2 pb-4 px-4 overflow-hidden">
          <div className="flex justify-end">
            <SecondaryButton href="/profile" text="Mon profil" />
            <div className="avatar ml-2">
              <div className="w-14 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}
