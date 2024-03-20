import { Cards } from '../CardsLogOut';
import ImagesLayout from '../ImagesLayout';

export function HomeNotLogPage() {
  return (
    <>
      <div className="h-lvh bg-fond-one bg-cover">
        <h1 className="text-white text-7xl"> FIND THE ONE BE THE ONE</h1>
      </div>
      <div className="h-lvh bg-fond-two bg-cover">
        <Cards />{' '}
      </div>
      <div className="h-lvh bg-fond-three bg-cover">
        <Cards />{' '}
      </div>
      <div className="bg-color-primary text-white h-52 text-7xl">
        {' '}
        Tout à pu être possible grâce à VOUS en 2023
      </div>
      <ImagesLayout />
    </>
  );
}
