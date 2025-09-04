"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  contact: z.string().regex(/^\d+$/, "Numbers only"),
  email_id: z.string().email("Invalid email"),
  image: z.any().optional(),
});

export default function AddSchool() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (k === "image" && v && v.length) formData.append("image", v[0]);
        else formData.append(k, v);
      });
      const res = await fetch("/api/schools", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to save");
      alert("Saved!");
      reset();
    } catch (e) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add School</h1>
        <Link href="/showSchools" className="text-blue-600 underline">View Schools</Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <input className="input" placeholder="Name" {...register("name")} />
          {errors.name && <p className="err">{errors.name.message}</p>}
        </div>
        <div>
          <input className="input" placeholder="Address" {...register("address")} />
          {errors.address && <p className="err">{errors.address.message}</p>}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <input className="input" placeholder="City" {...register("city")} />
            {errors.city && <p className="err">{errors.city.message}</p>}
          </div>
          <div>
            <input className="input" placeholder="State" {...register("state")} />
            {errors.state && <p className="err">{errors.state.message}</p>}
          </div>
          <div>
            <input className="input" placeholder="Contact" {...register("contact")} />
            {errors.contact && <p className="err">{errors.contact.message}</p>}
          </div>
        </div>
        <div>
          <input className="input" placeholder="Email" {...register("email_id")} />
          {errors.email_id && <p className="err">{errors.email_id.message}</p>}
        </div>
        <div>
          <input type="file" accept="image/*" {...register("image")} />
        </div>
        <button disabled={submitting} className="rounded-xl px-4 py-2 border w-fit">
          {submitting ? "Saving..." : "Save"}
        </button>
      </form>

      <style jsx global>{`
        .input { border: 1px solid #ddd; padding: 10px; border-radius: 12px; width: 100%; }
        .err { color: #dc2626; font-size: 0.85rem; margin-top: 4px; }
      `}</style>
    </main>
  );
}
