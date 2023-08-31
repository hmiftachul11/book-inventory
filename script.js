// Get references to HTML elements
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const bookListBody = document.getElementById("book-list-body");
const addButton = document.getElementById("add-button");

// Function to add a new book
function addBook(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const description = document.getElementById("description").value;
  const count = document.getElementById("count").value;

  // Create a new book object
  const book = {
    name,
    author,
    description,
    count,
  };

  // Add the book to Local Storage
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  // Clear the form fields
  bookForm.reset();

  // Refresh the book list
  displayBooks();
}

// Function to toggle between Edit and Save buttons for a book
function toggleEdit(index) {
  const row = bookListBody.rows[index];
  const editButton = row.querySelector(".edit-button");
  const saveButton = row.querySelector(".save-button");
  const cancelButton = row.querySelector(".cancel-button");
  const deleteButton = row.querySelector(".delete-button");

  if (editButton.style.display !== "none") {
    // Switch to edit mode
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
    deleteButton.style.display = "none";

    // Enable editing of fields
    row.cells[0].innerHTML = `<input type="text" value="${row.cells[0].innerText}" id="edit-name-${index}">`;
    row.cells[1].innerHTML = `<input type="text" value="${row.cells[1].innerText}" id="edit-author-${index}">`;
    row.cells[2].innerHTML = `<textarea id="edit-description-${index}">${row.cells[2].innerText}</textarea>`;
    row.cells[3].innerHTML = `<input type="number" value="${row.cells[3].innerText}" id="edit-count-${index}">`;
  } else {
    // Switch back to view mode and save changes
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    deleteButton.style.display = "inline-block";

    // Get updated values
    const updatedName = document.getElementById(`edit-name-${index}`).value;
    const updatedAuthor = document.getElementById(`edit-author-${index}`).value;
    const updatedDescription = document.getElementById(
      `edit-description-${index}`
    ).value;
    const updatedCount = document.getElementById(`edit-count-${index}`).value;

    // Update the book object and save to Local Storage
    const books = JSON.parse(localStorage.getItem("books"));
    books[index] = {
      name: updatedName,
      author: updatedAuthor,
      description: updatedDescription,
      count: updatedCount,
    };
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh the table
    displayBooks();
  }
}

// Function to delete a book
function deleteBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Function to save changes when the "Save" button is clicked
function saveEdit(index) {
  toggleEdit(index);
}

// Function to cancel editing and revert changes
function cancelEdit(index) {
  displayBooks();
}

// Modify the displayBooks() function to add Edit, Save, and Delete buttons
function displayBooks() {
  bookListBody.innerHTML = "";

  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.forEach((book, index) => {
    const row = bookListBody.insertRow();
    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.description}</td>
      <td>${book.count}</td>
      <td>
          <button class="edit-button" onclick="toggleEdit(${index})">Edit</button>
          <button class="save-button" style="display: none;" onclick="saveEdit(${index})">Save</button>
          <button class="cancel-button" style="display: none; background-color: #e73535;" onclick="cancelEdit(${index})">Cancel</button>
          <button class="delete-button" onclick="deleteBook(${index})" style="background-color: #e73535;">Delete</button>
      </td>
  `;
  });
}

// Initial display of books
displayBooks();

// Event listener for the form submission
bookForm.addEventListener("submit", addBook);

// Event listener for the "Add Book" button
addButton.addEventListener("click", () => {
  // Toggle to edit mode for adding a new book
  toggleEdit(-1);
});
