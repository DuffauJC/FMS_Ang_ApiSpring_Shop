export class Customer {

    name: string
    firstName: string
    address: string
    phone: string
    mail: string
    password: string
    role : string

    constructor(name: string, firstName: string, address: string, phone: string, mail: string, password: string, role: string) {

        this.name = name
        this.firstName = firstName
        this.address = address
        this.phone = phone
        this.mail = mail
        this.password = password
        this.role = role
    }

}