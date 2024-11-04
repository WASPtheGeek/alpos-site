import { cn, ContainerL, Icon } from "@WASPtheGeek/base-components";
import React from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  hideIcon?: boolean;
  noFullHeight?: boolean;
}

export default function PageError(props: IProps) {
  const { className, children, hideIcon, title, noFullHeight } = props;
  const clsn = cn(className, "flex gap-2 items-center justify-center", {
    "h-full": !noFullHeight,
    "pt-25": noFullHeight,
  });

  return (
    <ContainerL className={clsn}>
      {!hideIcon && (
        <Icon className="fas fa-exclamation-triangle text-amber-500" />
      )}
      <h3 className="font-bold">{title}</h3>
      <p>{children}</p>
    </ContainerL>
  );
}
