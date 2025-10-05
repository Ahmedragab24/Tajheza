import { Button } from "../../ui/button";
import LoaderSpan from "../Loaders/LoaderSpan";

interface SubmitBtnProps {
  title: string;
  disabled?: boolean;
  className?: string;
  loading: boolean;
}

const SubmitBtn = ({ title, disabled, loading, className }: SubmitBtnProps) => {
  return (
    <Button
      className={`w-full h-11 ${className}`}
      type="submit"
      disabled={disabled}
    >
      {loading ? <LoaderSpan /> : <span className="text-white">{title}</span>}
    </Button>
  );
};

export default SubmitBtn;
