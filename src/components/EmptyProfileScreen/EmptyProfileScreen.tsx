import "./EmptyProfileScreen.css";

const EMPTY_PROFILESCREEN_TITLE = "No Ratings";
const EMPTY_PROFILESCREEN_SUBTEXT = "This user hasn't submitted any ratings yet...";

export const EmptyProfileScreen = () => {
  return (
    <div className="profile-screen-container-empty">
      <h2 className="profile-screen-container-empty-title">{EMPTY_PROFILESCREEN_TITLE}</h2>
      <span>{EMPTY_PROFILESCREEN_SUBTEXT}</span>
    </div>
  );
};
