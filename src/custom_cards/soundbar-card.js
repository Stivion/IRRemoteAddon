import { LitElement, html, css, } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module';

class SoundbarCard extends LitElement {

    static get properties() {
        return {
            hass: {}
        };
    }

    render() {
        return html`
            <ha-card header="Soundbar Controls">
                <div class="card-content">
                    <div class="button-group">
                        <button @click="${() => this._power()}">
                            <ha-icon icon="mdi:power"></ha-icon>
                            <div>Power</div>
                        </button>
                        <button @click="${() => this._volumeUp()}">
                            <ha-icon icon="mdi:volume-plus"></ha-icon>
                            <div>Volume Up</div>
                        </button>
                        <button @click="${() => this._volumeDown()}">
                            <ha-icon icon="mdi:volume-minus"></ha-icon>
                            <div>Volume Down</div>
                        </button>
                        <button @click="${() => this._toggleInput()}">
                            <ha-icon icon="mdi:import"></ha-icon>
                            <div>Toggle Input</div>
                        </button>
                    </div>
                </div>
            </ha-card>
        `;
    }

    static get styles() {
        return css`
            .button-group ~ .button-group {
                margin-top: 8px;
            }

            .button-group button {
                background: transparent;
                appearance: none;
                border-width: 0px;
                color: var(--paper-item-icon-color, #44739e);
                cursor: pointer;
                position: relative;
            }

            .button-group {
                display: grid;
                grid-auto-flow: column;
                gap: 8px;
                border-radius: 4px;
                aspect-ratio: 8/1;
            }
        `;
    }

    _power() {
        this.hass.callService('ir_remote_control', 'soundbar_power');
    }

    _volumeUp() {
        this.hass.callService('ir_remote_control', 'soundbar_volume_up', {});
    }

    _volumeDown() {
        this.hass.callService('ir_remote_control', 'soundbar_volume_down', {});
    }

    _toggleInput() {
        this.hass.callService('ir_remote_control', 'soundbar_toggle_input');
    }

    // The user supplied configuration. 
    // Throw an exception and Home Assistant will render an error card.
    setConfig(config) {
        this.config = config;
    }

    // The height of your card. 
    // Home Assistant uses this to automatically distribute all cards over the available columns.
    getCardSize() {
        return 1;
    }

}

customElements.define('soundbar-card', SoundbarCard);
