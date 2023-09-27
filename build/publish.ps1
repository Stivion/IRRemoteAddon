param(
    [string]$archiveName
)

$textColor = "Green"
$serverName = "ha"

Write-Host "Uploading addon" -ForegroundColor $textColor
ssh $serverName "rm -rf ~/addons/$archiveName && mkdir ~/addons/$archiveName"
scp "$archiveName.zip" "${serverName}:~/addons/$archiveName"

Write-Host "Running deploy script" -ForegroundColor $textColor
ssh $serverName "cd ~/addons/$archiveName && unzip $archiveName.zip && chmod -R +x ./deploy && deploy/deploy.sh" $archiveName
