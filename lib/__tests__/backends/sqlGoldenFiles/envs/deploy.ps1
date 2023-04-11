$passArguments = $args
 
$oldPreference = $ErrorActionPreference
$ErrorActionPreference = 'Stop'
Try { Get-Command snowsql | out-null }
Catch
{
    Write-Host "It looks like SnowSQL is not installed. Please download and install SnowSQL, then re-run this command." -ForegroundColor Yellow
    Write-Host "https://docs.snowflake.com/en/user-guide/snowsql.html" -ForegroundColor Yellow
    Exit
}
Finally {$ErrorActionPreference = $oldPreference}
 
$title = 'DEPLOY?'
$prompt = 'Are you sure you want to deploy your Snowflake account?'
$abort = New-Object System.Management.Automation.Host.ChoiceDescription '&No','Aborts the operation'
$continue = New-Object System.Management.Automation.Host.ChoiceDescription '&Yes','Continues with the operation'
$options = [System.Management.Automation.Host.ChoiceDescription[]] ($abort,$continue)
 
$choice = $host.ui.PromptForChoice($title,$prompt,$options,0)
 
if ( $choice -eq 0  ) { Exit }
 
Get-ChildItem -Path $PSScriptRoot -Filter *.sql |
 
Foreach-Object {
    $file = $_.FullName
    $cmd = "snowsql -o exit_on_error=True -f '$file' $passArguments"
    Write-Host $cmd
    Invoke-Expression $cmd
}
 