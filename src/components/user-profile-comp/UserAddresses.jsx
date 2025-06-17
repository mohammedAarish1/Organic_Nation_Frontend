import { lazy, Suspense, useState } from "react";
// import AddressForm from "./AddressForm";
import {
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { handleDeletingAddress } from "../../features/user-profile/userProfile";
import { toast } from "react-toastify";
import { getUserData } from "../../features/auth/auth";
import Loader from "../common/Loader";

const AddressForm = lazy(() => import('./AddressForm'))

const UserAddresses = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null)
  // const [addresses, setAddresses] = useState([
  // {
  // id: 1,
  // address: '123 Main St',
  // city: 'New York',
  // state: 'NY',
  // pinCode: '100001',
  // addressType: 'home',
  // },
  // ]);

  const handleAddAddress = (values, { setSubmitting }) => {
    // const newAddress = {
    // id: addresses.length + 1,
    // ...values,
    // };
    // setAddresses([...addresses, newAddress]);
    // setShowAddForm(false);
    // setSubmitting(false);
  };

  const handleAddressDelete = (addressId) => {
    dispatch(handleDeletingAddress(addressId))
      .then(() => {
        dispatch(getUserData())
        toast.info('Address Deleted Successfully')
      })
  }

  return (
    <div className="space-y-6">


      {showAddForm && (
        <div className="mt-6">
          <Suspense fallback={<Loader height='200px' />}>
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setShowAddForm(false)}
              address={selectedAddress}
            />
          </Suspense>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="xs:text-xl text-sm font-semibold text-gray-600">Saved Addresses</h2>
        <button
          onClick={() => {
            setSelectedAddress(null)
            setShowAddForm(!showAddForm)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-500"
        >
          <FiPlus size={18} />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols- gap-6 bg-white rounded-lg">
        {user.addresses.length > 0 && user.addresses.map((address) => (
          <div
            key={address._id}
            className="border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-green-700 text-sm font-medium capitalize">
                <FiMapPin size={16} className="mr-2" />
                {address.addressType}
              </span>
              <div className="flex">
                <button
                  className="p-2 text-green-600 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    setSelectedAddress(address)
                    setShowAddForm(!showAddForm)
                  }}
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  className="p-2 text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  onClick={() => handleAddressDelete(address._id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            <p className=" mb-2">{address.mainAddress}</p>
            <p className=" mb-2">{address.optionalAddress}</p>
            <p>
              {address.city}, {address.state} - {address.pinCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default UserAddresses