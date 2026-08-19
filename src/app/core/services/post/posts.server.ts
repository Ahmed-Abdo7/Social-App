import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { LikedPostResponse } from "../../models/liked-post.interface";
import { LikesDataResponse } from "../../models/likes-data.interface";
import { PostDataResponse } from "../../models/post-data.interface";
import { PostsResponse } from "../../models/posts.interface";

@Injectable({ providedIn: 'root' })
export class PostsServer {
    private readonly httpClient = inject(HttpClient) ; 

    createPost(data : FormData):Observable<PostDataResponse>{
        return this.httpClient.post<PostDataResponse>(environment.base_url + '/posts' , data);

    }
    getAllPost():Observable<PostsResponse>{
        return this.httpClient.get<PostsResponse>(environment.base_url + '/posts');
    }
    getPostLikes(postId : string):Observable<LikesDataResponse>{
        return this.httpClient.get<LikesDataResponse>(environment.base_url+`/posts/${postId}/likes`);
    }
    putPostLike(postId : string):Observable<LikedPostResponse>{
        return this.httpClient.put<LikedPostResponse>(environment.base_url+'/posts/'+postId+'/like', {});
    }
    putPostBookMark(postId : string):Observable<any>{
        return this.httpClient.put<any>(`${environment.base_url}/posts/${postId}/bookmark`, {});
    }
}
