const {promises: fs, readFileSync} = require('fs');

class Contenedor {
    constructor (ruta) {
        this.ruta = ruta;
    }

    async save(obj) {

        const products = await this.getAll();

        let lastId = products.length;
        lastId > 0 ? lastId = lastId : lastId = 0

        obj.forEach(e => {
            e.id = lastId +1
        });

        products.push(...obj);
        console.log(products);

        try {
            fs.writeFile(this.ruta,JSON.stringify(products, null, 2))
            console.log("Se agregó el producto.")
        } catch(error){
            console.log("Hubo un error al agregar el producto.")
            return[]
        }
    }

    async getById(id) {
        const products = await this.getAll();
        const productById = products.find (p => p.id == id);
        return productById;
    }

    async getAll() {
        try {
            const products = await fs.readFile(this.ruta, 'utf-8');
            return products
        } catch (error) {
            return [];
        }
    }

    async deleteById (id){ 

        try{
           const products = await this.getAll();
           const productById = products.filter(p => p.id !== id);
           fs.writeFile('productos.txt',JSON.stringify(productById , null , 2))
           console.log(`Se elimino el id ${id} Correctamente`)

        return productById;

        }catch(error){
           console.log('hubo un error en deleteById')
           return [];
        }
    }

    async deleteAll() {
        const path = './productos.txt';
        try {
            fs.unlinkSync(path)
        } catch(err) {
            console.log('error');
        }
    }
    
}

module.exports = Contenedor;