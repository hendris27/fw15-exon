import Layout from '@/components/Layout';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import React from 'react';
import axios from 'axios';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/login');
  const { data } = await axios.get('https://cute-lime-goldfish-toga.cyclic.app/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      token,
      user: data.results,
    },
  };
}, cookieConfig);
function SelfProfile({ token, user }) {
  return <Layout>this{user.email}</Layout>;
}

export default SelfProfile;
