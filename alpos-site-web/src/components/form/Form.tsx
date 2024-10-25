import { cn } from "@WASPtheGeek/base-components";
import React from "react";

export interface IFormProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Form(props: IFormProps) {
  const { children, className } = props;

  const clsn = cn("base-form", "flex flex-col gap-2", className);

  return <div className={clsn}>{children}</div>;
}
