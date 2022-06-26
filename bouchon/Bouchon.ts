import { Holidays } from "../types/Types";

const Bouchon: Holidays = {
  title: "Nos Vancances à Erquy",
  activities: [
    {
      title: "Visite de St Malo",
      location: "St Malo",
    },
    {
      title: "Piscine",
      location: "Lamballe",
    },
  ],
  spendings: [
    {
      title: "Piscine",
      amount: 20,
    },
    {
      title: "Restaurant",
      amount: 40,
    },
  ],
  meals: [
    {
      title: "Galette Bretonne",
      ingredients: [
        {
          title: "Sachet de Fromage",
          quantity: 1,
        },
        {
          title: "Tranche de Jambon",
          quantity: 2,
        },
      ],
    },
    {
      title: "Soupe",
      ingredients: [
        {
          title: "Brique de Soupe",
          quantity: 1,
        },
        {
          title: "Paquet de Croûtons",
          quantity: 1,
        },
      ],
    },
  ],
};

export default Bouchon;
