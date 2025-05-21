export interface ICase {
  caseId: string;
  patient: IPatient;
  caseLocation: ILocation;
  hospitalLocation: ILocation;
  caseInformation: ICaseInformation;
  routingInformation: IRoutingInformation;
}

export interface IPatient {
  firstname: string;
  lastname: string;
  birthDate: string;
  phoneNumber: string;
}

export interface ILocation {
  street: string;
  housenumber: string;
  zipCode: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ICaseInformation {
  caseReason: string;
  casePriority: string;
  caseComment: string;
}

export interface IRoutingInformation {
  distanceInMeters: number;
  drivingTimeInSeconds: number;
  routeAsPolyLine: string;
}
