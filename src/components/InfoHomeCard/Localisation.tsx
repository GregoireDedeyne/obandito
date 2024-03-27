interface LocationItemProps {
  departmentNumber: string;
  locationName: string;
  count: number;
}

const LocationItem: React.FC<LocationItemProps> = ({
  departmentNumber,
  locationName,
  count,
}) => (
  <div className="flex gap-3.5 mt-2.5">
    <div className="flex flex-col justify-center items-center w-6 h-6 text-rose-500 whitespace-nowrap bg-white rounded-full shadow-sm leading-[150%]">
      <div className="flex flex-col justify-center px-1.5 py-2">
        <div className="justify-center">{departmentNumber}</div>
      </div>
    </div>
    <div className="flex-auto my-auto leading-6 text-zinc-500">
      {locationName}
      <span className="text-zinc-500"> ({count})</span>
    </div>
  </div>
);

const locations = [
  { departmentNumber: '17', locationName: 'La Rochelle', count: 2 },
  { departmentNumber: '17', locationName: 'Paris', count: 2 },
  { departmentNumber: '17', locationName: 'Bordeaux', count: 5 },
  { departmentNumber: '17', locationName: 'Nice', count: 5 },
  { departmentNumber: '17', locationName: 'Rennes', count: 1 },
  { departmentNumber: '17', locationName: 'Saintes', count: 1 },
  { departmentNumber: '17', locationName: 'Clermont-Ferrand', count: 1 },
  { departmentNumber: '16', locationName: 'Cognac', count: 4 },
  { departmentNumber: '16', locationName: 'Cognac', count: 4 },
  { departmentNumber: '16', locationName: 'Clermont-Ferrand', count: 1 },
  { departmentNumber: '16', locationName: 'Paris', count: 2 },
  { departmentNumber: '16', locationName: 'Saintes', count: 1 },
  { departmentNumber: '16', locationName: 'Clermont-Ferrand', count: 1 },
  { departmentNumber: '16', locationName: 'Bordeaux', count: 5 },
  { departmentNumber: '16', locationName: 'Paris', count: 2 },
];

export function Localisation() {
  return (
    <div className="hidden xl:flex flex-col justify-between  max-w-[255px]">
      <div className="flex flex-col px-5 w-full text-base">
        <h2 className="w-full text-xl font-semibold leading-6 text-neutral-700">
          Lieux
        </h2>
        {locations.map((location) => (
          <LocationItem
            key={`${location.departmentNumber}-${location.locationName}`}
            {...location}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <section className="flex flex-col justify-center w-full">
              <div className="flex flex-col px-5 w-full">
                <div className="w-full text-xl font-semibold leading-6 text-neutral-700">
                  Lorem ipsum dolor sit{' '}
                </div>
                <div className="mt-1 w-full text-base leading-6 text-neutral-600">
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </div>
              </div>{' '}
            </section>
          </div>
          <button className="justify-center self-center items-center w-fit px-16 py-4 mt-3 text-base font-medium leading-7 text-center text-white whitespace-nowrap bg-rose-500  rounded-[800px] hover:bg-purple-800">
            M'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
