"use client";

import React from "react";
import { useLocalization } from "../../contexts/localization";
import { getT } from "../../utils";

interface IProps {
  className?: string;
  k: string;
  actions?: React.ReactNode;
}

export default function PageTitle(props: IProps) {
  const { k, actions } = props;
  const { t } = useLocalization();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const title = React.useMemo(() => getT(k, t), [k, t]);

  if (!mounted) return null;

  return (
    <div className="pb-6 flex">
      <h1>{title}</h1>
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}
