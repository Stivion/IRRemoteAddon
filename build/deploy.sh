#!/usr/bin/with-contenv bashio

Green='\033[0;32m'
NoColor='\033[0m'

archiveName=$1

# Stop on error
set -e

rm $archiveName.zip

RebuildAddon() {
    printf "${Green}Rebuilding addon${NoColor}\n"
    ha addons rebuild "local_${archiveName}" || (printf "${Green}Addon is not installed. Installing${NoColor}\n" && ha addons install "local_${archiveName}")
}

StartAddon() {
    printf "${Green}Starting addon${NoColor}\n"
    ha addons start "local_${archiveName}"
}

RebuildAddon
StartAddon

printf "${Green}Deploy completed successfully${NoColor}\n"
