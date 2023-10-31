import inquirer from 'inquirer';
import fs from 'fs'

const users = []

const getUser = async() => {
    const user = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the user name (press Enter to stop adding users): ",
        },
        {
            type: "list",
            name: "gender",
            message: "Select gender:",
            choices: ["Male", "Female"],
            when: ({ name }) => name,
        },
        {
            type: "input",
            name: "age",
            message: "Enter age:",
            when: ({ name }) => name,
            validate: (age) => !isNaN(age),
        }
    ]).then(({name, gender, age}) => {
        if (name) {
            users.push({name, gender, age})
            console.log(users)
            getUser()
        } else {
            updateDB(users)
            showUsers()
            // searchByName()
        }
    })
    // console.log(user)
}

const updateDB = (data) => {
    fs.writeFileSync("./db.txt", JSON.stringify(data));
    console.log("All users:");
    console.log(data);
}

const showUsers = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you to search values in db? "
        }
    ]).then(({answer}) => {
        if (answer) {
            console.log((users.length > 0) ? users : "Sorry, the database is empty now")
        }
    })
    searchByName()
}

const searchByName = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter user's name you wanna find in db: "
        }
    ]).then(({ name }) => {
            const foundUser = users.find((user) => user.name.toLowerCase() === name.toLowerCase());
            if (foundUser) {
              console.log(`User found: ${JSON.stringify(foundUser)}`);
            } else {
              console.log("User not found.");
            }
    });
}

fs.readFile("db.txt", (err, data) => {
    if (data.length > 0) {
      users.push(JSON.parse(data));
    }
  });
  
getUser();
