import { supabase } from "@/lib/supabaseclient";

export async function getAuthenticatedUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  
  return data.user;
}
