import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // // get user from database then:
    // req.session.user = {
    //   id: 230,
    //   admin: true,
    // };
    // await req.session.save();
    // res.send({ ok: true });
    const request = await fetch('https://cute-lime-goldfish-toga.cyclic.app', {
      method: 'POST',
      body: new URLSearchParams(req.body).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-url-encoded',
      },
    });
    const response = await request.json();
    const token = response?.results?.token;
    if (token) {
      req.session.token = token;
      await req.session.save();
    }
    return res.json(response);
  },
  {
    cookieName: 'exonpay',
    password: 'cmX56pNL%2W&HB8cUzVux9lR&23*a2K4r',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
);
