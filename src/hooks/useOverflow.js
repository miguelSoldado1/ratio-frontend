import { useEffect, useRef, useState } from "react";

const useOverflowExpander = () => {
  const ref = useRef(null);
  const [state, setState] = useState({
    overflow: false,
    expanded: false,
  });

  const handleToggleExpanded = () => {
    setState((prevState) => ({
      ...prevState,
      expanded: !prevState.expanded,
    }));
  };

  useEffect(() => {
    const element = ref.current;

    const checkOverflow = () => {
      setState((prevState) => ({
        ...prevState,
        overflow: element && (element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight),
      }));
    };

    checkOverflow();

    const handleResize = () => {
      checkOverflow();
      setState((prevState) => ({
        ...prevState,
        expanded: false,
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    ref,
    ...state,
    handleToggleExpanded,
  };
};

export default useOverflowExpander;
