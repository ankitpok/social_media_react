import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const userId = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const postTags = useRef();
  const reactions = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userID = userId.current.value;
    const posttitle = postTitle.current.value;
    const postbody = postBody.current.value;
    const posttags = postTags.current.value.split(/\s+/);
    const Reactions = reactions.current.value;
    addPost(userID, posttitle, postbody, posttags, Reactions);
    userId.current.value = "";
    postTitle.current.value = "";
    postBody.current.value = "";
    postTags.current.value = "";
    reactions.current.value = "";
  };
  return (
    <form className="container form-container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="uderId" className="form-label">
          UserId
        </label>
        <input
          ref={userId}
          type="text"
          className="form-control"
          id="userId"
          placeholder="Please enter your user ID here"
        />
        <label htmlFor="post-title" className="form-label">
          Title
        </label>
        <input
          ref={postTitle}
          type="text"
          className="form-control"
          id="post-title"
          placeholder="How are you feeling today...."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="post-body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={postBody}
          rows={4}
          type="text"
          className="form-control"
          id="post-body"
          placeholder="Tell us more about it..."
        />
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          ref={postTags}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please separate multiple tags with space"
        />
        <label htmlFor="reactions" className="form-label">
          reactions
        </label>
        <input
          ref={reactions}
          type="text"
          className="form-control"
          id="reactions"
          placeholder="how many people reacted to this post"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Post
      </button>
    </form>
  );
};
export default CreatePost;
