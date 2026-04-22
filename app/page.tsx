import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ProductsPage from "@/screens/ProductsPage";

//for SEO optimization.
export const metadata = {
  title: "Products | ShopEasy",
  description: "Browse all products available in our store",
};


async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function Page() {
  const queryClient = new QueryClient();


//prefetch data and store in cache.
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });



//stored data in cache -> jsonify -> return to browser.
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage />
    </HydrationBoundary>
  );
}