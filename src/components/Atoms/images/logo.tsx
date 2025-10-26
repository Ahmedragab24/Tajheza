import Image from "next/image";

interface Props {
  isBg: boolean;
  size?: "md" | "lg";
}

export default function Logo({ isBg, size = "md" }: Props) {
  return (
    <div
      className={`relative ${
        size === "lg"
          ? "!w-25 md:!w-35 !h-20 md:!h-30"
          : "!w-25 md:!w-30 !h-20 md:!h-25"
      } `}
    >
      <Image
        src={`/Logos/${isBg ? "logo3-01 1" : "Logo"}.png`}
        alt="logo"
        fill
      />
    </div>
  );
}
