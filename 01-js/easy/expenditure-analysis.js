/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const categoryWiseTotalSpent = {};
  for (const t in transactions) {
    categoryWiseTotalSpent[transactions[t].category] = 
      (categoryWiseTotalSpent[transactions[t].category] || 0) + transactions[t].price;
  }
  const listOfObjs = [];
  for (const key in categoryWiseTotalSpent) {
    const objToReturn = {};
    objToReturn.category = key;
    objToReturn.totalSpent = categoryWiseTotalSpent[key];
    listOfObjs.push(objToReturn);
  }
  return listOfObjs;
}

module.exports = calculateTotalSpentByCategory;
