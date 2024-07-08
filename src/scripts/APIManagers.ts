import { randInt } from "./Utilities";

const NASAAPIKEY: string = "DfbzQQejUNU2HLqZT6KNf6xYaqJp1Y5litQdp6Pk"
const API_KEYS: string[] = [
  "DfbzQQejUNU2HLqZT6KNf6xYaqJp1Y5litQdp6Pk", 
  "auuQnzinodrVzexn2sWyI44PPI0H0UdvzRPUbvxd"
]



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





class CuriosityRoverImageAPIManager extends RestAPIManager {
  private static _instance: CuriosityRoverImageAPIManager | undefined;
  private manifest: any
  private availablePhotos: ({sol: number, total_photos: number, cameras: string[]} | undefined)[] = []

  private constructor(key: string) {
    super(key)
    this.setBaseAPI("https://api.nasa.gov/mars-photos/api/v1/")
    this.setupManifest()
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

  public async getImageJsonResponse(sol: number = 1, camera: string = "all", page: number = 1): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        fetch(this.APIBase + `rovers/curiosity/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${this.key}`)
          .then((RawData) => { return RawData.json() })
          .then((jsonData) => { this._response = jsonData })
          .then(() => { resolve("resolved") })
          .catch(() => { reject("api fetch error") })
      }
    ) 
  }

  private async setupManifest() {
    await this.getJsonResponse(`manifests/curiosity?api_key=${this.key}`)
    this.manifest = this.response.photo_manifest
    this.availablePhotos = Array(this.manifest.max_sol).map(() => { return undefined })
    const PHOTOS: {sol: number, total_photos: number, cameras: string[]}[] = this.manifest.photos
    for (let p of PHOTOS) {
      this.availablePhotos[p.sol] = p
    }
  }

  public static get instance(): CuriosityRoverImageAPIManager {
    if (CuriosityRoverImageAPIManager._instance === undefined) {
      CuriosityRoverImageAPIManager._instance = new CuriosityRoverImageAPIManager(NASAAPIKEY)
      console.log("instantiated curiosity rover image api manager")
    }
    return CuriosityRoverImageAPIManager._instance
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
    const CAMERAS: string[] = ["fhaz", "rhaz"]

    let sol_date: number = randInt(0, this.manifest.max_sol + 1)

    while (true) {
      sol_date = randInt(0, this.manifest.max_sol + 1)
      while (this.availablePhotos[sol_date] === undefined) {
        sol_date = randInt(0, this.manifest.max_sol + 1)
      }

      let availableCams: string[] = Array(0)
      for (let camera of this.availablePhotos[sol_date]!.cameras) {
        if (CAMERAS.indexOf(camera.toLowerCase()) != -1) {
          availableCams.push(camera)
        }
      }

      if (availableCams.length === 0) {
        continue
      }
      const CAMERA_CHOICE: number = randInt(0, availableCams.length)
      await this.getImageJsonResponse(sol_date, availableCams[CAMERA_CHOICE])
      break
    }

    const PHOTO_LIST: { id: number, img_src: string }[] = this.response.photos
    if (PHOTO_LIST.length > 0) {
      return PHOTO_LIST[0].img_src
    }
    return ""

  }
}


export {CuriosityRoverImageAPIManager}