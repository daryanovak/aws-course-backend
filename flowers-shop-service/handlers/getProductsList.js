const products = [
    {
      id: "f001",
      title: "Rose Bouquet",
      description: "A stunning arrangement of 12 red roses",
      price: 25
    },
    {
      id: "f002",
      title: "Tulip Bouquet",
      description: "A colorful mix of 10 tulips in a vase",
      price: 20
    },
    {
      id: "f003",
      title: "Lily Arrangement",
      description: "A beautiful arrangement of 8 pink lilies",
      price: 30
    },
    {
      id: "f004",
      title: "Sunflower Bouquet",
      description: "A cheerful bouquet of 6 sunflowers",
      price: 15
    }
  ];
  
  module.exports.handler = async (event) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(products),
      isBase64Encoded: false,
    };
  
    return response;
  };
  