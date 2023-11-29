import { LitElement, html, css, } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module';

class AcCard extends LitElement {

    static get properties() {
        return {
            hass: {},
            config: {}
        };
    }

    render() {
        const entityId = this.config.entity;
        const state = this.hass.states[entityId];
        const attributes = state.attributes;

        return html`
            <ha-card header="AC Controls">
                <div class="card-content">
                    <div class="button-group">
                        <button data-active=${state.state === 'on' ? 'true' : 'false'} @click="${() => this._toggle(state)}">
                            <ha-icon icon="mdi:power"></ha-icon>
                            <div>${state.state === 'on' ? 'Turn Off' : 'Turn On'}</div>
                        </button>
                    </div>
                    <div class="button-group">
                        <button data-active=${attributes.mode === 0 ? 'true' : 'false'} @click="${() => this._setMode(0)}">
                            <ha-icon icon="mdi:thermostat-auto"></ha-icon>
                            <div>Auto</div>
                        </button>
                        <button data-active=${attributes.mode === 1 ? 'true' : 'false'} @click="${() => this._setMode(1)}">
                            <ha-icon icon="mdi:snowflake"></ha-icon>
                            <div>Cool</div>
                        </button>
                        <button data-active=${attributes.mode === 2 ? 'true' : 'false'} @click="${() => this._setMode(2)}">
                            <ha-icon icon="mdi:water-outline"></ha-icon>
                            <div>Dry</div>
                        </button>
                        <button data-active=${attributes.mode === 3 ? 'true' : 'false'} @click="${() => this._setMode(3)}">
                            <ha-icon icon="mdi:fan"></ha-icon>
                            <div>Fan</div>
                        </button>
                        <button data-active=${attributes.mode === 4 ? 'true' : 'false'} @click="${() => this._setMode(4)}">
                            <ha-icon icon="mdi:weather-sunny"></ha-icon>
                            <div>Heat</div>
                        </button>
                    </div>
                    <div class="button-group">
                        <button @click="${() => this._decreaseTemp(attributes.tempC)}">
                            <ha-icon icon="mdi:arrow-left"></ha-icon>
                        </button>
                        <div class="temp-indicator">${attributes.tempC}°C</div>
                        <button @click="${() => this._increaseTemp(attributes.tempC)}">
                            <ha-icon icon="mdi:arrow-right"></ha-icon>
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

            .button-group button[data-active="true"] {
                color: var(--primary-color, #03a9f4);
            }

            .button-group button[data-active="true"]::before {
                content: "";
                background-color: var(--primary-color, #03a9f4);
                opacity: 0.12;

                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                border-radius: 4px;
            }

            .button-group {
                display: grid;
                grid-auto-flow: column;
                gap: 8px;
                border-radius: 4px;
                aspect-ratio: 8/1;
            }

            .button-group .temp-indicator {
                display: grid;
                font-size: 24px;
                place-content: center;
            }
        `;
    }

    _toggle(state) {
        const on = state.state === 'on';
        const method = on ? 'ac_power_off' : 'ac_power_on';
        this.hass.callService('ir_remote_control', method);
    }

    _setMode(mode) {
        /*
         * Modes: 
         * `0 - Auto`
         * `1 - Cool`
         * `2 - Wet`
         * `3 - Fan`
         * `4 - Heat`
         */
        this.hass.callService('ir_remote_control', 'ac_set_mode', {
            mode: mode
        });
    }

    _increaseTemp(tempC) {
        // 30C - max
        this.hass.callService('ir_remote_control', 'ac_set_temp', {
            tempC: Math.min(tempC + 1, 30)
        });
    }

    _decreaseTemp(tempC) {
        // 16C - min
        this.hass.callService('ir_remote_control', 'ac_set_temp', {
            tempC: Math.max(tempC - 1, 16)
        });
    }

    // The user supplied configuration. 
    // Throw an exception and Home Assistant will render an error card.
    setConfig(config) {
        if (!config.entity) {
            throw new Error('You need to define an entity');
        }
        this.config = config;
    }

    // The height of your card. 
    // Home Assistant uses this to automatically distribute all cards over the available columns.
    getCardSize() {
        return 1;
    }

}

customElements.define('ac-card', AcCard);
