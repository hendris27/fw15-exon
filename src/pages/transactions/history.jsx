import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';
import Layout from '@/components/Layout';
import checkCredentials from '@/helpers/checkCredentials';
import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';
import http from '@/helpers/http';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';

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
  const [search, setSearch] = React.useState('');
  const [recipient, setRecepient] = React.useState([]);
  const user = useSelector((state) => state.profile.data);

  const getTransaction = React.useCallback(async () => {
    const { data } = await http(userToken).get('/transactions', { params: { limit: 5 } });
    setRecepient(data.results);
    console.log(data);
  }, [userToken]);

  const getUsers = React.useCallback(
    async (page = 1, search = '') => {
      const { data } = await http(userToken).get('/users?limit=5', {
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
    getTransaction();
  }, [getTransaction]);
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  React.useEffect(() => {
    getUsers(1, search);
  }, [search, getUsers]);

  return (
    <Layout token={userToken}>
      <>
        <div className="flex justify-between">
          <div className="font-bold">History Transactions</div>
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
          <div className="flex justify-between">
            <div className="font-bold">Search for: {search}</div>
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                --Select Filter--
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a>Z-A</a>
                </li>
                <li>
                  <a>A-Z</a>
                </li>
              </ul>
            </div>
          </div>
          {recipient.results && (
            <div className="flex flex-col gap-4">
              {recipient.results.length === 0 ? (
                <p className="text-[#ff0000] ">No data found in list.</p>
              ) : (
                recipient.results.map((item) => (
                  <div key={`trx-list-${item.id}`} className="flex justify-between px-7 py-2">
                    <div className="flex gap-2">
                      {item.type === 'TRANSFER' && (
                        <>
                          {item.recipient.id !== user.id && (
                            <>
                              <div>
                                {!item.recipient.picture && (
                                  <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                                    <FiUser size={30} />
                                  </div>
                                )}
                                {item.recipient.picture && (
                                  <div className="w-12 h-12 border rounded-lg overflow-hidden object-cover ">
                                    <Image
                                      className="rounded object-cover"
                                      src={item.recipient.picture}
                                      alt={item.recipient.fullName || item.recipient.email}
                                      width={100}
                                      height={100}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="font-semibold">{item.recipient.fullName || item.recipient.email}</div>
                                <div className="text-sm opacity-70">Outcome</div>
                              </div>
                            </>
                          )}
                          {item.recipient.id === user.id && (
                            <>
                              <div>
                                {!item.sender.picture && (
                                  <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                                    <FiUser size={30} />
                                  </div>
                                )}
                                {item.sender.picture && (
                                  <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                    <Image
                                      className="rounded object-fit "
                                      src={item.sender.picture}
                                      alt={item.sender.fullName || item.sender.email}
                                      width={100}
                                      height={100}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="font-semibold">{item.sender.fullName || item.sender.email}</div>
                                <div className="text-sm opacity-70">Outcome</div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                      {item.type === 'TOP-UP' && (
                        <>
                          <div>
                            {!item.picture && (
                              <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                                <FiUser size={30} />
                              </div>
                            )}
                            {item.picture && (
                              <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                <Image
                                  className="rounded object-fit "
                                  src={item.picture}
                                  alt={item.fullName || item.email}
                                  width={100}
                                  height={100}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="font-semibold">{item.recipient.fullName || item.recipient.email}</div>
                            <div className="text-sm opacity-70">Income</div>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      {item.type === 'TOP-UP' && (
                        <div className="font-semibold text-green-500">Rp{Number(item.amount).toLocaleString('id')}</div>
                      )}
                      {item.type === 'TRANSFER' &&
                        (item.recipient.id === user.id ? (
                          <div className="text-green-500">Rp{Number(item.amount).toLocaleString('id')}</div>
                        ) : (
                          <div className="text-red-500">Rp{Number(item.amount).toLocaleString('id')}</div>
                        ))}
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
