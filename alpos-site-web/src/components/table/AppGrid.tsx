import {
  Grid,
  GridLocalization,
  IGridProps,
} from "@WASPtheGeek/base-components";
import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import React from "react";

export default function AppGrid(props: IGridProps) {
  const { t } = useLocalization();

  const localization: GridLocalization = {
    bool_false: getT("table_false", t),
    bool_true: getT("table_true", t),
  };

  return (
    <Grid
      {...props}
      actionsHeader={getT("table_actions", t)}
      localization={localization}
    />
  );
}
