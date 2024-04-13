import { Chat } from '../Chat';

export function ChatPage() {
  return (
    <div className="container mx-auto w-3/5	mt-10  flex-col">
      <div className="border-solid border-slate-400 border-2 h-2/3">
        <Chat />
      </div>
      <div className="border-solid  mt-2 flex justify-center">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs bg-white mr-10"
        />
        <button className="btn btn-outline">Envoyer</button>
      </div>
    </div>
  );
}
