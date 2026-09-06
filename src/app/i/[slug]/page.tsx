import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLinkButton from "@/components/CopyLinkButton";
import DeleteButton from "@/components/DeleteButton";
import ItemPreview from "@/components/ItemPreview";
import TagBadge from "@/components/TagBadge";
import { isAuthenticated } from "@/lib/auth";
import { getItemBySlug } from "@/lib/db";
import { fileUrl, formatBytes, formatDate, sharePath } from "@/lib/format";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.title,
    description: item.description || undefined,
  };
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();
  const authed = await isAuthenticated();
  const path = sharePath(item.slug);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-studio-muted">
        <Link href="/" className="hover:text-studio-accent">
          ← Library
        </Link>
        <span>·</span>
        <span className="uppercase tracking-wider">{item.type}</span>
        <span>·</span>
        <span>{formatDate(item.createdAt)}</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{item.title}</h1>
        {item.description ? (
          <p className="max-w-3xl text-studio-muted">{item.description}</p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <TagBadge key={t} tag={t} href={`/?tag=${encodeURIComponent(t)}`} />
          ))}
        </div>
      </div>

      <ItemPreview item={item} />

      <div className="studio-card flex flex-col gap-4 p-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-studio-muted">
          {item.originalName ? (
            <div>
              File: <span className="font-mono text-studio-text">{item.originalName}</span>
              {item.sizeBytes != null ? ` · ${formatBytes(item.sizeBytes)}` : ""}
            </div>
          ) : null}
          <div className="font-mono text-xs">Share path: {path}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyLinkButton path={path} />
          {item.filename ? (
            <a href={fileUrl(item.filename, true)} className="studio-btn-primary">
              Download
            </a>
          ) : null}
          {item.type === "project" && item.projectUrl ? (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-btn-primary"
            >
              Open project
            </a>
          ) : null}
          {authed ? <DeleteButton id={item.id} title={item.title} /> : null}
        </div>
      </div>
    </div>
  );
}
