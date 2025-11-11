import { useState } from "react"
import { supabase } from "../Supabase/SupabaseClient";


type CommentSectionProps = {
  openChat: string | null;
  postId: string;
  setOpenChat: React.Dispatch<React.SetStateAction<string | null>>;
};

const CommentSection: React.FC<CommentSectionProps> = ({ openChat, postId }) => {

  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  if (openChat !== postId) return null; 

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase
      .from('comments')
      .insert([{content: message, post_id: postId}])
      .select()
      .single()

      if(error) {
        console.log('error uploading comment', error.message)
        setError('error uploading comment. Try again')
      } else {
        console.log('success posting', data)
        setMessage("")
      }
    } catch(err: any) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
      <h3 className="text-sm text-gray-300 mb-2 font-semibold">Comments</h3>
      <p className="text-gray-400 text-sm">No comments yet.</p>

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
          // onClick={() => setOpenChat(null)}
          className={`cursor-pointer px-3 ml-2 py-2 rounded-xl font-bold text-white transition-all ${
            loading
              ? "cursor-not-allowed opacity-50 bg-blue-500"
              : "bg-blue-600 hover:scale-105 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Posting...
            </span>
          ) : (
            "Send"
          )}
        </button>
      </form>
      {error && (
        <p className="text-center text-red-500 text-sm mb-2">{error}</p>
      )}
    </div>
  );
};

export default CommentSection