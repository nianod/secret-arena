 import React, { useState } from "react";
import useFetchComments from "../Hooks/UseFatchComments";
type CommentSectionProps = {
  openChat: string | null;
  postId: string;
  setOpenChat: React.Dispatch<React.SetStateAction<string | null>>;
  commentCount: number
};

const CommentSection: React.FC<CommentSectionProps> = ({ openChat,postId, commentCount}) => {
  const [message, setMessage] = useState("");
  const { comments, loading, error, addComment } = useFetchComments(openChat === postId ? postId : null, openChat);

  if (openChat !== postId) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const success = await addComment(message);
    if (success) setMessage("");
  };

  return (
    <div className="mt-3 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
      <h3 className="text-sm text-gray-300 mb-2 font-semibold">Comments ({commentCount})</h3>

      {loading && <p className="text-gray-400 text-sm">Loading comments...</p>}
      {!loading && comments.length === 0 && (
        <p className="text-gray-400 text-sm">No comments yet.</p>
      )}

      <div className="max-h-48 overflow-y-auto mb-3 space-y-2">
        {comments.map((comment: any) => (
          <p key={comment.id} className="text-gray-300 text-sm">
            {comment.content}
          </p>
        ))}
      </div>

      <form className="flex items-center" onSubmit={submit}>
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
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Posting...
            </span>
          ) : (
            "Send"
          )}
        </button>
      </form>

      {error && (
        <p className="text-center text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default CommentSection;
