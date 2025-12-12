/*
==============================================================================
   SCRIPT:       Smart_Path_Crop by Maestr.o
   VERSION:      1.3 (Safety Margin 100px)
   YEAR:         2025
   AUTHOR:       Maestr.o
   --------------------------------------------------------------------------
   DESCRIPTION:
   Automated batch processing for product images based on 'Path 1'.
   
   PROCESS:
   1. Detects 'Path 1' and crops (Trim).
   2. Calculates needed size: Object Size + 200px (100px margin each side).
   3. Extends Canvas to the nearest fitting standard:
      - 1181 x 1181 px
      - 1417 x 1417 px
      - 2362 x 2362 px
   4. NO Image Resizing (Original pixel quality kept).

   OUTPUT:
   Processed files are saved strictly preserving the ORIGINAL file format.
==============================================================================
*/

#target photoshop
app.bringToFront();

// --- CONFIGURATION ---
var SAFETY_MARGIN = 100; // Pixels on EACH side (Total buffer = 200px)

function main() {
    var win = new Window("dialog", "Smart_Path_Crop by Maestr.o");
    win.orientation = "column";
    win.alignChildren = "fill";

    // Inputs
    var grpIn = win.add("group");
    grpIn.add("statictext", undefined, "Source:");
    var txtInput = grpIn.add("edittext", [0,0,250,25], "");
    var btnBrowseIn = grpIn.add("button", undefined, "Browse...");

    var grpOut = win.add("group");
    grpOut.add("statictext", undefined, "Save to:");
    var txtOutput = grpOut.add("edittext", [0,0,250,25], "");
    var btnBrowseOut = grpOut.add("button", undefined, "Browse...");

    // Info Panel
    var pnlInfo = win.add("panel", undefined, "Logic: Margin Check");
    pnlInfo.alignChildren = "left";
    pnlInfo.add("statictext", undefined, "1. Crop to Path.");
    pnlInfo.add("statictext", undefined, "2. Check Object Size + " + (SAFETY_MARGIN*2) + "px buffer.");
    pnlInfo.add("statictext", undefined, "3. Set Canvas to: 1181, 1417 or 2362.");

    // Buttons
    var grpBtns = win.add("group");
    grpBtns.alignment = "center";
    var btnCancel = grpBtns.add("button", undefined, "Cancel");
    var btnRun = grpBtns.add("button", undefined, "Start Batch");

    // UI Actions
    btnBrowseIn.onClick = function() {
        var f = Folder.selectDialog("Select Source Folder");
        if (f) txtInput.text = f.fsName;
    }
    btnBrowseOut.onClick = function() {
        var f = Folder.selectDialog("Select Destination Folder");
        if (f) txtOutput.text = f.fsName;
    }
    btnRun.onClick = function() {
        if (!txtInput.text || !txtOutput.text) {
            alert("Please select folders.");
            return;
        }
        win.close(1);
        processFiles(new Folder(txtInput.text), new Folder(txtOutput.text));
    }
    win.show();
}

function processFiles(srcFolder, destFolder) {
    var fileList = srcFolder.getFiles(/\.(jpg|jpeg|tif|tiff|psd|png)$/i);
    
    if (fileList.length === 0) { alert("No images found!"); return; }

    var successCount = 0;
    var restoreDialogMode = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    try {
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            try {
                var doc = open(file);
                if (applySmartCanvas(doc)) {
                    saveInOriginalFormat(doc, file, destFolder);
                    successCount++;
                }
                doc.close(SaveOptions.DONOTSAVECHANGES);
            } catch (e) {
                if (doc) doc.close(SaveOptions.DONOTSAVECHANGES);
            }
        }
    } finally {
        app.displayDialogs = restoreDialogMode;
    }
    alert("Done! Processed: " + successCount + " files.");
}

function applySmartCanvas(doc) {
    try {
        var pItem = doc.pathItems.getByName("Path 1");
        
        // 1. Crop
        pItem.makeSelection(0, true, SelectionType.REPLACE);
        var bounds = doc.selection.bounds;
        doc.crop(bounds);
        doc.selection.deselect();

        // 2. Measure & Check Margin
        var w = doc.width.as("px");
        var h = doc.height.as("px");
        var maxDim = Math.max(w, h);
        
        // Calculate required space (Object + 100px left + 100px right)
        var neededSize = maxDim + (SAFETY_MARGIN * 2);

        var targetSize = 2362; // Default to largest if very big

        if (neededSize <= 1181) {
            targetSize = 1181;
        } else if (neededSize <= 1417) {
            targetSize = 1417;
        } else {
            // Anything bigger goes to 2362
            // Note: If object > 2162px, margin will be less than 100px, 
            // but we stay at 2362 standard as requested.
            targetSize = 2362;
        }

        // 3. Resize Canvas
        doc.resizeCanvas(UnitValue(targetSize, "px"), UnitValue(targetSize, "px"), AnchorPosition.MIDDLECENTER);
        return true;

    } catch (e) {
        return false; // No Path 1
    }
}

function saveInOriginalFormat(doc, originalFile, destFolder) {
    var fileName = originalFile.name;
    var ext = fileName.split('.').pop().toLowerCase();
    var saveFile = new File(destFolder + "/" + fileName);

    switch (ext) {
        case "jpg": case "jpeg":
            var opts = new JPEGSaveOptions();
            opts.quality = 10;
            opts.embedColorProfile = true;
            doc.saveAs(saveFile, opts, true, Extension.LOWERCASE);
            break;
        case "tif": case "tiff":
            var tOpts = new TiffSaveOptions();
            tOpts.imageCompression = TIFFEncoding.LZW;
            tOpts.layers = false;
            doc.saveAs(saveFile, tOpts, true, Extension.LOWERCASE);
            break;
        case "psd":
            var pOpts = new PhotoshopSaveOptions();
            pOpts.layers = true;
            doc.saveAs(saveFile, pOpts, true, Extension.LOWERCASE);
            break;
        default:
            doc.saveAs(saveFile);
    }
}

main();