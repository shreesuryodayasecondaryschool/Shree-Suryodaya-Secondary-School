async function uploadSchoolFile(file, folder = "general") {
  if (!file) throw new Error("कृपया फाइल छान्नुहोस्।");

  const user = await getCurrentUser();
  if (!user) throw new Error("पहिला Login गर्नुहोस्।");

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const path = `${folder}/${user.id}/${safeName}`;

  const { data, error } = await supabaseClient.storage
    .from("school-files")
    .upload(path, file);

  if (error) throw error;
  return data;
}

async function getSchoolFileUrl(path) {
  const { data, error } = await supabaseClient.storage
    .from("school-files")
    .createSignedUrl(path, 3600);

  if (error) throw error;
  return data.signedUrl;
}
