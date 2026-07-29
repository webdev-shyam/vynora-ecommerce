"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { bulkProducts } from "@/lib/bulkProducts";
import { Upload, Trash2, Check, ExternalLink } from "lucide-react";

export default function BulkImportClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [customJson, setCustomJson] = useState("");
  const [deleteExisting, setDeleteExisting] = useState(false);

  const handleImportDefault = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteExisting }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
      toast.success(data.message);
    } catch (e: any) {
      toast.error(e.message);
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleImportCustom = async () => {
    if (!customJson.trim()) {
      toast.error("Paste JSON array of products first");
      return;
    }
    try {
      const parsed = JSON.parse(customJson);
      // Support array, {products: [...]}, or single object
      const itemsToSubmit = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.products)
        ? parsed.products
        : [parsed];

      setLoading(true);
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: itemsToSubmit, deleteExisting }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
      toast.success(data.message);
    } catch (e: any) {
      toast.error(`Invalid JSON or import failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-white border-green-200">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          One-Click Import (Your 9 Products)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Click below to automatically import the products defined in the bulk
          JSON list, using each product's own affiliate or product URL. Takes 3
          seconds.
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-4">
          {bulkProducts.map((p) => (
            <div
              key={p.slug}
              className="flex gap-2 items-start bg-gray-50 p-2 rounded-lg border text-xs"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-gray-500">
                  ${p.price} • {p.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="delete"
            checked={deleteExisting}
            onChange={(e) => setDeleteExisting(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="delete" className="text-sm text-red-600">
            Delete all existing products first (clean start)
          </label>
        </div>

        <Button
          onClick={handleImportDefault}
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black gap-2 h-11"
        >
          <Upload className="h-4 w-4" />
          {loading
            ? "Importing..."
            : `Import ${bulkProducts.length} Products Now`}
        </Button>

        {result && !result.error && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
            <strong>✓ Success:</strong> {result.message}
            <br />
            Created: {result.created}, Skipped: {result.skipped} (already exist)
            <br />
            <a
              href="/shop"
              className="text-blue-600 underline inline-flex items-center gap-1 mt-2"
            >
              View Shop <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {result?.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            Error: {result.error}
          </div>
        )}
      </Card>

      <Card className="p-6 bg-white">
        <h2 className="text-lg font-semibold mb-3">
          Advanced: Bulk Paste JSON (Standard or Extractor Format)
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Paste standard JSON or AI Extractor output JSON format (supporting markdown URLs like <code>[url](url)</code>, aliases like <code>productID</code>, <code>productDescription</code>, <code>productImage</code>, <code>affiliateURL</code>, string ratings like <code>"4.6"</code>, brand/category, etc.).
        </p>
        <Textarea
          value={customJson}
          onChange={(e) => setCustomJson(e.target.value)}
          placeholder={`[
  {
    "productID": "Joseph's Well",
    "productDescription": "[https://josephswell.com](https://josephswell.com)",
    "productImage": "[https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg](https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg)",
    "affiliateURL": "[https://josephswell.com/ref/123](https://josephswell.com/ref/123)",
    "price": "$47.00",
    "rating": "4.8",
    "brand": "Health & Fitness",
    "niche": "Supplements"
  }
]`}
          rows={10}
          className="font-mono text-xs"
        />
        <Button
          onClick={handleImportCustom}
          disabled={loading}
          variant="outline"
          className="w-full mt-3 gap-2"
        >
          <Upload className="h-4 w-4" />
          Import Custom JSON
        </Button>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200 text-sm text-blue-800">
        <strong>How automation works:</strong>
        <br />
        1. Products defined in <code>lib/bulkProducts.ts</code> or via custom JSON paste
        <br />
        2. Extractor JSON format with markdown links <code>[url](url)</code> is automatically normalized
        <br />
        3. API <code>/api/products/bulk</code> loops and creates via Prisma
        <br />
        4. If slug already exists, it skips (no duplicate)
        <br />
        5. Use custom JSON paste for AI extractor outputs (e.g. Joseph's Well format)
      </Card>
    </div>
  );
}
