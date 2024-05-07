import { useState } from "react";

export default function useToggle(initialValue: boolean) {
  if (typeof initialValue !== "boolean") {
    console.warn("Invalid type for useToggle");
  }

  const [value, setValue] = useState<boolean>(initialValue);

  function toggleValue() {
    setValue((currentValue) => !currentValue);
  }

  return [value, toggleValue];
}
