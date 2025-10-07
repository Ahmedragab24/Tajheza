import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function QuantityCounter({ count, setCount }: Props) {
  const decrease = () => setCount((prev) => Math.max(1, prev - 1));
  const increase = () => setCount((prev) => Math.min(6, prev + 1));

  return (
    <div
      className="inline-flex items-center"
      role="group"
      aria-labelledby="control"
    >
      <Button
        className="rounded-full !w-8 !h-8 border-primary"
        variant="outline"
        size="icon"
        aria-label="Decrease"
        onClick={decrease}
        disabled={count === 1}
      >
        <MinusIcon size={16} aria-hidden="true" className="text-primary" />
      </Button>
      <div
        className="flex items-center px-3 text-lg font-semibold tabular-nums"
        aria-live="polite"
      >
        {count}
      </div>
      <Button
        className="rounded-full !w-8 !h-8 border-primary"
        variant="outline"
        size="icon"
        aria-label="Increase"
        onClick={increase}
        disabled={count === 6}
      >
        <PlusIcon size={16} aria-hidden="true" className="text-primary" />
      </Button>
    </div>
  );
}
