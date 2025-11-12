import { supabase } from "../Supabase/SupabaseClient";
import { useState, useEffect } from "react";
const useFetchComments = (postId: string | null, openChat: string | null) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    if (!postId) return;
    setLoadingComments(true);
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
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (openChat === postId) fetchComments();
  }, [openChat, postId]);

  const addComment = async (content: string) => {
    if (!postId || !content.trim()) return false;
    setPostingComment(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ content, post_id: postId }])
        .select();
      if (error) throw error;
      setComments((prev: any) => [data[0], ...prev]);
      return true;
    } catch (err: any) {
      setError("Error uploading comment");
      return false;
    } finally {
      setPostingComment(false);
    }
  };

  return { comments, loadingComments, postingComment, error, addComment };
};

export default useFetchComments