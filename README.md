### DocInfo Engine

**Description:**  
This Adobe Photoshop script automatically gathers and displays the essential technical specifications of the currently active document.  
All collected information is added as a new text layer called **“Document Info”** positioned near the **top-left corner** of the canvas.

**Features:**  
- **Comprehensive Details:** Displays document name, color profile, color mode, and bit depth.  
- **Dimensions:** Shows width and height in **pixels**, **centimeters**, and **inches**.  
- **Resolution:** Reports both **PPI (pixels per inch)** and **PPCM (pixels per centimeter)**.  
- **Pixel Count:** Calculates total pixel amount and **megapixel value**.  
- **Aspect Ratio:** Outputs decimal ratios and simplified **Farey fractions**.  
- **Non-Destructive:** Adds info as a text layer without modifying the original content.  
- **Auto Unit Restore:** Restores the user’s original ruler settings after execution.  

**Function Descriptions:**  
- `gcd(a, b):` Calculates the greatest common divisor (GCD) of two numbers.  
- `aspect_ratio(val, lim):` Determines the closest simple fractional representation (Farey method).  

**Script Actions:**  
- Checks that a document is open before running.  
- Collects parameters: dimensions, resolution, color info, and pixel data.  
- Computes additional data: megapixels and aspect ratios.  
- Builds a formatted text block containing all document details.  
- Creates a new text layer named **“Document Info”** with Helvetica Neue font, size 10, and gray color (RGB 51,51,51).  
- Positions this layer **50px** from the top and left edges.  
- Restores the previous ruler unit preference at the end.  

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

**Function Descriptions**

- `processFolder():`  
  Main procedure for iterating JPGs, finding matching TIFs, and initiating path copying.

- `copyPaths(sourceDoc, targetDoc):`  
  Transfers all path items from the TIF file to the JPG document.

- `createNewPathIfNeeded(name):`  
  Ensures named paths are created in the JPG if multiple exist.

**Script Actions**

- Prompts user to select folders for `.jpg` and `.tif` files.
- Matches each `.jpg` with a `.tif` of the same name.
- Opens both files, copies all paths from the TIF to the JPG.
- Creates new paths in the JPG document if necessary.
- Saves and closes the JPG.
- Closes the TIF without saving changes.

**Requirements**

- Adobe Photoshop (tested with CS6 and newer)
- JavaScript scripting enabled

---

### Installing

**Installing:**
Simply clone this repo into the Photoshop scripts directory: `Adobe Photoshop [Your Version]/Presets/Scripts/`

The next time Photoshop is opened, you can find the scripts under `File -> Scripts`.

---

### Contact

**Email:** <gssdarm@gmail.com>  
**Telegram:** [@ohnedan](https://t.me/ohnedan)
