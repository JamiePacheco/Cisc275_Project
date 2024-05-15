
export interface ApiCallResponse<T> { 
    message : string;
    detailedMessage : string;
    status : string;
    responseContent : T;
}