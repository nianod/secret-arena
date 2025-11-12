
import React from "react";
import useFetchComments from "../Hooks/UseFatchComments";
type CommentSectionProps = {
  openChat: string | null;
  postId: string;
  setOpenChat: React.Dispatch<React.SetStateAction<string | null>>;
};

const CommentSection: React.FC<CommentSectionProps> = ({ openChat, postId }) => {
  const { message, setMessage, comments, loading, error, submit } = useFetchComments(postId, openChat);

  if (openChat !== postId) return null;

  return (
    <div className="mt-3 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
      <h3 className="text-sm text-gray-300 mb-2 font-semibold">Comments</h3>

      
      {loading ? (
        <p className="text-gray-400 text-sm">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 text-sm">No comments yet.</p>
      ) : (
        <ul className="space-y-2 mb-3">
          {comments.map((comment:any) => (
            <li
              key={comment.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-gray-200"
            >
              {comment.content}
            </li>
          ))}
        </ul>
      )}
 
      <form className="flex items-center mt-3" onSubmit={submit}>
        <input
          type="text"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
        />
        <button
          disabled={loading}
          type="submit"
          className={`cursor-pointer px-3 ml-2 py-2 rounded-xl font-bold text-white transition-all ${
            loading
              ? "cursor-not-allowed opacity-50 bg-blue-500"
              : "bg-blue-600 hover:scale-105 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Send"}
        </button>
      </form>

      {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CommentSection;
