#!/usr/bin/with-contenv bashio

Green='\033[0;32m'
NoColor='\033[0m'

archiveName=$1

# Stop on error
set -e

rm $archiveName.zip

# <config dir>/custom_components/hello_service/__init__.py

RebuildAddon() {
    printf "${Green}Rebuilding addon${NoColor}\n"
    ha addons rebuild "local_${archiveName}" || (printf "${Green}Addon is not installed. Installing${NoColor}\n" && ha addons install "local_${archiveName}")
}

StartAddon() {
    printf "${Green}Starting addon${NoColor}\n"
    ha addons start "local_${archiveName}"
}

CopyIntegrationService() {
    printf "${Green}Copying integration services${NoColor}\n"
    rm -rf ~/config/custom_components/ir_remote_control
    mkdir ~/config/custom_components/ir_remote_control
    mv src/custom_components/* ~/config/custom_components/ir_remote_control
    rm -rf src/custom_components
}

RebuildAddon
StartAddon
CopyIntegrationService

printf "${Green}Deploy completed successfully${NoColor}\n"
