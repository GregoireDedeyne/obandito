import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';
import { Chat } from '../Chat';
import socketIO from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';

export function ChatPage() {
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
  const [messages, setMessages] = useState([]);

  // ID receiver from params
  const { idrecever } = useParams();

  //   const userId = useAppSelector((state) => state.decodedToken.decodedData.id);
  const containerElement = useRef<HTMLDivElement>(null);
  // Token from state
  const token = useAppSelector((state) => state.decodedToken.token);
  // Add connexion for io serveur
  const socket = socketIO.connect('http://localhost:4000/chat', {
    query: {
      token: token,
    },
  });

  useEffect(() => {
    //A chaque rerender, la hauteur de l'élément change, on vient récupérer la taille de notre élément référencé;
    //Puis on scroll tout en bas de cet élément
    const scrollY = containerElement.current!.scrollHeight;
    containerElement.current!.scrollTo(0, scrollY);
  }, [messages]);

  useEffect(() => {
    socket.emit('join-conversation', idrecever);
    socket.on('previous-messages', (messages: MessagesI) => {
      setMessages(messages);
    });
    return () => {
      socket.off('previous-messages');
    };
  }, []);

  const handleSubmit = (e: {
    preventDefault: () => void;
    target: { firstElementChild: { value: string } };
  }) => {
    e.preventDefault();
    const message = {
      message: e.target.firstElementChild.value,
      user_info_receiver: idrecever,
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

  return (
    <div className="container mx-auto w-3/5	mt-10  flex-col ">
      <div
        ref={containerElement}
        className="border-solid border-slate-400 border-2 h-2/3 overflow-auto "
      >
        <Chat messages={messages} />
      </div>
      <form onSubmit={handleSubmit} className="relative flex">
        <input
          id="message_input"
          name="message"
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 sm:flex">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
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
    </div>
  );
}
