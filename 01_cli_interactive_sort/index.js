const readline = require('readline');

userInput = []

const sortWords = (array) => {
  return array.sort()
}

const sortNumAsc = (array) => {
  return array.sort((a, b) => a - b)
}

const sortNumDesc = (array) => {
  return array.sort((a, b) => b - a)
}

const sortWordsLength = (array) => {
  return array.sort((a, b) => a.length - b.length)
}

const getUniqueWords = (array) => {
  return [...new Set(array)]
}

const getUniqueValues = (array) => {
  return [...new Set(array)]
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const getUserData = () => {
    rl.question('Hello. Enter 10 words or digits dividing them in spaces: ', (input) => {
        console.log(`You entered: ${input}`);
        userInput = input.split(" ")
        console.log(userInput)
        sort(userInput)
      });
}

const sort = (userInput) => {
    rl.question(
        "How would you like to sort the input?\n" +
          "1. Sort words alphabetically\n" +
          "2. Show numbers from lesser to greater\n" +
          "3. Show numbers from bigger to smaller\n" +
          "4. Display words in ascending order by number of letters in the word\n" +
          "5. Show only unique words\n" +
          "6. Display only unique values from the set of words and numbers entered by the user\n" +
          "7. To exit the program, enter 'exit'\n",
        (input) => {
          switch (input) {
            case "1":
              console.log(sortWords(userInput.filter((x) => isNaN(x))));
              break;
            case "2":
              console.log(sortNumAsc(userInput.filter((x) => !isNaN(x))));
              break;
            case "3":
              console.log(sortNumDesc(userInput.filter((x) => !isNaN(x))));
              break;
            case "4":
              console.log(sortWordsLength(userInput.filter((x) => isNaN(x))));
              break;
            case "5":
              console.log(getUniqueWords(userInput.filter((x) => isNaN(x))));
              break;
            case "6":
              console.log(getUniqueValues(userInput));
              break;
            case "exit":
              rl.close()
              break;
            default:
              console.log("Invalid option");
          }
          tryAgain()
        }
      );
}

getUserData()

const tryAgain = () => {
  rl.question('Do you want to try again? ', (input) => {
    if (input === 'yes') {
      getUserData()
    }
    else {
      rl.close();
    }
  });
}
