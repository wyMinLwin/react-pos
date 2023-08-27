import {createClient} from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_ANON_KEY;
export const supabase = createClient(supabaseUrl,anonKey);