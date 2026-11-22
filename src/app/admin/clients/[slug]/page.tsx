import { AdminClientDetail } from "@/components/PortalViews";

export default async function ClientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AdminClientDetail slug={slug} />;
}
