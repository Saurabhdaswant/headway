import { useEffect, useRef } from "react";

const useClickOutSide = (handler) => {
  let domNode = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let maybeHandler = (event: MouseEvent) => {
      if (domNode?.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

export default useClickOutSide;
