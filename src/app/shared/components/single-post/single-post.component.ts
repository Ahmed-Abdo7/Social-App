import { Component, inject, input, signal } from '@angular/core';
import { Post } from '../../../core/models/posts.interface';
import { DatePipe } from '@angular/common';
import { PostsServer } from '../../../core/services/post/posts.server';
import { Like } from '../../../core/models/likes-data.interface';
import { FollowingServer } from '../../../features/services/following.server';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe,CommentsComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent {
    private readonly followingServer = inject(FollowingServer) ;
  private readonly postsService = inject(PostsServer);
  post = input.required<Post>();
  isLiked = signal(false);

  // Likes modal state
  likes = signal<Like[]>([]);
  isLoadingLikes = signal(false);
  showLikesModal = signal(false);



  getAllLikes(postID: string) {
    this.showLikesModal.set(true);
    this.isLoadingLikes.set(true);
    
    this.postsService.getPostLikes(postID).subscribe({
      next: (response) => {
        this.likes.set(response.data.likes || []);
        this.isLoadingLikes.set(false);
      },
      error: (err) => {
        console.error('Error fetching likes:', err);
        this.isLoadingLikes.set(false);
      }
    });
  }

  closeModal() {
    this.showLikesModal.set(false);
  }
 
  flag = signal(false);
  followUser(userId:string){
    this.followingServer.followUser(userId).subscribe((res)=>{
      this.flag.set(res.data.following);
    })
  }

  putLike(postId:string){
    this.postsService.putPostLike(postId).subscribe((res)=>{
      this.isLiked.set(res.data.liked);
    })
  }

  showCommentsModal = signal(false);
  toggleCommentsModal(){
    this.showCommentsModal.set(!this.showCommentsModal());
  }
    
}

