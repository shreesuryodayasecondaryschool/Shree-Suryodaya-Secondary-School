async function loadAdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile || !["admin", "super_admin"].includes(profile.role)) {
    alert("तपाईंलाई Admin अनुमति छैन।");
    window.location.href = "/";
    return;
  }

  const { count } = await supabaseClient
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const studentCount = document.getElementById("student-count");
  if (studentCount) studentCount.textContent = count ?? 0;
}

async function publishNotice(title, content) {
  const { error } = await supabaseClient
    .from("notices")
    .insert({ title, content });

  if (error) throw error;
  alert("सूचना प्रकाशित भयो।");
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "admin") {
    loadAdminDashboard().catch(error => alert(error.message));
  }
});
