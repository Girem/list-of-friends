const urlParams = new URLSearchParams(window.location.search);
const apiUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/";

const userId = urlParams.get("user");

async function loadUser() {
  const response = await fetch(`${apiUrl}user/${userId}`);
  const user = await response.json();

  const profileImg = document.querySelector(".profile-img");
  const profileTitle = document.querySelector(".profile-title");
  const profileSubtitle = document.querySelector(".profile-subtitle");
  const profileList = document.querySelectorAll(".profile-list-item");

  profileImg.src = user.imageUrl;
  profileImg.alt = `Profile Image of ${user.name} ${user.lastName}`;
  profileTitle.textContent = `${user.prefix} ${user.name} ${user.lastName}`;
  profileSubtitle.textContent = `${user.title}, ${user.company.name}`;
  profileList[0].textContent = `Name: ${user.name} ${user.lastName}`;
  profileList[1].textContent = `Job Title: ${user.title}`;
  profileList[2].textContent = `Company: ${user.company.name}`;
  profileList[3].textContent = `Job Type: ${user.jobType}`;
  profileList[4].textContent = `Email: ${user.email}`;
  profileList[5].textContent = `IP Address: ${user.ip}`;
  profileList[6].textContent = `Street Address: ${user.address.streetAddress}`;
  profileList[7].textContent = `City: ${user.address.city}`;
  profileList[8].textContent = `State: ${user.address.state}`;
  profileList[9].textContent = `Zip Code: ${user.address.zipCode}`;
  profileList[10].textContent = `Country: ${user.address.country}`;
}

async function loadFriends() {
  const usersContainer = document.getElementById("users");
  const loadingIndicator = document.querySelector(".loading");

  let page = 1;
  const size = 20;
  let isLoading = false;
  try {
    isLoading = true;
    loadingIndicator.style.display = "block";

    const response = await fetch(
      `${apiUrl}user/${userId}/friends/${page}/${size}`
    );
    const data = await response.json();

    data.list.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");

      const userImage = document.createElement("img");
      userImage.src = `${user.imageUrl}?v=${user.id}`;
      userCard.appendChild(userImage);

      const userName = document.createElement("h2");
      userName.innerText = `${user.name} ${user.lastName}`;
      userCard.appendChild(userName);

      const userTitle = document.createElement("p");
      userTitle.innerText = `${user.prefix} ${user.title}`;
      userCard.appendChild(userTitle);

      userCard.addEventListener("click", () => {
        window.location.href = `user.html?user=${user.id}`;
      });

      usersContainer.appendChild(userCard);
    });

    isLoading = false;
    loadingIndicator.style.display = "none";
    page++;
  } catch (error) {
    console.error(error);
  }
  window.addEventListener("scroll", () => {
    if (isLoading) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadFriends();
    }
  });
}
loadUser();

loadFriends();
