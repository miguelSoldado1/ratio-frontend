import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ShepherdTour } from "react-shepherd";
import App from "./App";
import "shepherd.js/dist/css/shepherd.css";
import "./index.css";

const steps = [
  {
    id: "step-1",
    text: "welcome to ratio",
    buttons: [
      { type: "cancel", text: "Skip" },
      { type: "next", text: "Next" },
    ],
  },
  {
    id: "step-2",
    text: "this is the homepage",
    buttons: [
      { type: "cancel", text: "Skip" },
      { type: "next", text: "Next" },
    ],
  },
  {
    id: "step-3",
    text: "this is a rail. click one of the albums",
    attachTo: { element: ".rails-container > .grid-container:first-child ", on: "bottom" },
  },
  {
    id: "step-4",
    text: "This is the album page",
    buttons: [{ type: "next", text: "Next" }],
  },
  {
    id: "step-5",
    text: "this is the album info",
    attachTo: { element: ".album-details-column.left", on: "bottom" },
    buttons: [{ type: "next", text: "Next" }],
  },
  {
    id: "step-6",
    text: "this is the album ratings",
    attachTo: { element: ".ratings-container", on: "bottom" },
    buttons: [{ type: "next", text: "Next" }],
  },
];
const tourOptions = {
  defaultStepOptions: { scrollTo: { block: "end", inline: "end" } },
  useModalOverlay: true,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <ShepherdTour steps={steps} tourOptions={tourOptions}>
          <App />
        </ShepherdTour>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
