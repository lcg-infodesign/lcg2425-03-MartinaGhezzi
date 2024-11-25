let data;
let dataObj;
let yStart;

//per caricare il file
function preload() {
  data = loadTable("RiversData.csv", "csv", "header");
}

let indexWidth = 150;
let indexHeight = 40; 

//variabili rect
let rectSize = 20;

function setup() {
  yStart = 130;
  frameRate(3);
  createCanvas(windowWidth*2.5, windowHeight*7.6); //canva grande quanto lo schermo
  
  dataObj = data.getRows(); //mi crea un array dal file csv, organizzato in righe e colonne
  dataObj.sort((a, b) => b.getNum("length") - a.getNum("length"));

  angleMode(DEGREES);

}

function draw() {
  background("#D9ED92");

  let inizio = ((windowWidth)/2) - indexWidth/2;
  let distanza = 160

  index("Asia",30,40,"#76C893","#D9ED92");
  index("Africa",210,40,"#184E77","#D9ED92");
  index("Europa",390,40,"#52B69A", "#D9ED92");
  index("Oceania",570,40,"#168AAD", "#D9ED92");
  index("Australia",750,40,"#34A0A4", "#D9ED92");
  index("North America",930,40,"#1A759F", "#D9ED92");
  index("South America",1110,40,"#1E6091", "#D9ED92");

    //voglio un rettangolo per ogni riga del dataset
    for(let i = 0; i < data.getRowCount(); i ++){
      //carico i dati della riga, creando una variabile
      let item = dataObj[i];
      drawGlyph(0, 0 + 150 + 8*((rectSize*i)/2), item);
    }  
    yStart = 130; 
}

function index(scritta,x,y,colore, textcolor) {
  noStroke();
  fill(colore);
  rect(x, y, indexWidth, indexHeight, 20);
  fill(textcolor);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(scritta,x+(indexWidth/2),y+(indexHeight/2));

}

function drawGlyph(x, y, rowData) {
noStroke();
strokeWeight(1);
//creo delle condizioni per cui per ogni continente associo un colore differente
//if --> riga appartenente al continente 'x'
//il fill avrà colore 'y'
//else if per le altre variabili
  if(rowData.get("continent") == "Asia"){
    fill("#76C893") //Yellow
  }
  else if(rowData.get("continent") == "Africa") {
    fill("#184E77") //alice blue
  }
  else if(rowData.get("continent") == "Europe") {
    fill("#52B69A") //office green
  }
  else if(rowData.get("continent") == "Oceania") {
    fill("#168AAD") //dark blue
  }
  else if(rowData.get("continent") == "Australia") {
    fill("#34A0A4") //Aqua
  }
  else if(rowData.get("continent") == "North America") {
    fill("#1A759F") //candy apple red
  }
  else if(rowData.get("continent") == "South America") {
    fill("#1E6091") //eletric violet
  }

  let rectHeight = map(rowData.getNum("area"), 1191, 7050000, 5, 60)
  let rectWidth = map(rowData.getNum("length"), 60, 6700, 30, windowWidth/3)
  //let rectWidth = rowData.getNum("area")/99700
  rect(x, yStart, rectWidth, rectHeight, 0, rectWidth/2, rectWidth/2, 0);

  //scrivo il nome
  fill("#184E77");
  textSize(16);
  textAlign(LEFT);
  text(rowData.get("name") + " " + "(" + rowData.get("countries") + ")" + "     " + "---------->" + "     " + rowData.get("outflow"), rectWidth + 30, yStart + (rectHeight/2)); //rowData(prendo tutte le righe) .countries (di quale colonna?)
  //nome della variabile.nome_della_colonna_nel_csv
  yStart = yStart + rectHeight + 40;


}

function windowResized() {
  resizeCanvas(windowWidth*2.5, windowHeight*7.6);
  yStart = 130;
}

