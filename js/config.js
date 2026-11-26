const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const SCHOOL_NAME = "Shree Suryodaya Secondary School";
const SCHOOL_ADDRESS = "Masina, Rural Municipality-4, Rolpa, Nepal";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
