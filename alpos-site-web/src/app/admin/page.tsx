"use client";

import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import { Container } from "@WASPtheGeek/base-components";
import React from "react";

export default function Dashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Restricted
      showMessage
      access={Access.all}
      scope={AppScope.adminC as string}
    >
      <Container>Main admin page</Container>
    </Restricted>
  );
}
