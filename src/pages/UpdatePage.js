import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdatePage = ({ topics, onUpdate }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const topic = topics.find(t => t.id === parseInt(id));
    const [title, setTitle] = useState(topic?.title || '');
    const [body, setBody] = useState(topic?.body || '');
  
    if (!topic) {
      return <p>Topic not found!</p>;
    }
  
    return (
      <article>
        <h2>Update</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          onUpdate(parseInt(id), title, body);
          navigate(`/read/${id}`);
        }}>
          <p><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></p>
          <p><textarea value={body} onChange={(e) => setBody(e.target.value)} required /></p>
          <p><input type="submit" value="Update" /></p>
        </form>
      </article>
    );
  };

export default UpdatePage;