import React from "react";

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const id = await params.then(p => p.id);
  const { id } = await params;

  return <div>Product: {id}</div>;
}
