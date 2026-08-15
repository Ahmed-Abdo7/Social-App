import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { CommentsDataResponse } from "../../models/comments-data.interface";
import { LikedCommentResponse } from "../../models/liked-comment.interface";


@Injectable({ providedIn: 'root' })
export class CommentsServer {
    private readonly httpClient = inject(HttpClient);

    getPostComments(postId:string):Observable<CommentsDataResponse>{
        return this.httpClient.get<CommentsDataResponse>(environment.base_url+`/posts/${postId}/comments`);
    }
    putLikeToComment(postId:string , commentId:string):Observable<LikedCommentResponse>{
        return this.httpClient.put<LikedCommentResponse>(environment.base_url+`/posts/${postId}/comments/${commentId}/like` , null);
    }

    createComment(postId:string  , data: object):Observable<any>{
        return this.httpClient.post<any>(environment.base_url + `/posts/${postId}/comments` , data)
    }

    
}
