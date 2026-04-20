import { ProjectStatus } from "@prisma/client";

type ProjectFormDefaults = {
  title?: string;
  description?: string;
  techStack?: string;
  externalUrl?: string;
  coverImage?: string;
  status?: ProjectStatus;
};

type ProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaults?: ProjectFormDefaults;
};

export function ProjectForm({ action, submitLabel, defaults }: ProjectFormProps) {
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
        Cover Image URL (optional)
        <input
          name="coverImage"
          type="url"
          defaultValue={defaults?.coverImage}
          className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
        />
      </label>

      <button
        type="submit"
        className="rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-300/20"
      >
        {submitLabel}
      </button>
    </form>
  );
}
