import { CardBody, CardContainer, CardItem } from './CardContainer';

export function RoleSelectionCard({ genre, onClick, src }) {
  return (
    <div className="container mx-auto cursor-pointer" onClick={onClick}>
      <CardContainer className="inter-var m-5">
        <CardBody className="bg-gray-50 relative group/card  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="100"
            rotateX={0}
            rotateZ={0}
            className="w-full mt-4"
          >
            <img
              src={src}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              translateX={-40}
              className="px-4 py-2 rounded-xl text-2xl font-normal "
            >
              {genre}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
