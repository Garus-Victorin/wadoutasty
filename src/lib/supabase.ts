import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqiscejxfaeikvodaeso.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxaXNjZWp4ZmFlaWt2b2RhZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzAxNTUsImV4cCI6MjA4ODA0NjE1NX0.biTd9mvmThtqSpvJ4VWjGjR3TplWcdTr0Hl8FceoXNU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database tables will be: menu_items, reservations, contacts, admin
