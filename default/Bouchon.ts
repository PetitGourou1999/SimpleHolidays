import { Holidays } from "../types/Types";
import { MealIdea } from "./../types/Types";

export const Bouchon: Holidays = {
  title: "Nos Vancances à Erquy",
  dateStart: new Date("2019-01-16"),
  dateEnd: new Date("2019-01-18"),
  players: [
    {
      pseudo: "Meg-Ann",
    },
    {
      pseudo: "Antoine",
    },
  ],
  activities: [
    {
      title: "Visite de St Malo",
      location: "St Malo",
      date: new Date("2019-01-16"),
    },
    {
      title: "Piscine",
      location: "Lamballe",
      date: new Date("2019-01-17"),
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
      meals: [
        {
          meal: {
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
          time: "LUNCH",
        },
        {
          meal: {
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

          time: "DINER",
        },
      ],
      date: new Date("2019-01-16"),
    },
    {
      meals: [
        {
          meal: {
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
          time: "LUNCH",
        },
        {
          meal: {
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

          time: "DINER",
        },
      ],
      date: new Date("2019-01-17"),
    },
    {
      meals: [
        {
          meal: {
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
          time: "LUNCH",
        },
        {
          meal: {
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

          time: "DINER",
        },
      ],
      date: new Date("2019-01-18"),
    },
  ],
};

export const MealIdeas: MealIdea[] = [
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
];
