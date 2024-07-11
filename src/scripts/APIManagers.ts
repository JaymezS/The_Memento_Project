

const NASAAPIKEY: string = "DfbzQQejUNU2HLqZT6KNf6xYaqJp1Y5litQdp6Pk"
const API_KEYS: string[] = [
  "DfbzQQejUNU2HLqZT6KNf6xYaqJp1Y5litQdp6Pk", 
  "auuQnzinodrVzexn2sWyI44PPI0H0UdvzRPUbvxd"
]
API_KEYS



abstract class RestAPIManager {
  protected APIBase: string | undefined;
  protected _response: any;

  constructor(protected key: string) { }

  public get response() {
    return this._response
  }


  public setBaseAPI(base: string): void {
    this.APIBase = base
  }

  public getJsonResponse(query: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        fetch(this.APIBase + query)
          .then((RawData) => { return RawData.json() })
          .then((jsonData) => { this._response = jsonData })
          .then(() => { resolve("resolved") })
          .catch(() => { reject("api fetch error") })
      }
    ) 
  }
}





class RoverImageAPIManager extends RestAPIManager {
  private static _instance: RoverImageAPIManager | undefined;

  private constructor(key: string) {
    super(key)
    this.setBaseAPI("https://mars-photos.herokuapp.com/api/v1/")
  }

  public async getJsonResponse(query: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        fetch(this.APIBase + query)
          .then((RawData) => { return RawData.json() })
          .then((jsonData) => { this._response = jsonData })
          .then(() => { resolve("resolved") })
          .catch(() => { reject("api fetch error") })
      }
    ) 
  }

  public async getImageJsonResponse(rover: string, sol: number = 1, camera: string = "all", page: number = 1): Promise<any> {
    await new Promise(
      (resolve, reject) => {
        console.log("fetched from: " + this.APIBase + `rovers/${rover}/photos?sol=${sol}&cameras=${camera}&page=${page}`)
        fetch(this.APIBase + `rovers/${rover}/photos?sol=${sol}&cameras=${camera}&page=${page}`)
          .then((RawData) => { return RawData.json() })
          .then((jsonData) => { this._response = jsonData })
          .then(() => { resolve("resolved") })
          .catch(() => { reject("api fetch error") })
      }
    ) 
    return this.response
  }

  public async getManifestFor(rover: string) {
    await this.getJsonResponse(`manifests/${rover}`)
    return this._response.photo_manifest
  }

  public static get instance(): RoverImageAPIManager {
    if (RoverImageAPIManager._instance === undefined) {
      RoverImageAPIManager._instance = new RoverImageAPIManager(NASAAPIKEY)
      console.log("instantiated curiosity rover image api manager")
    }
    return RoverImageAPIManager._instance
  }


  public async getRandomImageSource(): Promise<string> {

    /*
    exlucded
    mardi  does not provide imagery of surfce (only descent)
    chemcam is microimage
    mast: misc image

    used, but not good
    mahli is used for high res colored zoomed-in image
    

    best
    navcam: images used to navigate the rover
    fhaz/rhaz are for front and rear ground views respectively, no sceneric views
     */


    console.log(await this.getManifestFor("perseverance"))
    console.log(await this.getImageJsonResponse("curiosity", 50, "fhaz", 1))
    return ""

    // const CAMERAS: string[] = ["fhaz", "rhaz"]

    // let sol_date: number = randInt(0, this.curiosityManifest.max_sol + 1)

    // while (true) {
    //   sol_date = randInt(0, this.curiosityManifest.max_sol + 1)
    //   while (this.availablePhotos[sol_date] === undefined) {
    //     sol_date = randInt(0, this.curiosityManifest.max_sol + 1)
    //   }

    //   let availableCams: string[] = Array(0)
    //   for (let camera of this.availablePhotos[sol_date]!.cameras) {
    //     if (CAMERAS.indexOf(camera.toLowerCase()) != -1) {
    //       availableCams.push(camera)
    //     }
    //   }

    //   if (availableCams.length === 0) {
    //     continue
    //   }
    //   const CAMERA_CHOICE: number = randInt(0, availableCams.length)
    //   await this.getImageJsonResponse("curiosity", sol_date, availableCams[CAMERA_CHOICE])
    //   break
    // }

    // const PHOTO_LIST: { id: number, img_src: string }[] = this.response.photos
    // if (PHOTO_LIST.length > 0) {
    //   return PHOTO_LIST[0].img_src
    // }
    // return ""

  }
}


export {RoverImageAPIManager}