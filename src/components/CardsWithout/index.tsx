import { Card } from '../Card';

export function CardsWithout({ data, title, subtitle }) {
  return (
    <>
      <div className="flex justify-start px-5 w-full max-md:max-w-full my-8  sm:ml-0 bloc-white">
        <h2 className="text-xl font-semibold leading-6 text-neutral-700">
          {title}
        </h2>
        {subtitle && (
          <h2 className="text-l font-semibold leading-6 text-neutral-700">
            {subtitle}
          </h2>
        )}
      </div>

      <div className="flex flex-wrap bg-white py-20 bloc-white pb-5">
        {data.map((card) => (
          <div className="w-[33%] py-5" key={card?.id}>
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
