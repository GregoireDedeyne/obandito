import { Card } from '../Card';

export function CardsEvent({ data }) {
  return (
    <>
      <div className="flex flex-wrap bg-white py-20 bloc-white pb-5">
        {data.map((card) => (
          <div className="w-[50%] py-5 ">
            <Card
              key={card?.image_url}
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
