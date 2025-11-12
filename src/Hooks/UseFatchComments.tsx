import { useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

const useFetchComments = (postId: string, openChat: string | null) => {
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err: any) {
      console.error("Error fetching comments:", err.message);
      setError("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    if (openChat === postId) fetchComments();
  }, [openChat, postId]);

   const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const user = (await supabase.auth.getUser()).data.user;

      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            content: message,
            post_id: postId,
            user_id: user?.id || null,
          },
        ])
        .select();

      if (error) throw error;

      setComments((prev) => [data[0], ...prev]);
      setMessage("");
    } catch (err: any) {
      console.error("Error posting comment:", err.message);
      setError("Error uploading comment");
    } finally {
      setLoading(false);
    }
  };

  return {
    message,
    setMessage,
    comments,
    loading,
    error,
    submit,
  };
};

export default useFetchComments;
