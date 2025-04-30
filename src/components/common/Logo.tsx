import Image from "next/image";
import LogoImg from "../../../public/logo.png";

function Logo() {
  return (
    <div className="flex items-center">
      <Image src={LogoImg} width={96} alt="Logo Image" />
      <span className="ml-1 font-bold text-4xl">DocuNest</span>
    </div>
  );
}

export { Logo };
