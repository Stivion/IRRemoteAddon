param(
    [string]$archiveName
)

$textColor = "Green"

Set-Location ..\
$rootDir = Get-Location
$outputDir = "$rootDir\output"

function CreateAddonStructure() {
    Write-Host "Creating addon struccure" -ForegroundColor $textColor
    if (Test-Path $outputDir) {
        Remove-Item $outputDir -Force -Recurse
    }

    New-Item "$outputDir" -ItemType Directory | Out-Null
    New-Item "$outputDir\deploy" -ItemType Directory | Out-Null
}

function CopyFiles() {
    Write-Host "Copying addon files" -ForegroundColor $textColor
    Copy-Item "$rootDir\build\deploy.sh" "$outputDir\deploy" -Force
    Copy-Item "$rootDir\config.yaml" "$outputDir" -Force
    Copy-Item "$rootDir\Dockerfile" "$outputDir" -Force
    Copy-Item "$rootDir\run.sh" "$outputDir" -Force
    Copy-Item "$rootDir\src" "$outputDir" -Force -Recurse
}

function ArchiveAddon() {
    Write-Host "Archiving addon files" -ForegroundColor $textColor
    Compress-Archive -Path "$outputDir\*" -DestinationPath "$outputDir\$archiveName.zip" -CompressionLevel Optimal
    if (!$?) {
        Exit
    }
}

function CopyPublishScripts() {
    Write-Host "Copying publish scripts" -ForegroundColor $textColor
    Copy-Item "$rootDir\build\publish.bat" "$outputDir" -Force
    Copy-Item "$rootDir\build\publish.ps1" "$outputDir" -Force
}

function Cleanup() {
    Get-ChildItem "$outputDir" -Exclude "$archiveName.zip" | Remove-Item -Recurse -Force
}

CreateAddonStructure
CopyFiles
ArchiveAddon
Cleanup
CopyPublishScripts
