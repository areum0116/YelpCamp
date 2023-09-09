const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64fb172666e92e8500d99f72',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Odio, ad id? Eos veniam voluptatum quo non distinctio tempora, tempore aliquam excepturi sapiente saepe ex iusto recusandae officiis suscipit nostrum sit ratione sint id. Nam quae ad velit maxime dignissimos maiores fugiat quis autem ullam amet assumenda, animi recusandae impedit distinctio ducimus porro dolorem. Numquam dignissimos maiores modi itaque deleniti distinctio doloribus aliquid, magnam a harum porro, assumenda nihil id alias necessitatibus totam hic blanditiis. Magnam facere laboriosam sint animi debitis nesciunt accusantium, aliquam, corporis temporibus repellat itaque in autem quas deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})