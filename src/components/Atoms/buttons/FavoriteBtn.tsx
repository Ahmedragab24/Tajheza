import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";

interface Props {
  productId: number;
}

const FavoriteBtn = ({ productId }: Props) => {
  return (
    <Button size="icon" className="bg-white/80 !w-8 !h-8 hover:bg-secondary">
      <Heart className="text-primary" />
    </Button>
  );
};

export default FavoriteBtn;
