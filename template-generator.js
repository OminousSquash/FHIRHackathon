document
  .getElementById("showFormButton")
  .addEventListener("click", function () {
    var formsContainer = document.getElementById("formsContainer");
    var newForm = formsContainer.querySelector(".dynamicForm").cloneNode(true);
    formsContainer.appendChild(newForm);
    newForm.style.display = "block";
  });

document
  .getElementById("formsContainer")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    var formData = {};
    var form = event.target.closest("form");
    form.querySelectorAll("input").forEach(function (input) {
      formData[input.name] = input.value;
    });
    appendToList(formData);
  });

document.getElementById("submitAllButton").addEventListener("click", () => {
  var resultArray = [];
  const formEl = document.querySelector("#formName");
  const formData = new FormData(formEl);
  resultArray.push(Object.fromEntries(formData));

  var formDataArray = [];
  document.querySelectorAll("#formDataList li").forEach(function (li) {
    var fD = JSON.parse(li.textContent);
    formDataArray.push(fD);
  });
  resultArray.push(formDataArray);
  var jsonData = JSON.stringify(resultArray);
  var blob = new Blob([jsonData], { type: "application/json" });

  // Create a link element to trigger the download
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the filename for the downloaded file

  // Append the link to the body and click it to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link element from the DOM
  document.body.removeChild(link);
});

function appendToList(formData) {
  var list = document.getElementById("formDataList");
  var listItem = document.createElement("li");
  listItem.textContent = JSON.stringify(formData);
  list.appendChild(listItem);
}
