import { useLoaderData } from 'react-router-dom';
import { handleImg } from '../../utils/handleImg';

export function LeftMsg() {
  const data = useLoaderData();
  const Allmessages = data.getConversationsByMyId;

  return (
    <aside className="hidden xl:order-first xl:block xl:flex-shrink-0 max-h-[1024px]">
      <div className="relative flex h-full w-96 flex-col border-r border-gray-200 bg-gray-100 ">
        <div className="flex-shrink-0">
          <div className="flex h-16 flex-col justify-center bg-white px-6">
            <div className="flex items-baseline space-x-3">
              <h2 className="text-lg font-medium text-gray-900">Inbox</h2>
              <p className="text-sm font-medium text-gray-500">
                {Allmessages.length} messages
              </p>
            </div>
          </div>
        </div>
        <nav
          aria-label="Message list"
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <ul
            role="list"
            className="divide-y divide-gray-200 border-b border-gray-200"
          >
            {Allmessages.map((message) => (
              <li
                key={message.id}
                className="relative bg-white px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50"
              >
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                    <a
                      href={`/chat/room/${message.user_id_2}/${message.user_id_1}`}
                      className="block focus:outline-none"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="truncate text-sm font-medium text-gray-900">
                        {message.user_name_2}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        <img
                          loading="lazy"
                          src={handleImg(message.user_image_2)}
                          alt={message.user_name_2}
                          className="h-10 w-10 rounded-full"
                        />
                      </p>
                    </a>
                  </div>

                  <div className="mt-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {message.user_name_1}
                    </p>
                    <img
                      loading="lazy"
                      src={handleImg(message.user_image_1)}
                      alt={message.user_name_1}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <time
                    dateTime={message.created_at}
                    className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                  >
                    {message.created_at}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
