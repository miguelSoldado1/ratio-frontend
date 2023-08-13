import React, { useState } from "react";
import "./Tabs.css";

export const Tabs = ({ children }) => {
  const [selected, setSelected] = useState(0);

  const childrenArray = React.Children.toArray(children);

  return (
    <>
      <ul className="tabs-container">
        {childrenArray.map((child, idx) => (
          <li key={idx} onClick={() => setSelected(idx)} className={`tab ${selected === idx ? "selected" : ""}`}>
            {child.props.title}
          </li>
        ))}
      </ul>
      <div>{childrenArray[selected]}</div>
    </>
  );
};

export const Panel = ({ children }) => {
  return <div>{children}</div>;
};
