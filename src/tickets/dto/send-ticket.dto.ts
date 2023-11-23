export class SendTicketDto{

    code: number; 
    name: string;
    email: string;
    status: string;
    

    setCode(code:number){
        this.code = code;
        return this
    }

    setName(name:string) {
        this.name = name;
        return this;
      }
    
    setEmail(email:string) {
        this.email = email;
        return this;
      }
    
    
    setStatus(status:string) {
        this.status = status;
        return this;
      }
}