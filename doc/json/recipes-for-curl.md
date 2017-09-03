Check JSON via Online whether this JSON is valid: https://jsonformatter.curiousconcept.com/

## POST method (create a new object)

curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"id":10, "receipt": "Test"}' 'https://project2-60db1.firebaseio.com/recipes.json'

## POST method

curl -X POST -d '{
    "id": 1,
    "receipt": "Spaghetti Bolognese",
    "description": "Zauberhaft wie in Tessin...",
    "user": "Tanja Sennhauser",
    "insertedDate": 1471865163,
    "dauer": "200 Minjten",
    "cuisine": "Italienisch",
    "menge": "4 Personen",
    "category": "Hauptspeise",
    "difficulty": "einfach",
    "rating": 100,
    "einkaufsliste": [
      {
        "name": "Karotten",
        "amount": "2"
      },
      {
        "name": "Pfeffer",
        "amount": "1 Prise"
      },
      {
        "name": "Hackfleisch",
        "amount": "400 g"
      }
    ],
    "zubereitenUndKochen": [
      {
        "step": 1,
        "photo": "bild1.svg",
        "memo": "Zuerst musst man die Pfanne ..."
      },
      {
        "step": 2,
        "photo": "bild2.svg",
        "memo": "Danach Zwiebeln dünsten ..."
      },
      {
        "step": 3,
        "photo": "",
        "memo": "Achtung ..."
      }
    ]
  }' 'https://project2-60db1.firebaseio.com/recipes.json'
  
curl -X POST -d '{
    "id": 2,
    "receipt": "Spiegelei",
    "description": "Zauberhaft wie in Tessin...",
    "user": "Tanja Sennhauser",
    "insertedDate": 1471865163,
    "dauer": "200 Minjten",
    "cuisine": "Italienisch",
    "menge": "4 Personen",
    "category": "Hauptspeise",
    "difficulty": "einfach",
    "rating": 100,
    "einkaufsliste": [
      {
        "name": "Karotten",
        "amount": "2"
      },
      {
        "name": "Pfeffer",
        "amount": "1 Prise"
      },
      {
        "name": "Hackfleisch",
        "amount": "400 g"
      }
    ],
    "zubereitenUndKochen": [
      {
        "step": 1,
        "photo": "bild1.svg",
        "memo": "Zuerst musst man die Pfanne ..."
      },
      {
        "step": 2,
        "photo": "bild2.svg",
        "memo": "Danach Zwiebeln dünsten ..."
      },
      {
        "step": 3,
        "photo": "",
        "memo": "Achtung ..."
      }
    ]
  }' 'https://project2-60db1.firebaseio.com/recipes.json'

curl -X POST -d '{
   "id": 3,
   "receipt": "Pierogi",
   "description": "Zauberhaft wie in Polen...",
   "user": "André Ceres",
   "insertedDate": 1471865163,
   "dauer": "200 Minjten",
   "cuisine": "Italienisch",
   "menge": "4 Personen",
   "category": "Hauptspeise",
   "difficulty": "einfach",
   "rating": 100,
   "einkaufsliste": [
     {
       "name": "Karotten",
       "amount": "2"
     },
     {
       "name": "Pfeffer",
       "amount": "1 Prise"
     },
     {
       "name": "Hackfleisch",
       "amount": "400 g"
     }
   ],
   "zubereitenUndKochen": [
     {
       "step": 1,
       "photo": "bild1.svg",
       "memo": "Zuerst musst man die Pfanne ..."
     },
     {
       "step": 2,
       "photo": "bild2.svg",
       "memo": "Danach Zwiebeln dünsten ..."
     },
     {
       "step": 3,
       "photo": "",
       "memo": "Achtung ..."
     }
   ]
 }' 'https://project2-60db1.firebaseio.com/recipes.json'

curl -X POST -d '{
  "id": 4,
  "receipt": "Fisch mit Gemüse",
  "description": "Zauberhaft wie in Polen...",
  "user": "André Ceres",
  "insertedDate": 1471865163,
  "dauer": "200 Minjten",
  "cuisine": "Italienisch",
  "menge": "4 Personen",
  "category": "Hauptspeise",
  "difficulty": "einfach",
  "rating": 0,
  "einkaufsliste": [
    {
      "name": "Karotten",
      "amount": "2"
    },
    {
      "name": "Pfeffer",
      "amount": "1 Prise"
    },
    {
      "name": "Hackfleisch",
      "amount": "400 g"
    }
  ],
  "zubereitenUndKochen": [
    {
      "step": 1,
      "photo": "bild1.svg",
      "memo": "Zuerst musst man die Pfanne ..."
    },
    {
      "step": 2,
      "photo": "bild2.svg",
      "memo": "Danach Zwiebeln dünsten ..."
    },
    {
      "step": 3,
      "photo": "",
      "memo": "Achtung ..."
    }
  ]
}' 'https://project2-60db1.firebaseio.com/recipes.json'

## DELETE ALL RECIPES method

curl -X DELETE https://project2-60db1.firebaseio.com/recipes.json

## DELETE ID method

curl -X DELETE https://project2-60db1.firebaseio.com/recipes/-KsQ0GjUlF7ABCu2cIaM.json

## GET ALL method

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://project2-60db1.firebaseio.com/recipes.json

## GET ID method

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://project2-60db1.firebaseio.com/recipes/-Kt1ZtJKSz3liYR3vvev.json

## PUT method

curl -X PUT -d '{"receipt":"Pierogi"}' https://project2-60db1.firebaseio.com/recipes/-Kt1ZtJKSz3liYR3vvev.json
