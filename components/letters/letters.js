// ./components/letters/letters.js
class BotonLetra extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.boton = document.createElement('button');
      this.boton.textContent = this.getAttribute('letra') || '';
  
      const style = document.createElement('style');
      style.textContent = `
        button {
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          padding: 8px 12px;
          margin: 2px;
          cursor: pointer;
          font-size: 1em;
          min-width: 30px;
          text-align: center;
        }
  
        button:disabled {
          background-color: #ddd;
          color: #999;
          border-color: #bbb;
          cursor: default;
        }
      `;
  
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(this.boton);
  
      this.boton.addEventListener('click', () => {
        this.disabled = true;
        const letra = this.boton.textContent;
        this.dispatchEvent(new CustomEvent('letra-seleccionada', { detail: letra }));
      });
    }
  
    static get observedAttributes() {
      return ['letra', 'disabled'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'letra' && this.boton) {
        this.boton.textContent = newValue;
      }
      if (name === 'disabled' && this.boton) {
        this.boton.disabled = newValue !== null;
      }
    }
  
    get disabled() {
      return this.hasAttribute('disabled');
    }
  
    set disabled(value) {
      if (value) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }
  }
  
  customElements.define('boton-letra', BotonLetra);