const products = [
  {
      "description": "Short Product Description1",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      "price": 24,
      "title": "ProductOne",
      "count": 1
  },
  {
      "description": "Short Product Description7",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      "price": 15,
      "title": "ProductTitle",
      "count": 2
  },
  {
      "description": "Short Product Description2",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      "price": 23,
      "title": "Product",
      "count": 3
  },
  {
      "description": "Short Product Description4",
      "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
      "price": 15,
      "title": "ProductTest",
      "count": 4
  },
  {
      "description": "Short Product Descriptio1",
      "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
      "price": 23,
      "title": "Product2",
      "count": 5
  },
  {
      "description": "Short Product Description7",
      "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
      "price": 15,
      "title": "ProductName",
      "count": 6
  }
]
  
  module.exports.handler = async (event) => {
    const productId = event.pathParameters.productId;
    const product = products.find(item => item.product.id === productId);

  
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    }
  
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
      body: JSON.stringify(product),
    };
  };
  