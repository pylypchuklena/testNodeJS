export enum ServiceType{
  Makeup,
  HairStyle,
  OutOfOffice
}

export default class PriceManager{

  public GetPrice(types:ServiceType[]):number{
    var price =0;
    types.forEach(element => {
      if(element == ServiceType.Makeup)
      price+=350;
      if(element == ServiceType.HairStyle)
      price+=300;
      if(element == ServiceType.OutOfOffice)
      price+=50;
    });

    return price;
  }
}