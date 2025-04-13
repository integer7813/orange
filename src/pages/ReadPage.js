import { useParams } from "react-router-dom";
import Article from "../components/Article";

const ReadPage = ({ topics }) => {
    const { id } = useParams();
    const topic = topics.find(t => t.id === parseInt(id));
  
    if (!topic) {
      return <p>Topic not found!</p>;
    }
  
    return <Article title={topic.title} body={topic.body} />;
  };
  
export default ReadPage;