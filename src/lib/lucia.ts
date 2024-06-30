import { Lucia } from 'lucia';
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from './prisma';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = "auth-cookie";
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: SESSION_COOKIE_NAME,
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  }
})

export const getUser = async ()=> {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return null;
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return null;
    }

    if (session.fresh) {
      // Refresh session cookie
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        name: true,
        email: true
      }
    });

    if (!dbUser) {
      // User not found in database, clear session
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return null;
    }

    return dbUser;
  } catch (error) {
    return null;
  }
}
