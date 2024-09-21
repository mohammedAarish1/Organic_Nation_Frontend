import { toast } from "react-toastify";
import { deleteDocumentFromDatabase } from "../features/admin/adminData";
import { fetchUserData, getAllCartItems, getAllOrders } from "../imports";

// store token and fetch all the user related data after successful logged in
const fetchDataAfterSuccessfullLogIn = (token, dispatch) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    dispatch(fetchUserData(token));
    dispatch(getAllOrders(token))
    dispatch(getAllCartItems())
}



// generate random Transaction Id
const generateTransactionID = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    const merchantPrefix = 'T';
    const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
    return transactionID;
}


// to convert the address object into plain string 
const address = (obj) => {
    let result = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (Array.isArray(value)) {
                result += value.flat().join(' ') + ' ';
            } else {
                result += value + ' ';
            }
        }
    }
    return result.trim();
}


// for calculating additional 5% discount on MRP and tax include in that discount
const calculateDiscountAndTaxIncluded = (cart) => {
    const totalCartValue = cart.reduce((total, item) => {
        const subtotal = item.price * item.quantity;
        return total + subtotal;
    }, 0);

    const discountAmount = totalCartValue * 0.05;

    const totalCartValueExcludingTax = cart.reduce((total, item) => {
        const priceExcludingTax = item.price / (1 + item.tax / 100);
        const subtotalExcludingTax = priceExcludingTax * item.quantity;
        return total + subtotalExcludingTax;
    }, 0);

    const discountAmountExcludingTax = totalCartValueExcludingTax * 0.05;

    const taxIncludedInDiscountAmount = discountAmount - discountAmountExcludingTax;

    return {
        discountAmount: Math.round(discountAmount),
        taxIncludedInDiscountAmount: Math.round(taxIncludedInDiscountAmount)
    };
}


const handleDocumentDeleteFromDatabase = (collection, id, dispatch,updateLists) => {
    dispatch(deleteDocumentFromDatabase({ collection, id }))
        .then(() => {
            toast.success("Deleted Successfully");
            dispatch(updateLists());
        })
        .catch((error) => {
            // console.log('error deleting',error)
        })
}

export {
    generateTransactionID,
    address,
    calculateDiscountAndTaxIncluded,
    fetchDataAfterSuccessfullLogIn,
    handleDocumentDeleteFromDatabase
}