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

### Document Info Extractor (v2.0)

**Description:**  
This Adobe Photoshop script automatically gathers and displays the essential technical specifications of the currently active document.  
The script intelligently scales the text block to occupy **30% of the image’s shortest side** and positions the text layer **“Document Info”** in the **bottom-left corner** using a dynamic margin.

**Features:**  
- **Smart Auto-Sizing:** Automatically resizes the text block to match 30% of the shortest document edge.  
- **Professional Formatting:** Uses **Bold** for data labels and **Regular** for values.  
- **Rich Color Data:** Displays Color Mode, Bit Depth, and ICC Profile.  
- **Dimensions:** Shows width and height in **pixels**, **centimeters**, and **inches**.  
- **Resolution:** Reports **PPI** (pixels per inch) and **PPCM** (pixels per centimeter).  
- **Pixel Count:** Calculates total pixel amount and **megapixel value**.  
- **Aspect Ratio:** Outputs decimal ratios and simplified **Farey fractions**.  
- **Error Safe:** Attempts to use **Helvetica Neue/Bold**, silently falling back to Arial if unavailable.  
- **Non-Destructive:** Adds the info as a new text layer without modifying the original content.  
- **Auto Unit Restore:** Restores the user’s original ruler settings after execution.

**Function Descriptions:**  
- `gcd(a, b):` Calculates the greatest common divisor (GCD).  
- `aspect_ratio(val, lim):` Determines the closest simplified fractional representation (Farey method).  
- `formatWords(layer, words, font):` Detects specific keywords and applies bold formatting.  
- `applyStyleToRange(...):` Uses Action Manager to safely apply mixed font styles within a text layer.

**Script Actions:**  
- Checks that a document is open.  
- Collects document parameters: dimensions, resolution, color info, and pixel data.  
- Attempts to set **Helvetica Neue** as default font (fallback if unavailable).  
- Applies **Bold** formatting to label keywords using Action Manager.  
- Calculates the scale factor required for the 30% text-block rule.  
- Resizes the “Document Info” text layer to the computed scale.  
- Repositions the layer to the **bottom-left corner** with a **3% margin**.  
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

### Smart Path Crop ✂️

**Batch automation script for Adobe Photoshop by Maestr.o**

This script automates the process of cropping product images based on a clipping path ("Path 1"), adding safety margins, and placing them on a standard square canvas.

> **Key Feature:** The script modifies the **Canvas Size** only. It **never resamples** or stretches the product image itself, ensuring 100% original pixel quality.



## 🚀 Features

* **Batch Processing:** Select a source folder and a destination folder.
* **Smart Detection:** Automatically finds "Path 1". Images without this path are skipped.
* **Original Quality:** Only crops and extends the canvas. Zero resizing of the product.
* **Format Preservation:** Saves the processed file in the exact same format as the source (`.jpg` → `.jpg`, `.tif` → `.tif`, etc.).
* **Smart Auto-Size Logic:** Automatically selects the best standard square canvas size based on the object's dimensions + safety margin.



## 📐 How It Works (The Logic)

The script follows this strict workflow for every image:

1.  **Crop:** The image is cropped tightly to the bounds of `Path 1`.
2.  **Calculate:** It measures the object and adds a **Safety Margin of 100px** on each side (Total buffer = 200px).
3.  **Canvas Extension:** It sets the canvas to the nearest standard square that fits the object + margin:
    * **1181 x 1181 px**
    * **1417 x 1417 px**
    * **2362 x 2362 px**

**Example:**
If your object is **1100px** wide:
`1100px + 200px (margin) = 1300px` needed.
This is too big for 1181px, so the script automatically selects the **1417px** canvas.



## 🛠 Installation & Usage

1.  Download the `Smart_Path_Crop.jsx` file.
2.  Open Adobe Photoshop.
3.  Go to **File > Scripts > Browse...** and select the downloaded file.
4.  In the dialog window:
    * Select your **Source Folder** (images with Path 1).
    * Select your **Save Folder**.
    * Click **Start Batch**.



## 📝 Requirements

* Adobe Photoshop CS6, CC, or 2020+
* Images must have a clipping path named **"Path 1"**.

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
