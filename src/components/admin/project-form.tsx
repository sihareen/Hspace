import { ProjectStatus } from "@prisma/client";

type ProjectFormDefaults = {
  title?: string;
  description?: string;
  projectLabels?: string[];
  techStack?: string;
  externalUrl?: string;
  coverImageFileName?: string;
  galleryImageFileNames?: string[];
  existingCoverImagesRaw?: string;
  status?: ProjectStatus;
};

type ProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  coverFiles: string[];
  defaults?: ProjectFormDefaults;
};

const PROJECT_LABELS = ["IoT", "Embedded", "AI", "Data"] as const;

export function ProjectForm({ action, submitLabel, coverFiles, defaults }: ProjectFormProps) {
  return (
    <form action={action} className="space-y-5 rounded-2xl border border-cyan-300/15 bg-slate-900/70 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          Title
          <input
            name="title"
            required
            defaultValue={defaults?.title}
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          External URL
          <input
            name="externalUrl"
            type="url"
            required
            defaultValue={defaults?.externalUrl}
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-200">
        Description
        <textarea
          name="description"
          rows={5}
          required
          defaultValue={defaults?.description}
          className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-200">
          Labels
          <select
            name="projectLabels"
            multiple
            defaultValue={defaults?.projectLabels ?? []}
            className="h-28 w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          >
            {PROJECT_LABELS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400">Pilih lebih dari satu label dengan Ctrl/Cmd + klik.</p>
        </label>

        <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
          Tech Stack (comma separated)
          <input
            name="techStack"
            required
            defaultValue={defaults?.techStack}
            placeholder="LoRa, MQTT, Node.js"
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          Status
          <select
            name="status"
            defaultValue={defaults?.status ?? ProjectStatus.DRAFT}
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          >
            <option value={ProjectStatus.DRAFT}>Draft</option>
            <option value={ProjectStatus.PUBLISHED}>Published</option>
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-200">
        Cover Image (thumbnail)
        <select
          name="coverImageFileName"
          defaultValue={defaults?.coverImageFileName ?? ""}
          disabled={coverFiles.length === 0}
          className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
        >
          <option value="">Auto from gallery</option>
          {coverFiles.map((fileName) => (
            <option key={`cover-${fileName}`} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-slate-200">
        Gallery Images (popup slider)
        <select
          name="galleryImageFileNames"
          multiple
          defaultValue={defaults?.galleryImageFileNames ?? []}
          disabled={coverFiles.length === 0}
          className="h-44 w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
        >
          {coverFiles.map((fileName) => (
            <option key={fileName} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>
        <p className="text-xs text-slate-400">
          Gunakan Ctrl/Cmd + klik untuk pilih banyak gambar. Cover akan dipakai dari field Cover Image atau gambar
          pertama gallery.
        </p>
        {coverFiles.length === 0 ? (
          <p className="text-xs text-amber-200">
            Belum ada file gambar. Tambahkan file ke `public/project-covers` lalu refresh halaman.
          </p>
        ) : null}
      </label>

      <input type="hidden" name="existingCoverImagesRaw" value={defaults?.existingCoverImagesRaw ?? ""} />

      <button
        type="submit"
        className="rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-300/20"
      >
        {submitLabel}
      </button>
    </form>
  );
}
