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

### Installing

**Installing:**
Simply clone this repo into the Photoshop scripts directory: `Adobe Photoshop [Your Version]/Presets/Scripts/`

The next time Photoshop is opened, you can find the scripts under `File -> Scripts`.

---

### Donate

**Donate:**
Many scripts are free to download thanks to user support. Help me to develop new scripts and update existing ones by supporting my work with any amount via PayPal.

[PayPal]: https://www.paypal.me/ohnedan

---

### Contact

**Contact:**
Email <gssdarm@gmail.com>  
Telegram [@ohnedan](https://t.me/ohnedan)
