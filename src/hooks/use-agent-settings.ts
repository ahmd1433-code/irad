"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  defaultPermissions,
  defaultProfile,
  type AgentPermissions,
  type AgentProfile,
  type AgentRun,
} from "@/lib/agent/types";

const PERMS_KEY = "irad-agent-permissions";
const PROFILE_KEY = "irad-agent-profile";
const LOG_KEY = "irad-agent-log";

const listeners = new Set<() => void>();

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

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

let permsSnap = defaultPermissions;
let permsRaw: string | null = null;
let profileSnap = defaultProfile;
let profileRaw: string | null = null;
let logSnap: AgentRun[] = [];
let logRaw: string | null = null;

function getPerms(): AgentPermissions {
  const raw = window.localStorage.getItem(PERMS_KEY);
  if (raw === permsRaw && permsRaw !== null) return permsSnap;
  permsRaw = raw;
  permsSnap = { ...defaultPermissions, ...readJson(PERMS_KEY, defaultPermissions) };
  return permsSnap;
}

function getProfile(): AgentProfile {
  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (raw === profileRaw && profileRaw !== null) return profileSnap;
  profileRaw = raw;
  profileSnap = { ...defaultProfile, ...readJson(PROFILE_KEY, defaultProfile) };
  return profileSnap;
}

function getLog(): AgentRun[] {
  const raw = window.localStorage.getItem(LOG_KEY);
  if (raw === logRaw && logRaw !== null) return logSnap;
  logRaw = raw;
  const parsed = readJson<AgentRun[]>(LOG_KEY, []);
  logSnap = Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  return logSnap;
}

export function useAgentSettings() {
  const permissions = useSyncExternalStore(
    subscribe,
    getPerms,
    () => defaultPermissions
  );
  const profile = useSyncExternalStore(
    subscribe,
    getProfile,
    () => defaultProfile
  );
  const log = useSyncExternalStore(subscribe, getLog, () => []);

  const setPermissions = useCallback((next: AgentPermissions) => {
    const raw = JSON.stringify(next);
    window.localStorage.setItem(PERMS_KEY, raw);
    permsRaw = raw;
    permsSnap = next;
    emit();
  }, []);

  const setProfile = useCallback((next: AgentProfile) => {
    const raw = JSON.stringify(next);
    window.localStorage.setItem(PROFILE_KEY, raw);
    profileRaw = raw;
    profileSnap = next;
    emit();
  }, []);

  const appendRun = useCallback((run: AgentRun) => {
    const next = [run, ...getLog()].slice(0, 20);
    const raw = JSON.stringify(next);
    window.localStorage.setItem(LOG_KEY, raw);
    logRaw = raw;
    logSnap = next;
    emit();
  }, []);

  return { permissions, profile, log, setPermissions, setProfile, appendRun };
}
