import { RoverImageAPIManager } from "./APIManagers"
import { IPManager } from "./IPManager"
import { RoverImageManager } from "./RoverImageManager"

class Client {
  private static _instance: Client | undefined
  readonly IP_MANAGER: IPManager = IPManager.instance
  readonly CURIOSITY_IMAGE_API_MANAGER: RoverImageAPIManager = RoverImageAPIManager.instance
  readonly ROVER_IMAGE_MANAGER: RoverImageManager = RoverImageManager.instance

  private constructor() {
    
  }

  public static get instance(): Client {
    if (Client._instance === undefined) {
      Client._instance = new Client()
      console.log("instantiated Client")
    }
    return Client._instance
  }
}


export { Client }