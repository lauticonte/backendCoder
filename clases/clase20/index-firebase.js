import admin from 'firebase-admin';
import account from './llavefirebase.json' assert {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: 'https://pruebabasecoder1.firebaseio.com'
})

const CRUD = async () => {
    const db = admin.firestore();
    const collection = db.collection('usuarios');
    let batch = db.batch();

    //* INSERT ONE *//
    // let doc = collection.doc();
    // await doc.create({nombre: "Lautaro", dni: "12345678"})

    //* INSERT MANY *//
    // let multipleUsers = [
    //     {name:"Mauricio",dni:4352352}
    //     {name:"Marisol",dni:4352352},
    //     {name:"Lila",dni:4352352},
    //     {name:"Edgar",dni:4352352},
    //     {name:"Mario",dni:4352352}
    // ]
    // multipleUsers.forEach(doc => {
    //     let refDoc = collection.doc();
    //     batch.set(refDoc, doc);
    // })
    // await batch.commit();

    //* GET *//
    // const snapShot = await collection.get();
    // let docs = snapShot.docs;
    // console.log(docs);
    // let users = docs.map(doc => ({
    //     id: doc.id,
    //     name: doc.data().name,
    //     dni: doc.data().dni
    // }))
    // console.log(users);

    //* UPDATE *//
    // let id = "5WYLeRxQ8nUjaCPnKhrn";
    // const doc = collection.doc(id);
    // let result = await doc.update({dni:12345});
    // console.log(result);

    //* DELETE *//
    // let id = "5WYLeRxQ8nUjaCPnKhrn";
    // const doc = collection.doc(id);
    // let result = await doc.delete();
    // console.log(result);
}

CRUD();