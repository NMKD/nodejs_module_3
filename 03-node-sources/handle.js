class Title {
  handleEvent(event) {
    switch (event.target.dataset.type) {
      case "remove":
        listTitle.remove(id);
        remove(id);
    }
  }
}
