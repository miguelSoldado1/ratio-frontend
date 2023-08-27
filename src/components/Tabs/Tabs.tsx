import React, { useState } from "react";
import "./Tabs.css";

interface TabsProps {
  children: JSX.Element[];
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <ul className="tabs-container">
        {children.map((child, idx) => (
          <li key={idx} onClick={() => setSelected(idx)} className={`tab ${selected === idx ? "selected" : ""}`}>
            {child.props.title}
          </li>
        ))}
      </ul>
      <div>{children[selected]}</div>
    </>
  );
};

interface PanelProps {
  children: JSX.Element;
}

export const Panel: React.FC<PanelProps> = ({ children }) => {
  return <div>{children}</div>;
};
