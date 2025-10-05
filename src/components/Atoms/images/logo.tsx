import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-20 md:w-25 h-14 md:h-20">
      <Image src="/Logos/Logo.png" alt="logo" fill />
    </div>
  );
}
