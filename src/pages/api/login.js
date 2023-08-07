import { withIronSessionApiRoute } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
    method: 'POST',
    body: new URLSearchParams(req.body).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const response = await request.json();
  const token = response?.results?.token;
  if (token) {
    req.session.token = token;
    await req.session.save();
  }
  return res.json(response);
}, cookieConfig);
