// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rimypgldbszaittzbplw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbXlwZ2xkYnN6YWl0dHpicGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDMxMjcsImV4cCI6MjA1OTg3OTEyN30.qrL1p4t11OtDKxiTuZ2oE2ctX5WibhwKC78S7sZfWAE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);