import * as fs from 'fs'
import * as archiver from 'archiver'
import * as clui from 'clui'
import * as request from 'request'
import * as del from 'del'
import chalk = require('chalk')

deploy()

async function deploy() {
  mkdir()
  const zipFilePath = await zip()

  try {
    await upload(zipFilePath)
    await rmDir()
  } catch (e) {
    console.log(chalk.red('ERROR: File upload fail.'))
  }
  
  process.exit()
}

function mkdir() {
  try {
    fs.mkdirSync('.tmp')
  } catch (e) {}
}

function zip(): Promise<string> {
  return new Promise((resolve, reject) => {
    const zipping = new clui.Spinner('Zip template files...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    zipping.start()

    const zipName = '.tmp/upload.zip'
    const archive = archiver.create('zip', {});
    const output = fs.createWriteStream(zipName);
  
    archive.pipe(output);
  
    archive.glob('assets/**');
    archive.glob('components/**');
    archive.glob('layouts/**');
    archive.glob('pages/**');
    archive.glob('sections/**');
    archive.glob('routes.yml');
    archive.finalize();
  
    output.on("close", () => {
      const archiveSize = archive.pointer();
      console.log(`complete! total size : ${Math.round(archiveSize / 1024 / 1024)} MB`);
      zipping.stop()
      resolve(zipName)
    })

    output.on("error", () => {
      reject("Failure zip.")
    })
  })  
}

function upload(zipFilePath: string) {
  return new Promise(async (resolve, reject) => {
    const uploading = new clui.Spinner('Uploading...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    uploading.start()

    await request.post({
      uri: 'https://dev-futurestandard.goleadgrid.com/api/theme',
      form: {
        file: fs.createReadStream(zipFilePath)
      }
    }, (error, httpResponse, body) => {
      uploading.stop()

      if (httpResponse.statusCode === 200) {
        resolve()
      } else {
        console.log(chalk.red(`ERROR: HTTP Response - ${httpResponse.statusMessage}`))
        reject()
      }
    })
  })
}

async function rmDir() {
  const deleting = new clui.Spinner('Deleting...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
  deleting.start()
  await del(['.tmp', '.tmp/**'])
  deleting.stop()
}
