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

  const title = React.useMemo(() => getT(k, t), [k, t]);

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
