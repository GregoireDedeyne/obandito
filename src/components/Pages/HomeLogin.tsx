// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardsLogIn from '../CardsLogIn';
// import { useQuery } from '@apollo/client';
// import { GET_ORGANIZER } from '../../graphQL/actions';
// import { setOrganizer } from '../../store/actions/';

export function HomeLogin() {
  const role = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.role
  );

  console.log('id :', role);

  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const { loading, error, data } = useQuery(GET_ORGANIZER, {
  //   variables: { organizerId: parseInt(id) },
  //   context: {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   },
  // });

  // useEffect(() => {
  //   if (!loading && !error && data) {
  //     // dispatch(setOrganizer(data.organizer));
  //   }
  // }, [dispatch, loading, error, data]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // const organizer = data?.organizer;
  // console.log('organizer : ', organizer);

  return (
    <>
      {role === 'Organisateur' ? (
        <div>
          <div className="mt-4 mb-10">
            <div className="mx-4 mb-10">
              <h2 className="text-4xl">Groupes de ma région</h2>
              <span className="text-lg">{role}</span>
            </div>
            <CardsLogIn />
          </div>

          <div className="mt-4 mb-10">
            <div className="mx-4 mb-10">
              {/* <h2>{user.mail}</h2> */}
              <h2 className="text-4xl">Les derniers Artistes ajoutés</h2>
              <span className="text-lg">France</span>
            </div>
            <CardsLogIn />
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-4 mb-10">
            <div className="mx-4 mb-10">
              <h2 className="text-4xl">Evènements de ma région</h2>
              <span className="text-lg">{role}</span>
            </div>
            <CardsLogIn />
          </div>

          <div className="mt-4 mb-10">
            <div className="mx-4 mb-10">
              <h2 className="text-4xl">Les derniers évènements ajoutés</h2>
              <span className="text-lg">France</span>
            </div>
            <CardsLogIn />
          </div>
        </div>
      )}
    </>
  );
}
