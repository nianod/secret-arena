import type { SetStateAction } from "react";

type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<SetStateAction<boolean>>;
}

const CommentSection: React.FC<ChatProps> = ({ openChat, setOpenChat }) => {
  if (!openChat) return null;  

  return (
    <div className="mt-3 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
      <h3 className="text-sm text-gray-300 mb-2 font-semibold">Comments</h3>

      <div className="space-y-2">
        <p className="text-gray-400 text-sm">No comments yet.</p>
      </div>

      <div className="flex items-center mt-3">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => setOpenChat(false)}
          className="ml-2 px-3 py-2 bg-blue-600 rounded-lg text-sm text-white hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
