import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, fetchPosts } = useContext(PostListData);
  let [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        fetchPosts(data.posts);
        setFetching(false);
      });
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};
export default PostList;
