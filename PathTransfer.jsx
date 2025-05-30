// Bring the application to the front
app.bringToFront();

// Prompt the user to select the folder containing JPG files
var jpgFolder = Folder.selectDialog("Select JPG folder...");

// Prompt the user to select the folder containing TIF files
var tifFolder = Folder.selectDialog("Select TIF folder...");

var jpgFileList;

// Start processing the folder
processFolder();

function processFolder() {
    // Get all files from the JPG folder
    jpgFileList = jpgFolder.getFiles();

    for (var n = 0; n < jpgFileList.length; n++) {
        var theFile = jpgFileList[n].name.split(".");
        var theExt = theFile[1];

        // Only process files with the .jpg extension
        if (theExt == "jpg") {
            open(jpgFileList[n]);

            // Generate corresponding TIF filename
            var jpgName = jpgFileList[n].name.split(".");
            var tifName = tifFolder + "/" + jpgName[0] + ".tif";
            var tifFile = new File(tifName);

            // Check if the matching TIF file exists
            if (!tifFile.exists) {
                alert("No matching TIF file!");
                return;
                // File is kept open for manual inspection
            }

            // Open the matching TIF file
            open(tifFile);

            // Switch focus to the first opened document (TIF)
            app.activeDocument = app.documents[0];
            var workPath = app.activeDocument.pathItems;

            // Iterate through all paths in the TIF file
            for (var p = 0; p < workPath.length; p++) {
                var pathName = workPath[p].name;

                // Select the current path
                var idslct = charIDToTypeID("slct");
                var desc218 = new ActionDescriptor();
                var idnull = charIDToTypeID("null");
                var ref41 = new ActionReference();
                var idPath = charIDToTypeID("Path");
                ref41.putName(idPath, pathName);
                desc218.putReference(idnull, ref41);
                executeAction(idslct, desc218, DialogModes.NO);

                // Copy the path
                var idcopy = charIDToTypeID("copy");
                executeAction(idcopy, undefined, DialogModes.NO);

                // Switch focus back to the JPG document
                app.activeDocument = app.documents[1];

                // Create a new path if there are multiple paths
                if (workPath.length > 1) {
                    var idMk = charIDToTypeID("Mk  ");
                    var desc44 = new ActionDescriptor();
                    var idnull = charIDToTypeID("null");
                    var ref13 = new ActionReference();
                    var idPath = charIDToTypeID("Path");
                    ref13.putClass(idPath);
                    desc44.putReference(idnull, ref13);
                    var idNm = charIDToTypeID("Nm  ");
                    desc44.putString(idNm, pathName);
                    executeAction(idMk, desc44, DialogModes.NO);
                }

                // Paste the copied path
                var idpast = charIDToTypeID("past");
                executeAction(idpast, undefined, DialogModes.NO);

                // Switch focus back to the TIF document
                app.activeDocument = app.documents[0];
            }

            // Close TIF without saving
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

            // Save JPG and close without further changes
            app.activeDocument.save();
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
}
