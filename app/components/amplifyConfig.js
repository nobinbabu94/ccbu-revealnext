import { Amplify } from "aws-amplify";

export function initAmplify() {
  const userPoolId =
    process.env.NEXT_PUBLIC_USER_POOL_ID;

  const userPoolClientId =
    process.env
      .NEXT_PUBLIC_USER_POOL_CLIENT_ID;

  if (!userPoolId || !userPoolClientId) {
    console.error(
      "Amplify configuration missing"
    );
    return false;
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
      },
    },
  });

  return true;
}