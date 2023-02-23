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

    textarea {
      display: block;
    }
  `;

  constructor() {
    super();
    this.vercelBase = '';
    if (
      window.location.origin.startsWith("http://127.0.0.1") ||
      window.location.origin.startsWith("http://localhost")
    ) {
      this.vercelBase = window.location.origin
        .replace(/127.0.0.1:8(.*)/, "localhost:3000")
        .replace(/localhost:8(.*)/, "localhost:3000");
    }
  }

  render() {
    return html`
      <button class="button" @click="${this._parseXMLString}">
        XML Parse String
      </button>
      <button class="button" @click="${this._xmlFromFile}">XML File</button>
      <textarea cols="50" rows="40">

      </textarea>
    `;
  }
  // get XML from our microservice
  goGetXML(xmlStr) {
    fetch(`${this.vercelBase}/api/xmlToJson`, {
      method: "POST",
      body: JSON.stringify({
        xml: xmlStr,
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      this.shadowRoot.querySelector('textarea').value = JSON.stringify(data, null, 2);
      console.log(data);
    });
  }

  //parsing strings in DOM tree
  _parseXMLString() {
    const xmlStr = '<q id="a"><span id="b">hey!</span></q>';
    this.goGetXML(xmlStr);
  }

  _xmlFromFile() {
    const xmlfile = new URL("./securityLog.xml", import.meta.url).href;
    console.log(xmlfile);
    fetch(xmlfile).then((response) => response.text()).then((data) => {
      if (data) {
        this.goGetXML(data);
      }
    });
  }
}

customElements.define("security-log-parser", SecurityLogParser);
