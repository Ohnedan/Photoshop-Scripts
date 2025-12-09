#target photoshop

// Version 2.0 (Evolution)
// Based on Ohnedan 2024 (v1 Alpha)
// Upgraded: Auto-Fit 30%, Bold Labels, Safe Fonts, Bottom-Left Position.

var savedRuler = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
var doc = app.activeDocument;

// --- НАСТРОЙКИ (SETTINGS) ---
var blockWidthPercent = 30; // Ширина текстового блока (30%)
var marginPercent = 3;      // Отступ от края (3%)

// Шрифты (Основной и Жирный)
var fontMain = "HelveticaNeue";
var fontBold = "HelveticaNeue-Bold";
// ----------------------------

// СБОР ДАННЫХ (DATA COLLECTION)
var w = doc.width.value;
var h = doc.height.value;
var minSide = Math.min(w, h);

var r = gcd(w, h);
var mp = w * h / 1000000;
var pix = w * h;
var ppiRes = doc.resolution;
var ppcmRes = ppiRes / 2.54;
var ratio = w / h;
var docName = doc.name;

// Исправленный расчет физических размеров (Real Physical Dimensions)
// В v1 было деление на 72, что неверно для печати. Теперь делим на ppiRes.
var wMetric = (w / ppiRes) * 2.54; // Ширина в см
var hInches = h / ppiRes;          // Высота в дюймах

// Доп. инфо: Цветовой режим и профиль
var docMode = doc.mode.toString().replace("DocumentMode.", "");
var docDepth = doc.bitsPerChannel.toString().replace("BitsPerChannelType.", "").replace("EIGHT", "8").replace("SIXTEEN", "16");
var docProfile = "Untagged";
try { docProfile = doc.colorProfileName; } catch (e) { }


// ФОРМИРОВАНИЕ ТЕКСТА (TEXT CONTENT)
var docInfo =
    'Name: ' + docName + '\r' +
    'Dimensions: ' + w + ' x ' + h + ' px' + '\r' +
    'Dimensions: ' + (wMetric.toFixed(2)) + ' x ' + ((h / ppiRes * 2.54).toFixed(2)) + ' cm / ' + (hInches.toFixed(2)) + ' in' + '\r' +
    'Resolution: ' + ppiRes.toFixed(1) + ' ppi / ' + ppcmRes.toFixed(2) + ' ppcm' + '\r' +
    'Mode/Profile: ' + docMode + ' (' + docDepth + '-bit) / ' + docProfile + '\r' +
    'Megapixel Value: ' + mp.toFixed(1) + ' MP' + ' (' + pix + ' px)' + '\r' +
    'Aspect Ratio: ' + ratio.toFixed(2) + ':1' + ' / ' + (ratio * 2).toFixed(2) + ':2 / ' + (ratio * 4).toFixed(2) + ':4' + ' (Basic)' + '\r' +
    aspect_ratio(w / h, 50).toString().replace(',', ':') + ' (Farey)';


// СОЗДАНИЕ СЛОЯ (CREATE LAYER)
var textLayer = doc.artLayers.add();
textLayer.kind = LayerKind.TEXT;
textLayer.name = "Document Info";
var textItem = textLayer.textItem;
textItem.contents = docInfo;

// Установка шрифта с защитой от ошибок (Safe Font Setting)
try {
    textItem.font = fontMain;
} catch (e) {
    textItem.font = "ArialMT"; // Если Helvetica нет, ставим Arial
}

textItem.justification = Justification.LEFT;
textItem.size = 20; // Временный размер
var textColor = new SolidColor();
textColor.rgb.red = 51; textColor.rgb.green = 51; textColor.rgb.blue = 51;
textItem.color = textColor;


// ЖИРНЫЙ ТЕКСТ (BOLD FORMATTING)
// Список заголовков, которые нужно выделить
var labelsToBold = ["Name:", "Dimensions:", "Resolution:", "Mode/Profile:", "Megapixel Value:", "Aspect Ratio:"];
formatWords(textLayer, labelsToBold, fontBold);


// АВТО-МАСШТАБИРОВАНИЕ (AUTO-FIT 30%)
doc.selection.deselect();
var targetWidth = minSide * (blockWidthPercent / 100);
var currentGeo = textLayer.bounds;
var currentWidth = currentGeo[2].value - currentGeo[0].value;

if (currentWidth > 0) {
    var scaleFactor = (targetWidth / currentWidth) * 100;
    textLayer.resize(scaleFactor, scaleFactor, AnchorPosition.BOTTOMLEFT);
}


// ПОЗИЦИОНИРОВАНИЕ (POSITIONING BOTTOM-LEFT)
var margin = minSide * (marginPercent / 100);
var finalGeo = textLayer.bounds;
var deltaX = margin - finalGeo[0].value;
var deltaY = (h - margin) - finalGeo[3].value;

textLayer.translate(deltaX, deltaY);

// Восстановление настроек
app.preferences.rulerUnits = savedRuler;


// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (FUNCTIONS) ---

function gcd(a, b) {
    return (b == 0) ? a : gcd(b, a % b);
}

function aspect_ratio(val, lim) {
    var lower = [0, 1]; var upper = [1, 0];
    while (true) {
        var mediant = [lower[0] + upper[0], lower[1] + upper[1]];
        if (val * mediant[1] > mediant[0]) {
            if (lim < mediant[1]) return upper; lower = mediant;
        } else if (val * mediant[1] == mediant[0]) {
            if (lim >= mediant[1]) return mediant;
            if (lower[1] < upper[1]) return lower; return upper;
        } else {
            if (lim < mediant[1]) return lower; upper = mediant;
        }
    }
}

// Функция поиска слов для выделения
function formatWords(layer, wordsArray, boldFontName) {
    var textContent = layer.textItem.contents;
    for (var w = 0; w < wordsArray.length; w++) {
        var searchString = wordsArray[w];
        var searchLen = searchString.length;
        var startIndex = 0;
        var index;
        while ((index = textContent.indexOf(searchString, startIndex)) > -1) {
            applyStyleToRange(layer, index, index + searchLen, boldFontName);
            startIndex = index + searchLen;
        }
    }
}

// Функция Action Manager для применения шрифта к части текста
function applyStyleToRange(layer, from, to, fontName) {
    try {
        var doc = app.activeDocument; var activeL = doc.activeLayer; doc.activeLayer = layer;
        var idsetd = charIDToTypeID("setd"); var desc = new ActionDescriptor();
        var idnull = charIDToTypeID("null"); var ref = new ActionReference();
        var idTxLr = charIDToTypeID("TxLr"); var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt"); ref.putEnumerated(idTxLr, idOrdn, idTrgt);
        desc.putReference(idnull, ref);
        var idT = charIDToTypeID("T"); var descT = new ActionDescriptor();
        var idTxtt = charIDToTypeID("Txtt"); var list = new ActionList();
        var descRange = new ActionDescriptor(); var idFrom = charIDToTypeID("From");
        descRange.putInteger(idFrom, from); var idT_Range = charIDToTypeID("T   ");
        descRange.putInteger(idT_Range, to); var idTxtS = charIDToTypeID("TxtS");
        var descStyle = new ActionDescriptor(); var idFntN = charIDToTypeID("FntN");
        descStyle.putString(idFntN, fontName); descRange.putObject(idTxtS, idTxtS, descStyle);
        list.putObject(idTxtt, descRange); descT.putList(idTxtt, list);
        desc.putObject(idT, idTxLr, descT); executeAction(idsetd, desc, DialogModes.NO);
        doc.activeLayer = activeL;
    } catch (e) {
        // Ошибки игнорируются (Silent Fail)
    }
}