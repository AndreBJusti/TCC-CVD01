var timelineData = [];

function generateTimeline(document) {
  var sensor_esquerda = [];
  var sensor_meio = [];
  var sensor_direita = [];

  fetch("/registers/T1").then((res) => {
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
        fetch("/registers/T1").then((res) => {
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
              newData.forEach((register) => {
                let element = document.createElement("div");
                let date = `${new Date(register.timestamp)}`;
                console.log("date: ", date);
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
  beta_spliced = beta.splice(0, wc.length);
  gama_spliced = gama.splice(0, wc.length);
  console.log("beta_spliced: ", beta_spliced.length);
  console.log("gama_spliced: ", gama_spliced.length);
  console.log("wc_spliced: ", wc.length);
  newData = [];
  for (let index = 0; index < wc.length; index++) {
    newData.push({
      timestamp: wc[index].timestamp,
      beta: beta_spliced[index],
      gama: gama_spliced[index],
      wc: wc[index],
    });
  }
  console.log("consolidado: ", newData);
  timelineData = newData;
  return newData;
}
