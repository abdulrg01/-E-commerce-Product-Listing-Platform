import ProductList from "@/components/ProductList";
import { Product } from "@/types/page";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsFromStorage, saveProductsToStorage } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Head from "next/head";

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setProducts(getProductsFromStorage());
  }, []);

  const filteredProducts = products.filter((product) => {
    const priceCondition = maxPrice ? product.price <= maxPrice : true;
    const categoryCondition = category ? product.category === category : true;

    return priceCondition && categoryCondition;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name,
      description,
      price,
      category,
      imageUrl,
    };
    const products = getProductsFromStorage();
    products.push(newProduct);
    saveProductsToStorage(products);
    router.reload();
  };

  const handleCategoryChangeEvent = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(e.target.value);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory === "Collection" ? "" : newCategory);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : "");
  };

  return (
    <>
      <Head>
        <title>Product Listing | My E-commerce Platform</title>
        <meta
          name="description"
          content="Browse our collection of amazing products!"
        />
        <meta property="og:title" content="Product Listing" />
        <meta
          property="og:description"
          content="Browse our collection of amazing products!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout onSelectCategory={handleCategoryChange}>
        <div className="container mx-auto p-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Product Listing</h1>
            <Dialog>
              <DialogTrigger>
                <Button type="button" className="flex items-center gap-2">
                  <PlusIcon className="w-4 h-4" /> Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddProduct();
                  }}
                >
                  {/* Name Field */}
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Description Field */}
                  <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      type="text"
                      id="description"
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Price Field */}
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      type="number"
                      id="price"
                      placeholder="Product Price"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                  </div>

                  {/* Category Field */}
                  <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      type="text"
                      id="category"
                      placeholder="Product Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  {/* Image Upload Field */}
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>

                  <Button type="submit">Add Product</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-start md:flex-row flex-col md:gap-10">
            <div className="mb-6">
              <label className="mr-4">Filter by Category:</label>
              <select
                onChange={handleCategoryChangeEvent}
                value={category}
                className="border p-2 rounded"
              >
                <option value="">All</option>
                <option value="earphones">earphones</option>
                <option value="headphones">headphones</option>
                <option value="speaker">speaker</option>
                <option value="watch">watch</option>
                <option value="laptop">laptop</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mr-4">Filter by Maximum Price:</label>
              <input
                type="number"
                placeholder="Max Price"
                onChange={handleMaxPriceChange}
                value={maxPrice}
                className="border p-2 rounded"
              />
            </div>
          </div>

          <ProductList products={filteredProducts} />
        </div>
      </Layout>
    </>
  );
};

export default ProductsPage;
