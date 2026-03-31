
import { Dish, Category, Review } from './types';

export const DELIVERY_ZONES = [
  { name: 'Goregaon City', fee: 0, minOrder: 200 },
  { name: 'Chinchwali', fee: 0, minOrder: 200 },
  { name: 'Lonere', fee: 40, minOrder: 200 },
  { name: 'chinchwali wadi', fee: 0, minOrder: 200 },
  { name: 'Purar', fee: 40, minOrder: 200 },
  { name: 'Dahiwali', fee: 40, minOrder: 200 },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'starters', name: 'Starters', icon: '🍗' },
  { id: 'soup', name: 'Soups', icon: '🥣' },
  { id: 'rice', name: 'Rice', icon: '🍚' },
  { id: 'noodles', name: 'Noodles', icon: '🍝' },
  { id: 'chopsy', name: 'Chopsy', icon: '🍜' },
  { id: 'chef-special', name: 'Specials', icon: '👨‍🍳' },
  { id: 'soft-drinks', name: 'Drinks', icon: '🥤' },
  { id: 'extras', name: 'Extras', icon: '🥚' },
  { id: 'ice-cream', name: 'Ice-cream', icon: '🍦' },
];

export const DHRUVTAARA_MENU: Dish[] = [
    {
      "id": 1,
      "name": "Munchurian Dry",
      "description": "Oil fried crispy cabbage munchurian",
      "category": "starters",
      "veg": true,
      "image": "/images/dry_munchurian.png",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 2,
      "name": "Munchurian Gravy",
      "description": "oil fried crispy cabbage munchurian with tasty gravy",
      "category": "starters",
      "veg": true,
      "image": "images/gravy_munchurian.png",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 3,
      "name": "Paneer 65",
      "description": "Spicy deep-fried cottage cheese cubes with southern flavors",
      "category": "starters",
      "veg": true,
      "image": "images/paneer 65.png",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 4,
      "name": "Veg Crispy",
      "description": "Crispy fried vegetables tossed in tangy seasoning",
      "category": "starters",
      "veg": true,
      "image": "images/veg crispy.png",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 5,
      "name": "Paneer Crispy",
      "description": "Crispy cottage cheese coated with spices and fried",
      "category": "starters",
      "veg": true,
      "image": "images/panner crispy.png",
      "variations": [
        {
          "type": "half",
          "price": 110
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 6,
      "name": "Chinese Bhel",
      "description": "Crispy noodles tossed with tangy Indo-Chinese sauces and fresh veggies.",
      "category": "starters",
      "veg": true,
      "image": "images/chinese bhel.png",
      "variations": [
        {
          "type": "half",
          "price": 60
        },
        {
          "type": "full",
          "price": 140
        }
      ],
      "available": true
    },
    {
      "id": 7,
      "name": "Paneer Chinese Bhel",
      "description": "Crispy noodles mixed with saucy vegetables and soft paneer cubes for a flavorful twist.",
      "category": "starters",
      "veg": true,
      "image": "images/Paneer Chinese Bhel.png",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 160
        }
      ],
      "available": true
    },
    {
      "id": 8,
      "name": "Veg Manchow Soup",
      "description": "Hot & spicy soup topped with crispy noodles",
      "category": "soup",
      "veg": true,
      "image": "images/veg munchaw soup.png",
      "variations": [
        {
          "type": "half",
          "price": 50
        },
        {
          "type": "full",
          "price": 90
        }
      ],
      "available": true
    },
    {
      "id": 9,
      "name": "Lung Fung Soup",
      "description": "Thick Indo-Chinese soup with vegetables",
      "category": "soup",
      "veg": true,
      "image": "https://theliteratechef.com/wp-content/uploads/2013/12/thick-as-fog-pea-soup.jpg",
      "variations": [
        {
          "type": "half",
          "price": 60
        },
        {
          "type": "full",
          "price": 100
        }
      ],
      "available": true
    },
    {
      "id": 10,
      "name": "Baba Special Soup",
      "description": "House special hearty vegetable soup",
      "category": "soup",
      "veg": true,
      "image": "https://www.cookingcarnival.com/wp-content/uploads/2021/09/Vegetable-manchow-soup.webp",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 120
        }
      ],
      "available": true
    },
    {
      "id": 11,
      "name": "Masaledar Hot & Sour Soup",
      "description": "Hot and sour soup with a spicy twist",
      "category": "soup",
      "veg": true,
      "image": "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/hot-and-sour-chicken-soup-1-500x375.jpg",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 12,
      "name": "Fried Rice",
      "description": "Classic Indo-Chinese fried rice with mixed vegetables",
      "category": "rice",
      "veg": true,
      "image": "images/fried rice.png",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 130
        }
      ],
      "available": true
    },
    {
      "id": 13,
      "name": "Paneer Fried Rice",
      "description": "Fried rice tossed with seasoned paneer cubes",
      "category": "rice",
      "veg": true,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa9xnDf6nzEtRlIMfnGE5H5shzip0VU2TNbQ&s",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 14,
      "name": "Schezwan Rice",
      "description": "Spicy rice cooked in rich Schezwan sauce",
      "category": "rice",
      "veg": true,
      "image": "https://www.whiskaffair.com/wp-content/uploads/2020/09/Schezwan-Fried-Rice-2-3.jpg",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 140
        }
      ],
      "available": true
    },
    {
      "id": 15,
      "name": "Paneer Schezwan Rice",
      "description": "Schezwan rice mixed with soft paneer cubes",
      "category": "rice",
      "veg": true,
      "image": "https://img.clearcals.com/recipes/9aed609f98a8850328143371b69e296efbf2f26a/medium.jpg",
      "variations": [
        {
          "type": "half",
          "price": 100
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 16,
      "name": "Singapore Rice",
      "description": "Singapore-style flavorful spicy rice",
      "category": "rice",
      "veg": true,
      "image": "https://beatthebudget.com/wp-content/uploads/2022/06/Singapore-fried-rice-featured-image-1200-x-1500px.jpg",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 160
        }
      ],
      "available": true
    },
    {
      "id": 17,
      "name": "Combo Rice",
      "description": "Combination rice served with gravy and noodles",
      "category": "rice",
      "veg": true,
      "image": "https://i.ytimg.com/vi/uDYwMHYdJ3w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDxwBoCjSrc3L_bm3xhkcyPxjtqDQ",
      "variations": [
        {
          "type": "half",
          "price": 100
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 18,
      "name": "Triple Rice",
      "description": "Rice served with noodles and Manchurian gravy — a full triple combo",
      "category": "rice",
      "veg": true,
      "image": "https://cdn.dotpe.in/longtail/store-items/8876339/TkeXLKJ4.webp",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 19,
      "name": "Chopper Rice",
      "description": "Fiery Indo-Chinese chopper-style rice",
      "category": "rice",
      "veg": true,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OK4o8rCOxivBW6c5BKgaDFobbcjRZIpVBg&s",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 20,
      "name": "Chilli Rice",
      "description": "Rice tossed with hot chilli sauce and veggies",
      "category": "rice",
      "veg": true,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Ehkb-9QaZ0C-lJpW3Ns_ruBTO5mgP-ubig&s",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 21,
      "name": "Thousand Rice",
      "description": "Rich thousand-style Indo-Chinese rice",
      "category": "rice",
      "veg": true,
      "image": "https://b.zmtcdn.com/data/pictures/5/20524775/8c9be622bd436271ec6898b84934b85a.jpg",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 210
        }
      ],
      "available": true
    },
    {
      "id": 22,
      "name": "Sherfa Rice",
      "description": "Special sherfa-flavored spicy rice",
      "category": "rice",
      "veg": true,
      "image": "https://b.zmtcdn.com/data/pictures/chains/1/18017751/059b47928c33d005a61a476e6f73bb61.jpg",
      "variations": [
        {
          "type": "half",
          "price": 140
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 23,
      "name": "Malaysian Rice",
      "description": "Aromatic Malaysian-style rice with bold spices",
      "category": "rice",
      "veg": true,
      "image": "https://www.thespruceeats.com/thmb/jb1JgHVPBLKbKrXuzF7rir68i3o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/malaysian-shrimp-fried-rice-3030386-hero-01-2d2ae4c5ecac445b9b09794c7ed7ac52.jpg",
      "variations": [
        {
          "type": "half",
          "price": 150
        },
        {
          "type": "full",
          "price": 250
        }
      ],
      "available": true
    },
    {
      "id": 24,
      "name": "Hakka Noodles",
      "description": "Classic Indo-Chinese stir-fried noodles with vegetables",
      "category": "noodles",
      "veg": true,
      "image": "https://static.toiimg.com/thumb/75356205.cms?width=800&height=800&imgsize=1503855",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 130
        }
      ],
      "available": true
    },
    {
      "id": 25,
      "name": "Paneer Hakka Noodles",
      "description": "Hakka noodles tossed with soft paneer cubes",
      "category": "noodles",
      "veg": true,
      "image": "images/paneer noodles.png",
      "variations": [
        {
          "type": "half",
          "price": 100
        },
        {
          "type": "full",
          "price": 180
        }
      ],
      "available": true
    },
    {
      "id": 26,
      "name": "Schezwan Noodles",
      "description": "Hot and spicy noodles with Schezwan flavors",
      "category": "noodles",
      "veg": true,
      "image": "images/schezwan noodles.png",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 27,
      "name": "Paneer Schezwan Noodles",
      "description": "Schezwan noodles served with soft paneer cubes",
      "category": "noodles",
      "veg": true,
      "image": "https://i.pinimg.com/474x/0d/cd/df/0dcddfda02d19bad71bcf3f61b489c1a.jpg",
      "variations": [
        {
          "type": "half",
          "price": 100
        },
        {
          "type": "full",
          "price": 180
        }
      ],
      "available": true
    },
    {
      "id": 28,
      "name": "Singapore Noodles",
      "description": "Singaporean style spicy noodles",
      "category": "noodles",
      "veg": true,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsk3gFqv5X6HU6Gtp7UrQO6Dtz5CG-oqo3aA&s",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 29,
      "name": "Schezwan Triple Noodles",
      "description": "Triple noodles served with Schezwan base",
      "category": "noodles",
      "veg": true,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3nN3LyikEqw6CiWWs0gJ4U_WNQtaVi7a1-Q&s",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 30,
      "name": "Chopper Noodles",
      "description": "Noodles cooked in chopper style seasoning",
      "category": "noodles",
      "veg": true,
      "image": "https://images.jdmagicbox.com/v2/comp/mumbai/s8/022pxx22.xx22.201112091040.e1s8/catalogue/chinese-chopper-jogeshwari-west-mumbai-fast-food-33ad5r9f9k.jpg",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 31,
      "name": "Chilli Noodles",
      "description": "Noodles tossed in hot chilli sauce",
      "category": "noodles",
      "veg": true,
      "image": "https://hot-thai-kitchen.com/wp-content/uploads/2021/11/chili-garlic-noodles-blog-500x500.jpg",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 32,
      "name": "Thousand Noodles",
      "description": "Thousand-style spicy noodles",
      "category": "noodles",
      "veg": true,
      "image": "https://www.shutterstock.com/image-photo/chinese-noodles-chicken-vegetables-cardboard-260nw-2465164993.jpg",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 33,
      "name": "Sherfa Noodles",
      "description": "Special sherfa-style noodles",
      "category": "noodles",
      "veg": true,
      "image": "https://images.happycow.net/venues/1024/91/81/hcmp91812_1130745.jpeg",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 34,
      "name": "Malaysian Noodles",
      "description": "Authentic Malaysian flavor noodles",
      "category": "noodles",
      "veg": true,
      "image": "https://cdn.sunbasket.com/e9620f8b-31e1-41f3-a087-f74a9973574a.jpg",
      "variations": [
        {
          "type": "half",
          "price": 150
        },
        {
          "type": "full",
          "price": 280
        }
      ],
      "available": true
    },
    {
      "id": 40,
      "name": "Maher Special",
      "description": "House special signature preparation",
      "category": "chef-special",
      "veg": true,
      "image": "placeholder.jpg",
      "variations": [
        {
          "type": "full",
          "price": 400
        }
      ],
      "available": true
    },
    {
      "id": 41,
      "name": "Dragon Rice",
      "description": "Fiery spicy dragon-style rice",
      "category": "chef-special",
      "veg": true,
      "image": "https://mummykitchen.in/wp-content/uploads/2025/06/Chicken-Dragon-rice.jpg",
      "variations": [
        {
          "type": "full",
          "price": 250
        }
      ],
      "available": true
    },
    {
      "id": 42,
      "name": "Schezwan Chopsy",
      "description": "Crispy chopsy tossed in spicy Schezwan sauce",
      "category": "chopsy",
      "veg": true,
      "image": "https://www.vegrecipesofindia.com/wp-content/uploads/2017/11/american-chopsuey-recipe-1a.jpg",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 210
        }
      ],
      "available": true
    },
    {
      "id": 43,
      "name": "American Chopsy",
      "description": "Crispy noodles topped with sweet & tangy sauce",
      "category": "chopsy",
      "veg": true,
      "image": "https://theyummydelights.com/wp-content/uploads/2020/09/american-chop-suey.jpg",
      "variations": [
        {
          "type": "half",
          "price": 140
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 44,
      "name": "Campa Cola",
      "description": "Refreshing cola drink",
      "category": "soft-drinks",
      "veg": true,
      "image": "https://gandhifood.com/cdn/shop/files/40329398_2-campa-cola.jpg?v=1745006977",
      "variations": [
        {
          "type": "bottle",
          "price": 40
        }
      ],
      "available": true
    },
    {
      "id": 45,
      "name": "Thums Up",
      "description": "Strong and bold cola",
      "category": "soft-drinks",
      "veg": true,
      "image": "https://m.media-amazon.com/images/I/61yecBpCDhL.jpg",
      "variations": [
        {
          "type": "bottle",
          "price": 45
        }
      ],
      "available": true
    },
    {
      "id": 46,
      "name": "Sprite",
      "description": "Lemon-lime sparkling drink",
      "category": "soft-drinks",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1680404005217-a441afdefe83?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3ByaXRlJTIwY2FufGVufDB8fDB8fHww",
      "variations": [
        {
          "type": "bottle",
          "price": 40
        }
      ],
      "available": true
    },
    {
      "id": 47,
      "name": "Fanta",
      "description": "Orange flavored soft drink",
      "category": "soft-drinks",
      "veg": true,
      "image": "https://s3-eu-west-1.amazonaws.com/webshop/data/thumbs/53/539c17d147c9b82f2491108095af683532f5e4a0.jpg",
      "variations": [
        {
          "type": "bottle",
          "price": 40
        }
      ],
      "available": true
    },
    {
      "id": 49,
      "name": "Maaza",
      "description": "Mango fruit drink",
      "category": "soft-drinks",
      "veg": true,
      "image": "https://m.media-amazon.com/images/I/61+jGc7vLIL.jpg",
      "variations": [
        {
          "type": "bottle",
          "price": 50
        }
      ],
      "available": true
    },
    {
      "id": 50,
      "name": "Omlette",
      "description": "Freshly prepared egg omlette",
      "category": "extras",
      "veg": false,
      "image": "https://www.healthyfood.com/wp-content/uploads/2018/02/Basic-omelette.jpg",
      "variations": [
        {
          "type": "standard",
          "price": 20
        }
      ],
      "available": true
    },
    {
      "id": 51,
      "name": "Timepass",
      "description": "Special timepass snack",
      "category": "extras",
      "veg": true,
      "image": "https://i.ytimg.com/vi/kKNUKEii3hw/hqdefault.jpg",
      "variations": [
        {
          "type": "standard",
          "price": 20
        }
      ],
      "available": true
    },
    {
      "id": 52,
      "name": "Chicken 65",
      "description": "Spicy deep-fried chicken tossed in South Indian-style seasoning",
      "category": "starters",
      "veg": false,
      "image": "https://i.ytimg.com/vi/afaP90FH-MA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAAcnerG5SplvZMH6b2FMzdikDweA",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 53,
      "name": "Chicken Crispy",
      "description": "Crispy fried chicken tossed in tangy Indo-Chinese sauces",
      "category": "starters",
      "veg": false,
      "image": "https://i.ytimg.com/vi/PeerF_ieRdw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCaSfzzeiHlnwpwlZgn6TZuH-P05w",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 54,
      "name": "Lollipop (Dry)",
      "description": "Crispy chicken lollipops served dry with seasoning",
      "category": "starters",
      "veg": false,
      "image": "https://chillaxrestaurant.co.nz/wp-content/uploads/2023/09/best_chicken_lollipop_drums_of_chicken.jpg",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 55,
      "name": "Chicken Chilli (Dry)",
      "description": "Stir-fried chicken with capsicum and spicy chilli sauce",
      "category": "starters",
      "veg": false,
      "image": "https://iwantimages.s3.amazonaws.com/wp-content/uploads/2020/03/19001455/easy-chilli-chicken-recipe.jpg",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 56,
      "name": "Masala Lollipop",
      "description": "Spicy masala-coated chicken lollipops",
      "category": "starters",
      "veg": false,
      "image": "https://i.ytimg.com/vi/nGYTZ7M1u8w/maxresdefault.jpg",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 57,
      "name": "Chicken Chilli Gravy",
      "description": "Chicken cooked in rich, spicy chilli gravy",
      "category": "starters",
      "veg": false,
      "image": "https://i.ytimg.com/vi/KKt9NEKDeF8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD7uMWHO9IIiqN3TLuUfh1ECEoVaQ",
      "variations": [
        {
          "type": "half",
          "price": 110
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 58,
      "name": "Chicken Chinese Bhel",
      "description": "Crispy noodle bhel mixed with chicken and Indo-Chinese sauces",
      "category": "starters",
      "veg": false,
      "image": "https://mummykitchen.in/wp-content/uploads/2025/01/Veg-Chinese-bhel.jpg.webp",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 59,
      "name": "Chicken Fried Rice",
      "description": "Classic fried rice cooked with shredded chicken and vegetables",
      "category": "rice",
      "veg": false,
      "image": "https://www.kannammacooks.com/wp-content/uploads/street-style-chicken-rice-recipe-1-3.jpg",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 130
        }
      ],
      "available": true
    },
    {
      "id": 60,
      "name": "Chicken Schezwan Rice",
      "description": "Spicy Schezwan-style rice tossed with chicken",
      "category": "rice",
      "veg": false,
      "image": "https://www.sharmispassions.com/wp-content/uploads/2014/11/SchezwanFriedRice5.jpg",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 140
        }
      ],
      "available": true
    },
    {
      "id": 61,
      "name": "Chicken Singapore Rice",
      "description": "Singapore-style flavoured rice with shredded chicken",
      "category": "rice",
      "veg": false,
      "image": "https://vaya.in/recipes/wp-content/uploads/2018/03/Chicken-Singaporean-Fried-Rice.jpg",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 160
        }
      ],
      "available": true
    },
    {
      "id": 62,
      "name": "Chicken Combo Rice",
      "description": "Combination-style rice served with chicken gravy",
      "category": "rice",
      "veg": false,
      "image": "https://content.instructables.com/FK7/OVR5/LBAT0T39/FK7OVR5LBAT0T39.jpg?auto=webp&frame=1&width=2100",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 63,
      "name": "Chicken Triple Rice",
      "description": "Triple-style rice with noodles and chicken Manchurian gravy",
      "category": "rice",
      "veg": false,
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/1b/5d/3e/47/chicken-triple-schezwan.jpg",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 64,
      "name": "Chicken Chopper Rice",
      "description": "Fiery chopper-style rice with chicken",
      "category": "rice",
      "veg": false,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGxGIiEbNF9xFbbx32Hm0Myukb0YGpbn19YQ&s",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 65,
      "name": "Chicken Chilli Rice",
      "description": "Rice tossed with spicy chilli sauce and shredded chicken",
      "category": "rice",
      "veg": false,
      "image": "https://img-global.cpcdn.com/recipes/a870875c0af489f3/680x781cq80/chilli-chicken-and-veg-fried-rice-recipe-main-photo.jpg",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 66,
      "name": "Chicken Thousand Rice",
      "description": "Thousand-style Indo-Chinese chicken rice",
      "category": "rice",
      "veg": false,
      "image": "https://b.zmtcdn.com/data/dish_photos/c6d/63e18ba2c69386d07353a0859b143c6d.jpeg?output-format=webp",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 210
        }
      ],
      "available": true
    },
    {
      "id": 67,
      "name": "Chicken Sherfa Rice",
      "description": "Special sherfa-flavoured spicy chicken rice",
      "category": "rice",
      "veg": false,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0T6FsCbbuP95E7SzHdNXU1ja1ZmKOLpQz0Q&s",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 68,
      "name": "Chicken Malaysian Rice",
      "description": "Rich Malaysian-style seasoned rice with chicken",
      "category": "rice",
      "veg": false,
      "image": "https://www.thespruceeats.com/thmb/jb1JgHVPBLKbKrXuzF7rir68i3o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/malaysian-shrimp-fried-rice-3030386-hero-01-2d2ae4c5ecac445b9b09794c7ed7ac52.jpg",
      "variations": [
        {
          "type": "half",
          "price": 150
        },
        {
          "type": "full",
          "price": 250
        }
      ],
      "available": true
    },
    {
      "id": 69,
      "name": "Chicken Hakka Noodles",
      "description": "Classic Hakka-style stir-fried noodles with shredded chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://pupswithchopsticks.com/wp-content/uploads/hakka-noodles-5.jpg",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 130
        }
      ],
      "available": true
    },
    {
      "id": 70,
      "name": "Chicken Schezwan Noodles",
      "description": "Hot and spicy Schezwan-style noodles with chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://storage.googleapis.com/shy-pub/311544/1690147309902_ChickenSchezwanNoodles.jpeg",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 71,
      "name": "Chicken Singapore Noodles",
      "description": "Singapore-style flavored noodles with shredded chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://www.mrsfoodiemumma.com/wp-content/uploads/2020/09/IMG_4691-scaled.jpeg",
      "variations": [
        {
          "type": "half",
          "price": 90
        },
        {
          "type": "full",
          "price": 170
        }
      ],
      "available": true
    },
    {
      "id": 72,
      "name": "Schezwan Triple Noodles",
      "description": "Triple-style noodles served with Schezwan gravy and chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs_uOGOqS3I4XRnWJhCnBWgiBmNKi-NalvXg&s",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 73,
      "name": "Chicken Chopper Noodles",
      "description": "Spicy chopper-style noodles with chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://i.ytimg.com/vi/AthGc8rDtHc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBKCIUxnMEG2RckocssDomFLdjmLA",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 74,
      "name": "Chicken Chilli Noodles",
      "description": "Noodles tossed in spicy chilli sauce with chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKIzU_qXQVfcO7hww8VaHTuc3xQ_am0kQFF5-t6XELk_AJO2Mg1LrbHfYCjQPgrTiSx0&usqp=CAU",
      "variations": [
        {
          "type": "half",
          "price": 120
        },
        {
          "type": "full",
          "price": 200
        }
      ],
      "available": true
    },
    {
      "id": 75,
      "name": "Chicken Thousand Noodles",
      "description": "Thousand-style noodles cooked with chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://jeyporedukaan.in/wp-content/uploads/2024/03/chicken-Noodles-jpg.webp",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 76,
      "name": "Chicken Sherfa Noodles",
      "description": "Special sherfa-flavored noodles with chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://b.zmtcdn.com/data/dish_photos/621/bb26ed2834e97aceb5e298bde5da3621.jpg",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 77,
      "name": "Chicken Malaysian Noodles",
      "description": "Aromatic Malaysian-style noodles with spicy chicken",
      "category": "noodles",
      "veg": false,
      "image": "https://img.delicious.com.au/obkYlYRO/w1200-h1200-cfill-q80/del/2017/07/malaysian-chicken-mee-goreng-49049-2.jpg",
      "variations": [
        {
          "type": "half",
          "price": 150
        },
        {
          "type": "full",
          "price": 280
        }
      ],
      "available": true
    },
    {
      "id": 78,
      "name": "Chicken Manchow Soup",
      "description": "Hot and spicy chicken soup topped with crispy noodles",
      "category": "soup",
      "veg": false,
      "image": "https://vps029.manageserver.in/menu/wp-content/uploads/2023/12/manchow-soup-veg-6.jpg",
      "variations": [
        {
          "type": "half",
          "price": 50
        },
        {
          "type": "full",
          "price": 90
        }
      ],
      "available": true
    },
    {
      "id": 79,
      "name": "Lung Fung Soup (Chicken)",
      "description": "Thick creamy soup with chicken and vegetables",
      "category": "soup",
      "veg": false,
      "image": "https://5.imimg.com/data5/QN/IE/GLADMIN-32403921/lung-fung-soup-non-veg-500x500.jpg",
      "variations": [
        {
          "type": "half",
          "price": 60
        },
        {
          "type": "full",
          "price": 100
        }
      ],
      "available": true
    },
    {
      "id": 80,
      "name": "Chicken Special Soup",
      "description": "House special rich chicken soup",
      "category": "soup",
      "veg": false,
      "image": "https://www.foodandwine.com/thmb/uvgL-Exvv_8Jf5bodVNiYyu-N3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tomato-chicken-pasta-soup-FT-RECIPE0924-1cffbad895f64326b44d27e18c4b6b0c.jpeg",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 120
        }
      ],
      "available": true
    },
    {
      "id": 81,
      "name": "Hot and Sour Chicken Soup",
      "description": "Classic hot and sour soup with chicken",
      "category": "soup",
      "veg": false,
      "image": "https://www.marionskitchen.com/wp-content/uploads/2019/02/10-minute-Hot-Sour-Soup-3-e1552634823281.jpg",
      "variations": [
        {
          "type": "half",
          "price": 80
        },
        {
          "type": "full",
          "price": 150
        }
      ],
      "available": true
    },
    {
      "id": 82,
      "name": "Maher Special Dragon Rice (Chicken)",
      "description": "Maher restaurant’s special spicy dragon-style chicken rice",
      "category": "chef-special",
      "veg": false,
      "image": "placeholder.jpg",
      "variations": [
        {
          "type": "full",
          "price": 250
        }
      ],
      "available": true
    },
    {
      "id": 83,
      "name": "Maher Special (Chicken)",
      "description": "Signature rich chicken dish prepared in Maher special style",
      "category": "chef-special",
      "veg": false,
      "image": "placeholder.jpg",
      "variations": [
        {
          "type": "full",
          "price": 400
        }
      ],
      "available": true
    },
    {
      "id": 84,
      "name": "Schezwan Chopsy (Chicken)",
      "description": "Crispy chopsy topped with hot Schezwan-style chicken gravy",
      "category": "chopsy",
      "veg": false,
      "image": "https://hotelbeachgarden.com/wp-content/uploads/2024/12/Chicken-Chinese-Chopsuey.webp",
      "variations": [
        {
          "type": "half",
          "price": 130
        },
        {
          "type": "full",
          "price": 210
        }
      ],
      "available": true
    },
    {
      "id": 85,
      "name": "American Chopsy (Chicken)",
      "description": "Crispy fried noodles topped with sweet and tangy chicken gravy",
      "category": "chopsy",
      "veg": false,
      "image": "https://assets.zeezest.com/blogs/PROD_One-Pot%20Chicken%20American%20Chop%20Suey%20Recipe%20%281%29_1721181922622.jpg",
      "variations": [
        {
          "type": "half",
          "price": 140
        },
        {
          "type": "full",
          "price": 220
        }
      ],
      "available": true
    },
    {
      "id": 86,
      "name": "Vanilla Ice Cream",
      "description": "Classic creamy vanilla ice cream",
      "category": "ice-cream",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1000&auto=format&fit=crop",
      "variations": [
        {
          "type": "single scoop",
          "price": 40
        },
        {
          "type": "double scoop",
          "price": 70
        }
      ],
      "available": true
    },
    {
      "id": 87,
      "name": "Chocolate Ice Cream",
      "description": "Rich and decadent chocolate ice cream",
      "category": "ice-cream",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
      "variations": [
        {
          "type": "single scoop",
          "price": 50
        },
        {
          "type": "double scoop",
          "price": 90
        }
      ],
      "available": true
    }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Unmesh S.',
    rating: 5,
    comment: 'had an excellent experience at Hotel Dhruvtaara. Their Chinese cuisine is genuinely impressive - rich in flavor, perfectly cooked, and served fresh. The lunch and dinner both stand out in terms of quality and consistency.',
    date: '2026-03-22'
  },
  {
    id: 'r2',
    userName: 'Arya.',
    rating: 5,
    comment: 'Quality food in less price',
    date: '2026-03-08'
  },
  {
    id: 'r3',
    userName: 'Gandharva I.',
    rating: 5,
    comment: '',
    date: '2026-03-08'
  },
  {
    id: 'r4',
    userName: 'Sejal L.',
    rating: 5,
    comment: 'Overall satisfaction',
    date: '2026-03-22'
  }
];
