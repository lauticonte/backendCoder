const fs = require("fs");
class Chat {
  constructor(file) {
    this.file = file;
  }

  async getMessages() {
    try {
      const messages = await fs.promises.readFile(this.file, "utf-8");
      if (!messages) {
        const arrayMessages = [];
        fs.writeFileSync(this.file, JSON.stringify(arrayMessages));
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
      fs.writeFileSync(this.file, data, "utf-8");
      return obj;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Chat;