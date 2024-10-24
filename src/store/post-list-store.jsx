import { createContext, useReducer } from "react";

// Renaming the context to avoid naming conflicts
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  fetchPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    return currPostList.filter((post) => post.id !== action.payload.postId);
  } else if (action.type === "ADD_POST") {
    return [...currPostList, action.payload];
  } else if (action.type === "FETCH_POSTS") {
    return (newPostList = action.payload.posts);
  }
  return currPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, postBody, postTags, Reactions) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: Reactions,
        userId: userId,
        tags: postTags,
      },
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

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, fetchPosts }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
