const checker = require('license-checker-rseidelsohn')
const path = require('path')
const fs = require('fs')

/*
copyright
description
email
licenseFile
licenseModified
licenses
licenseText
name
publisher
repository
url
version
 */
const customFormat = {
  copyright: '',
  licenses: '',
  name: '',
  repository: '',
  url: '',
  licenseText: '',
  licenseFile: '',
  version: ''
}

const noticeFiles = ['NOTICE', 'NOTICE.txt', 'NOTICE.md', 'NOTICES', 'NOTICES.txt', 'NOTICES.md']

console.log('NOTICES\n\nThis repository incorporates material as listed below or described in the code.\n\n')

/*
Dependency name, version, and URL
A faithful copy of the LICENSE.txt in the source code (the SPDX license template is not sufficient)
A faithful copy of any NOTICE files in the source code, if present
 */
checker.init(
  {
    start: '.',
    customFormat
  },
  function (err, packages) {
    if (err) {
      console.error(err.message)
    } else {
      for (const packageObj of Object.values(packages)) {
        for (const noticeFile of noticeFiles) {
          const noticePath = path.join(path.dirname(packageObj.licenseFile), noticeFile)
          if (packageObj.licenseFile && fs.existsSync(noticePath)) {
            console.log('\nNOTICE:\n***\n' + fs.readFileSync(noticePath, 'utf-8') + '\n***\n')
          }
        }

        console.log(`${packageObj.name} ${packageObj.version} - ${packageObj.licenses}`)
        console.log(`Repository: ${packageObj.repository}`)
        if (packageObj.url) console.log(`URL: ${packageObj.url}`)
        console.log(`\n${packageObj.licenseText}`)
        console.log('\n---------------------------------------\n')
      }
    }
  },
);