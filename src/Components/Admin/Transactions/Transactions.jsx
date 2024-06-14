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
  console.log(transactions);

  return (
    <div className="mx-auto mt-8 max-w-screen-lg px-2">
      <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
        <p className="flex-1 text-base font-bold text-gray-900">
          Latest Payments
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border shadow">
        <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
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
              transactions.map((transaction,index) => (
                <tr>
                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {index+1}
                  </td>
                  <td
                    width="50%"
                    className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                  >
                    {transaction?.user.username}
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">
                        07 February, 2022
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {transaction?.title}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    04/12/232
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                      ₹{transaction?.rate}
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
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
    </div>
  );
};

export default Transactions;
