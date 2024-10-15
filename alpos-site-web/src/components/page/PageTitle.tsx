"use client";

import React from "react";
import { useLocalization } from "../../contexts/localization";
import { getT } from "../../utils";

interface IProps {
  className?: string;
  k: string;
}

export default function PageTitle(props: IProps) {
  const { k } = props;
  const { t } = useLocalization();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const title = React.useMemo(() => getT(k, t), [k, t]);

  if (!mounted) return null;

  return (
    <div className="pb-6">
      <h1>{title}</h1>
    </div>
  );
}
