const fs = require('fs');
const petPath = __dirname+'/../files/pets.json'

const fetch = async() => {
    let data = await fs.promises.readFile(petPath, 'utf-8');
    let pets = JSON.parse(data);
    return pets;
}

class PetManager {
    getAll = async() => {
        if(fs.existsSync(petPath)){
            try {
                let pets = await fetch();
                return {status:"success", payload:pets}                          
            } catch (error) {
                return {status:"error", error:error}                
            }
        }
    }

    add = async(pet) => {
        if(fs.existsSync(petPath)){
            try {
                let pets = await fetch();
                if(pets.length === 0){
                    pet.id=1;
                    await fs.promises.writeFile(petPath, JSON.stringify([pet], null, 2))
                    return {status:"success", message:"Pet added"}
                    }
                    pet.id = [pets.length-1].id+1;
                    pets.push(pet);
                    await fs.promises.writeFile(petPath, JSON.stringify(pets,null,2))
                    return {status:"success", message:"Pet added"}
                    
                } catch (error) {
                    return {status:"error", error:error}
            }
        }
        pet.id=1;
        await fs.promises.writeFile(petPath, JSON.stringify([pet], null, 2))
        return {status:"success", message:"Pet added"}
    }
}

module.exports = PetManager;