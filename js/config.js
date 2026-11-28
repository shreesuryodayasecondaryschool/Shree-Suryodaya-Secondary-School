
const SUPABASE_URL = "https://txnkspvsolnsduqgbpgl.supabase.co";

const SUPABASE_ANON_KEY = "PASTE_YOUR_SB_PUBLISHABLE_KEY_HERE";

const SCHOOL_NAME = "Shree Suryodaya Secondary School";

const SCHOOL_ADDRESS = "Masina, Rural Municipality-4, Rolpa, Nepal";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
