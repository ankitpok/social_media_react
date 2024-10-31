import { createContext, useEffect, useReducer, useState } from "react";

// Renaming the context to avoid naming conflicts
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    return currPostList.filter((post) => post.id !== action.payload.postId);
  } else if (action.type === "ADD_POST") {
    return [action.payload, ...currPostList];
  } else if (action.type === "FETCH_POSTS") {
    return (newPostList = action.payload.posts);
  }
  return currPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  let [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const fetchPosts = (posts) => {
    dispatchPostList({
      type: "FETCH_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFetching(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        fetchPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, fetching }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
