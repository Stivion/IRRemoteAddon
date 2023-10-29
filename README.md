# IR Remote Addon

## Description
This is a custom Home Assistant addon for controlling ESP8266 based infrared remote control via Yandex Station.

Functionality:
* Handle IR related events and send them to ESP8266 via HTTP
* ESP8266 receives commands and handles them using [custom-made IR Remote Control project](https://github.com/Stivion/IRRemoteControl)

## Prerequisites
* [Cross-platform Powershell](https://github.com/PowerShell/PowerShell) `pwsh` for building and publishing an addon
* Python3

## Building and publishing
This process is handled by 2 separate scripts - `build.ps1` and `publish.ps1`. Batch files are just a handy double-clickable wrappers for actual Powershell scripts.

Since Home Assistant will build and run Docker container by itself, those scripts just packing all required files into archive and sends them to a Home Assistant server.
