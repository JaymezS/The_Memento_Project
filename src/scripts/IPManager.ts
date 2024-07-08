class IPManager {
  static readonly IP_API: string = "https://api.ipify.org/?format=json";
  private static _instance: IPManager | undefined;
  private _clientIP: string | undefined


  private constructor() {
    this.getIP()
  }


  public get clientIP(): string {
    if (this._clientIP === undefined) {
      throw new Error("Error: Client IP not available or has not been received")
    }
    return this._clientIP
  }


  public static get instance(): IPManager {
    if (IPManager._instance === undefined) {
      IPManager._instance = new IPManager()
      console.log("instantiated IPManager")
    }
    return IPManager._instance
  }
  

  // prone to change depending on the IP API used
  public getIP(): void {
    fetch(IPManager.IP_API)
      .then(
        (results) => {
          return results.json()
        }
      )
      .then(
        (jsonData: { ip: string }) => {
          this._clientIP = jsonData.ip
        }
      )
  }
}


export { IPManager }