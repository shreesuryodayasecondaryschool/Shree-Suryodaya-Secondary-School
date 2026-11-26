# Shree Suryodaya Secondary School — Blue Theme Starter

A starter website for Shree Suryodaya Secondary School, Masina-4, Rolpa, Lumbini Province, Nepal. Built for GitHub + Cloudflare Pages + Supabase. No Netlify configuration is included.

## Included
- Responsive blue-and-white public homepage
- Login scaffolding for Google, Facebook and email magic link
- Admin page with notice publishing and a protected push-notification form
- Supabase starter schema with basic Row Level Security
- Cloudflare Pages Function that verifies the signed-in user's approved `super_admin` role before calling OneSignal
- Root `OneSignalSDKWorker.js` service worker

## Important status
This is a starter ZIP, not a completed school management system. Phone OTP, TikTok login, student/teacher/parent portals, attendance, marksheets, admission workflow, moderation, upload storage and full bilingual content are not implemented yet. The school email, phone number, logo and actual school photos have not been supplied/confirmed, so placeholders are intentionally used. The hero artwork is CSS illustration, not a photograph of the real school.

## Setup
1. Create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
2. In `js/config.js`, set your Supabase project URL and public anon key. Never put a Supabase service-role key in browser files.
3. Enable Google/Facebook providers in Supabase Auth and configure their provider credentials and redirect URLs. Email magic-link also needs the Supabase email settings.
4. Create your own account through `login.html`. Then, from the Supabase SQL Editor, assign that exact auth user UUID as the first approved Super Admin:

   ```sql
   insert into public.profiles (id, full_name, role, approved)
   values ('YOUR_AUTH_USER_UUID', 'School Super Admin', 'super_admin', true)
   on conflict (id) do update set role='super_admin', approved=true;
   ```

5. Create a OneSignal app configured for Web Push. Set its site origin to your Cloudflare Pages custom/project domain. Copy the OneSignal App ID into `js/config.js`. Configure the SDK according to the current OneSignal dashboard instructions if its setup flow requires additional site-specific settings.
6. In Cloudflare Pages → Settings → Environment variables, add these secrets for Production (and Preview if needed):
   - `SUPABASE_URL` — same project URL
   - `SUPABASE_ANON_KEY` — same public anon key
   - `ONESIGNAL_APP_ID` — OneSignal App ID
   - `ONESIGNAL_REST_API_KEY` — secret REST API key from OneSignal (secret; never expose in frontend)
7. Deploy through the connected GitHub repository to Cloudflare Pages. The `functions/` folder must be included in the repository for Pages Functions to run.
8. Open the deployed site, sign in, and allow browser notifications. Push delivery requires HTTPS, supported browser/device settings, and user permission. Test with a small group before any school-wide message.

## Safeguarding and privacy
Because students may be minors, do not make student profiles, phone numbers, attendance or results public. Add guardian consent, school approval, moderation and narrowly scoped access policies before enabling student community posts or uploads. Push notifications go to opted-in subscriptions; the current endpoint targets all OneSignal subscriptions in this app. Do not send private student information in push messages.

## Location and identity
The address shown is based on the information supplied in the project conversation: Masina-4, Rolpa, Lumbini Province, Nepal. Confirm the exact official school address, school email, phone number, emblem and founding year before publishing.
