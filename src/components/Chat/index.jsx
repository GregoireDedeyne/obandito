import { useSelector } from 'react-redux';
import { handleImg } from '../../utils/handleImg';

export function Chat({ messages }) {
  //   ID from decodedtoken state
  const id = useSelector((state) => state.decodedToken.decodedData.id);

  return (
    <>
      {messages.map((message) => {
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
