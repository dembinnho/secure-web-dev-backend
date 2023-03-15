const mongoose = require("mongoose");
require("dotenv").config({path: './'});

const Location = require("./src/locations/locations.model");

const filmingLocations = require("./src/locations/lieux-de-tournage-a-paris.json");

function buildLocation(location) {
  return {
    filmType: location["type_tournage"],
    filmProducerName: location["nom_producteur"],
    endDate: location["date_fin"],
    filmName: location["nom_tournage"],
    district: location["ardt_lieu"],
    sourceLocationId: location["id_lieu"],
    filmDirectorName: location["nom_realisateur"],
    address: location["adresse_lieu"],
    startDate: location["date_debut"],
    year: location["annee_tournage"],
    geolocation: location["geo_shape"],
  };
}

async function importBulkFilmingLocations() {
  const locationsArray = filmingLocations.map((location) =>
      buildLocation(location)
  );
  await Location.insertMany(locationsArray);
}
async function main() {
 // await mongoose.connect("mongodb+srv://admin:admin311@cluster0.xifjfyo.mongodb.net/?retryWrites=true&w=majority");
 // await mongoose.connect("mongodb://compose_mongodb_1");
  await mongoose.connect("mongodb://compose_database_1");
  console.log("Import script connected to database, starting import.");
  await importBulkFilmingLocations();
  console.log("Finished importing.");
}

main();

