const fs = require('fs');

const pathToChat = __dirname+'/../files/chat.txt'

class Chat {
    async getMessages(){
      try {
        const messages = await fs.promises.readFile(pathToChat, "utf-8");
        if (!messages) {
            const arrayMessages = [];
            fs.writeFileSync(pathToChat, JSON.stringify(arrayMessages));
            return arrayMessages;
          }
          const datos = JSON.parse(messages);
          return datos;
        } catch (error) {
          throw error;
        }
      }

    
      async saveMessages(obj) {
        try {
          const array = await this.getMessages()
            .then((res) => res)
            .catch((error) => {
              throw error;
            });
          array.push(obj);
          const data = JSON.stringify(array);
          fs.writeFileSync(pathToChat, data, "utf-8");
          return obj;
        } catch (error) {
          throw error;
        }
    }
}

module.exports = Chat;