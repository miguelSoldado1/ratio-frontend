import { Container } from "../";
import { RailPL } from "../../preloaders";
import "./Rail.css";

// first case is for content is LOADED and ready to display_name
// second case is for content is LOADING and display skeleton preloader
// third case is for done loading but NO DATA
export const Rail = ({ content }) => {
  if (content?.data?.length > 0)
    return (
      <>
        <h1 className="grid-title">{content.description}</h1>
        <ul className="grid">
          {content.data?.map((item, index) => (
            <Container props={item} key={index} />
          ))}
        </ul>
      </>
    );
  if (!content?.error) return <RailPL />;
  return null;
};
