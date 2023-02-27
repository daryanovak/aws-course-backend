  const products = [
    {
      "product":
        { "description": "Red Roses Bouquet", "id": "8b6d64e9-7d50-4c6e-80b4-ec7044c4a4a1", "price": 50, "title": "Red Roses" }
      , "count": 1
    },
    {
      "product":
        { "description": "Mixed Color Tulips", "id": "44e142e3-6e26-4dd5-b6c8-6a0f0dcb580a", "price": 25, "title": "Tulip Bouquet" }
      , "count": 3
    },
    {
      "product":
        { "description": "Pink and White Lilies", "id": "e8a843a8-9a9f-4840-bbfa-40f04e0f7e11", "price": 35, "title": "Lily Bouquet" },
      "count": 2
    },
    {
      "product":
        { "description": "Pink and White Lilies", "id": "e8a843a8-9a9f-4840-bbfa-40f04e0f7e11", "price": 35, "title": "Lily Bouquet" },
      "count": 5
    },
    {
      "product":
        { "description": "Pink and White Lilies", "id": "e8a843a8-9a9f-4840-bbfa-40f04e0f7e11", "price": 35, "title": "Lily Bouquet" },
      "count": 10
    },
    {
      "product":
        { "description": "Pink and White Lilies", "id": "e8a843a8-9a9f-4840-bbfa-40f04e0f7e11", "price": 35, "title": "Lily Bouquet" },
      "count": 11
    }
  ]


  module.exports.handler = async (event) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(products),
      isBase64Encoded: false,
    };
  
    return response;
  };
  