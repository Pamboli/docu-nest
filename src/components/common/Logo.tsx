import Image from "next/image";
import LogoImg from "../../../public/logo.png";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={LogoImg} width={56} alt="Logo Image" />
      <span className="ml-1 font-bold text-3xl">DocuNest</span>
    </div>
  );
}

export { Logo };
