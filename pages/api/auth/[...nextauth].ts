import NextAuth, { User } from "next-auth"
import Providers from "next-auth/providers"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { db, firestore } from "../../../firebase"

const createProfile = async (user: User) => {
  const newProfileRef = db.collection("profiles").doc()
  const usersRef = db.collection("users")
  const userSnap = await usersRef.where("email", "==", user.email).get()

  if (userSnap?.docs?.length > 1) {
    let errorMsg = `More than one user has the email address ${user.email}:`
    userSnap?.docs.map((d) => d.id).forEach((p) => (errorMsg += `${p} `))
    console.log(errorMsg)
  } else if (userSnap.docs.length === 0) {
    await usersRef.add({
      id: newProfileRef.id,
      profileId: newProfileRef.id,
      email: user?.email ?? null,
      name: user?.name ?? null,
      stocks: [],
      money: 10000,
    })
    return
  } else {
    const userRef = userSnap.docs[0].ref
    userRef.update({ profileId: newProfileRef.id })

    await newProfileRef.set({
      id: newProfileRef.id,
      email: user?.email ?? null,
      name: user?.name ?? null,
      stocks: [],
      money: 10000,
    })
    return
  }
}

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirebaseAdapter(firestore as any),
  database: process.env.DATABASE_URL2,
  secret: process.env.SECRET,
  session: {
    jwt: false,
  },
  jwt: {
    secret: process.env.SECRET,
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: "/profile",
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) {
    //   return true
    // },
    // async redirect(url, baseUrl) { return baseUrl },
    async session(session, user) {
      if (!session.user.profileId) {
        await createProfile(user)
      }
      session.user.profileId = user.profileId as string
      return session
    },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
})
