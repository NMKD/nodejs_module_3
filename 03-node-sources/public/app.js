const titleNodeList = document.querySelectorAll(".list-group-item");
const listNode = document.querySelectorAll("#list");
const arrNodeList = [...titleNodeList];
const arrList = [...listNode];

function formEdit(id, title) {
  return `
  <div class=" mx-3">
  <input type="text" class="form-control" name="title" value=${title} id=${id} />
  </div>
<div>
  <button class="btn btn-primary my-3" id="save" data-type="save" data-id=${id}>Сохранить</button>
  <button class="btn btn-danger my-3" id="back" data-type="back" data-id=${id}>Отменить</button>
</div>`;
}

function listTemplate(id, title) {
  return `<li
  class="list-group-item border-0"
>
${title}

</li>
<div>
  <button
    class="btn btn-primary"
    data-type="edit"
    data-id=${id}
  >
    Обновить
  </button>

  <button
    class="btn btn-danger"
    data-type="remove"
    data-id=${id}
  >
    &times;
  </button>`;
}

document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  const targetNode = arrList[arrList.indexOf(event.target.closest("#list"))];
  const input = targetNode.querySelector(".form-control");
  let text = !arrNodeList[arrList.indexOf(event.target.closest("#list"))]
    ?.textContent
    ? ""
    : arrNodeList[arrList.indexOf(event.target.closest("#list"))].textContent;

  switch (event.target.dataset.type) {
    case "remove":
      targetNode.remove(id);
      remove(id);
      break;
    case "edit":
      targetNode.innerHTML = formEdit(id, text);
      changeTitle(input);
    case "save":
      update(id, input.value).then(() => {
        targetNode.innerHTML = listTemplate(id, input.value);
      });
    case "back":
      targetNode.innerHTML = listTemplate(id, input.value);
  }
});

function changeTitle(input) {
  input.oninput = function () {
    this.value;
  };
}

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
