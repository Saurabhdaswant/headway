import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../constants";

export default function Goal() {
  const router = useRouter();
  const { goal: id } = router.query;
  const [goal, setGoal] = useState<any>();

  console.log(id, "right ?");

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");

    async function getGoals() {
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const goal = await res.json();

      setGoal(goal);
    }

    if (id) {
      if (token && id) {
        getGoals();
      }
    }
  }, []);

  return <div>actual goal name : {goal?.name} </div>;
}
