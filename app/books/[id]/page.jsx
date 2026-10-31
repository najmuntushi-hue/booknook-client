import BookDetailsContent from "@/components/BookDetailsContent";

export const metadata = { title: "BookNook | Book Details" };

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  return <BookDetailsContent id={id} />;
}