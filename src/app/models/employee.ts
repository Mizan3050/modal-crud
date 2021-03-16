export interface Igeo {
    lat: string;
    lang: string;
}
export interface Icompany{
    name: string;
    catchPhrase:string;
    bs: string;
}
export interface IAddress {
    street:string;
    suite:string;
    city:string;
    zipcode: string;
    geo: {
        [key: string]:Igeo
    }
}

export interface IEmployee {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        [key: string]: IAddress
    };
    phone: string;
    website: string;
    company: {
        [key:string]: Icompany
    }
}