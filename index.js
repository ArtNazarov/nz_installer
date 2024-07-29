 // Модули
import { existsSync, mkdirSync } from 'fs';
import fs  from 'fs'
import { exec } from 'child_process';
import AdmZip from 'adm-zip';
import promptLib  from 'prompt-sync'

const prompt = promptLib()


 // Класс для установщика
class Installer {
 
      // Скачивает с заданного адреса файл   
     downloadZip(url, fileName, callback) {
        exec(`wget "${url}" -O ${fileName}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing: ${error}`);
              return;
            }
            callback();
          });
     }
   

   // Создаем заданный каталог
    createDirIfNotExists(dir){
       if (!existsSync(dir)) {
           mkdirSync(dir);
       }
   }

   // Куда установить
   getTargetDir(){
        const selDir = prompt('Куда установить:');
        console.log(`Selected ${selDir}!`);
        return selDir;
   }
   
   
    // Распаковка архива в заданный каталог
    extractZip(zipPath, targetDir, callback) {
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(targetDir, true);
        callback();
    }

    // Установка ПО
    runInstall(releaseUrl, fileName) { 
        console.log(`Загружаем ${fileName}`);
        const targetDir = this.getTargetDir();
        this.createDirIfNotExists(targetDir);
        this.downloadZip(releaseUrl, fileName, () => {
        console.log('Загрузка выполнена');
        this.extractZip(fileName, targetDir, () => {
            console.log('Распаковка выполнена');
            console.log(`Установлено в ${targetDir}`);
            });
        });
    };
   
}

 
export default Installer;
