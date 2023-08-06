import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';
import Layout from '@/components/Layout';
import checkCredentials from '@/helpers/checkCredentials';
import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';
import http from '@/helpers/http';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipient as setRecipientAction } from '@/redux/reducers/transfer';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/profile');

  return {
    props: {
      userToken: token,
    },
  };
}, cookieConfig);

function SearchRecipient({ userToken }) {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const [recipient, setRecepient] = React.useState([]);
  const router = useRouter();
  const getUsers = React.useCallback(
    async (page = 1, search = '') => {
      const { data } = await http(userToken).get('/users?limit=3', {
        params: {
          page,
          search,
        },
      });
      setRecepient(data);
    },
    [userToken],
  );

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  React.useEffect(() => {
    getUsers(1, search);
  }, [search, getUsers]);

  const recipientTransactions = useSelector((state) => state.transfer.user);

  React.useEffect(() => {
    if (recipientTransactions) {
      router.push('/transactions/input-amount');
    }
  }, [recipientTransactions, router]);

  return (
    <Layout token={userToken}>
      <>
        <div className="flex justify-between">
          <div className="font-bold">Search Receiver</div>
        </div>
        <div className="bg-gray-100 flex gap-4  px-4 py-2 shadow-xl rounded-xl items-center">
          <div className="flex w-[5%]">
            <BsSearch size={25} />
          </div>
          <div className=" flex-1 w-full">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="w-full input bg-gray-100 border-0 outline-none hover:border-0 hover:outline-none"
              placeholder="Search receiver here"
            />
          </div>
        </div>
        <div className="flex flex-col py-8 ">
          <p>Search for: {search}</p>
          {recipient.results && (
            <div className="flex flex-col gap-4">
              {recipient.results.length === 0 ? (
                <p className="text-[#ff0000] ">No data found in list.</p>
              ) : (
                recipient.results.map((item) => (
                  <div className="flex flex-1 justify-between items-center" key={`trx-list-${item.id}`}>
                    <div
                      onClick={() => dispatch(setRecipientAction(item))}
                      className="flex justify-between items-center gap-3"
                    >
                      <>
                        <div>
                          {!item.picture && (
                            <div className="w-14 h-14 bg-white border rounded flex justify-center items-center">
                              <AiOutlineUser size={35} />
                            </div>
                          )}
                          {item.picture && (
                            <div className="w-14 h-14 bg-black border rounded-xl overflow-hidden">
                              <Image
                                className="object-fit"
                                width={100}
                                height={100}
                                src={item.picture}
                                alt={item.email}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold">{item.fullName}</p>
                          <p className="text-sm text-[#6A6A6A]">{item.email}</p>
                        </div>
                      </>
                    </div>
                  </div>
                ))
              )}
              <div className="flex gap-2  justify-center items-center">
                <button
                  onClick={() => getUsers(recipient.pageInfo.page - 1, search)}
                  disabled={recipient.pageInfo.page <= 1}
                  className="btn btn-primary"
                >
                  <AiOutlineArrowLeft />
                </button>
                <div className="font-bold">
                  page {recipient.pageInfo.page} of {recipient.pageInfo.totalPage}
                </div>
                <button onClick={() => getUsers(recipient.pageInfo.page + 1, search)} className="btn btn-primary">
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}
export default SearchRecipient;
