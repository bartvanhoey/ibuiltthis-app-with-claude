import React from "react";
import SectionHeader from "../common/section-header";
import { CalendarIcon, RocketIcon } from "lucide-react";
import ProductCard, { Product } from "../products/product-card";
import EmptyState from "../common/empty-state";

const recentlyLaunchedProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: "ParityKit",
  //     description: "A toolkit for creating parity products",
  //     tags: ["SaaS", "Pricing", "Global"],
  //     votes: 615,
  //     isFeatured: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Modern Full Stack Next.js Course",
  //     description: "Learn to build modern full stack applications with Next.js",
  //     tags: ["Next.js", "Full-Stack", "Course"],
  //     votes: 124,
  //     isFeatured: false,
  //   },
];

export default function RecentlyLaunchedProducts() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest products from our community"
        />

        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid-wrapper">
            {recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState message="No products launched in the last week. Check back soon for new launches." icon={CalendarIcon} />
        )}
      </div>
    </section>
  );
}
