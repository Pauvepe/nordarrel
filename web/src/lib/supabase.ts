import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const response = Promise.resolve({ data: [], error: null });
    const query = {
      select: () => query,
      eq: () => query,
      order: () => query,
      then: response.then.bind(response),
      catch: response.catch.bind(response),
      finally: response.finally.bind(response),
    };

    return {
      from: () => query,
    } as unknown as ReturnType<typeof createClient>;
  }

  return createClient(
    url,
    anonKey,
    { db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public" } }
  );
}
