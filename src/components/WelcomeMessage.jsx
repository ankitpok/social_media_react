const WelcomeMessage = ({ onGetPostsClick }) => {
  return (
    <>
      <h1>There are no posts to show</h1>
      <button
        type="button"
        className="btn btn-primary fetch-button"
        onClick={onGetPostsClick}>
        Fetch Posts
      </button>
    </>
  );
};
export default WelcomeMessage;
