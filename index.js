console.log("Please update data into the variable inputData variable");
let inputData ="-3\n2";
// add("3\n2");
// console.log("comma")
// add("3,2")
CalculateSum(inputData)
class NegNumException extends Error {
  constructor(message) {
    super(message);
    this.name = "NegativeNumberException";
  }
}

function CalculateSum(inData) {
  if (!inData) return 0;
  console.log("Input Data : ", inData)
// Defaultdelimiters(comma / newline)
  let delimiter = /,|\n|\n/;  
  if (inData.startsWith("//")) {
    const delimiterMatch = inData.match(/^\/\/(.*?)\n/);
    if (delimiterMatch) {
      delimiter = new RegExp(escapeRegExp(delimiterMatch[1]));
      inData = inData.slice(delimiterMatch[0].length);  
      //Remove the delimiter line
    }
  }

 
  const numList = inData.split(delimiter);  //Split the numbers with delimiter

  //Convert numbers to integers and check for negatives
  const negNumbers = [];
  let sum = 0;

  numList.forEach((num) => {
    const data = parseInt(num, 10);
    if (isNaN(data)) return; // skip empty strings or invalid numbers

    if (data < 0) {
      negNumbers.push(data);
    } else {
      sum += data;
    }
  });

  //If there are negative numbers,throw an exception
  if (negNumbers.length > 0) {
    throw new NegNumException(`Negative numbers not allowed: ${negNumbers.join(", ")}`);
  }
  console.log("Result :")
  console.log(sum)
  
  return sum;
}

// Helper function to escape the delimiter regex (in case the delimiter contains special characters like ".", "*", etc.)
function escapeRegExp(str) {
  return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}

module.exports = { add: CalculateSum, NegativeNumberException: NegNumException };
