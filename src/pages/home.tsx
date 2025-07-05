"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import ProductModal from "@/components/ui/ProductModal";
import type { Product } from "@/lib/types";
import { getCategories, getProduct } from "@/services/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, categoryData] = await Promise.all([
                    getProduct(),
                    getCategories(),
                ]);
                setProducts(productData);
                setCategories(categoryData);
            } catch (err) {
                console.error("Gagal memuat data:", err);
            }
        };

        fetchData();
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const visibleProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    const recommendedProducts = products
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6 space-y-10">
                {/* Hero */}
                <div className="text-center py-10 bg-indigo-100 text-indigo-800 rounded-xl shadow-sm">
                    <h1 className="text-4xl font-extrabold tracking-tight">🌟 Trenly</h1>
                    <p className="text-lg mt-2 font-medium">
                        Temukan gaya & produk kekinian hanya di{" "}
                        <span className="text-violet-600 font-semibold">Trenly</span>
                    </p>
                </div>

                {/* 🔥 Rekomendasi Produk */}
                {products.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-center text-indigo-700">
                            🔥 Rekomendasi Trenly
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {recommendedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => setSelectedProduct(product)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Search */}
                <div className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Cari produk trendi..."
                        className="border border-indigo-300 px-4 py-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filter Kategori */}
                <div className="flex gap-2 justify-center flex-wrap">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-4 py-1 rounded-full text-sm border transition-all duration-200 ${selectedCategory === "all"
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-indigo-600 border-indigo-300"
                            }`}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1 rounded-full text-sm border capitalize transition-all duration-200 ${selectedCategory === cat
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-indigo-600 border-indigo-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Produk */}
                {products.length === 0 ? (
                    <p className="text-center text-gray-500">Memuat produk...</p>
                ) : visibleProducts.length === 0 ? (
                    <p className="text-center text-gray-500">Tidak ada produk ditemukan.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {visibleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}

                {/* 📬 Kontak Kami */}
                <section
                    id="contact"
                    className="text-indigo-900 py-12 px-4 rounded-xl shadow-sm max-w-7xl mx-auto text-center space-y-6"
                >
                    <h2 className="text-3xl font-bold tracking-tight">📬 Hubungi Kami</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Kami terbuka untuk pertanyaan, kritik, dan saran. Jangan ragu untuk menghubungi kami!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm sm:text-base">
                        <div>
                            <p className="font-semibold">Email</p>
                            <a
                                href="mailto:trenly@fakeemail.com"
                                className="text-indigo-600 hover:underline"
                            >
                                trenly@fakeemail.com
                            </a>
                        </div>
                        <div>
                            <p className="font-semibold">Instagram</p>
                            <a
                                href="https://instagram.com/trenly"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:underline"
                            >
                                @trenly
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />

                {/* Modal Detail Produk */}
                <ProductModal
                    product={selectedProduct}
                    onOpenChange={(open) => {
                        if (!open) setSelectedProduct(null);
                    }}
                />
            </div>
        </>
    );
}
