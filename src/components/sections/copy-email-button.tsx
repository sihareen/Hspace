"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

type CopyEmailButtonProps = {
  email: string;
  className?: string;
};

/** Icon button that copies the email address; announces the result via a polite live region. */
export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = false;
    }
    setStatus(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  const copied = status === "copied";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        title="Copy email address"
        className={className}
      >
        {copied ? <FiCheck aria-hidden="true" className="size-4" /> : <FiCopy aria-hidden="true" className="size-4" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied" : status === "failed" ? "Copy failed. Select the address to copy it." : ""}
      </span>
    </>
  );
}
