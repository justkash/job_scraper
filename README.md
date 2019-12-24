## Chaning Default Settings
For now, the changable settings for the scripts are hard coded as constants at the begining of the `main.ts` file. The `FOLDER_ID` is of particular importance since this value is used to identify which directory within Google Drive the created spreadsheet file will be put into. Change this value to the id of the folder of your choice before deploying the script. Note also that the `FILE_NAME` and `SHEET_NAME` values might also be of interest should you wish to change the default file and sheet names.

## Starting the Docker Image
Create the Docker image using the following command.
```bash
docker image build -t clasp:1.0 .
```
Run the container using the following command. This will put you into the shell prompt within the container.
```bash
docker run -it --rm --name job_scraper --mount type=bind,source="$(pwd)",target=/usr/src/app clasp:1.0
```

## Using Clasp
[Clasp](https://developers.google.com/apps-script/guides/clasp) is a utility from Google to allow for Google Apps Script development locally. Once inside the container, run the following command to login and follow the prompts.
```bash
clasp login --no-localhost
```

You can check the login status of clasp using the following command.
```bash
clasp login --status
```

## Upload to Google [G Suite Developer Hub](https://script.google.com/home)
Before uploading to the developer hub, run the following command to install all the required npm modules.
```bash
npm install
```

Run the following command to compile the typscript files and upload to Google's developer hub. Note that this step will require authentication and that Google Apps Script API is turned on. This can be done by going to the settings tab in the hub and toggling the switch on.
```bash
npm run deploy
```

## Importing Libraries into 
Finally, before running the script, you will need to add the [Cheerio](https://script.google.com/macros/library/versions/d/1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0) library by adding it under Resources > Libraries with the uploaded script file open.

## Running Scripts
The script can be run by simply selecting the function you'd like to run from the dropdown menu and clicking on the triangle play button. Note however, that a script like this is far more powerful with the use of [triggers](https://developers.google.com/apps-script/guides/triggers/installable).
