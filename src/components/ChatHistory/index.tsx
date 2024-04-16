import { useLoaderData, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';
import { Chat } from '../Chat';
import socketIO from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { handleImg } from '../../utils/handleImg';

export function ChatHistory() {
  interface MessageI {
    id: number;
    content: string;
    sender_id: number;
    read: boolean;
    conversation_id: number;
    image_url: string;
    name: string;
    updated_at: string;
    created_at: string;
  }

  interface MessagesI {
    messages: [MessageI];
  }
  // old msg state
  const [messages, setMessages] = useState<MessagesI[] | []>([]);

  const [Readmessages, setReadMessages] = useState<MessagesI[] | []>([]);
  // console.log(Readmessages);

  const compareMessages = () => {
    const updatedMessages = messages.map((message) => {
      const isMessageRead = Readmessages.some(
        (readMessage) => readMessage.id === message.id
      );
      if (isMessageRead) {
        return { ...message, read: true };
      } else {
        return message;
      }
    });
    setMessages(updatedMessages);
  };

  useEffect(() => {
    compareMessages();
  }, [Readmessages]);

  // ID receiver from params
  const { idrecever, idsender } = useParams();
  const tokenID = useAppSelector((state) => state.decodedToken.decodedData.id);

  const newReceiverID = +idrecever == +tokenID ? +idsender : +idrecever;

  //   const userId = useAppSelector((state) => state.decodedToken.decodedData.id);

  // Token from state
  const token = useAppSelector((state) => state.decodedToken.token);
  // Add connexion for io serveur
  const socket = socketIO.connect('http://localhost:4000/chat', {
    query: {
      token: token,
    },
  });

  const containerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //A chaque rerender, la hauteur de l'élément change, on vient récupérer la taille de notre élément référencé;
    //Puis on scroll tout en bas de cet élément
    const scrollY = containerElement.current!.scrollHeight;
    containerElement.current!.scrollTo(0, scrollY);
  }, [messages]);

  useEffect(() => {
    socket.emit('join-conversation', newReceiverID);
    socket.on('previous-messages', (messages: MessagesI) => {
      setMessages(messages);
    });

    return () => {
      socket.off('previous-messages');
      socket.disconnect();
    };
  }, []);

  socket.on('update-status', (readOrNotMessages) => {
    console.log(readOrNotMessages);

    setReadMessages(readOrNotMessages);
  });

  const handleSubmit = (e: {
    preventDefault: () => void;
    target: { firstElementChild: { value: string } };
  }) => {
    e.preventDefault();
    const message = {
      message: e.target.firstElementChild.value,
      user_info_receiver: newReceiverID,
    };
    socket.emit(
      'send-message',
      message,
      (response: { status: string; message: any }) => {
        if (response.status === 'error') {
          console.log(response.message);
        } else {
          console.log(response.message);
          e.target.firstElementChild.value = '';
        }
      }
    );
  };
  socket.on('new-message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  const data = useLoaderData();
  const Allmessages = data.getConversationsByMyId;

  return (
    <>
      <div className="flex  flex-col h-full ">
        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Main area */}
          <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
            <section
              aria-labelledby="message-heading"
              className="flex h-full min-w-0 border flex-1 flex-col border-r overflow-hidden xl:order-last"
            >
              <div
                className="min-h-0 flex-1 overflow-y-auto "
                ref={containerElement}
              >
                <div className=" max-h-[1024px] ">
                  <div className="overflow-auto">
                    <Chat messages={messages} />
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="relative flex w-full">
                <input
                  id="message_input"
                  name="message"
                  type="text"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200  py-3"
                />
                <div className="absolute right-0 items-center inset-y-0 sm:flex">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <span className="font-bold">Envoyer</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </section>

            {/* Message list*/}
            <aside className="hidden min-h-full border-l xl:order-first xl:block xl:flex-shrink-0 max-h-[1024px]">
              <div className="relative flex h-full w-96 flex-col border-r">
                <div className="flex-shrink-0">
                  <div className="flex h-16 flex-col justify-center bg-white px-6 border-b">
                    <div className="flex items-baseline justify-between space-x-3 ">
                      <h2 className="text-lg font-medium text-gray-900">
                        Boîte de reception
                      </h2>
                      <p className="text-sm font-medium text-gray-500">
                        {Allmessages.length} messages
                      </p>
                    </div>
                  </div>
                </div>
                <nav
                  aria-label="Message list"
                  className="min-h-full bg-gray-100  flex-1 overflow-y-auto"
                >
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-gray-200"
                  >
                    {Allmessages.map((message) => {
                      return (
                        <li
                          key={message.id}
                          className="relative bg-white px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-center space-x-3">
                            <div className="min-w-0 flex-1">
                              <a
                                href={`/chat/room/${message.user_id_2}/${message.user_id_1}`}
                                className="block focus:outline-none flex gap-2 items-center flex-row-reverse justify-end"
                              >
                                <p className="truncate text-sm font-medium text-gray-900 capitalize">
                                  {tokenID != message.user_id_1
                                    ? message.user_name_1
                                    : message.user_name_2}
                                </p>
                                <img
                                  loading="lazy"
                                  src={handleImg(
                                    tokenID != message.user_id_1
                                      ? message.user_image_1
                                      : message.user_image_2
                                  )}
                                  alt={
                                    tokenID == message.user_id_1
                                      ? message.user_name_1
                                      : message.user_name_2
                                  }
                                  className="h-10 w-10 rounded-full"
                                />
                              </a>
                            </div>
                            <time
                              dateTime={message.created_at}
                              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                            >
                              {message.created_at}
                            </time>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}
