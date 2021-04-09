import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Admin from '../../../models/Admin.model'
import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "elrond@fondcombe.tdm" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        const {email, password} = credentials;
        try {
            const user = await Admin.findOne({ email }).select("+password");
            if(!user) return Promise.resolve(null);
            const comparedPassword = await bcrypt.compare(password, user.password);
            if(comparedPassword) {
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
}

export default (req, res) => NextAuth(req, res, options)