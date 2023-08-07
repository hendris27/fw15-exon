import coockieConfig from '@/helpers/cookieConfig';
// import http from '@/helpers/http';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(async function registRoute(req, res) {
  // const request = await fetch('https://kind-blue-cod-garb.cyclic.cloud/auth/register', {
  const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register', {
    // const request = await http().fetch('/auth/register', {
    method: 'POST',
    body: new URLSearchParams(req.body).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const respons = await request.json();
  const token = respons?.results?.token;
  if (token) {
    req.session.token = token;
    await req.session.save();
  }
  return res.json(respons);
}, coockieConfig);
