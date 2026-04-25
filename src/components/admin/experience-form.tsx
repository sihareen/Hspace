import { ExperienceCategory } from "@prisma/client";

type ExperienceFormDefaults = {
  period?: string;
  title?: string;
  description?: string;
  tags?: string;
  category?: ExperienceCategory;
  displayOrder?: number;
};

type ExperienceFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaults?: ExperienceFormDefaults;
};

export function ExperienceForm({ action, submitLabel, defaults }: ExperienceFormProps) {
  return (
    <form action={action} className="space-y-5 rounded-2xl border border-cyan-300/15 bg-slate-900/70 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          Period
          <input
            name="period"
            required
            defaultValue={defaults?.period}
            placeholder="2024 - Present"
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          Type
          <select
            name="category"
            defaultValue={defaults?.category ?? ExperienceCategory.EXPERIENCE}
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          >
            <option value={ExperienceCategory.EXPERIENCE}>Experience</option>
            <option value={ExperienceCategory.EDUCATION}>Education</option>
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-200">
        Title
        <input
          name="title"
          required
          defaultValue={defaults?.title}
          placeholder="IoT & AI Engineer"
          className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
        />
      </label>

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

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          Tags (comma separated)
          <input
            name="tags"
            required
            defaultValue={defaults?.tags}
            placeholder="IoT, Embedded, AI"
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          Display Order
          <input
            name="displayOrder"
            type="number"
            min={0}
            defaultValue={defaults?.displayOrder ?? 0}
            className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-300/20"
      >
        {submitLabel}
      </button>
    </form>
  );
}
