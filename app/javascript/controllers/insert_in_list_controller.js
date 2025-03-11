import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"]
  send(event) {
    event.preventDefault();
    // console.log("insert in list")
    // console.log("controller", this.element)
    console.log("target", this.itemsTarget)
    console.log("form", this.formTarget)
    console.log("form", this.formTarget.action)

    fetch(this.formTarget.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.inserted_item) {
          console.log(data.inserted_item)
          this.itemsTarget.insertAdjacentHTML("beforeend", data.inserted_item)
        }
        this.formTarget.outerHTML = data.form
      })
  }
}
