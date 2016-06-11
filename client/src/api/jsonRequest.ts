import * as Promise from 'bluebird'
import * as xhr from 'xhr'

export interface NetworkResponse {
  readonly json:any
  readonly status:number
}

export class NetworkError extends Error {
  //constructor(private _message:string, private _status:number) {}
  
  constructor(message?: string, public status?: number) {
    super(message)
  }
}

export interface JSONRequestBody {
  readonly uri: string
  readonly body: any,
  readonly method?: string
}

export const jsonRequest = (req: JSONRequestBody) => {
  return new Promise<NetworkResponse>((resolve, reject) => {
    const headers = {"Content-Type": "application/json"}
    xhr({body: JSON.stringify(req.body), uri: req.uri, headers, method: req.method || 'get'},
      (err:Error, resp:any, body:any) => {
        if (typeof body === 'string' && resp.statusCode < 400) {
          return resolve({json: JSON.parse(body), status: resp.statusCode})
        }
        if (resp.statusCode >= 400) {
          return reject(new NetworkError(body.toString(), resp.statusCode))
        }
        
        return reject(new Error('something went wrong: ' + body.toString()))      
      })  
  }) 
}
