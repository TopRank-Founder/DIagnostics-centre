async function getUrl(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    const loc = res.headers.get("location");
    console.log("Redirect for", url, "->", loc);
  } catch(e) { console.error(e) }
}
getUrl("https://maps.app.goo.gl/RdWGsfkA8tFfiUKN9");
getUrl("https://maps.app.goo.gl/BoCuUufXy6et6YsZ7");
