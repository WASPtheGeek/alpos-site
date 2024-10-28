"use client";

import { api } from "@/api/axios";
import React from "react";
import { CategoryViewModel } from "@/api/generated/models";
import Image from "next/image";

export default function CategoryList() {
  const [data, setData] = React.useState<CategoryViewModel[] | null>(null);

  // const fileSchema = z.instanceof(File, { message: "Required" });
  // const imageSchema = z.fileShema.refine(file => file.size === 0 ||
  // file.type.startsWith("image/"))
  // file = fileSchema.refine(file => file.size > 0, "Required")
  // image = imageSchema.refine(file => file.size > 0, "Required")

  // sending data:
  // import fs from "fs/promises";

  // await fs.mkdir("products", { recursive: true})
  // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer))

  // await fs.mkdir("public/products", { recursive: true})
  // const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`
  // await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer
  /**
   * {
   *    filePath:filePath
   *    imagePath: imagePath
   * }
   * 
   * 
   * add img
      <br />
      <input
        placeholder="select image"
        type="file"
        id="image"
        name="image"
        required
      />
      <br />
   *
   */

  React.useEffect(() => {
    if (data) return;

    api
      .get("/categories")
      .then((res) => res.data)
      .then(setData);
  }, [data]);

  return (
    <div>
      {data?.map((c) => (
        <div key={c.id}>
          <h4>{c.name}</h4>
          <p>{c.description}</p>
          {c?.imagePath && (
            <Image
              src={c.imagePath}
              height="400"
              width="400"
              alt="Category Image"
            />
          )}
        </div>
      ))}
    </div>
  );
}
