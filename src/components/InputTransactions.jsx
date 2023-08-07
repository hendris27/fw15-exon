import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import http from '@/helpers/http';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheck, MdError } from 'react-icons/md';
import { setProfile } from '@/redux/reducers/profile';
import { setTransactions } from '@/redux/reducers/transactions';

const validationSchema = Yup.object({
  amount: Yup.number().min(10000, 'Min Top Up Must be Rp. 10.000'),
});

const InputTransactionTopup = (props) => {
  const { token, visibleModal } = props;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [closeModal, setCloseModal] = React.useState(visibleModal);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMassage] = React.useState('');

  const close = () => {
    setCloseModal(false);
  };

  const transactionList = React.useCallback(async () => {
    const { data } = await http(token).get('/transactions', {
      params: { limit: 10 },
    });
    dispatch(setTransactions(data.results));
  }, [token, dispatch]);

  const actionTopup = async (values) => {
    const amount = values.amount;
    const formData = new URLSearchParams({ amount });
    const { data } = await http(token).post('/transactions/topup', formData.toString());

    if (data.results) {
      dispatch(setProfile(data.results));
      setSuccessMassage(`${data.message} Your Topup Success!`);
      setTimeout(() => {
        setSuccessMassage('');
        setCloseModal(false);
      }, 1500);
      transactionList();
    }
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          id="loading"
          className="modal-toggle"
          checked={closeModal}
          onChange={() => setCloseModal(!closeModal)}
        />
        <div className="modal z-10">
          <div className="modal-box bg-gray-300">
            <div className="py-3 text-black text-lg font-semibold">Topup</div>

            {errorMessage && (
              <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
                <MdError size={30} />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="flex flex-row justify-center alert alert-success shadow-lg text-white text-lg">
                <MdCheck size={30} />
                {successMessage}
              </div>
            )}
            <div className="py-3 text-black text-base font-semibold">Enter the amount of money, and click submit</div>

            <Formik
              initialValues={{
                amount: '',
              }}
              validationSchema={validationSchema}
              onSubmit={actionTopup}
              enableReinitialize={true}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="modal-action flex flex-col items-center justify-center gap-7 w-full"
                >
                  <div className="w-full">
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter your amount min Rp. 10.000"
                      className={`border-b-2 outline-none h-12 px-8 rounded-xl ${
                        errors.amount && touched.amount && 'border-error'
                      } w-full font-[500] text-black text-xl`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                    />
                    {errors.amount && touched.amount && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.amount}</span>
                      </label>
                    )}
                  </div>
                  <div className="w-full flex items-center gap-4 justify-end">
                    <button
                      type="submit"
                      className="btn btn-success w-20 hover:text-black capitalize text-white self-end"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn bg-red-500 w-20 capitalize hover:bg-gray-500 hover:text-black text-white self-end"
                      onClick={() => {
                        close();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputTransactionTopup;
