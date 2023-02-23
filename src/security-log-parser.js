import { LitElement, html, css } from "lit";

class SecurityLogParser extends LitElement {
  static properties = {};

  static styles = css`
    .button {
      position: relative;
      text-align: center;
      padding: 20px;
      border-radius: 30px;
      font-size: 30px;
      width: 500px;
    }
  `;

  constructor() {
    super();
    this.query = 'your xml query here'
  }

  render() {
    return html`
      <button class="button" @click="${this._parseXMLString}">
        XML String
      </button>
      <button class="button" @click="${this._XMLHttpRequest}">
        XML File
      </button>
      <p>${this.query}</p>
    `;
  }



  //parsing strings in DOM tree
  _parseXMLString() {
    const xmlStr = '<q id="a"><span id="b">hey!</span></q>';
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlStr, "application/xml");
    // print the name of the root element or error message
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      console.log("error while parsing");
    } else {
      console.log(doc.documentElement.nodeName);
    }
  }

  _XMLHttpRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("employee").innerHTML = xhr.responseText;
        }
    };
      xhr.open("GET", "/src/employee.xml", true);
      xhr.responseType = "document";
      xhr.send();

  }
}

customElements.define("security-log-parser", SecurityLogParser);
