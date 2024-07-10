import { RoverImageAPIManager } from "./APIManagers";

class RoverImageManager {
  private static _instance: RoverImageManager | undefined;

  private constructor() {

  }
  
  public static get instance(): RoverImageManager {
    if (RoverImageManager._instance === undefined) {
      RoverImageManager._instance = new RoverImageManager()
      console.log("instantiated RoverImageManager")
    }
    return RoverImageManager._instance
  }

  
  public async getAllImages(rover: string, sol: number = 1, camera: string = "all"): Promise<any[][]> {
    let res: any[][] = [];
    let currentPage: number = 1
    let response = (await RoverImageAPIManager.instance.getImageJsonResponse(rover, sol, camera, currentPage)).photos
    while (response.length > 0) {
      for (let obj of response) {
        res.push(obj)
      }
      currentPage++;
      response = (await RoverImageAPIManager.instance.getImageJsonResponse(rover, sol, camera, currentPage)).photos
    }
    return res
  }


  public async getAllImageOnPage(rover: string, sol: number = 1, camera: string = "all", page: number = 1) {
    let res: any[] = [];
    let response = (await RoverImageAPIManager.instance.getImageJsonResponse(rover, sol, camera, page)).photos
    if (response.length > 0) {
      for (let obj of response) {
        res.push(obj)
      }
      
      if (page <= 1) {
        res.push(false)
      } else {
        res.push(true)
      }

      response = (await RoverImageAPIManager.instance.getImageJsonResponse(rover, sol, camera, page + 1)).photos
      if (response.length > 0) {
        res.push(true)
      } else {
        res.push(false)
      }
      return res
    } else {
      return null
    }
  }
}


export {RoverImageManager}