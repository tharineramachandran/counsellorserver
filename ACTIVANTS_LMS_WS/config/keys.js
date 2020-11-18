
const GOOGLE_CLIENT_SECRET = "qeqwnpnIyhtEGPnKKxUqH6mH";
const GOOGLE_CLIENT_ID = "372290496331-gtol72os2aha6loa609ov1ft12p801ne.apps.googleusercontent.com";

const ACCESS_KEY_ID="AKIAIGCPRBGHZSPTT6UQ";
const  SECRET_ACCESS_KEY  = "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";

module.exports = {
    google: {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
    },


    awsS3 :{

      accessKeyId :ACCESS_KEY_ID,

        secretAccessKey:SECRET_ACCESS_KEY

    },



    session: {
        cookieKey:"@ct1vants!00"
    }
}

