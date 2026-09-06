import { redirect } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import UploadForm from "@/components/UploadForm";
import { isAuthenticated } from "@/lib/auth";
import { listItems } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  const recent = listItems().slice(0, 8);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-studio-accent">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Upload & manage</h1>
        <p className="text-sm text-studio-muted">
          Add files or projects. Each item gets a share URL like <span className="font-mono">/i/slug</span>.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UploadForm />
        <ProjectForm />
      </div>

      <section className="studio-card p-5">
        <h2 className="mb-4 text-lg font-semibold">Recent items</h2>
        <ul className="divide-y divide-studio-border">
          {recent.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <div className="min-w-0">
                <Link href={`/i/${item.slug}`} className="font-medium text-studio-text hover:text-studio-accent">
                  {item.title}
                </Link>
                <div className="truncate text-xs text-studio-muted">
                  {item.type} · /i/{item.slug}
                </div>
              </div>
              <Link href={`/i/${item.slug}`} className="studio-btn-ghost !py-1.5 text-xs">
                Open
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
