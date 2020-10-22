export interface ResponseMessage<TData> {
    isSuccess: boolean;
    data: TData;
    errorMessage: string;
}