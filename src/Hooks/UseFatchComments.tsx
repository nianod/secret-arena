import { useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

const useFetchComments = (postId: string | null, openChat: string | null) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    if (!postId) return;
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err: any) {
      setError("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openChat === postId) {
      fetchComments();
    }
  }, [openChat, postId]);

  const addComment = async (content: string) => {
    if (!postId || !content.trim()) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("comments")
        .insert([{ content, post_id: postId }])
        .select();

      if (error) throw error;
      setComments((prev) => [data[0], ...prev]);
      return true;
    } catch (err: any) {
      setError("Error uploading comment");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { comments, loading, error, addComment };
};

export default useFetchComments;
