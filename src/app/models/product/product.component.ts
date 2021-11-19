export class Product {
   // title : string;
   // name : string;
  //id:number;
   
     quantity:number ;
    //regular_price:number;
    isFavorite : boolean;
   

  /* constructor(title: string){
       this.title = title;
       this.isLent = false;
   }*/
   // here's a shortcut to use, to simplify the task

        constructor(  public id : number,
                      public name:string, 
                      public  regular_price: string,
                      public  sale_price: string,
                      public image: string,
                      public description: string[],
                      public tags : []
                      
                      ){
            this.isFavorite = false;
            this.quantity = 0;
        }
}
