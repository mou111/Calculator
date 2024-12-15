console.log("Please update data into the variable inputData variable");
let inputData: string = "3\n2";

// Call CalculateSum function
CalculateSum(inputData);

class NegNumException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NegNumException";
  }
}

function CalculateSum(inData: string): number {
  if (!inData) return 0;
  console.log("Input Data: ", inData);

  // Default delimiters (comma / newline)
  let delimiter: RegExp = /,|\n/;
  if (inData.startsWith("//")) {
    const delimiterMatch = inData.match(/^\/\/(.*?)\n/);
    if (delimiterMatch) {
      delimiter = new RegExp(escapeRegExp(delimiterMatch[1]));
      inData = inData.slice(delimiterMatch[0].length); // Remove the delimiter line
    }
  }

  let numList: string[] = inData.split(delimiter);  // Split the numbers by delimiter

  // Convert numbers to integers and check for negatives
  let negNumbers: number[] = [];
  let sum: number = 0;

  numList.forEach((num) => {
    let data: number = parseInt(num, 10);
    if (isNaN(data)) return; // Skip empty strings or invalid numbers

    if (data < 0) {
      negNumbers.push(data);
    } else {
      sum += data;
    }
  });

  // If there are negative numbers, throw an exception
  if (negNumbers.length > 0) {
    throw new NegNumException(`Negative numbers not allowed: ${negNumbers.join(", ")}`);
  }

  console.log("Result:");
  console.log(sum);

  return sum;
}

// Helper function to escape the delimiter regex (in case the delimiter contains special characters like ".", "*", etc.)
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}

export { CalculateSum, NegNumException };
