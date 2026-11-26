export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.ONESIGNAL_APP_ID || !env.ONESIGNAL_REST_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Notification service is not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!body.title || !body.message) {
    return new Response(
      JSON.stringify({ error: "Title and message are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const response = await fetch("https://api.onesignal.com/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Key ${env.ONESIGNAL_REST_API_KEY}`
    },
    body: JSON.stringify({
      app_id: env.ONESIGNAL_APP_ID,
      included_segments: ["All"],
      headings: { en: body.title },
      contents: { en: body.message }
    })
  });

  const result = await response.json();

  return new Response(JSON.stringify(result), {
    status: response.status,
    headers: { "Content-Type": "application/json" }
  });
}
