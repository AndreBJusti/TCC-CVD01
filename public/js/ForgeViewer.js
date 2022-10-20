var viewer;

function launchViewer(urn) {
  var options = {
    env: "AutodeskProduction",
    getAccessToken: getForgeToken,
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("forgeViewer"),
      { extensions: ["Autodesk.DocumentBrowser", "Autodesk.VisualClusters"] }
    );
    viewer.start();
    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then((i) => {
    // documented loaded, any action?
    generateSprites();
  });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
  console.error(
    "onDocumentLoadFailure() - errorCode:" +
      viewerErrorCode +
      "\n- errorMessage:" +
      viewerErrorMsg
  );
}

function getForgeToken(callback) {
  fetch("/api/forge/oauth/token").then((res) => {
    res.json().then((data) => {
      callback(data.access_token, data.expires_in);
    });
  });
}

async function generateSprites() {
  // Load 'Autodesk.DataVisualization' and store it as a variable for later use
  const dataVizExtn = await viewer.loadExtension("Autodesk.DataVisualization");

  const DataVizCore = Autodesk.DataVisualization.Core;
  const viewableType = DataVizCore.ViewableType.SPRITE;
  const spriteColor = new THREE.Color(0xffffff);
  // const baseURL = `http://localhost:3003/img`;
  const baseURL = `https://cvd01.herokuapp.com/img`;
  // const baseURL = process.env.PORT;
  const spriteIconUrl = `${baseURL}/motion.svg`;

  const style = new DataVizCore.ViewableStyle(
    viewableType,
    spriteColor,
    spriteIconUrl
  );

  const viewableData = new DataVizCore.ViewableData();
  viewableData.spriteSize = 30; // Sprites as points of size 24 x 24 pixels

  const myDataList = [
    {
      position: {
        x: -9.100365409851074,
        y: -24.92554412841797,
        z: 11.10097752303109,
      },
    },
    {
      position: {
        x: -1.402024688720703,
        y: -5.7580280685424805,
        z: 11.10097752303109,
      },
    },
    {
      position: {
        x: 11.085234724268494,
        y: 24.946354948998547,
        z: 11.10097752303109,
      },
    },
  ];

  myDataList.forEach((myData, index) => {
    const dbId = 10 + index;
    const position = myData.position;
    const viewable = new DataVizCore.SpriteViewable(position, style, dbId);
    viewable.myContextData = {
      sensorManufacturer: "Imaginary Co. Ltd.",
      sensorModel: "BTE-2900x",
      labels: ["In Service", "Passive"],
    };
    viewableData.addViewable(viewable);
  });

  await viewableData.finish();
  dataVizExtn.addViewables(viewableData);

  // viewer.addEventListener(DataVizCore.MOUSE_HOVERING, (event) =>
  //   onSpriteHovering(event, viewableData)
  // );
  viewer.addEventListener(DataVizCore.MOUSE_CLICK, onSpriteClicked);
}

function onSensorSpriteClicked(event) {
  // The identifier of the `SpriteViewable` that is being clicked.
  const targetDbId = event.dbId;

  // Look up the corresponding sprite viewable from `viewableData`.
  const viewables = viewableData.viewables;
  const viewable = viewables.find((v) => v.dbId === targetDbId);

  if (viewable && viewable.myContextData) {
    const data = viewable.myContextData;
    console.log(`Sensor model: ${data.sensorModel}`);
    // Should print "Sensor model: BTE-2900x"
  }
}
