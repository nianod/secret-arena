import { useEffect, useState } from "react";
import PostField from "../Components/PostField";
import { supabase } from "../Supabase/SupabaseClient";
import { MessageCircle } from "lucide-react";
import CommentSection from "../Components/CommentSection";

type Post = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

const Dashboard = () => {
  const [showPostField, setShowPostField] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openChat, setOpenChat] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      setRevealed(data as Post[]);
      setLoading(false);
    } catch (err) {
      console.log("There was an error: ", err);
      setError("Failed to load reveals!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            VIBLY ANONYMOUS
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Share your thoughts anonymously and discover what others are
            thinking. Your identity remains hidden while your voice is heard.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-semibold text-white mb-2">
                  What's on your mind?
                </p>
                <p className="text-gray-400 text-sm">
                  Share anonymously • 100% private
                </p>
              </div>
              <button
                onClick={() => setShowPostField(true)}
                className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Reveal Secret
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            Recent Reveals
            <span className="bg-blue-800 text-blue-200 text-sm px-3 py-1 rounded-full">
              {revealed.length}
            </span>
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-300 text-lg">Loading reveals...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 border border-red-700 rounded-xl p-6 text-center">
              <p className="text-red-300 font-semibold text-lg">{error}</p>
              <button
                onClick={fetchPosts}
                className="cursor-pointer mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : revealed.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-12 text-center">
              <div className="text-6xl mb-4 text-gray-400">🤫</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No reveals yet
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Be the first to share what's on your mind. Your secret is safe
                with us.
              </p>
              <button
                onClick={() => setShowPostField(true)}
                className="bg-gradient-to-r from-red-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-blue-700 transition-colors"
              >
                Share First Secret
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {revealed.map((post) => (
                <div
                  key={post.id}
                  className="relative bg-gray-800 rounded-2xl shadow-sm border min-h-[150px] h-fit border-gray-700 p-4 hover:shadow-lg transition-all duration-200 group hover:border-gray-600"
                >
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {post.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-300">
                          {post.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-300">
                        {post.created_at &&
                          new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Names are anonymized for privacy
                    </div>
                  </div>

                  <div className="border-t border-gray-700 mt-2 pt-3">
                    <p className="text-gray-200 text-lg leading-relaxed line-clamp-4">
                      {post.description}
                    </p>
                  </div>

                  <button
                    className="cursor-pointer absolute bottom-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
                    onClick={() => setOpenChat(openChat === post.id ? null : post.id )}
                  >
                    <MessageCircle size={22} />
                  </button>
                  <CommentSection
                    openChat={openChat}
                    postId={post.id}
                    setOpenChat={setOpenChat}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPostField && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-auto relative animate-in fade-in duration-200 border border-gray-700">
            <button
              onClick={() => setShowPostField(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
              title="Close"
            >
              <span className="cursor-pointer text-lg font-semibold">×</span>
            </button>
            <PostField
              closeModal={() => setShowPostField(false)}
              onPostSuccess={fetchPosts}
            />
          </div>
        </div>
      )}
     </div>
  );
};

export default Dashboard;
