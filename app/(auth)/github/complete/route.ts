import db from "@/lib/db";
import { getLoginSession } from "@/lib/login";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getAccessToken, getUserGithubEmail, getUserProfile } from "./utils";

export async function GET(request: NextRequest) {
  const access_token = await getAccessToken(request);
  const { id, avatar_url, login } = await getUserProfile(access_token);
  //   const email = await getUserGithubEmail(access_token);
  //   console.log("email:", email);
  let github_username = login;
  //   const userProfileResponse = await fetch(
  //     "https://api.github.com/user/emails",
  //     {
  //       headers: { Authorization: `Bearer ${access_token}` },
  //       cache: "no-cache",
  //     }
  //   );
  //   return await userProfileResponse.json();
  const user = await db.user.findUnique({
    //db의 github_id 중 깃허브에서 받아온 id 와 동일한 계정이 있는지 확인
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return getLoginSession(user);
  }

  const newUsername = await db.user.findUnique({
    //db의 username 중 깃허브에서 받아온 login 와 동일한 계정이 있는지 확인
    where: {
      username: github_username,
    },
    select: {
      id: true,
    },
  });
  if (newUsername) {
    github_username = login + "-gh";
  }
  const findGithubUsername = await db.user.findUnique({
    //db의 username 중 깃허브에서 받아온 login+"-gh" 와 동일한 계정이 있는지 확인
    where: {
      username: github_username,
    },
    select: {
      id: true,
    },
  });
  if (findGithubUsername) {
    return getLoginSession(findGithubUsername);
  }

  const newUser = await db.user.create({
    data: {
      username: github_username,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  return getLoginSession(newUser);
}
