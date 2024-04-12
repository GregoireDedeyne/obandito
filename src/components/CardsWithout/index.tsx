import { Card } from '../Card';

interface CardData {
  image_url: string;
  alt: string;
  name: string;
  id: number;
  style: { name: string };
}

interface CardsWithoutProps {
  data: CardData[];
  title: string;
  subtitle: string;
}

export function CardsWithout({ data, title, subtitle }: CardsWithoutProps) {
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

      <div className="flex flex-wrap bg-white py-20 bloc-white pb-5 w-full justify-center">
        {data.map((card) => (
          <div className="p-10" key={card?.id}>
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
