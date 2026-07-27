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
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array");

      setLoading(true);
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: parsed, deleteExisting }),
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
          Click below to automatically import all 9 products you selected from
          Digistore24 with your <code>ganeshyam_verma</code> affiliate ID. Takes
          3 seconds.
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
          Advanced: Bulk Paste JSON
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Have more products? Paste a JSON array with same fields as above
          (title, slug, description, image, price, category, niche,
          affiliateUrl, commission, rating, featured, tags).
        </p>
        <Textarea
          value={customJson}
          onChange={(e) => setCustomJson(e.target.value)}
          placeholder={`[
  {
    "title": "My Product",
    "slug": "my-product",
    "description": "...",
    "image": "https://...",
    "price": 47,
    "category": "Business & Marketing",
    "niche": "AI Tools",
    "affiliateUrl": "https://...#aff=ganeshyam_verma",
    "commission": 50,
    "rating": 4.8,
    "featured": true,
    "tags": ["ai"]
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
        1. Products defined in <code>lib/bulkProducts.ts</code>
        <br />
        2. API <code>/api/products/bulk</code> loops and creates via Prisma
        <br />
        3. If slug already exists, it skips (no duplicate)
        <br />
        4. Next time you get new Digistore24 links, just add to{" "}
        <code>lib/bulkProducts.ts</code> and click Import again
        <br />
        5. Or use custom JSON paste for one-off bulk
      </Card>
    </div>
  );
}
