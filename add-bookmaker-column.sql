-- Run this once in the Supabase dashboard: Project → SQL Editor → New query → Run.
-- Adds the bookmaker column the app now writes to. Safe to run even if you're
-- not sure whether it already exists (IF NOT EXISTS makes it a no-op then).

alter table bets
  add column if not exists bookmaker text;
