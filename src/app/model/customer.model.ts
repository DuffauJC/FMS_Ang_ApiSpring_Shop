export class Customer {

    name: string
    firstName: string
    address: string
    phoneNumber: string
    email: string
    password: string
    role : string

    constructor(name: string, firstName: string, address: string, phoneNumber: string, email: string, password: string, role: string) {

        this.name = name
        this.firstName = firstName
        this.address = address
        this.phoneNumber = phoneNumber
        this.email = email
        this.password = password
        this.role = role
    }

}