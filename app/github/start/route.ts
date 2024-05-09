export async function GET() {
  const baseURL = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,read:email",
    allow_signup: "true", // true default // true일때 깃헙 계정생성까지 가능
  };
  const formattedParams = new URLSearchParams(params); // params를 정리해줌
  //   console.log(formattedParams.toString());
  const finalUrl = `${baseURL}?${formattedParams}`;
  console.log(finalUrl);
  return Response.redirect(finalUrl);
}
