import { ContainerPL } from "../ContainerPL/ContainerPL";
import "./RailPL.css";

export const RailPL = () => {
  return (
    <div className="grid-container">
      <h1 className="grid-title preloader">Loading...</h1>
      <ul className="grid">
        {[...Array(10)].map((_, idx) => (
          <ContainerPL key={idx} />
        ))}
      </ul>
    </div>
  );
};
