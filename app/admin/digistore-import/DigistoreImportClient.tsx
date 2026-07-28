"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Client() {
  const [productId, setProductId] = useState("");
  const [affiliateId, setAffiliateId] = useState("ganeshyam_verma");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    if (!productId) return toast.error("Enter Product ID");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/digistore/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId.trim(), affiliateId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
      toast.success(`Imported: ${data.product.title}`);
    } catch (e: any) {
      toast.error(e.message);
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Digistore24 Product ID *
            </label>
            <Input
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="e.g. 540531 for TubeMagic"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Find ID in your Digistore24 link: /product/540531 or /redir/684079
              → ID is number
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Your Affiliate ID</label>
            <Input
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              placeholder="ganeshyam_verma"
              className="mt-1"
            />
          </div>
          <Button
            onClick={handleImport}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black h-11"
          >
            {loading
              ? "Fetching from Digistore24..."
              : "Auto-Import with My Aff Link"}
          </Button>
        </div>
        {result?.product && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
            <strong>✓ Created:</strong> {result.product.title}
            <br />
            Slug: {result.product.slug}
            <br />
            Price: ${result.product.price}
            <br />
            Affiliate URL:{" "}
            <a
              href={result.product.affiliateUrl}
              target="_blank"
              className="text-blue-600 underline break-all"
            >
              {result.product.affiliateUrl}
            </a>
            <br />
            <a
              href={`/product/${result.product.slug}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              View product →
            </a>
          </div>
        )}
        {result?.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {result.error}
          </div>
        )}
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200 text-sm text-blue-800">
        <strong>Your 9 product IDs:</strong>
        <br />
        TubeMagic: 540531
        <br />
        Millionaire: 426914 (check)
        <br />
        ChatGPT PLR: 575043
        <br />
        1000 Prompts: 574095
        <br />
        Keto: 684079
        <br />
        Perpetual: 497520
        <br />
        Detox: 602583
        <br />
        CircO2: 425590 (example)
        <br />
        Scrum: 292043
      </Card>
    </div>
  );
}
