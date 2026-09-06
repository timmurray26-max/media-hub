export type MediaType =
  | "image"
  | "video"
  | "gif"
  | "pdf"
  | "doc"
  | "spreadsheet"
  | "project"
  | "other";

export interface MediaItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: MediaType;
  tags: string[]; // parsed from comma-separated DB field
  filename: string | null;
  originalName: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  projectUrl: string | null;
  coverFilename: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItemRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: MediaType;
  tags: string;
  filename: string | null;
  original_name: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  project_url: string | null;
  cover_filename: string | null;
  created_at: string;
  updated_at: string;
}

export const MEDIA_TYPES: { value: MediaType; label: string }[] = [
  { value: "image", label: "Images" },
  { value: "video", label: "Videos" },
  { value: "gif", label: "GIFs" },
  { value: "pdf", label: "PDFs" },
  { value: "doc", label: "Docs" },
  { value: "spreadsheet", label: "Spreadsheets" },
  { value: "project", label: "Projects" },
  { value: "other", label: "Other" },
];
