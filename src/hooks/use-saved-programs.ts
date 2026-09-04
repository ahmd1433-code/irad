"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { SavedProgram, SavedStatus } from "@/lib/types";

const STORAGE_KEY = "irad-plan";
const EMPTY: SavedProgram[] = [];
const listeners = new Set<() => void>();

let snapshot: SavedProgram[] = EMPTY;
let snapshotRaw: string | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parse(raw: string | null): SavedProgram[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as SavedProgram[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === snapshotRaw) return snapshot;
  snapshotRaw = raw;
  snapshot = parse(raw);
  return snapshot;
}

function persist(next: SavedProgram[]) {
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshot = next;
  emit();
}

export function useSavedPrograms() {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const save = useCallback((slug: string, status: SavedStatus = "considering") => {
    const current = getSnapshot();
    const existing = current.find((item) => item.slug === slug);
    persist(
      existing
        ? current.map((item) =>
            item.slug === slug ? { ...item, status } : item
          )
        : [...current, { slug, status, note: "" }]
    );
  }, []);

  const update = useCallback((slug: string, patch: Partial<SavedProgram>) => {
    persist(
      getSnapshot().map((item) =>
        item.slug === slug ? { ...item, ...patch } : item
      )
    );
  }, []);

  const remove = useCallback((slug: string) => {
    persist(getSnapshot().filter((item) => item.slug !== slug));
  }, []);

  const isSaved = useCallback(
    (slug: string) => items.some((item) => item.slug === slug),
    [items]
  );

  return { items, ready: true, save, update, remove, isSaved };
}
