import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../HeaderTop';
import { Footer } from '../../Footer';
import { useQuery } from '@apollo/client';
import { GET_STYLES } from '../../../graphQL/actions';
import { setDecodedToken } from '../../../store/actions';
import * as jose from 'jose';
import { TextEncoder } from 'text-encoding';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
export function NotLogLayout() {
  const { data, loading, error } = useQuery(GET_STYLES);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        const secret = import.meta.env.VITE_JWT_SECRET;
        const encoder = new TextEncoder();
        const key = encoder.encode(secret);

        try {
          const decodedToken = await jose.jwtVerify(storedToken, key);
          dispatch(setDecodedToken(storedToken, decodedToken.payload.user));
        } catch (error) {
          console.error('Erreur lors du déchiffrement du token :', error);
          // Effacer le token du localStorage
          localStorage.removeItem('token');
          // Rediriger l'utilisateur vers la page de connexion
          navigate('/login', { replace: true });
        }
      }
    };

    checkToken();
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data.styles);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <Header genres={data.styles} />
      </div>
      <div className="flex-grow bg-white">
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
