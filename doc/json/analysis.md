# CURL Documentation and Example

- http://blog.scottlowe.org/2014/02/19/using-curl-to-interact-with-a-restful-api/
- https://erichonorez.wordpress.com/2013/02/10/how-create-a-rest-api-with-node-js-and-express/
- http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/

## Idea of the Sample Data

Rezept: Spaghetti Bolognese

### Einkaufsliste

500g Hackfleisch
1 Karotten
1 Flasche Tomatensaft
Pfeffer
Salt
3 Zwiebeln
1 Knoblauch
Oregano
1kg Spaghetti (Barilla)

### Zubereiten und Kochen

Schritt 1
Foto hochladen
Memo erfassen

Schritt 2
Foto hochladen (optional)
Memo erfassen

...

## JSON

{
  {
    "receipt": "Spaghetti Bolognese",
    "description": "Zauberhaft wie in Tessin...",
    "user": "Tanja Sennhauser",
    "insertedDate": 1471865163,
    "dauer": "200 Minjten",
    "cuisine": "Italienisch",
    "menge": "4 Personen",
    "category": "Hauptspeise",
    "difficulty": "einfach"
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
      },
      ...
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
      },
      ...
    ]
  }
}

## Registration und Login

{
  [
    {
      "id" "#1",
      "email": "tanja@hsr.ch",
      "user": "tanja",
      "password": "sdzfi.werudsf.sdfjsd",
      "vorname": "Tanja",
      "name": "Sennhauser",
      "strasse": "Hauptstrasse 23",
      "plz": "8000",
      "ort": "Rapperswil"
    }
  ]
}

## Menu Art

{
  menuArt: [
    "Vorspeise", "Hauptspeise", "Dessert", "Beilage", "Frühstück", "Kleine Gerichte"
  ]
}

## Grade

{
  schwierigkeitsgrad: [
    "einfach", "mittel", "schwer"
  ]
}

## Cuisine

{
  cuisine: [
    "Schweizerisch", "Italienisch", "Französisch", "Thailändich"
  ]
}
