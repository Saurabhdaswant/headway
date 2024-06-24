import { useRouter } from "next/router";
import React from "react";

export default function goal() {
  const router = useRouter();
  const { goal } = router.query;

  return <div>actual goal : {goal} </div>;
}
