import { Container } from "../";
import { RailPL } from "../../preloaders";
import "./Rail.css";

export const Rail = ({ content }) => {
  const { isLoading, isError, data } = content;
  if (isLoading) return <RailPL />;
  if (isError) return null;

  return (
    <div className="grid-container">
      <h1 className="grid-title">{data.description}</h1>
      <ul className="grid">
        {data.data.map((item, index) => (
          <Container props={item} key={index} />
        ))}
      </ul>
    </div>
  );
};
