// Русский:
// Скрипт для сортировки слоев в обратном порядке и сохранения документа Photoshop в формате PSD с видимым только нижним слоем.

// English:
// Script to reverse layer order and save Photoshop document as PSD with only the bottom layer visible.
// Author: Ohnedan

// Функция для удаления расширений из имени слоя
// Function to remove file extensions from layer names
function removeExtensions(layerName) {
    return layerName.replace(/\.(tif|jpg|png)$/i, '');
}

// Функция для сортировки слоев в обратном порядке
// Function to reverse the order of layers
function reverseLayers(doc) {
    var reversedLayers = [];
    for (var i = doc.layers.length - 1; i >= 0; i--) {
        reversedLayers.push(doc.layers[i]);
    }
    for (var i = 0; i < reversedLayers.length; i++) {
        reversedLayers[i].move(doc, ElementPlacement.PLACEATEND);
    }
}

// Основная часть скрипта
// Main part of the script
function main() {
    var doc = app.activeDocument;

    // Удаление расширений из имен слоев
    // Remove file extensions from layer names
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        var newName = removeExtensions(layer.name);
        if (newName !== layer.name) {
            layer.name = newName; // Обновляем имя слоя без расширений
        }
    }

    // Сортировка слоев в обратном порядке
    // Reverse the order of layers
    reverseLayers(doc);

    // Оставляем видимым только нижний слой и скрываем остальные
    // Make only the bottom layer visible and hide others
    var bottomLayer = doc.layers[doc.layers.length - 1];
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        layer.visible = (layer === bottomLayer);
    }

    // Определение пути и имени файла для сохранения
    // Define the path and filename for saving
    var desktopPath = createPSDFolder();
    var layerName = removeExtensions(bottomLayer.name);
    var filePath = desktopPath + "/" + layerName + ".psd";

    // Сохранение документа в формате PSD
    // Save the document as PSD
    savePSD(filePath);
}

// Функция для сохранения PSD
// Function to save the document as PSD
function savePSD(filePath) {
    var psdOptions = new PhotoshopSaveOptions();
    psdOptions.embedColorProfile = true;
    psdOptions.alphaChannels = true;
    psdOptions.layers = true;

    var file = new File(filePath); // Создаем объект File

    app.activeDocument.saveAs(file, psdOptions, true); // Сохраняем документ
}

// Функция для создания папки PSD на рабочем столе, если она не существует
// Function to create PSD folder on desktop if it doesn't exist
function createPSDFolder() {
    var desktopPath = Folder.desktop + "/PSD";
    var folder = new Folder(desktopPath);
    if (!folder.exists) {
        folder.create();
    }
    return desktopPath;
}

// Запуск основной части скрипта
// Run the main part of the script
main();