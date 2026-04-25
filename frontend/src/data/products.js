import perfume_presale from "../assets/images/perfume_presale.jpg";
import shoes_presale from "../assets/images/shoes_presale.jpg";
import bag_presale from "../assets/images/bag_presale.jpg";

import watches_best from "../assets/images/watches_best.jpg";
import bowtie_best from "../assets/images/bowtie_best.jpg";
import overal_best from "../assets/images/overal_best.jpg";

import shoes from "../assets/images/shoes.jpg";
import bag2 from "../assets/images/bag.jpg";
import scarf from "../assets/images/scarf.jpg";

export const products = [
    {
        id: 1,
        name: "Parfém",
        slug: "parfem",
        price: 3290,
        image: perfume_presale,
        tag: "presale",
        category: "perfume",
        gender: "women",
        description: "Elegantní parfém s dlouhotrvající vůní.",
        volume: [30, 50, 100]
    },
    {
        id: 2,
        name: "Kožená kabelka",
        slug: "kozena-kabelka",
        price: 6490,
        image: bag_presale,
        tag: "presale",
        category: "bags",
        gender: "women",
        description: "Stylová kožená kabelka pro každodenní nošení."
    },
    {
        id: 3,
        name: "Luxusní boty",
        slug: "luxusni-boty",
        price: 8990,
        image: shoes_presale,
        tag: "presale",
        category: "shoes",
        gender: "men",
        description: "Luxusní boty z kvalitních materiálů.",
        sizes: [40, 41, 42, 43, 44]
    },
    {
        id: 4,
        name: "Hodinky",
        slug: "hodinky",
        price: 4290,
        image: watches_best,
        tag: "bestseller",
        category: "watches",
        gender: "women",
        description: "Elegantní hodinky pro každou příležitost."
    },
    {
        id: 5,
        name: "Khaki overal",
        slug: "khaki-overal",
        price: 2490,
        image: overal_best,
        tag: "bestseller",
        category: "clothes",
        gender: "women",
        description: "Moderní overal v khaki barvě.",
        sizes: [38, 40, 42, 44, 50]
    },
    {
        id: 6,
        name: "Navi motýlek",
        slug: "navi-motylek",
        price: 890,
        image: bowtie_best,
        tag: "bestseller",
        category: "clothes",
        gender: "men",
        description: "Stylový motýlek pro formální příležitosti."
    },
    {
        id: 7,
        name: "Kožená kabelka premium",
        slug: "kozena-kabelka-premium",
        price: 7490,
        image: bag_presale,
        category: "bags",
        gender: "women",
        description: "Prémiová kabelka z pravé kůže."
    },
    {
        id: 8,
        name: "Elegantní kabelka",
        slug: "elegantni-kabelka",
        price: 5290,
        image: bag2,
        category: "bags",
        gender: "women",
        description: "Elegantní doplněk pro každou ženu."
    },
    {
        id: 20,
        name: "Pánské boty",
        slug: "panske-boty",
        price: 2990,
        image: shoes,
        category: "shoes",
        gender: "men",
        description: "Pohodlné boty pro každodenní nošení.",
        sizes: [40, 41, 42, 43]
    },
    {
        id: 30,
        name: "Luxusní šála",
        slug: "luxusni-sala",
        price: 1290,
        image: scarf,
        category: "scarves",
        gender: "women",
        description: "Jemná a elegantní šála."
    }
];