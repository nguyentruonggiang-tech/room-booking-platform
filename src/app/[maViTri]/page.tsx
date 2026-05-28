type LocationPageProps = {
  params: Promise<{ maViTri: string }>;
};

export default async function LocationPage({ params }: LocationPageProps) {
  const { maViTri } = await params;

  return <main>Trang vi tri - {maViTri}</main>;
}
