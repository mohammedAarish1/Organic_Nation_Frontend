// const setItemWithExpiry = (key, value, ttl) => {
//     const now = new Date();

//     // Item expiry time
//     const item = {
//         value: value,
//         expiry: now.getTime() + ttl,
//     };

//     sessionStorage.setItem(key, JSON.stringify(item));
// };


// const getItemWithExpiry = (key) => {
//     const itemStr = sessionStorage.getItem(key);

//     // If item doesn't exist, return null
//     if (!itemStr) {
//         return null;
//     }

//     const item = JSON.parse(itemStr);
//     const now = new Date();

//     // Check if the item is expired
//     if (now.getTime() > item.expiry) {
//         // Remove item from sessionStorage if expired
//         sessionStorage.removeItem(key);
//         return null;
//     }

//     return item.value;
// };


// export { setItemWithExpiry, getItemWithExpiry };