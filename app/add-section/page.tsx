import AddSection from "@/components/UI/AddSection/AddSection";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 items-center m-auto p-4">
      <h1 className="text-black text-xl">Create section for your book</h1>
      <AddSection />
    </div>
  );
}
