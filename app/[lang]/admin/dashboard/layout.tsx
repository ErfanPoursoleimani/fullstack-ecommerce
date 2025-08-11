import { ReactNode } from "react";
import OrdersDefault from "./_components/OrdersDefault";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

interface Props {
  children: ReactNode,
  contentSeg: ReactNode,
  navSeg: ReactNode,
}

export default function RootLayout({ children, contentSeg, navSeg }: Props) {

  return (
    <div className={`md:p-10 h-max relative md:top-[105px] flex flex-col items-center justify-center z-102`}>
      <ClientLayoutWrapper contentSeg={contentSeg} navSeg={navSeg}>
        {children}
      </ClientLayoutWrapper>
    </div>
  );
}
