"use client";
import useProducts from "@/features/products/hooks/useProducts";
import ProductCard from "@/features/products/components/ProductCard";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ProductsPage() {
  const { products, loading, error } = useProducts();

  useEffect(() => {
    if(error){
      toast.error(error.message);
    }
  },[error])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  return (
    <div>
      

      <h1 style={{ textAlign: "center" }}>Product Listing</h1>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Products */}
        <div style={{ flex: 3 }}>
          <main>
          <div className="grid">
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
          </main>
        </div>
      </div>
    </div>   
  );
}

export default ProductsPage;



