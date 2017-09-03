Check JSON via Online whether this JSON is valid: https://jsonformatter.curiousconcept.com/

## POST method (create a new object)

curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"category": "Hauptspeise"}' 'https://project2-60db1.firebaseio.com/recipes.json'

curl -X POST -d '{
  "name": 
}' 'https://project2-60db1.firebaseio.com/categories.json'

## DELETE ALL CATEGORIES method

curl -X DELETE https://project2-60db1.firebaseio.com/categories.json

## DELETE ID method

curl -X DELETE https://project2-60db1.firebaseio.com/categories/-KsQ0GjUlF7ABCu2cIaM.json

## GET ALL method

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://project2-60db1.firebaseio.com/categories.json

## GET ID method ???

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://project2-60db1.firebaseio.com/categories.json?id=2

## PUT method ???

curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT -d '{"key":1, "category": "Test"}' 'https://project2-60db1.firebaseio.com/categories.json'

curl -X PUT -d '{"name":"Frühstück"}' https://project2-60db1.firebaseio.com/categories.json

## Menu Art / Category JSON

{
  key: 1 {
    category: "Frühstück"
  },
  key: 2 {
    category: "Hauptspeise"
  }
}
