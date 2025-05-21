import {
  ICase,
  ICaseInformation,
  ILocation,
  IPatient,
  IRoutingInformation,
} from './icase';

export class Case implements ICase {
  public caseId: string = "";
  public patient: IPatient = {} as IPatient;
  public caseLocation: ILocation = {} as ILocation;
  public hospitalLocation: ILocation = {} as ILocation;
  public caseInformation: ICaseInformation = {} as ICaseInformation;
  public routingInformation: IRoutingInformation = {} as IRoutingInformation;

  constructor() {}
}
