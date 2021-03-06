# Historical geocoding API

URL : api.geohistoricaldata.org/docs

## Getting started

1. La connexion à la base de données PostgreSQL s'appuie sur un fichier de configuration JSON à créer dans le dossier `config/`. Le fichier sera chargé par NodeJS au lancement selon les règles décrites dans https://github.com/lorenwest/node-config/wiki/Configuration-Files .

Par exemple : 
```json5
{
  GeocoderDB: {
    dbConfig:{
      host:"localhost",
      port:5432,
      database:"mydb",
      user:"user",
      password:"password"
    }
  }
}
```

2. `npm start` pour lancer le serveur

## Services

- Géocodage simple : 1 adresse = N résultats. 
- Géocadage en masse : N adresses = N résultats.

## Features
- Géocodage d'un ensemble d'adresses et lecture des résultats (JSON / XML).
- Visualisation Résultats (Leaflet)
- Edition carto. coté client des résultat de géocodage
- Export des résultats (CSV, SHP, GeoJSON, GML, SQL, etc.).
- Edition du référentiel d'objets géohistoriques.

## Modèles
2 bases de données : 
- le référentiel, qui contient tous les objets géohistoriques support du géocodeur.
- staging : les données géocodées, stockées en cache, en attente.

### Objets géohistoriques.

#### CREATE
Ajouter un objet dans une source historique.
Action : POST
Route : /object

#### READ
Récupérer un objet dans une source historique
Action : GET
Route : /id/object/{id}

#### UPDATE
Mettre à jour un objet géohistorique.
Action : PUT
Route : /id/object/{id}

#### DELETE
Supprimer un objet géohistorique 
Action : DELETE
Route : /id/object/{id}

### Source historique.
#### CREATE
Ajouter une source géohistorique.
Action : POST
Route : /source

#### READ
Récupérer une source géohistoriques.
Action : GET
Route : /id/source/{id}

#### UPDATE
Mettre à jour une source géohistorique.
Action : PUT
Route : /id/source/{id}

#### DELETE
Supprimer une source geohistorique.
Action : DELETE
Route : /id/source/{id}

### Geocoding.
#### Executer un géocodage
En batch : 
Action : POST
Route : /geocoding

Requete simple : 
Action : GET
Route : /geocoding
