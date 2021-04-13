import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Admin from '../../../models/Admin.model'
import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Elrond" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        const {username, password} = credentials;
        try {
            const user = await Admin.findOne({ username }).select("+password");
            if(!user) return Promise.resolve(null);
            const comparedPassword = await bcrypt.compare(password, user.password);
            if(comparedPassword) {
              user.password = '';
                return Promise.resolve(user)
            } else {
                return Promise.resolve(null);
            }
        } catch (error) {
            return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
      signIn: '/auth/signin',
  },
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  callbacks: {
    
    jwt: async (token, user) => {
      if(user) {
        return { ...token, user}
      }
      return token
    },
    session: async (session, user) => {

      session.user.id = user.user._id;
      session.user.name = user.user.username;
      return Promise.resolve(session);
    }
  }
}

export default (req, res) => NextAuth(req, res, options)