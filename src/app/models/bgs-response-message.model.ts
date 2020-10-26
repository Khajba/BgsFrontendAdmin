export interface BgsResponseMessage<TData> {
    isSuccess: boolean;
    data: TData;
    errorMessage: string;
}