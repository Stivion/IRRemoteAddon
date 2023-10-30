from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers.aiohttp_client import async_create_clientsession

import time


DOMAIN = "ir_remote_control"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:

    session = async_create_clientsession(hass)

    # Soundbar controls
    @callback
    async def volume_up(call: ServiceCall) -> None:
        data = dict(call.data)

        amount = int(data.pop('amount', 1))
        for _ in range(amount):
            await session.post('http://192.168.50.91/soundbar/volume-up', proxy=None, ssl=False)
            time.sleep(0.5)


    @callback
    async def volume_down(call: ServiceCall) -> None:
        data = dict(call.data)

        amount = int(data.pop('amount', 1))
        for _ in range(amount):
            await session.post('http://192.168.50.91/soundbar/volume-down', proxy=None, ssl=False)
            time.sleep(0.5)


    @callback
    async def toggle_input(call: ServiceCall) -> None:
        await session.post('http://192.168.50.91/soundbar/toggle-input', proxy=None, ssl=False)


    # AC controls
    @callback
    async def power_on(call: ServiceCall) -> None:
        pass

    @callback
    async def power_off(call: ServiceCall) -> None:
        pass

    @callback
    async def set_mode(call: ServiceCall) -> None:
        pass

    @callback
    async def set_temp(call: ServiceCall) -> None:
        pass

    
    hass.services.async_register(DOMAIN, 'volume_up', volume_up)
    hass.services.async_register(DOMAIN, 'volume_down', volume_down)
    hass.services.async_register(DOMAIN, 'toggle_input', toggle_input)

    hass.services.async_register(DOMAIN, 'power_on', power_on)
    hass.services.async_register(DOMAIN, 'power_off', power_off)
    hass.services.async_register(DOMAIN, 'set_mode', set_mode)
    hass.services.async_register(DOMAIN, 'set_temp', set_temp)

    return True
