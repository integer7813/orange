import { useNavigate } from "react-router-dom";

const CreatePage = ({ onCreate }) => {
    const navigate = useNavigate();
  
    return (
      <article>
        <h2>Create</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          const id = Date.now();
          onCreate(id, title, body);
          navigate(`/read/${id}`);
        }}>
          <p><input type="text" name="title" placeholder="Please Input ORANGE name" required /></p>
          <p><textarea name="body" placeholder="Please Input description of ORANGE" required /></p>
          <p><input type="submit" value="Create" /></p>
        </form>
      </article>
    );
  };

export default CreatePage;