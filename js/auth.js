
async function signUpWithEmail(email, password, fullName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;
  return data;
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

async function signInWithGoogle() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google"
  });
  if (error) throw error;
  return data;
}

async function signInWithFacebook() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "facebook"
  });
  if (error) throw error;
  return data;
}

async function signInWithMobile(phone) {
  const { data, error } = await supabaseClient.auth.signInWithOtp({
    phone: phone
  });
  if (error) throw error;
  return data;
}

async function verifyMobileOTP(phone, token) {
  const { data, error } = await supabaseClient.auth.verifyOtp({
    phone,
    token,
    type: "sms"
  });
  if (error) throw error;
  return data;
}

async function signOutUser() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
  window.location.href = "/login.html";
}

async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) throw error;
  return data.user;
}
