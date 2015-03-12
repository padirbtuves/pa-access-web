/**
 * Expose
 */

module.exports = {
    db: process.env.OPENSHIFT_MONGODB_DB_URL + "paaccess",
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://paaccess-vincnetas.rhcloud.com/oauth2callback"
    }
};