
// const ELIGIBLE_CATEGORIES = ['Homestyle Pickles', 'Organic Honey', 'Chutney & Dip', 'Fruit Preserves', 'Oats', 'Vegan'];

// export const calculateProgressiveDiscount = async (cartItems) => {
//   let totalEligibleAmount = 0;
//   let totalCartAmount = 0;
//   let eligibleItems = [];


//   // const productDetails = await Promise.all(
//   //   cartItems.map(async ({ quantity, productName }) => {
//   //     const response = await axios.get(`${apiUrl}/products/organic-honey/${productName}`)
//   //     return { ...response.data.product, quantity }
//   //   }))


//   // Calculate amounts for each item
//   for (const product of cartItems) {
//     try {
//       // const response = await axios.get(`${apiUrl}/products/organic-honey/${item.productName}`);
//       // const product = response.data.product;
//       console.log('product', product)
//       // if (!product) continue;
//       const discountedPrice = product.price * (1 - product.discount / 100);
//       const itemSubtotal = discountedPrice * product.quantity;

//       totalCartAmount += itemSubtotal;
//       // Check if item is eligible for progressive discount
//       if (ELIGIBLE_CATEGORIES.includes(product.category) && product.price >= 249) {
//         console.log('this is problem')
//         totalEligibleAmount += itemSubtotal;
//         eligibleItems.push({
//           productName: product.name,
//           category: product.category,
//           amount: itemSubtotal,
//           quantity: product.quantity
//         });
//       }
//     } catch (error) {
//       console.error(`Error fetching product ${product.name}:`, error);
//     }
//   }

//   // Determine discount based on conditions
//   let discountPercentage = 0;
//   let discountType = 'none';
//   let discountAmount = 0;

//   // Check for 30% discount (cart value >= 1999)
//   if (totalCartAmount >= 1999) {
//     discountPercentage = 30;
//     discountType = '30%';
//     discountAmount = Math.round(totalCartAmount * 0.30);
//   }
//   // Check for 20% discount (eligible items >= 499)
//   else if (totalEligibleAmount >= 499) {
//     discountPercentage = 20;
//     discountType = '20%';
//     discountAmount = Math.round(totalEligibleAmount * 0.20);
//   }
//   // Check for 10% discount (eligible items >= 199)
//   else if (totalEligibleAmount >= 199) {
//     discountPercentage = 10;
//     discountType = '10%';
//     discountAmount = Math.round(totalEligibleAmount * 0.10);
//   }



//   // calculation of total tax amount
// console.log('dddddddddd',discountPercentage)
//   let totalTax = cartItems.reduce((total, product) => {
//     let discount;

//     eligibleItems.forEach(item => {
//       if (item.productName === product.name) {
//         console.log('idhaaaaaaaaaaaaar')
//         discount = discountPercentage;
//       }
//     })
// console.log('discounttttttt',discount)
//     const discountedPrice = product.price * (1 - discount / 100);
//     const totalAmountWithTax = discountedPrice * product.quantity;

//     // Calculate the amount without tax
//     const amountWithoutTax = totalAmountWithTax / (1 + product.tax / 100);

//     // Calculate the tax amount
//     const taxAmount = totalAmountWithTax - amountWithoutTax;

//     return Math.round(total + taxAmount);
//   }, 0);
// console.log('totalTax',totalTax)
//   // calculation of total tax amount ended =======


//   console.log('totalCartAmount', totalCartAmount)
//   console.log('totalEligibleAmount', totalEligibleAmount)
//   console.log('discountAmount', discountAmount)
//   console.log('eligibleItems', eligibleItems)
//   console.log('discountType', discountType)

//   return {
//     totalCartAmount,
//     totalEligibleAmount,
//     eligibleItems,
//     discountType,
//     discountPercentage,
//     discountAmount,
//     finalAmount: totalCartAmount - discountAmount,
//     progressInfo: {
//       currentEligibleAmount: totalEligibleAmount,
//       currentCartAmount: totalCartAmount,
//       nextThreshold: getNextThreshold(totalEligibleAmount, totalCartAmount),
//       nextDiscountType: getNextDiscountType(totalEligibleAmount, totalCartAmount)
//     }
//   };
// };

// const getNextThreshold = (eligibleAmount, cartAmount) => {
//   if (cartAmount >= 1999) return null;
//   if (eligibleAmount >= 499) return 1999;
//   if (eligibleAmount >= 199) return 499;
//   return 199;
// };

// const getNextDiscountType = (eligibleAmount, cartAmount) => {
//   if (cartAmount >= 1999) return null;
//   if (eligibleAmount >= 499) return '30%';
//   if (eligibleAmount >= 199) return '20%';
//   return '10%';
// };

// export { ELIGIBLE_CATEGORIES };
