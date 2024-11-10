import { Nav } from "@WASPtheGeek/base-components";
import React from "react";
import { NavLinks } from ".";

export default async function AppNav() {
  return (
    <Nav className="app-nav">
      <NavLinks />
    </Nav>
  );
}
