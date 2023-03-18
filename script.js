const apiUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/";

const usersContainer = document.getElementById("users");
const loadingIndicator = document.querySelector(".loading");

let page = 1;
const size = 20;
let isLoading = false;

async function loadUsers() {
  try {
    isLoading = true;
    loadingIndicator.style.display = "block";

    const response = await fetch(`${apiUrl}user/${page}/${size}`);
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
}

window.addEventListener("scroll", () => {
  if (isLoading) {
    return;
  }

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadUsers();
  }
});

loadUsers();
