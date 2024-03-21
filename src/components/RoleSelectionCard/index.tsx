'use client';

import { CardBody, CardContainer, CardItem } from './CardContainer';

export function RoleSelectionCard({ citation, genre, onClick, src }) {
  return (
    <div onClick={onClick}>
      <CardContainer className="inter-var m-5">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {citation}{' '}
          </CardItem>

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
              className="px-4 py-2 rounded-xl text-2xl font-normal dark:text-white"
            >
              {genre}{' '}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
