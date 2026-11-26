# Shree Suryodaya Secondary School — Blue Website Starter

School location used in this starter: Masina, Rural Municipality-4, Rolpa, Lumbini Province, Nepal. Confirm official contact details and establishment year with the school before publishing.

## Upload to GitHub from Android
1. Download and extract the ZIP on your phone.
2. In your GitHub repository choose **Add file → Upload files**.
3. Select the files and folders from the extracted directory. Keep the folder structure exactly as shown; do not upload only the ZIP.
4. Commit changes. The root `index.html` must remain at repository root.

## Cloudflare Pages
Connect the GitHub repository to Cloudflare Pages. Framework preset: None. Build command: leave blank. Build output directory: `/` (or the repository root as supported by the Pages setup). Do not deploy until all folders are uploaded.

## Supabase
1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Add the project URL and anon/public key to `js/config.js`.
4. Create the first account, then assign its profile role to `super_admin` manually in the Supabase SQL editor after verifying the account email: `update public.profiles set role='super_admin' where id='AUTH-USER-UUID';` Create profile rows as required; do not expose service-role keys in browser code.
5. Configure Google OAuth only after adding the correct redirect URLs in Supabase and Google Cloud.

## OneSignal Web Push
1. Create a OneSignal Web Push app and configure the exact Cloudflare Pages domain.
2. Put the OneSignal App ID in the frontend only if adding the client SDK initialization. This starter includes the service worker file; SDK subscription initialization still needs to be configured for your OneSignal app/domain.
3. In Cloudflare Pages project Settings → Variables and Secrets, set `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_API_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` as server-side environment variables. Never commit the REST API key or Supabase service-role key.
4. Push sending endpoint checks the Supabase user session and `super_admin`/`school_admin` role before calling OneSignal.

## Included
- Responsive blue/white public homepage
- Email magic-link and Google OAuth login scaffolding
- Community upload page for images, video, audio, documents and ZIP (50 MB limit; private bucket; posts pending moderation)
- Admin notice publishing and secured notification endpoint scaffolding
- Supabase schema and storage policies

## Important limitations
This is a starter implementation, not a finished school management platform. Student attendance, marksheets, class/teacher management, parent portal, TikTok/Facebook/phone login, admission workflows, moderation UI, OneSignal subscription initialization and full role onboarding still need development and testing. Supabase free storage/bandwidth and OneSignal limits apply. Obtain school approval and parent/guardian consent before storing student photos or personal information. Never make student files public by default.
