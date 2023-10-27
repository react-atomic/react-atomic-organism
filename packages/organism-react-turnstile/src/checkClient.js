// @ts-check

const checkClient = async ({
  js = "https://challenges.cloudflare.com/turnstile/v0/api.js",
  domain = "https://challenges.cloudflare.com",
} = {}) => {
  const result = await fetch(js).then((res) => res.status);
  const result1 = await fetch(domain).then((res) => res.status);
  return 200 === result && 200 === result1;
};
export default checkClient;
