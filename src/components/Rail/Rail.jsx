import { Container } from "../";
import { RailPL } from "../../preloaders";
import "./Rail.css";

export const Rail = ({ isLoading, data }) => {
  if (isLoading) return <RailPL />;

  if (data.data) {
    return (
      <div className="grid-container">
        <h1 className="grid-title overflow-ellipsis">{data.description}</h1>
        <ul className="grid">
          {data.data.map((item, index) => (
            <Container props={item} key={index} />
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
