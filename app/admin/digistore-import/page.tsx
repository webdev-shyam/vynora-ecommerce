import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DigistoreImportClient from "./DigistoreImportClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          Digistore24 Auto-Import (Your API Key)
        </h1>
        <p className="text-gray-600 mb-6">
          Paste Product ID only, it auto-fetches title/price/image and creates
          your <code>ganeshyam_verma</code> affiliate link.
        </p>
        <DigistoreImportClient />
      </div>
    </div>
  );
}
