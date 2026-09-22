import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmwxamzxbyowizhcfpes.supabase.co';
// Using anon public key for browser client
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5td3hhbXp4Ynlvd2l6aGNmcGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMzcxMTAsImV4cCI6MjEwNTYxMzExMH0.BWnuuysHNo4fuPBEsM_5FiMBpxsPV4ZeWN4EGB6W3CA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
