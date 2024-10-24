import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
          role: 'user',
        };
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await compare(credentials.password, user.password!))) {
          const { id, email, firstName, lastName, image, age, role, gender } =
            user;
          return { id, email, firstName, lastName, image, age, role, gender };
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60 * 10, // 10 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   session: ({ session, token, user }) => {
  //     return { ...session, token, user };
  //   },
  //   jwt: ({ token }) => {
  //     // if (user) {
  //     //   // console.log('jwt', user);
  //     //   return { user };
  //     // }
  //     return { token };
  //   },
  // },
};
