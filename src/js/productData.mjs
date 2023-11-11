function convertToJson(res) {
  try {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  } catch (error) {
    console.error("Error: " + error);
    return undefined;
  }
}

export async function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);    
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
