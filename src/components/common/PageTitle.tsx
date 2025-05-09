import { domine } from "@/utils/fonts";

type Props = {
  children: string;
};

export function PageTitle({ children }: Props) {
  return (
    <h1 className={`text-[28px] font-medium ${domine.className}`}>
      {children}
    </h1>
  );
}
