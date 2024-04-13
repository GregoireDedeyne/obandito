import CardsLogIn from '../CardsLogIn';
import SearchBar from '../SearchBar';

export function SearchProfile() {
  return (
    <>
      <h2 className="text-4xl my-4">Rechercher un évènement</h2>
      <SearchBar />
      <div className="my-10">
        <CardsLogIn />
      </div>

      <h2 className="text-4xl my-4">Les derniers évènements ajoutés</h2>
      <div className="my-10">
        <CardsLogIn />
      </div>
    </>
  );
}
