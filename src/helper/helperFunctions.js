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

export { generateTransactionID ,address}