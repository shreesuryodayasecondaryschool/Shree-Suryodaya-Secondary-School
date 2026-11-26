document.getElementById('year').textContent = new Date().getFullYear();
// OneSignal Web Push initialization. Replace the placeholder App ID in js/config.js.
window.OneSignalDeferred = window.OneSignalDeferred || [];
const appId = window.SCHOOL_CONFIG?.oneSignalAppId;
if (appId && !appId.includes('YOUR_')) {
  window.OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({ appId, serviceWorkerPath: 'OneSignalSDKWorker.js', serviceWorkerParam: { scope: '/' } });
  });
}
