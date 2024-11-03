"use client";

import React from "react";
import { useLocalization } from "../../contexts/localization";
import { getT } from "../../utils";
import { BackBtn } from "@/components/buttons";

interface IProps {
  className?: string;
  k: string;
  actions?: React.ReactNode;
  backLink?: string;
  backLocalization?: string;
}

export default function PageTitle(props: IProps) {
  const { k, actions, backLink, backLocalization } = props;
  const { t } = useLocalization();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const title = React.useMemo(() => getT(k, t), [k, t]);

  if (!mounted) return null;

  return (
    <div className="pb-6">
      {backLink && (
        <BackBtn
          link={backLink}
          className="mb-4 text-amber-500"
          localizationKey={backLocalization ?? "back_to_list"}
        />
      )}
      <div className="flex">
        <h1>{title}</h1>
        {actions && <div className="ml-auto">{actions}</div>}
      </div>
    </div>
  );
}
