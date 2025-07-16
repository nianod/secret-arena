import { useEffect, useState } from "react";
import PostField from "../Components/PostField";
import { supabase } from "../Supabase/SupabaseClient";


type Post = {
  id: string
  name: string
  description: string
  created_at: string
}

const Dashboard = () => {
  const [showPostField, setShowPostField] = useState<boolean>(false)
  const [revealed, setRevealed] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  
  
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const { data, error: supabaseError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })

        if (supabaseError) throw supabaseError

        setRevealed(data as Post[])
        setLoading(false)
      } catch (err) {
        console.error("There was an error: ", err)
        setError("Failed!")
        setLoading(false)
      }
    }
    useEffect(() => {
       fetchPosts()
    }, [])

  return (
    <div className="relative">
      <div className="box p-2 rounded-2xl flex justify-center gap-4 m-auto w-fit mt-6">
        <p className="text-xl font-bold align-center flex text-white">
          What is on your Mind?
        </p>
        <button
          onClick={() => setShowPostField(true)}
          className="text-white p-2 bg-red-400 rounded cursor-pointer font-bold text-xl hover:bg-red-500"
        >
          Reveal
        </button>
      </div>

      {/* Mapping of Posted Secrets */}
      <div className="flex flex-wrap gap-5 mt-4 p-4">
        {loading ? (
          <p className="text-white flex justify-center text-xl">Loading Reveals...</p>
        ) : error ? (
          <p>{error}</p>
        ) : revealed.length === 0 ? (
          <p className="text-white flex justify-center text-xl">No Reveals Available.</p>
        ) : (
          revealed.map((post) => (
            <div key={post.id} className="w-[104vh] mb-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="font-bold">Posted by: <span className="font-semibold">{post.name}</span> <i className="font-normal text-gray-400">Names here are anonymous</i></h2>
              <p className="my-2"><span className="font-semibold">Secret:</span> {post.description}</p>
              {post.created_at && (
                <span className="text-sm text-gray-500">
                  Posted on: {new Date(post.created_at).toLocaleString()}
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {showPostField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative shadow-lg">
            <button
              onClick={() => setShowPostField(false)}
              className="absolute top-2 right-2 text-2xl text-gray-500 font-bold"
              title="Cancel"
            >
              X
            </button>
            <PostField 
            closeModal = {() => setShowPostField(false)}
            onPostSuccess={fetchPosts}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;