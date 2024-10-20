import { createContext, useReducer } from "react";

// Renaming the context to avoid naming conflicts
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  if (action.type === "DELETE_POST") {
    return currPostList.filter((post) => post.id !== action.payload.postId);
  } else if (action.type === "ADD_POST") {
    return [...currPostList, action.payload];
  }
  return currPostList;
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to palpa",
    body_text: "I am going to palpa. Very excited. Wow wow wow",
    reactions: 2,
    userID: "user-1",
    tags: ["Vacation", "Home", "Fun"],
  },
  {
    id: "2",
    title: "Graduating engineering",
    body_text: "I passed engineering by having fun for 4 years. Unbelievable",
    reactions: 10,
    userID: "user-2",
    tags: ["Graduation", "Pass", "Unbelievable"],
  },
];

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, postTags, Reactions) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body_text: postBody,
        reactions: Reactions,
        userID: userId,
        tags: postTags,
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
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
