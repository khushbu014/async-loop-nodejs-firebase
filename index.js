// import stuff
const Firebase = require('firebase');
const firebase = Firebase.default;
const firebaseConfig = {
    "apiKey": "AIzaSyB_Ug9baGFhisCDAtFtatetMNS79M-Y",
    "authDomain": "my-app.firebaseapp.com",
    "databaseURL": "https://my-app.firebaseio.com",
    "storageBucket": "my-app.appspot.com",
    "messagingSenderId": "10326025483"
}
const products = [
    {
        name: 'Product A',
        category: 'category-a'
    },
    {
        name: 'Product B',
        category: 'category-b'
    },
    {
        name: 'Product C',
        category: 'category-c'
    }
];

// initialize firebase
firebase.initializeApp(firebaseConfig);

// test firebase instance
// console.log(firebase.database())

// call the sync seed
// seed();

// call the async seed
seedAsync();


function seed() {
    products.map((product, i) => {
        const ref = 'products/' + product.category;
        firebase
            .database()
            .ref(ref)
            .push(product)
            .then(() => {
                console.log('success product ', i, ' at /products/' + product.category)
            })
            .catch(console.error);
    })
}

function seedAsync() {
    products.reduce((accumulator, product, i) => {
        return accumulator.then(() => {
            return new Promise((resolve) => {

                const ref = 'products/' + product.category;
                firebase
                    .database()
                    .ref(ref)
                    .push(product)
                    .then(() => {
                        console.log('success product ', i, ' at /products/' + product.category)
                        resolve(product);
                    })
                    .catch(console.error);

            }).catch(console.error);
        });
    }, Promise.resolve([])).then(() => {
        console.log('end of async promise');
    });
}