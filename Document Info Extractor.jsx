#target photoshop

// Version 1 Alpha
// Ohnedan 2024
// Tested in Photoshop 2021


// Русский:
// Скрипт для отображения информации о документе Photoshop в виде текстового слоя.
// Отображает имя документа, размеры в пикселях, сантиметрах и дюймах, разрешение,
// количество мегапикселей, соотношение сторон и дробное представление соотношения Фарея.

// English:
// Script to display Photoshop document information as a text layer.
// Shows document name, dimensions in pixels, centimeters, and inches, resolution,
// megapixel value, aspect ratio, and Farey representation of aspect ratio.


// Save current ruler units
var savedRuler = app.preferences.rulerUnits; // Сохраняем текущие единицы измерения линеек
// Set ruler units to pixels
app.preferences.rulerUnits = Units.PIXELS; // Устанавливаем единицы измерения линеек в пиксели

// Width of the active document
var w = app.activeDocument.width.value; // Получаем ширину активного документа // Height of the active document
var h = app.activeDocument.height.value; // Получаем высоту активного документа // Find the greatest common divisor (GCD) of width and height
var r = gcd(w, h); // Находим наибольший общий делитель (НОД) ширины и высоты // Calculate the number of megapixels
var mp = w * h / 1000000; // Вычисляем количество мегапикселей // Total number of pixels
var pix = w * h; // Общее количество пикселей // Document resolution in pixels per inch (PPI)
var ppiRes = app.activeDocument.resolution; // Разрешение документа в пикселях на дюйм (PPI) // Resolution in pixels per centimeter (PPCM)
var ppcmRes = ppiRes / 2.54; // Разрешение в пикселях на сантиметр (PPCM) // Aspect ratio of the document
var ratio = w / h; // Соотношение сторон документа // Name of the active document
var docName = app.activeDocument.name; // Имя активного документа // Width in centimeters
var wMetric = w / 72 * 2.54; // Ширина в сантиметрах // Height in inches
var hInches = h / 72; // Высота в дюймах

var doc = app.activeDocument;

// Add information from the script
var docInfo =
    // 'Document Info' + '\r' +
    'Name: ' + docName + '\r' +
    'Dimensions: ' + w + ' x ' + h + ' px' + '\r' +
    'Dimensions: ' + (wMetric.toFixed(2)) + ' x ' + (hInches.toFixed(2)) + ' cm / ' + (hInches.toFixed(2)) + ' in' + '\r' +
    'Resolution: ' + ppiRes.toFixed(1) + ' ppi / ' + ppcmRes.toFixed(2) + ' ppcm' + '\r' +
    'Megapixel Value: ' + mp.toFixed(1) + ' MP' + ' (' + pix + ' px)' + '\r' +
    'Aspect Ratio: ' + ratio.toFixed(2) + ':1' + ' / ' + (ratio * 2).toFixed(2) + ':2 / ' + (ratio * 4).toFixed(2) + ':4' + ' (Basic)' + '\r' +
    aspect_ratio(w / h, 50).toString().replace(',', ':') + ' (Farey)';

// Insert the information into a text layer in the document
var textLayer = doc.artLayers.add();
textLayer.kind = LayerKind.TEXT;
textLayer.name = "Document Info";
var textItem = textLayer.textItem;
textItem.contents = docInfo;
textItem.size = 10;
textItem.font = "HelveticaNeue";
var textColor = new SolidColor();
textColor.rgb.red = 51;
textColor.rgb.green = 51;
textColor.rgb.blue = 51;
textItem.color = textColor;

// Calculate the center coordinates of the document
var centerX = w / 2;
var centerY = h / 2;

// Set the position of the text layer
textItem.position = [centerX, centerY];

// Restore the original ruler units
app.preferences.rulerUnits = savedRuler;

function gcd(a, b) {
    /* https://stackoverflow.com/questions/1186414/whats-the-algorithm-to-calculate-aspect-ratio-i-need-an-output-like-43-169 */
    return (b == 0) ? a : gcd(b, a % b);
}

function aspect_ratio(val, lim) {
    var lower = [0, 1];
    var upper = [1, 0];

    while (true) {
        var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

        if (val * mediant[1] > mediant[0]) {
            if (lim < mediant[1]) {
                return upper;
            }
            lower = mediant;
        } else if (val * mediant[1] == mediant[0]) {
            if (lim >= mediant[1]) {
                return mediant;
            }
            if (lower[1] < upper[1]) {
                return lower;
            }
            return upper;
        } else {
            if (lim < mediant[1]) {
                return lower;
            }
            upper = mediant;
        }
    }
}

