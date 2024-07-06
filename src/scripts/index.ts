import { Client } from "./Client.js"

class Driver {
  private static _instance: Driver | undefined

  readonly client: Client | undefined 

  private constructor() {
    this.client = Client.instance
  }

  public static get instance(): Driver {
    if (Driver._instance === undefined) {
      Driver._instance = new Driver()
    }
    return Driver._instance
  }
}




export { Driver }

