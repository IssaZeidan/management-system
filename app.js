// Checking if there is any saved data in the local storage to be displayed in the browser

let usersData = JSON.parse(localStorage.getItem("data"));
if (usersData && usersData.length) {
  usersData.forEach((user) => {
    drawCard({
      fullName: user.fullName,
      idNum: user.idNum,
      userDp: user.userDp,
      userLevel: user.userLevel,
      image: user.image,
      saveUser: false,
      isNewUser : false,
      salary: user.salary,
    });
  });
}

// Getting the needed data from the HTML page

function handleSubmitForm(e) {
  e.preventDefault();
  const fullName = e.target.fullName.value;
  const id = e.target.idNum.value;
  const userDepartment = e.target.department.value;
  const userLevel = e.target.level.value;
  drawCard({
    fullName,
    idNum: id,
    userDp: userDepartment,
    userLevel,
    image: "./assets/OIP.jpg",
    saveUser: true,
    isNewUser: true
  });
  document.getElementById("myForm").reset();
}

// drawing the card with the needed information

function drawCard({ fullName,idNum, userDp, userLevel, image, saveUser, isNewUser , salary}) {
  const randomSalary = isNewUser ? calculateSalary(userLevel) : salary
  const card = document.getElementById("card");
  const userCard = document.createElement("div")
  userCard.setAttribute("class" , "card w-25 h-25 my-4 mx-auto")
  const userImage = document.createElement("img");
  userImage.setAttribute("src", image);
  userImage.setAttribute("class","card-img-top") 
  const name = document.createElement("p");
  name.innerHTML = "Name: " + fullName;
  name.setAttribute("class","text-center");
  const id = document.createElement("p");
  id.innerHTML = "Id: " + idNum;
  id.setAttribute("class","text-center");
  const userDe = document.createElement("p");
  userDe.innerHTML = "department: " + userDp;
  userDe.setAttribute("class" , "text-center");
  const level = document.createElement("p");
  level.innerHTML = "level: " + userLevel;
  level.setAttribute("class" , "text-center");
  const userSalary = document.createElement("p");
  userSalary.innerHTML = "Salary:" + randomSalary;
  userSalary.setAttribute("class" , "text-center")
  userCard.appendChild(userImage);
  userCard.appendChild(name);
  userCard.appendChild(id);
  userCard.appendChild(userDe);
  userCard.appendChild(level);
  userCard.appendChild(userSalary);
  card.appendChild(userCard);

  if (saveUser) {
    saveToStorage({ image, fullName,idNum , userDp, userLevel, salary: randomSalary });
  }
}

function calculateSalary(level) {
  const positionSalary = {
    Junior: [500, 1000],
    "Mid-Senior": [1000, 1500],
    Senior: [1500, 2000],
  };
  const maxSalary = positionSalary[level][1];
  const minSalary = positionSalary[level][0];
  return Math.round(Math.random() * (maxSalary - minSalary) + minSalary);
}

// Saving the Data in the Local Storage

function saveToStorage(data) {
  let usersData = JSON.parse(localStorage.getItem("data"));
  if (!usersData) {
    usersData = [];
  }
  usersData.push(data);
  localStorage.setItem("data", JSON.stringify(usersData));
}
