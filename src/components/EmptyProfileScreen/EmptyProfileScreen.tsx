import "./EmptyProfileScreen.css";

export const EmptyProfileScreen = () => {
  return (
    <div className="profile-screen-container-empty">
      <h2 className="profile-screen-container-empty-title">No Ratings</h2>
      <span>This user hasn't submitted any ratings yet...</span>
    </div>
  );
};
