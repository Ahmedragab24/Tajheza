import LoaderSpan from "@/components/Atoms/Loaders/LoaderSpan";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4 mx-auto">
      <LoaderSpan />
    </div>
  );
};

export default Loading;
