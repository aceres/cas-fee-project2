Check JSON via Online whether this JSON is valid: https://jsonformatter.curiousconcept.com/

## POST method (create a new object)

curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"cuisine": "Italienisch  Herrlich"}' 'https://project2-60db1.firebaseio.com/cuisines.json'

curl -X POST -d '{
  "cuisine": "Italienisch"
}' 'https://project2-60db1.firebaseio.com/cuisines.json'

## DELETE ALL CUISINES method

curl -X DELETE https://project2-60db1.firebaseio.com/cuisines.json

## DELETE ID method

curl -X DELETE https://project2-60db1.firebaseio.com/cuisines/-KsQ0GjUlF7ABCu2cIaM.json

## GET ALL method

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://project2-60db1.firebaseio.com/cuisines.json

## GET ID method

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://project2-60db1.firebaseio.com/cuisines/-Kt5mo3Ws4KPfNWag6hR.json

## PUT method

curl -X PUT -d '{"cuisine":"Schweizerisch 2"}' https://project2-60db1.firebaseio.com/cuisines/-Kt5mqCdlD2lX7O5cMw9.json

## Menu Art / Cuisine JSON

{
  key: 1 {
    cuisine: "Französisch"
  },
  key: 2 {
    cuisine: "Japanisch"
  }
}
