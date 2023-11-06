from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers.aiohttp_client import async_create_clientsession

import time

DOMAIN = "ir_remote_control"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:

    host = config[DOMAIN].get('host', None)
    if host is None:
        return False
    
    if host.endswith('/'):
        host = host[:-1]

    session = async_create_clientsession(hass)
    ac_state = await (await session.get(f'{host}/ac/state')).json()
    hass_set_ac_state(hass, ac_state)

    # Soundbar controls
    @callback
    async def volume_up(call: ServiceCall) -> None:
        data = dict(call.data)

        amount = int(data.pop('amount', 1))
        for _ in range(amount):
            await session.post(f'{host}/soundbar/volume-up', proxy=None, ssl=False)
            time.sleep(0.5)


    @callback
    async def volume_down(call: ServiceCall) -> None:
        data = dict(call.data)

        amount = int(data.pop('amount', 1))
        for _ in range(amount):
            await session.post(f'{host}/soundbar/volume-down', proxy=None, ssl=False)
            time.sleep(0.5)


    @callback
    async def toggle_input(call: ServiceCall) -> None:
        await session.post(f'{host}/soundbar/toggle-input', proxy=None, ssl=False)


    # AC controls
    @callback
    async def power_on(call: ServiceCall) -> None:
        if ac_state['power'] == True:
            return
        
        ac_state['power'] = True
        hass_set_ac_state(hass, ac_state)
        await session.post(f'{host}/ac/state', json=ac_state, proxy=None, ssl=False)


    @callback
    async def power_off(call: ServiceCall) -> None:
        if ac_state['power'] == False:
            return
        
        ac_state['power'] = False
        hass_set_ac_state(hass, ac_state)
        await session.post(f'{host}/ac/state', json=ac_state, proxy=None, ssl=False)


    @callback
    async def set_mode(call: ServiceCall) -> None:
        data = dict(call.data)
        mode = int(data.pop('mode', 0))
        if mode < 0 or mode > 4:
            return
        if ac_state['mode'] == mode:
            return
        
        ac_state['mode'] = mode
        hass_set_ac_state(hass, ac_state)
        await session.post(f'{host}/ac/state', json=ac_state, proxy=None, ssl=False)


    @callback
    async def set_temp(call: ServiceCall) -> None:
        data = dict(call.data)
        tempC = int(data.pop('tempC', 24))
        if tempC < 16 or tempC > 30:
            return
        if ac_state['tempC'] == tempC:
            return
        
        ac_state['tempC'] = tempC
        hass_set_ac_state(hass, ac_state)
        await session.post(f'{host}/ac/state', json=ac_state, proxy=None, ssl=False)

    
    hass.services.async_register(DOMAIN, 'volume_up', volume_up)
    hass.services.async_register(DOMAIN, 'volume_down', volume_down)
    hass.services.async_register(DOMAIN, 'toggle_input', toggle_input)

    hass.services.async_register(DOMAIN, 'power_on', power_on)
    hass.services.async_register(DOMAIN, 'power_off', power_off)
    hass.services.async_register(DOMAIN, 'set_mode', set_mode)
    hass.services.async_register(DOMAIN, 'set_temp', set_temp)

    return True


def hass_set_ac_state(hass, ac_state):
    powerOn = ac_state['power']
    hass.states.async_set("ir_remote_control.ac", 'on' if powerOn else 'off', ac_state)
