# Services
This directory contains custom services that are available in `configuration.yaml` file

# Important
Reboot your Home Assistant device after any changes to `async_setup` function

# Soundbar remote
Soundbar remote integrations allows to control soundbar

Available commands:
* `volume_up`
* `volume_down`
* `toggle_input`

`volume_up` and `volume_down` commands accepts integer amount by how much increase/decrease volume

# AC remote
AC remote integrations allows to control AC
* `power_on`
* `power_off`
* `set_mode`
* `set_temp`

`set_mode` and `set_temp` commands accepts integer data for mode/temp respectively.

Temperature should be in range [16, 30] degrees Celcius.

Available modes:
* `0 - Auto`
* `1 - Cool`
* `2 - Wet`
* `3 - Fan`
* `4 - Heat`
