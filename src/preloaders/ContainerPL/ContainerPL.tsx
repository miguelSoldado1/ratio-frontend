import "./ContainerPL.css";

export const ContainerPL = () => {
  return (
    <li className="container">
      <div className="container-image preloader gradient" />
      <div className="container-album-name preloader gradient" />
      <div className="container-artist-name preloader gradient" />
    </li>
  );
};
