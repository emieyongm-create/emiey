import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnmwhjebtcznvxkkmokt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubXdoamVidGN6bnZ4a2ttb2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjI5NzUsImV4cCI6MjA3ODE5ODk3NX0.pPqcDTZYqiJJjZ3fJLYu37d75sAMXVvzKLEJ5mQDnUQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
