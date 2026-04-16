import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


export interface ApiResponse<T = any> {
    success: boolean,
    data?: T,
    error?: string
    timestamp: string,
    
}

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>>
{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
       return next.handle().pipe(
        map((data)=>({
            success: true,
            data, // This is whatever your controller returned
            timestamp: new Date().toISOString(),
        }))); 
    }
}