import React from 'react';

const Alert = ({ isOpen, alertMessage, actionMessageOne = '', actionMessageTwo = '', actionMessageThree = '', hideAlert, handleAction1, handleAction2 = () => { } }) => {


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-[var(--bgColorSecondary)]">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Order</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-800 font-bold">
              {alertMessage}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={handleAction1}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              {actionMessageOne}
            </button>
            <button
              onClick={hideAlert}
              className="mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {actionMessageTwo}
            </button>
            {actionMessageThree && (
              <button
                onClick={handleAction2}
                className="mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {actionMessageThree}
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;