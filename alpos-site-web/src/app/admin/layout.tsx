import React from "react";
import { VerticalAdminNav } from "../../components/verticalNav";
import { ContainerL } from "@WASPtheGeek/base-components";

interface IProps {
  children: React.ReactNode;
}

export default function AdminLayout(props: IProps) {
  const { children } = props;

  return (
    <div className="text-xl flex h-full">
      <VerticalAdminNav />
      <ContainerL className="w-4/5">{children}</ContainerL>
    </div>
  );
}
