import { Outlet } from 'react-router-dom';
import { Header } from '../../HeaderTop';
import { Footer } from '../../Footer';
import { useQuery } from '@apollo/client';
import { GET_STYLES } from '../../../graphQL/actions';

export function NotLogLayout() {
  const { data, loading, error } = useQuery(GET_STYLES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data.styles);

  return (
    <div className="flex flex-col h-screen">
      <Header genres={data.styles} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="bg-slate-900">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
