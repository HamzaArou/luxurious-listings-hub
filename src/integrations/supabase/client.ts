// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tdybblvmlsvxgkkwapei.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeWJibHZtbHN2eGdra3dhcGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzODY5NTEsImV4cCI6MjA1MTk2Mjk1MX0.ytPeWcRt0WXO6dxsZ-y8n6H4a1RQbX-5fUkALFtbmDs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);