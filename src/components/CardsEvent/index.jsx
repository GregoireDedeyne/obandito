import { Card } from '../Card';

export function CardsEvent({ data }) {
  return (
    <>
      <div className="flex flex-wrap bg-white py-20 bloc-white pb-5 justify-center">
        {data.map((card) => (
          <div className="w-[33%] py-5 mx-5" key={card?.name}>
            <Card
              image={card?.image_url}
              alt={card?.alt}
              name={card?.name}
              style={card?.style?.name}
              id={card?.id}
            />
          </div>
        ))}
      </div>
    </>
  );
}
