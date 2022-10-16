var indexTimeline = 234;
function getActualItemOnTimeline(indexTimeline) {
  generateCardDetail(timelineData[indexTimeline]);
}

function generateCardDetail(data) {
  let card = document.getElementById("sensor-detail");
  if (actualSprite == "") {
    console.log("nada");
    card.innerHTML = "";
  } else {
    console.log(data);
    console.log("actualSprite:", actualSprite);
    console.log("entrei no card detail");
    let dataToShow = [];
    if (actualSprite == 10) {
      dataToShow = data.gama;
    } else if (actualSprite == 11) {
      dataToShow = data.beta;
    } else {
      dataToShow = data.wc;
    }
    card.innerHTML = "";
    card.innerHTML += `
    <div style="padding: 10px; border-radius: 8px"; background: rgb(0, 0, 0, .2)">
        <div style="opacity: 100%;">
            <strong>Sensor: </strong>${sensor_dict_name[dataToShow.name]}
        </div>
        <div style="opacity: 100%;">
            <strong>X: </strong>${dataToShow.X} m/s²
        </div>
        <div style="opacity: 100%;">
            <strong>Y: </strong>${dataToShow.Y} m/s²
        </div>
        <div style="opacity: 100%;">
            <strong>Z: </strong>${dataToShow.Z} m/s²
        </div>
        <div style="opacity: 100%;">
            <strong>Sensor Battery: </strong>${dataToShow.bat} V
        </div>
    </div>
    `;
  }
}

// Corrigir o nome dos sensores
var sensor_dict_name = {
  "T1": "Sensor Esqerda",
  "T2": "Sensor Meio",
  "T1": "Sensor Direita",
};
