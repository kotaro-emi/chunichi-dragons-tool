import { createClient } from '@supabase/supabase-js';

// Supabaseのanonキーは静的サイトのビルド成果物（公開JS）に含まれる想定のキーで、
// 秘密情報ではない。安全性はRLS（supabase/schema.sql）側で担保する（開発計画書3.5.4節）。
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
