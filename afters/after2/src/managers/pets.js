const fs = require('fs');

const pathToPets = __dirname+'/../files/pets'

class PetManager{
    add = async(pet)=>{
        if(fs.existsSync(pathToPets)) {
            try {
                let data= await fs.promises.readFile(pathToPets, 'utf-8');
                let pets = JSON.parse(data);
                    if(pets.length === 0){
                //Is the first pet
                        pet.id = 1;
                        pets.push(pet);
                        await  fs.promises.writeFile(pathToPets,JSON.stringify(pets,null,2))
                        return {status:"success", message:"Added 1 pet"}
                    }
                    pet.id = pets[pets.length-1].id + 1;
                    pets.push(pet);
                    await fs.promises.writeFile(pathToPets,JSON.stringify(pets,null,2));
                    return {status:"success", message:"Added 1 pet"}
            }    
        catch (error) {
                return{status:"error"}
            }
        }
        else{
            try {
                pet.id=1;
                await fs.promises.writeFile(pathToPets,JSON.stringify([pet],null,2));
                return {status:"success",message:"Added 1 pet"}
            } catch (error) {
                return {status:"error",error:error}
            }
        }
    }
    get = async() => {
        if(fs.existsSync(pathToPets)){
            try {
                let data= await fs.promises.readFile(pathToPets, 'utf-8');
                let pets = JSON.parse(data);
                return {status:"success",payload:pets}
            } catch (error) {
                return {status:"error",error:error}
            }
        } else {
            return {status:"success",payload:[]}
        }
    }
}

module.exports = PetManager;