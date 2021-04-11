async function joinMeHandler(req, res) {
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
  const redirectUrl = `${process.env.REDIRECT_URL}?code=${code}$state=${state}`;
  res.redirect(redirectUrl);
}

module.exports = {
  joinMeHandler,
  callbackFn,
};
