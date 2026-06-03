"use client";

import React from "react";

const ViewCounter = () => {
  const count = 0;

  function checkViews() {
    let view: string;

    if (count > 1) {
      view = "views";
    } else {
      view = "view";
    }
    return view;
  }
  return (
    <div>
      {count} {checkViews()}
    </div>
  );
};

export default ViewCounter;
