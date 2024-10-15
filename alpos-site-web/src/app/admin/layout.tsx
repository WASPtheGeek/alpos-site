import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function AdminLayout(props: IProps) {
  const { children } = props;

  return <div className="text-xl">{children}</div>;
}
