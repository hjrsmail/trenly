import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Product } from "@/lib/types";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer hover:shadow-md transition rounded-lg border"
        >
            <Card className="h-full flex flex-col justify-between">
                <CardHeader className="flex items-center justify-center p-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-36 object-contain"
                    />
                </CardHeader>

                <CardContent className="flex flex-col gap-2 px-4 pb-4">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                        {product.title}
                    </CardTitle>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {product.description}
                    </p>

                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-base font-semibold">${product.price}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // agar tidak membuka modal saat tombol diklik
                            }}
                            className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-opacity-80"
                        >
                            Add to Cart
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
