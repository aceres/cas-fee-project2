# 1. Meeting

## 12. August 2017

- Projekt 2 - Projekt-Info nochmals anschauen
- Milestones setzen
- Wireframes -> Tanja (Mock)
- 1. Prototyp mit Angular 4 fertigstellen
- Authentification
- REST-API definieren
- SASS
- ...

Rezept: Spaghetti Bolognese

Einkaufsliste

500g Hackfleisch
1 Karotten
1 Flasche Tomatensaft
Pfeffer
Salt
3 Zwiebeln
1 Knoblauch
Oregano
1kg Spaghetti (Barilla)

Zubereiten und Kochen

...

{
  {
    receipt: "Spaghetti Bolognese",
    description: "Zauberhaft wie in Tessin...",
    user: "Trump",
    insertedDate: 1471865163,
    dauer: "200 minutes",
    cuisine: "Italian",
    menge "4 personen",
    category: "Hauptspeise",
    difficulty: "einfach"
    rating: "100",
    einkaufsliste: [
      {
        name: "Karotten",
        amount: "2"
      },
      {
        name: "Pfeffer",
        amount: ""
      },
      ...
    ],
    zubereitenUndKochen: [
      {
        schritt: 1,
        photo: "bild1.svg",
        memo: "Zuerst musst man Pfanne ..."
      },
      {
        schritt: 2,
        photo: "bild2.svg",
        memo: "Danach Zwieben dünsten ..."
      },
      {
        schritt: 3,
        photo: "",
        memo: "Achtung ..."
      },
      ...
    ]
  }
}

Registration und Login

{
  [
    {
      id "?",
      email: "tanja@hsr.ch",
      user: "tanja",
      password: "sdzfi.werudsf.sdfjsd",
      vorname: "Tanja",
      name: "Sennhauser",
      strasse: "Hauptstrasse 23",
      plz: "8000",
      ort: "Rapperswil"
    }
  ]
}

{
  menuArt: [
    Vorspeise, Hauptspeise, Dessert, Beilage, Frühstück, Kleine Gerichte
  ]
}

{
  schwierigkeitsgrad: [
    einfach, mittel, schwer
  ]
}

{
  cuisine: [
    Schweizerisch, Italienisch, Französisch, Thailändich
  ]
}

Get Recipes:

> curl -i http://localhost:4200/recipes/

Get Recipe (Detail)

> curl -i http://localhost:4200/recipes/1

Create Recipe:

> curl -i -X POST http://localhost:4200/recipes --data '{recipe: "spaghetti"}' -H 'Content-Type: application/json';

Update Recipe:

> curl -i -X PUT http://localhost:4200/recipes/1 --data '{description&quot;:&quot;blabla&quot;}' -H 'Content-Type: application/json';

Delete Recipe:

> curl -i -X DELETE http://localhost:4200/recipes/1
