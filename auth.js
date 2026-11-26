(() => {
 const cfg=window.SCHOOL_CONFIG||{}; const ready=cfg.supabaseUrl?.includes('supabase.co')&&!cfg.supabaseUrl.includes('YOUR-')&&cfg.supabaseAnonKey&&!cfg.supabaseAnonKey.includes('YOUR_');
 const msg=document.getElementById('login-message'); let client=null;
 if(window.supabase&&ready) client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
 async function oauth(provider){if(!client){msg.textContent='First configure Supabase URL and anon key in js/config.js.';return;}const {error}=await client.auth.signInWithOAuth({provider,options:{redirectTo:location.origin+'/login.html'}});if(error)msg.textContent=error.message;}
 document.getElementById('google-login').onclick=()=>oauth('google');document.getElementById('facebook-login').onclick=()=>oauth('facebook');
 document.getElementById('email-form').onsubmit=async e=>{e.preventDefault();if(!client){msg.textContent='First configure Supabase in js/config.js.';return;}const {error}=await client.auth.signInWithOtp({email:document.getElementById('email').value,options:{emailRedirectTo:location.origin+'/login.html'}});msg.textContent=error?error.message:'Sign-in link sent. Check your email.';};
})();
