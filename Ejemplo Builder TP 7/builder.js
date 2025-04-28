// Definimos la clase Builder para construir una solicitud HTTP
class RequestBuilder {
    constructor() {
      this.url = '';            
      this.method = 'GET';       
      this.headers = {};         
      this.body = null;          
    }
  
    // Método para establecer la URL
    setURL(url) {
      this.url = url;
      return this; 
    }
  
    // Método para establecer el método HTTP (GET, POST, PUT, DELETE)
    setMethod(method) {
      this.method = method;
      return this; 
    }
  
    // Método para establecer los headers del HTTP
    setHeaders(headers) {
      this.headers = headers;
      return this; 
    }
  
    // Método para establecer el contenido a mandar por JSON
    setBody(body) {
      this.body = body;
      return this; 
    }
  
    // Método final que construye y ejecuta la solicitud HTTP
    build() {
      // Llama a fetch usando las propiedades configuradas
      return fetch(this.url, {
        method: this.method,
        headers: this.headers,
        // Si hay cuerpo, lo convierte a JSON; si no, pone null
        body: this.body ? JSON.stringify(this.body) : null
      });
    }
  }
  
  // Uso del Builder 
  const request = new RequestBuilder()
    .setURL('https://api.example.com/users')  
    .setMethod('POST')                       
    .setHeaders({ 'Content-Type': 'application/json' }) 
    .setBody({ name: 'Juan', age: 30 })        
    .build();                                 
  