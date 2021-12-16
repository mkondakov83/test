const fs = require('fs')
const { exec }  = require("child_process")

const args = process.argv.slice(2)

if (args.length != 2) {
    console.error(`Incorrect count of arguments. Expected 2 input arguments: 1: path to Podfile, 2: path to package.json`);
    process.exitCode = 1
    return
}

const podfilePath = args[0]
const packageJsonPath = args[1]

function isFileExists(filePath) {
  
  try {
      if (!fs.existsSync(podfilePath)) {
        console.error(`${podfilePath} file does not exist`)
        return false
      }
      return true
    } catch(err) {
      console.error(err)
      return false
    }
}

if (!isFileExists(podfilePath) || !isFileExists(packageJsonPath)) {
    process.exitCode = 1
    return
}

const packageJsonFile = fs.readFileSync(packageJsonPath, 'utf8')
const parsedPackageJson = JSON.parse(packageJsonFile)

exec(`pod ipc podfile-json ${podfilePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Podfile parsing error: ${error.message}`)
        process.exitCode = 1
    }
    if (stderr) {
        console.error(`Podfile parsing error: ${stderr}`)
        process.exitCode = 1
    }
    const parsedPodfile = JSON.parse(`${stdout}`)
    const tagInPodfile = parsedPodfile.target_definitions.filter(d => d.name == 'Pods')[0].children[0].dependencies.filter(d => d.OCE != undefined)[0].OCE[0].tag
    const tagInPackageJson = parsedPackageJson.dependencies["oce-apps-bridges"]

    if (tagInPodfile == tagInPackageJson) {
        process.exitCode = 0
    } else {
        process.exitCode = 1
        console.error(`\x1b[31mError: OCE version in Podfile (${tagInPodfile}) does not equal to oce-apps-bridges version in package.json (${tagInPackageJson})`);
    }
    
})
