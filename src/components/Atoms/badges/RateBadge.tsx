import { Star } from "lucide-react";
import React from "react";

interface Props {
  number: number;
}

const RateBadge = ({ number }: Props) => {
  return (
    <div className="bg-white/80 px-3 py-1 flex items-center gap-2 rounded-full font-medium">
      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      <span>{number}</span>
    </div>
  );
};

export default RateBadge;
