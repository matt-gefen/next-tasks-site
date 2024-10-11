// session management
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode("")

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
  .setProtectedHeader({alg: 'HS256'})
  .setIssuedAt()
  .setExpirationTime('10 seconds from now')
  .sign(key)
}

export async function createSession() {
  const user = {tasks: []};
  const expires = new Date(Date.now() + 10 * 1000);

  const session = await encrypt({user, expires})

  cookies().set('session', session, {expires, httpOnly: true})
}