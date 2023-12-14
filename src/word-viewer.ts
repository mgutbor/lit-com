import { css, html,LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js'

@customElement('word-viewer')
class WordViewer extends LitElement {
  static styles = css`
    :host{
      color: red;
      cursor: pointer;
      padding: 2em;
      display: block;
    }
    pre{
      background-color: #cacaca;
      padding: .5em;
    }
    pre.atras{
      background-color: red;
      color: white;
    }
  `; 

  @state() private index = 0;
  @state() private playDirection = 1;

  @property({reflect: true}) words: string = '';

  private intervalTimer?: number;

  override connectedCallback() {
    super.connectedCallback();
    // @ts-ignore
    this.intervalTimer = setInterval(this.tickToNextWord, 1000);  
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalTimer);
    this.intervalTimer = undefined;
  }
  render() {
    const splitWords = this.words.split(' ');
    return html`
      <pre 
        @click=${this.switchPlayDirection}
        class=${classMap({atras: this.playDirection === -1})}>
          ${splitWords[((this.index % splitWords.length) + splitWords.length) % splitWords.length]}
      </pre>`;
  }

  tickToNextWord = () => { this.index += this.playDirection };

  switchPlayDirection = () => { this.playDirection *= -1 };
}