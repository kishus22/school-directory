import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">School Directory</h1>
        <p className="text-gray-600">
          A minimal Next.js (App Router) project using MySQL and Tailwind CSS.
        </p>
       <div className="flex gap-4 justify-center">
  <Link href="/addSchool" className="px-4 py-2 rounded-xl border bg-blue-600 text-white hover:bg-blue-700">
    Add School
  </Link>
  <Link href="/showSchools" className="px-4 py-2 rounded-xl border bg-green-600 text-white hover:bg-green-700">
    Show Schools
  </Link>
</div>

      </div>
    </main>
  );
}
