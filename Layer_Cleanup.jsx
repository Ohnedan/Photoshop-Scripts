#target photoshop

function main(){
    app.displayDialogs = DialogModes.NO;
    var layercomps = false;
    if(!documents.length) return; // Если документов нет, выходим из функции
    var doc = app.activeDocument;
    if(!doc.saved){
        if(!confirm("Ваш документ не сохранен. \nВы уверены, что хотите продолжить?")){
            return;
        }
    }
    if(doc.layerComps.length != 0){
        if(!confirm("Хотите сохранить ваши композиции слоев? \nНажав 'Нет', вы сохраните только видимые слои на данный момент.")){
            removeAllLayerComps(doc); // Удалить все композиции слоев
        } else {
            layercomps = true;
        }
    }

	// Добавляем текущий вид в композицию слоя
    doc.layerComps.add("mail@brunoherfst.com"); // уникальное имя

	// Удаляем все невидимые слои
	// Собираем все слои и сохраняем их ID и флаг "Keep"
    selectAllLayers();
    var layersSelected = getSelectedLayersIdx();
    var layerIDs = [];
    for(var d = 0; d < layersSelected.length; d++){
        layerIDs.push([layersSelected[d],"N"]); // добавляем в массив ID слоя и флаг
    }
	deselectLayers(); // отменяем выделение

    // Проверяем, какие слои нужно сохранить, проходя через все композиции слоев
    for(var c = 0; c < doc.layerComps.length; c++){
        doc.layerComps[c].apply(); // применяем композицию слоя и проверяем, что нужно сохранить
        for(var z in layerIDs){
            // Ищем видимые и заблокированные слои (также временно сохраняем группы слоев)
            if(getLayerVisibilityByIndex(Number(layerIDs[z][0])) || isLocked(Number(layerIDs[z][0])) || isLayerSet(Number(layerIDs[z][0]))){
                layerIDs[z][1] = "Y"; // отмечаем для сохранения
            }
        }
    }
    deselectLayers();

	// Убеждаемся, что обтравочные маски также выбраны
	var clippingLayerIDs = [];
	for(var l in layerIDs) {
        if(layerIDs[l][1].toString() == "N") {
        	var LID = Number(layerIDs[l][0]); // ID слоя
        	var clipInfo = isClippingLayer(LID);
        	if(clipInfo == 'bottomClippingLayer'){
        		LID++; // Переходим к слоям в группе обтравки
        		while(isClippingLayer(LID)){
        			clipInfo = isClippingLayer(LID);
        			// Убедимся, что не попали в другую группу обтравки
        			if(clipInfo != 'bottomClippingLayer'){
        				clippingLayerIDs.push([LID, "N"]);
						LID++;
        			} else {
        				break; // выход из цикла
        			}
        		}
        	}
        }
    }
	layerIDs = layerIDs.concat(clippingLayerIDs); // объединяем с основным массивом

    // Не удаляем группы слоев, содержащие скрытые заблокированные слои

	// Выбираем все слои для удаления
    deselectLayers();
    var layersSelected = false;
    for(var l in layerIDs) {
        if(layerIDs[l][1].toString() == "N") {
        	selectLayerByIndex(Number(layerIDs[l][0]), true); // выделяем слой
        	layersSelected = true;
        }
    }
    // Удаляем выбранные слои
    if(layersSelected) {
        doc.activeLayer.remove(); // удаление
    }

	// Следующие действия будут связаны с проверкой обтравочных слоев
	// Вышеприведенный код можно переписать как функцию: removeAllInvisibleLayers(doc, layercomps);

    removeAllEmptyArtLayers(doc, layercomps); // удаляем пустые арт-слои

    removeEmptyLayerSets(); // удаляем пустые группы слоев

    doc.layerComps["mail@brunoherfst.com"].remove(); // удаляем временную композицию слоя
    doc.selection.deselect(); // отменяем выделение

    alert("Очистка слоев завершена!");
}

// Дополнительные функции проверок и удаления слоев:

function isLocked(myLayer){ /* Проверка на заблокированность слоя */ }

function isClippingLayer(layerID){ /* Проверка на обтравочный слой */ }

function removeAllLayerComps(doc){ /* Удаление всех композиций слоев */ }

function removeEmptyLayerSets(){ /* Удаление пустых групп слоев */ }

function removeAllEmptyArtLayers(obj, layercomps){ /* Удаление пустых арт-слоев */ }

function getIDX(idx){ /* Получение ID слоя */ }

function isLayerSet(idx){ /* Проверка, является ли слой группой */ }

function getLayerVisibilityByIndex(idx){ /* Получение видимости слоя по индексу */ }

function getSelectedLayersIdx(){ /* Получение индексов выбранных слоев */ }

function selectLayerByIndex(index, add){ /* Выбор слоя по индексу */ }

function selectAllLayers(){ /* Выбор всех слоев */ }

function deselectLayers(){ /* Отмена выделения всех слоев */ }

// Запуск скрипта
try{
	main();
} catch(err) {
	alert(err);
}
