import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BulkImportClient from "./BulkImportClient";
export const dynamic = "force-dynamic";
export default async function BulkImportPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Bulk Import - Automate</h1>
        <p className="text-gray-600 mb-8">
          Import all 9 products in one click.
        </p>
        <BulkImportClient />
      </div>
    </div>
  );
}
