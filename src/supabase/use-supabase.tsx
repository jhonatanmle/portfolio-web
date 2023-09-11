import { useMemo } from "react";
import { supabase } from ".";

function useSupabase() {
  return useMemo(() => supabase, []);
}

export default useSupabase;
