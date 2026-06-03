"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({
  slug,
  initialViews,
}: {
  slug: string;
  initialViews: number;
}) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch((err) => console.error("Error updating views:", err));
  }, [slug]);

  function checkViews() {
    let view;
    if (views <= 1) {
      view = "view";
    } else {
      view = "views";
    }
    return view;
  }
  return (
    <span className="text-sm font-roboto font-bold">
      {views} {checkViews()}
    </span>
  );
}
