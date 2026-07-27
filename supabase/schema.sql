-- ドラゴンズ手帳 Supabase スキーマ（Phase 5: 共通インフラ）
-- Supabaseダッシュボードの SQL Editor でこのファイルの内容をそのまま実行してください。
-- 開発計画書 3.5節（訪問者アカウント）・3.6節（試合速報）に対応する土台。
--
-- 重要: 静的サイトではanonキーが公開されるJSに含まれるため、
-- RLS（Row Level Security）だけが唯一の防御線です。全テーブルでRLSを有効化しています。

-- =========================================================
-- profiles: コメント・お気に入りの表示名（メールアドレスを公開しないための最小限のプロフィール）
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null default 'ドラゴンズファン',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_all" on public.profiles
  for select using (true);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- サインアップ時にprofilesの行を自動作成するトリガー
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nickname', 'ドラゴンズファン'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- favorites: お気に入り選手登録
-- player_slug は data/players.json の slug と対応（DB外部キーではない。JSON側は随時更新されるため）
-- =========================================================
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  player_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, player_slug)
);

alter table public.favorites enable row level security;

create policy "favorites_select_own" on public.favorites
  for select using (auth.uid() = user_id);

create policy "favorites_insert_own" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "favorites_delete_own" on public.favorites
  for delete using (auth.uid() = user_id);

-- =========================================================
-- comments: 選手・試合へのコメント（ログイン必須、匿名投稿不可）
-- 文字数上限はDB制約でも強制する（見た目上の制限だけだと回避されるため）
-- =========================================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  target_type text not null check (target_type in ('player', 'game')),
  target_id text not null,
  body text not null check (char_length(body) between 1 and 300),
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "comments_select_all" on public.comments
  for select using (true);

create policy "comments_insert_own" on public.comments
  for insert with check (auth.uid() = user_id);

create policy "comments_update_own" on public.comments
  for update using (auth.uid() = user_id);

create policy "comments_delete_own" on public.comments
  for delete using (auth.uid() = user_id);

-- 不適切なコメントの削除は、当面Supabaseダッシュボードのテーブルエディタから
-- 運営者（プロジェクトオーナー）が直接行う想定（3.5.5節）。専用の管理画面は作らない。

-- =========================================================
-- game_scores: 試合結果・速報（Phase 6の土台）
-- 書き込みはclaude.aiルーティンがservice_roleキー（RLSを迂回する管理者キー。
-- 公開サイトのJSには絶対に含めない）で行う想定。訪問者は読み取り専用。
-- =========================================================
create table if not exists public.game_scores (
  game_date date primary key,
  opponent text,
  status text not null default 'scheduled' check (status in ('scheduled', 'in_progress', 'final')),
  chunichi_score int not null default 0,
  opponent_score int not null default 0,
  inning_scores jsonb not null default '[]'::jsonb,
  summary text,
  mvp_name text,
  mvp_note text,
  updated_at timestamptz not null default now()
);

alter table public.game_scores enable row level security;

create policy "game_scores_select_all" on public.game_scores
  for select using (true);

-- insert/update/delete のポリシーは意図的に作成しない
-- （anon/authenticatedからの書き込みを一切許可しない。service_roleはRLSを迂回するため書き込み可能）
