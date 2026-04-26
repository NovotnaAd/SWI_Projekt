import jewelry from "../assets/images/jewelry.jpg";
import bag from "../assets/images/bag.jpg";
import shoes from "../assets/images/shoes.jpg";
import watches from "../assets/images/watches.jpg";
import scarf from "../assets/images/scarf.jpg";
import perfume from "../assets/images/perfume.jpg";
import clothes from "../assets/images/clothes.jpg";
import wallet from "../assets/images/wallet.jpg";

export const categories = [
    // HER
    { id: 1, name: "Kabelky", image: bag, slug: "bags", gender: "women" },
    { id: 2, name: "Boty", image: shoes, slug: "shoes", gender: "women" },
    { id: 3, name: "Šperky", image: jewelry, slug: "jewelry", gender: "women" },
    { id: 4, name: "Parfémy", image: perfume, slug: "perfume", gender: "women" },
    { id: 5, name: "Oblečení", image: clothes, slug: "clothes", gender: "women" },
    { id: 6, name: "Šály", image: scarf, slug: "scarves", gender: "women" },
    { id: 7, name: "Peněženky", image: wallet, slug: "wallets", gender: "women" },
    { id: 8, name: "Hodinky", image: watches, slug: "watches", gender: "women" },

    // HIM
    { id: 9, name: "Hodinky", image: watches, slug: "watches", gender: "men" },
    { id: 10, name: "Oblečení", image: clothes, slug: "clothes", gender: "men" },
    { id: 11, name: "Boty", image: shoes, slug: "shoes", gender: "men" },
    { id: 12, name: "Peněženky", image: wallet, slug: "wallets", gender: "men" },
    { id: 13, name: "Šály", image: scarf, slug: "scarves", gender: "men" },
    { id: 14, name: "Šperky", image: jewelry, slug: "jewelry", gender: "men" },
    { id: 15, name: "Tašky", image: bag, slug: "bags", gender: "men" },
    { id: 16, name: "Doplňky", image: wallet, slug: "accessories", gender: "men" },
];