import { LangType } from "@/types/globals";

interface Props {
  lang: LangType;
}

const OrBadge = ({ lang }: Props) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="w-full h-[1px] bg-gray-300"></div>
      <h4 className="text-gray-500 text-sm">{lang === "en" ? "or" : "او"}</h4>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  );
};

export default OrBadge;
