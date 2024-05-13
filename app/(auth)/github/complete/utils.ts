import { NextRequest } from "next/server";
interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}
export async function getAccessToken(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const { error, access_token } = await (
    await fetch(accessTokenURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  return access_token;
}

export async function getUserProfile(access_token: string) {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  return await userProfileResponse.json();
}
export async function getUserGithubEmail(access_token: string) {
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  const emails: GitHubEmail[] | null | undefined =
    await userEmailResponse.json();
  return emails && emails.length > 0 ? emails[0].email : null;
}
