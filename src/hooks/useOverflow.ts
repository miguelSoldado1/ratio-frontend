import { useEffect, useRef, useState } from "react";

const useOverflowExpander = () => {
  const ref = useRef<HTMLDivElement>(null);
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
        overflow: element ? element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight : false,
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

  // TODO: Why is the state spread?
  return { ref, ...state, handleToggleExpanded };
};

export default useOverflowExpander;
