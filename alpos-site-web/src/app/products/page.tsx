import { Container } from "@WASPtheGeek/base-components";
import React from "react";
import { PageTitle } from "@/components/page";
import CategoryList from "./CategoryList";

export default function Products() {
  return (
    <Container>
      <PageTitle k="products_page" />
      <CategoryList />
    </Container>
  );
}
