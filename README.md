### Document Info Extractor

**Description:**
This script for Adobe Photoshop extracts information about the document, including its dimensions, resolution, aspect ratio, and megapixel count. The gathered data is inserted into a new text layer in the center of the document.

**Script functionality:**
- Extract and display the document name.
- Determine the document dimensions in pixels, centimeters, and inches.
- Determine the document resolution in ppi and ppcm.
- Calculate and display the megapixel count.
- Determine the aspect ratio (both basic and Farey).
- Insert all gathered information as text into a new layer.

**Workflow:**
The script saves the current ruler units, switches to pixels for information extraction, and restores the original settings after execution.

---

### Stack in PSD

**Description:**
This Adobe Photoshop script serves several purposes:

- **Reverse Layer Order:** It rearranges the layers in a document so they appear in the opposite order of how they are currently stacked.
- **Save Document as PSD:** After rearranging the layers, the script saves the document as a PSD file on the computer's desktop.
- **Adjust Layer Visibility:** Following the save operation, the script ensures only the bottom layer remains visible while hiding all other layers.

**Function Descriptions:**
- `removeExtensions(layerName):` Strips file extensions (like `.tif`, `.jpg`, `.png`) from layer names.
- `reverseLayers(doc):` Flips the order of layers within the document.
- `savePSD(filePath):` Stores the current Photoshop file in PSD format at a specified location.
- `createPSDFolder():` Generates a "PSD" folder on the desktop if absent.

**Script Actions:**
- Removes file extensions from layer names.
- Reverses the order of layers.
- Establishes a "PSD" folder on the desktop if not present.
- Saves the document in PSD format, naming it based on the bottom layer.
- Displays only the bottom layer, concealing others.

---

### Layer Cleanup 

**Description:**  
This Adobe Photoshop script automates the cleanup of your document by performing the following tasks:

- **Layer Composition Management:** Allows you to choose whether to save or discard existing layer compositions.
- **Remove Invisible/Empty Layers:** Deletes invisible, off-canvas, and empty layers to streamline your document.
- **Handle Locked Layers and Clipping Groups:** Safely manages locked layers and clipping groups to prevent unwanted deletions.
- **Clean Empty Layer Sets:** Detects and removes empty layer groups to maintain an organized layer structure.

**Function Descriptions:**
- `main():` Orchestrates the cleanup process and user interactions.
- `removeAllLayerComps(doc):` Removes all layer compositions from the document.
- `removeAllEmptyArtLayers(obj, layercomps):` Deletes empty or off-canvas layers from the specified object.
- `removeEmptyLayerSets():` Removes empty layer sets from the document.
- `isLocked(myLayer):` Checks if a specific layer is locked.

**Script Actions:**
- Prompts the user for confirmation regarding layer compositions.
- Deletes invisible and empty layers.
- Manages locked layers to avoid accidental deletions.
- Cleans up empty layer sets for a more organized document.

---

### PathTransfer

**Description:**  
This Adobe Photoshop script copies all path items from `.tif` files into matching `.jpg` files based on filename. It’s ideal for workflows requiring consistent path (clipping path or shape) transfer between image formats.

## Function Descriptions

- `processFolder():`  
  Main procedure for iterating JPGs, finding matching TIFs, and initiating path copying.

- `copyPaths(sourceDoc, targetDoc):`  
  Transfers all path items from the TIF file to the JPG document.

- `createNewPathIfNeeded(name):`  
  Ensures named paths are created in the JPG if multiple exist.

## Script Actions

- Prompts user to select folders for `.jpg` and `.tif` files.
- Matches each `.jpg` with a `.tif` of the same name.
- Opens both files, copies all paths from the TIF to the JPG.
- Creates new paths in the JPG document if necessary.
- Saves and closes the JPG.
- Closes the TIF without saving changes.

## Requirements

- Adobe Photoshop (tested with CS6 and newer)
- JavaScript scripting enabled

## License

MIT License

---

### Installing

**Installing:**
Simply clone this repo into the Photoshop scripts directory: `Adobe Photoshop [Your Version]/Presets/Scripts/`

The next time Photoshop is opened, you can find the scripts under `File -> Scripts`.

---

### Contact

**Contact:**
<gssdarm@gmail.com>  
Telegram [@ohnedan](https://t.me/ohnedan)
