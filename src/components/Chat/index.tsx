import { useAppSelector } from '../../store/redux-hook';
import { handleImg } from '../../utils/handleImg';

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

export function Chat({ messages }: MessagesI) {
  //   ID from decodedtoken state
  const id = useAppSelector((state) => state.decodedToken.decodedData.id);

  return (
    <>
      {messages.map((message: MessageI) => {
        return (
          <div
            className={`${message.sender_id !== id ? 'chat-start' : 'chat-end'} chat  m-2`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={handleImg(message.image_url)}
                />
              </div>
            </div>
            <div className="chat-header">{message.name}</div>
            <div
              className={` ${message.sender_id === id ? 'bg-blue-700' : 'bg-slate-600'} chat-bubble text-white font-semibold`}
            >
              {message.content}
            </div>
            <div className="chat-footer opacity-50">
              {message.read ? 'lu' : 'non lu'}
            </div>
          </div>
        );
      })}
    </>
  );
}
