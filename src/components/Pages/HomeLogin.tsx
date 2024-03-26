import { useParams } from 'react-router-dom';
import CardsLogIn from '../CardsLogIn';

export function HomeLogin() {

const {id} = useParams()

  return (
    <div className="">
      <div className="mt-4 mb-10">
        <div className="mx-4 mb-10">
          <h2 className="text-4xl">Evènement de ma région</h2>
          <span className="text-lg">name</span>
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
  );
}
