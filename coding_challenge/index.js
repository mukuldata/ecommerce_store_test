class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  }
  
  function findMaxProducts(products, budget) {
    const n = products.length;
  
    // Create DP table
    const dp = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(0));
  
    // Fill the DP table
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j <= budget; j++) {
        if (products[i - 1].price > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], 1 + dp[i - 1][j - products[i - 1].price]);
        }
      }
    }
  
    // Backtrack to find the combination
    let result = [];
    let w = budget;
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        result.push(products[i - 1]);
        w -= products[i - 1].price;
      }
    }
  
    return result.reverse();
  }
  
  // Test cases
  const products = [
    new Product("Product1", 20),
    new Product("Product2", 50),
    new Product("Product3", 30),
    new Product("Product4", 10),
    new Product("Product5", 40),
  ];
  
  const budgets = [50, 70, 100];
  
  budgets.forEach((budget, index) => {
    console.log(`Test Case ${index + 1}: Budget = ${budget}`);
    const result = findMaxProducts(products, budget);
    console.log("Max Items:", result.length);
    console.log("Combination:");
    result.forEach(product => console.log(`- ${product.name} ($${product.price})`));
    console.log();
  });