document.addEventListener("DOMContentLoaded", () => {
  const homePage = document.getElementById("homePage");
  const bookPage = document.getElementById("bookPage");
  const registrationForm = document.getElementById("registrationForm");
  const loginForm = document.getElementById("loginForm");
  const publishForm = document.getElementById("publishForm");

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser();
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginUser();
  });

  publishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    publishBook();
  });

  function showHomePage() {
    homePage.style.display = "block";
    bookPage.style.display = "none";
  }

  function showBookPage() {
    homePage.style.display = "none";
    bookPage.style.display = "block";
    getUserBooks(); // Load user's books when the book page is displayed
    getPublishedBooks(); // Load published books when the book page is displayed
  }

  async function registerUser() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        showHomePage();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong during registration.");
    }
  }

  async function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        showBookPage();
        // Save the token in local storage for future requests
        localStorage.setItem("authToken", data.accessToken);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong during login.");
    }
  }

  async function publishBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3000/api/books/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book published successfully!");
        getUserBooks(); // Refresh the user's books after publishing
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during book publishing:", error);
      alert("Something went wrong during book publishing.");
    }
  }

  async function searchBooks() {
    const searchTitle = document.getElementById("searchTitle").value;

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:3000/api/books/search?title=${searchTitle}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        displaySearchResults(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during book search:", error);
      alert("Something went wrong during book search.");
    }
  }

  function displaySearchResults(books) {
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = "";

    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.textContent = `${book.title} by ${book.author}`;
      searchResultsContainer.appendChild(bookElement);
    });
  }

  async function unpublishBook() {
    const bookId = prompt("Enter the ID of the book to unpublish:");

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:3000/api/books/unpublish/${bookId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Book unpublished successfully!");
        getUserBooks(); // Refresh the user's books after unpublishing
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during book unpublishing:", error);
      alert("Something went wrong during book unpublishing.");
    }
  }

  async function getUserBooks() {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3000/api/books/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        displayUserBooks(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during fetching user books:", error);
      alert("Something went wrong during fetching user books.");
    }
  }

  async function displayUserBooks(books) {
    const userBooksContainer = document.getElementById("userBooks");
    userBooksContainer.innerHTML = "";

    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.textContent = `${book.title} by ${book.author}`;
      userBooksContainer.appendChild(bookElement);
    });
  }

  async function getPublishedBooks() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/books/published",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        displayPublishedBooks(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during fetching published books:", error);
      alert("Something went wrong during fetching published books.");
    }
  }

  async function displayPublishedBooks(books) {
    const publishedBooksContainer = document.getElementById("publishedBooks");
    publishedBooksContainer.innerHTML = "";

    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.textContent = `${book.title} by ${book.author}`;
      publishedBooksContainer.appendChild(bookElement);
    });
  }

  // Check if the user is already logged in (has a valid token)
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    showBookPage();
  } else {
    showHomePage();
  }
});
