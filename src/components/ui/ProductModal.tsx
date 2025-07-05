import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/lib/types";

interface ProductModalProps {
    product: Product | null;
    onOpenChange: (open: boolean) => void;
}

export default function ProductModal({ product, onOpenChange }: ProductModalProps) {
    return (
        <Dialog open={!!product} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg w-full">
                {product && (
                    <>
                        <DialogHeader>
                            <DialogTitle>{product.title}</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-64 object-contain rounded hover:scale-105 transition-transform duration-300" 
                            />

                            <p className="text-sm text-muted-foreground">{product.description}</p>
                            <div className="flex gap-3 place-items-baseline">
                                <p className="text-xl font-bold text-indigo-600">${product.price}</p>
                                <p className="text-md font-semibold text-black">
                                    ⭐ {product.rating.rate}{" "}
                                    <span className="text-sm text-muted-foreground">({product.rating.count})</span>
                                </p>

                            </div>

                            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                                🛒 Tambah ke Keranjang
                            </button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
