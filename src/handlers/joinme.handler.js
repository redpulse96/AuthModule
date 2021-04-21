let storedCookiesToRedirectionUrl = {};

async function joinMeHandler(req, res) {
  storedCookiesToRedirectionUrl[req.sessionID] =
    req.query.rel || req.headers.rel || req.rel || `http://${req.headers.host}/`;
  const client_id = process.env.JOIN_ME_CLIENT_ID;
  const scope = 'scheduler%20start_meeting';
  const redirect_uri = process.env.JOIN_ME_CURRENT_URL;
  const state = 'TEST';
  const response_type = 'code';
  const redirectionUrl = `${process.env.JOIN_ME_AUTH_REDIRECTION_URL}?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}&response_type=${response_type}`;
  return res.redirect(redirectionUrl);
}

async function callbackFn(req, res) {
  console.log(req);
  const {
    query: { code, state },
  } = req;
  let redirectUrl = `${process.env.REDIRECT_URL}?code=${code}$state=${state}`;
  for (const key in storedCookiesToRedirectionUrl) {
    if (req.sessionStore && req.sessionStore.sessions && req.sessionStore.sessions[key]) {
      redirectUrl = storedCookiesToRedirectionUrl[key];
    }
  }
  res.redirect(redirectUrl);
}

module.exports = {
  joinMeHandler,
  callbackFn,
};
