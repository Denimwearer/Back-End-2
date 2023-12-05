const houses = require("./db.json");
let globalId = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body;
    if (isNaN(price)) {
      res.status(400).send("Price must be a valid number");
      return;
    }
    let newHouse = {
      id: globalId,
      address,
      price,
      imageURL,
    };
    houses.push(newHouse);
    globalId++;
    res.status(200).send(houses);
  },
  deleteHouse: (req, res) => {
    let index = houses.findIndex((elem) => elem.id === +req.params.id);
    if (index === -1) {
      res.status(400).send("Can not delete");
      return;
    }

    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  updateHouse: (req, res) => {
    const { type } = req.body;
    let index = houses.findIndex((elem) => elem.id === +req.params.id);

    if (index === -1) {
      res.status(400).send("Can not find house");
      return;
    }

    if (type === "minus" && houses[index].price - 10000 < 0) {
      res.status(400).send("Price can't go below 0");
      return;
    }

    if (type === "minus") {
      houses[index].price -= 10000;
      res.status(200).send(houses);
    } else if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else {
      res.status(400).send("Invalid");
    }
    return;
  },
};
