const titleNodeList = document.querySelectorAll(".list-group-item");
const listNode = document.querySelectorAll("#list");

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    const arrList = [...listNode];
    arrList[arrList.indexOf(event.target.closest("#list"))].remove();

    remove(id);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "open") {
    const id = event.target.dataset.id;
    const title = prompt(
      "Изменить заголовок на:",
      event.target.closest("#list").childNodes[1].outerText
    );

    const arrNodeList = [...titleNodeList];
    const arrList = [...listNode];
    arrNodeList[arrList.indexOf(event.target.closest("#list"))].textContent =
      title;

    update(id, title);
  }
});

async function remove(id) {
  return fetch(`/${id}`, { method: "DELETE" });
}

async function update(id, value) {
  return fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title: value, id }),
  });
}
