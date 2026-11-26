export async function onRequestPost({ request, env }) {
  const json = (body, status=200) => new Response(JSON.stringify(body), {status, headers:{'content-type':'application/json','cache-control':'no-store'}});
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return json({error:'Sign in required.'},401);
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY || !env.ONESIGNAL_APP_ID || !env.ONESIGNAL_REST_API_KEY) return json({error:'Server notification settings are incomplete.'},503);
  const token = auth.slice(7);
  const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {headers:{apikey:env.SUPABASE_ANON_KEY,Authorization:`Bearer ${token}`}});
  if (!userRes.ok) return json({error:'Invalid session.'},401);
  const user = await userRes.json();
  const profileRes = await fetch(`${env.SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role,approved`, {headers:{apikey:env.SUPABASE_ANON_KEY,Authorization:`Bearer ${token}`} });
  if (!profileRes.ok) return json({error:'Could not verify school role.'},403);
  const profiles = await profileRes.json();
  if (!profiles[0] || profiles[0].role !== 'super_admin' || profiles[0].approved !== true) return json({error:'Only the approved Super Admin can send push notifications.'},403);
  let body; try { body=await request.json(); } catch { return json({error:'Invalid JSON.'},400); }
  const title=String(body.title||'').trim().slice(0,100), message=String(body.message||'').trim().slice(0,500);
  if (!title || !message) return json({error:'Title and message are required.'},400);
  const pushRes=await fetch('https://api.onesignal.com/notifications', {method:'POST',headers:{'Content-Type':'application/json','Authorization':`Key ${env.ONESIGNAL_REST_API_KEY}`},body:JSON.stringify({app_id:env.ONESIGNAL_APP_ID, target_channel:'push', included_segments:['Total Subscriptions'], headings:{en:title}, contents:{en:message}})});
  const result=await pushRes.json().catch(()=>({}));
  if (!pushRes.ok) return json({error:result.errors?.[0]||'OneSignal rejected the notification.'},502);
  return json({ok:true,id:result.id||null});
}
