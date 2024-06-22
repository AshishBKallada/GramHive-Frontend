import React, { useEffect, useState } from "react";
import { getTransactions } from "../../../services/services";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data } = await getTransactions();
    setTransactions(data);
  };

  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-2">
      <div className="mt-6 overflow-hidden rounded-xl border shadow bg-gray-900">
        <div className="hidden lg:block">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="border-b">
              <tr>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  SI.No
                </td>
                <td
                  width="50%"
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  Username
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Date
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Amount
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Status
                </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {transactions.length > 0 &&
                transactions.map((transaction, index) => (
                  <tr key={index} className="lg:border-b">
                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                      {index + 1}
                    </td>
                    <td
                      width="50%"
                      className="flex gap-4 whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6"
                    >
                      <img className="w-10 h-10 rounded-full" src={transaction?.user?.image} alt="" />
                      {transaction?.user.username}
                    </td>

                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                      {transaction?.date}
                    </td>

                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                      ₹{transaction?.rate}
                    </td>

                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                      <div
                        className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                          transaction.status ? "bg-red-600" : "bg-green-600"
                        }`}
                      >
                        {transaction.status ? "Period Over" : "Active"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden">
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <div key={index} className="p-4 mb-4 border-b border-gray-700">
                <div className="flex items-center gap-4 mb-2">
                  <img className="w-10 h-10 rounded-full" src={transaction?.user?.image} alt="" />
                  <div>
                    <p className="text-sm font-bold text-gray-500">
                      {transaction?.user.username}
                    </p>
                    <p className="text-sm text-gray-500">{transaction?.date}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <p>Amount:</p>
                    <p>₹{transaction?.rate}</p>
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                      transaction.status ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {transaction.status ? "Period Over" : "Active"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
