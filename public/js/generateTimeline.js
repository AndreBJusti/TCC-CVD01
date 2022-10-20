var timelineData = [];

function generateTimeline(document) {
  var sensor_esquerda = [];
  var sensor_meio = [];
  var sensor_direita = [];

  fetch("/registers/T2").then((res) => {
    res
      .json()
      .then((data) => {
        sensor_esquerda = data;
      })
      .then(() => {
        fetch("/registers/T2").then((res) => {
          res.json().then((data) => {
            sensor_meio = data;
          });
        });
      })
      .then(() => {
        fetch("/registers/T2").then((res) => {
          res
            .json()
            .then((data) => {
              sensor_direita = data;
            })
            .then(() => {
              let newData = joinTimestamps(
                sensor_esquerda,
                sensor_meio,
                sensor_direita
              );
              newData.forEach((register, i) => {
                let element = document.createElement("div");
                let date = `${new Date(register.timestamp)}`;
                element.setAttribute("data-time", date.slice(3, 25));
                element.setAttribute("register", register);
                document.getElementById("timeline").appendChild(element);
              });
            });
        });
      });
  });
}

function joinTimestamps(beta, gama, wc) {
  beta_spliced = beta.splice(0, gama.length);
  wc_spliced = wc.splice(0, gama.length);
  console.log("beta_spliced: ", beta_spliced.length);
  console.log("gama: ", gama.length);
  console.log("wc_spliced: ", wc_spliced.length);

  newData = [];
  for (let index = 0; index < gama.length; index++) {
    newData.push({
      timestamp: gama[index]["HORARIO"],
      beta: beta_spliced[index],
      gama: gama[index],
      wc: wc_spliced[index],
    });
  }
  console.log("consolidado: ", newData);
  timelineData = newData;
  return newData;
}
